import { supabase } from '@/lib/supabase'

export default async function CollectionPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', params.slug)

  return (
    <main>
      {/* Header */}
      <section className="bg-gray-100 py-8 px-6">
        <h1 className="text-4xl font-bold capitalize text-center">{params.slug}</h1>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products?.map((product: any) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <span className="text-gray-400">Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-green-600 font-semibold">₹{product.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
