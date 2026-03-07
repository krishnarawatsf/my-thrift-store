import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (!order) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 bg-gray-950 min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-100">Order not found</h1>
          <Link href="/" className="text-gray-400 hover:text-gray-100 transition">
            Return Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-gray-950 min-h-screen">
      {/* Success Message */}
      <div className="text-center mb-12">
        <div className="mb-6 text-6xl">✓</div>
        <h1 className="text-4xl font-bold mb-2 text-gray-100">Order Confirmed!</h1>
        <p className="text-gray-400 text-lg">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="font-semibold text-gray-400 text-sm mb-2">Order Number</h2>
            <p className="text-2xl font-bold font-mono text-gray-100">{order.id}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-400 text-sm mb-2">Order Date</h2>
            <p className="text-2xl text-gray-100">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-400 text-sm mb-2">Order Status</h2>
            <p className="text-lg font-semibold text-yellow-500 uppercase">
              {order.status}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-400 text-sm mb-2">Total Amount</h2>
            <p className="text-2xl font-bold text-gray-100">₹{order.total}</p>
          </div>
        </div>

        {/* Items */}
        <div className="border-t border-gray-800 pt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-100">Items Ordered</h2>
          <div className="space-y-3">
            {order.items?.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between py-2">
                <div>
                  <p className="font-semibold text-gray-100">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    Size: {item.size} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-100">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      {order.shipping_address && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-100">Shipping Address</h2>
          <p className="text-sm text-gray-300">
            {order.shipping_address.firstName} {order.shipping_address.lastName}
            <br />
            {order.shipping_address.address}
            <br />
            {order.shipping_address.city}, {order.shipping_address.state}{' '}
            {order.shipping_address.zipcode}
          </p>
          <p className="text-sm mt-4 text-gray-300">
            <strong>Email:</strong> {order.email}
            <br />
            <strong>Phone:</strong> {order.phone}
          </p>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-100">What Happens Next?</h2>
        <ol className="space-y-3 text-sm text-gray-300">
          <li>
            <span className="font-semibold text-gray-100">1. Confirmation Email:</span> Check your
            email at {order.email} for order confirmation
          </li>
          <li>
            <span className="font-semibold text-gray-100">2. Processing:</span> Your order will be
            processed within 24 hours
          </li>
          <li>
            <span className="font-semibold text-gray-100">3. Shipping:</span> You&apos;ll receive a
            shipping confirmation with tracking details
          </li>
          <li>
            <span className="font-semibold text-gray-100">4. Delivery:</span> Orders typically arrive
            within 3-5 business days
          </li>
        </ol>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-gray-100 text-gray-950 px-8 py-3 rounded font-semibold hover:bg-white transition text-center"
        >
          Continue Shopping
        </Link>
        <a
          href={`mailto:${order.email}`}
          className="border border-gray-800 text-gray-100 px-8 py-3 rounded font-semibold hover:bg-gray-900 transition text-center"
        >
          Contact Support
        </a>
      </div>
    </main>
  )
}
