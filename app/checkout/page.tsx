'use client'

import { useCart } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
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

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add items before checking out</p>
          <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800">
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create order
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            size: item.size,
            quantity: item.quantity,
          })),
          total: total(),
          status: 'pending',
          shipping_address: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipcode: formData.zipcode,
          },
          email: formData.email,
          phone: formData.phone,
        })
        .select()

      if (error) throw error

      // Clear cart and redirect
      clearCart()
      router.push(`/order-confirmation/${order?.[0]?.id}`)
    } catch (err) {
      console.error('Order error:', err)
      alert('Failed to create order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="border rounded px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded px-4 py-2 w-full mb-4"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border rounded px-4 py-2 w-full mb-4"
              />

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border rounded px-4 py-2 w-full mb-4"
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="border rounded px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <input
                type="text"
                name="zipcode"
                placeholder="ZIP Code"
                value={formData.zipcode}
                onChange={handleChange}
                required
                className="border rounded px-4 py-2 w-full mb-4"
              />
            </div>

            {/* Payment Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              <div className="border rounded p-4 bg-gray-50">
                <p className="text-gray-600 mb-4">
                  ⚠️ Demo Mode: This is a demo checkout. In production, integrate with Razorpay, Stripe, or your preferred payment gateway.
                </p>
                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" value="stripe" defaultChecked />
                  <span>Razorpay/Stripe (Production)</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-24 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6 pb-6 border-b">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{total()}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping:</span>
                <span>Calculated in next step</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-3">
                <span>Total:</span>
                <span>₹{total()}</span>
              </div>
            </div>

            {/* Info */}
            <div className="text-xs text-gray-500 space-y-2">
              <p>✓ Free shipping on orders above ₹2000</p>
              <p>✓ 14-day returns guarantee</p>
              <p>✓ 100% authentic products</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
