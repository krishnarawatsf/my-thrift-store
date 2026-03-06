'use client'

import { useCart } from '@/lib/store'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Your cart is empty</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="mb-8">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex items-center gap-4 py-4 border-b"
              >
                <div className="bg-gray-100 w-24 h-24 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, item.size, parseInt(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />
                <button
                  onClick={() => removeItem(item.id, item.size)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-6 rounded mb-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>₹{total()}</span>
            </div>
          </div>

          {/* Checkout */}
          <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </main>
  )
}
