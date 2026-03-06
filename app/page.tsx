import { supabase } from '@/lib/supabase'

export default async function HomePage() {
  // Fetch products for homepage
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(6)

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-black text-white py-32 px-6 text-center">
        <h1 className="text-6xl font-bold mb-4">ThriftStore</h1>
        <p className="text-xl text-gray-300">Premium curated thrift & streetwear</p>
      </section>

      {/* Collections */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {['Jackets', 'Jerseys', 'Shirts', 'Caps', 'Bottoms', 'Accessories'].map((cat) => (
            <a
              key={cat}
              href={`/collections/${cat.toLowerCase()}`}
              className="bg-gray-100 h-40 rounded-lg flex items-center justify-center hover:bg-gray-200 transition"
            >
              <span className="font-semibold">{cat}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products?.map((product: any) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {product.images?.[0] && (
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
