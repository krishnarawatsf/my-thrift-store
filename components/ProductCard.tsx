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
      className="group bg-white rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        {image !== 'https://via.placeholder.com/500' ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl mb-2 block">👕</span>
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          </div>
        )}
        
        {/* Stock Badge */}
        {stock === 0 ? (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <span className="text-white font-bold text-lg">SOLD OUT</span>
            </div>
          </div>
        ) : stock < 5 ? (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            LIMITED STOCK
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            IN STOCK
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">
          {category}
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-black transition">
          {name}
        </h3>
        
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-black text-black">
            ₹{price.toLocaleString('en-IN')}
          </div>
          <button className="text-xs font-bold text-white bg-black px-3 py-2 rounded-lg hover:bg-gray-800 transition opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-2 transition-all">
            ADD
          </button>
        </div>

        {/* Stock Info */}
        {stock > 0 && stock < 10 && (
          <p className="text-xs text-red-500 font-semibold mt-2">
            Only {stock} left in stock
          </p>
        )}
      </div>
    </a>
  )
}
