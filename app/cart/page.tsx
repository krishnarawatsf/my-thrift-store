'use client'

import { useCart } from '@/lib/store'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-gray-950 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-100">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-12">Your cart is empty</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="mb-8">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex items-center gap-4 py-4 border-b border-gray-800"
              >
                <div className="bg-gray-900 w-24 h-24 rounded flex-shrink-0 border border-gray-800"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-100">{item.name}</h3>
                  <p className="text-gray-400">Size: {item.size}</p>
                  <p className="font-semibold text-gray-100">₹{item.price}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, item.size, parseInt(e.target.value))
                  }
                  className="w-16 border border-gray-800 rounded px-2 py-1 bg-gray-900 text-gray-100"
                  aria-label="Item quantity"
                />
                <button
                  onClick={() => removeItem(item.id, item.size)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded mb-6">
            <div className="flex justify-between items-center text-xl font-bold text-gray-100">
              <span>Total:</span>
              <span>₹{total()}</span>
            </div>
          </div>

          {/* Checkout */}
          <button className="w-full bg-gray-100 text-gray-950 py-3 rounded font-semibold hover:bg-white transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </main>
  )
}
