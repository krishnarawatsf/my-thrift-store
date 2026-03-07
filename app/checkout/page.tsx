'use client'

import { useCart, useCartHydration } from '@/lib/store'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, total, clearCart } = useCart()
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  })

  const handleSessionConfirmation = useCallback(
    async (sessionId: string) => {
      try {
        // Verify session and create order in Supabase
        const res = await fetch('/api/checkout-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()
        if (data.orderId) {
          clearCart()
          router.push(`/order-confirmation/${data.orderId}`)
        }
      } catch (err) {
        console.error('Session confirmation error:', err)
        setError('Failed to confirm payment. Please contact support.')
      }
    },
    [clearCart, router]
  )

  // Handle session_id from Stripe redirect
  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      handleSessionConfirmation(sessionId)
    }
  }, [searchParams, handleSessionConfirmation])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe) return

    setLoading(true)
    setError(null)

    try {
      // Create checkout session
      const res = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            size: item.size,
            quantity: item.quantity,
          })),
          email: formData.email,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipcode: formData.zipcode,
          },
          phone: formData.phone,
        }),
      })

      const { sessionId, error: sessionError } = await res.json()

      if (sessionError) {
        setError(sessionError)
        return
      }

      // Redirect to Stripe Checkout
      const result = await (stripe as any).redirectToCheckout({ sessionId })

      if (result.error) {
        setError(result.error.message || 'Payment failed')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-950">
      {/* Shipping Information */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Shipping Address</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border border-gray-800 rounded px-4 py-2 w-full bg-gray-900 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border border-gray-800 rounded px-4 py-2 w-full bg-gray-900 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-800 rounded px-4 py-2 w-full mb-4 bg-gray-900 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-gray-800 rounded px-4 py-2 w-full mb-4 bg-gray-900 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
        />

        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border border-gray-800 rounded px-4 py-2 w-full mb-4 bg-gray-900 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="border border-gray-800 rounded px-4 py-2 w-full bg-gray-900 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="border border-gray-800 rounded px-4 py-2 w-full bg-gray-900 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>

        <input
          type="text"
          name="zipcode"
          placeholder="PIN Code"
          value={formData.zipcode}
          onChange={handleChange}
          required
          className="border border-gray-800 rounded px-4 py-2 w-full mb-4 bg-gray-900 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
      </div>

      {/* Payment Info */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Payment Method</h2>
        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-sm text-gray-400 mb-4">
            🔒 Secure payment powered by Stripe. Use test card <code className="font-mono bg-gray-950 text-gray-300 px-2 py-1 rounded">4242 4242 4242 4242</code> for testing.
          </p>
          <div className="border border-gray-800 rounded p-4 bg-gray-950">
            <CardElement
              options={{
                style: {
                  base: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '14px',
                    color: '#f3f4f6',
                    '::placeholder': {
                      color: '#6b7280',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-950 border border-red-800 rounded p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-gray-100 text-gray-950 py-3 rounded font-semibold hover:bg-white transition disabled:bg-gray-800 disabled:text-gray-600"
      >
        {loading ? 'Processing...' : `Pay ₹${total().toLocaleString()}`}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const isHydrated = useCartHydration()
  const { items, total } = useCart()

  if (!isHydrated) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 bg-gray-950 min-h-screen">
        <div className="text-center text-gray-400">
          <p>Loading cart...</p>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 bg-gray-950 min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-100">Your cart is empty</h1>
          <p className="text-gray-400 mb-6">Add items before checking out</p>
          <Link
            href="/"
            className="inline-block bg-gray-100 text-gray-950 px-6 py-3 rounded font-semibold hover:bg-white transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 bg-gray-950 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-gray-100">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-24 bg-gray-900 border border-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-100">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-800">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <div>
                    <p className="font-semibold text-gray-100">{item.name}</p>
                    <p className="text-gray-400">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-100">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>₹{total().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-gray-800 pt-3 text-gray-100">
                <span>Total:</span>
                <span>₹{total().toLocaleString()}</span>
              </div>
            </div>

            {/* Info */}
            <div className="text-xs text-gray-500 space-y-2">
              <p>✓ Free shipping on all orders</p>
              <p>✓ 14-day returns guarantee</p>
              <p>✓ 100% authentic products</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
