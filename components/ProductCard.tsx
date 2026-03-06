'use client'

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
    <a
      href={`/products/${id}`}
      className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden">
        {image !== 'https://via.placeholder.com/500' ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        
        {/* Stock Badge */}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {category}
        </p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-black">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-green-600">₹{price}</p>
          {stock > 0 && (
            <p className="text-xs text-gray-500">{stock} in stock</p>
          )}
        </div>
      </div>
    </a>
  )
}
