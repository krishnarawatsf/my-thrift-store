'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  stock,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative bg-gray-800 aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        {image && !image.includes('via.placeholder.com') ? (
          <Image
            src={image}
            alt={name}
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          </div>
        )}
        
        {/* Stock Badge */}
        {stock === 0 ? (
          <div className="absolute inset-0 bg-gray-950 bg-opacity-80 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <span className="text-gray-100 font-bold text-lg">SOLD OUT</span>
            </div>
          </div>
        ) : stock < 5 ? (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            LIMITED STOCK
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            IN STOCK
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">
          {category}
        </p>
        
        <h3 className="text-lg font-bold text-gray-100 mb-3 line-clamp-2 group-hover:text-white transition">
          {name}
        </h3>
        
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-black text-gray-100">
            ₹{price.toLocaleString('en-IN')}
          </div>
          <span className="text-xs font-bold text-gray-950 bg-gray-100 px-3 py-2 rounded-lg hover:bg-white transition opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-2 transition-all">
            ADD
          </span>
        </div>

        {/* Stock Info */}
        {stock > 0 && stock < 10 && (
          <p className="text-xs text-red-400 font-semibold mt-2">
            Only {stock} left in stock
          </p>
        )}
      </div>
    </Link>
  )
}
