import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function OrderConfirmationPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!order) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Success Message */}
      <div className="text-center mb-12">
        <div className="mb-6 text-6xl">✓</div>
        <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 text-lg">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="font-semibold text-gray-600 text-sm mb-2">Order Number</h2>
            <p className="text-2xl font-bold font-mono">{order.id}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-600 text-sm mb-2">Order Date</h2>
            <p className="text-2xl">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-600 text-sm mb-2">Order Status</h2>
            <p className="text-lg font-semibold text-yellow-600 uppercase">
              {order.status}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-600 text-sm mb-2">Total Amount</h2>
            <p className="text-2xl font-bold">₹{order.total}</p>
          </div>
        </div>

        {/* Items */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
          <div className="space-y-3">
            {order.items?.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between py-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {item.size} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      {order.shipping_address && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
          <p className="text-sm">
            {order.shipping_address.firstName} {order.shipping_address.lastName}
            <br />
            {order.shipping_address.address}
            <br />
            {order.shipping_address.city}, {order.shipping_address.state}{' '}
            {order.shipping_address.zipcode}
          </p>
          <p className="text-sm mt-4">
            <strong>Email:</strong> {order.email}
            <br />
            <strong>Phone:</strong> {order.phone}
          </p>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">What Happens Next?</h2>
        <ol className="space-y-3 text-sm">
          <li>
            <span className="font-semibold">1. Confirmation Email:</span> Check your
            email at {order.email} for order confirmation
          </li>
          <li>
            <span className="font-semibold">2. Processing:</span> Your order will be
            processed within 24 hours
          </li>
          <li>
            <span className="font-semibold">3. Shipping:</span> You'll receive a
            shipping confirmation with tracking details
          </li>
          <li>
            <span className="font-semibold">4. Delivery:</span> Orders typically arrive
            within 3-5 business days
          </li>
        </ol>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition text-center"
        >
          Continue Shopping
        </Link>
        <a
          href={`mailto:${order.email}`}
          className="border border-black text-black px-8 py-3 rounded font-semibold hover:bg-gray-100 transition text-center"
        >
          Contact Support
        </a>
      </div>
    </main>
  )
}
