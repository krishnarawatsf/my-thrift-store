import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-green-600 mb-4">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Size</label>
            <select className="w-full border rounded px-3 py-2">
              {product.sizes?.map((size: string) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition">
            Add to Cart
          </button>

          {/* Stock Info */}
          <p className="text-sm text-gray-500 mt-4">
            {product.stock} items in stock
          </p>
        </div>
      </div>
    </main>
  )
}
