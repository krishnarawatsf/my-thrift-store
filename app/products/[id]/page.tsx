'use client'

import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/store'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error || !data) {
          notFound()
        }

        setProduct(data)
        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0])
        }
      } catch (err) {
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product || !selectedSize) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || 'https://via.placeholder.com/500',
      size: selectedSize,
      quantity,
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {product.images?.[0] && product.images[0] !== 'https://via.placeholder.com/500' ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No Image Available</span>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img: string, idx: number) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded overflow-hidden">
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-green-600">₹{product.price}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">
              Select Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-4 border rounded font-medium transition ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded font-semibold mb-4 transition ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
          </button>

          {/* Stock Info */}
          <div className="text-sm text-gray-600">
            {product.stock > 0 ? (
              <p>✓ {product.stock} in stock</p>
            ) : (
              <p className="text-red-600">Out of stock</p>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Shipping</h3>
              <p className="text-sm text-gray-600">
                Free shipping on orders above ₹2000. Orders typically arrive in 3-5 business days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Returns</h3>
              <p className="text-sm text-gray-600">
                Not satisfied? Return within 14 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
