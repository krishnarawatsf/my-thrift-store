'use client'

import { useCart } from '@/lib/store'
import { X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeItem, updateQuantity, total } = useCart()

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition z-40"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Container */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 pb-4 border-b"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm" title={item.name}>
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600">Size: {item.size}</p>
                      <p className="font-semibold text-green-600">₹{item.price}</p>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-red-600 hover:text-red-800 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gray-50 p-4 rounded mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold">₹{total()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-semibold text-lg">Total:</span>
                  <span className="font-bold text-xl">₹{total()}</span>
                </div>
              </div>

              {/* Checkout */}
              <Link
                href="/checkout"
                className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition block text-center mb-2"
                onClick={() => setIsOpen(false)}
              >
                Checkout
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full border border-gray-300 text-black py-3 rounded font-semibold hover:bg-gray-50 transition"
              >
                Continue Shopping
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
