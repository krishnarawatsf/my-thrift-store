import { supabase } from '@/lib/supabase'
import { ProductCard } from '@/components/ProductCard'

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // Fetch category
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  // Fetch products in category
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', slug)
    .order('created_at', { ascending: false })

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2 capitalize">{category?.name || slug}</h1>
          <p className="text-gray-300">
            Explore our collection of {category?.name?.toLowerCase()}
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar (Optional) */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              {products?.length || 0} products
            </p>
            <select className="border rounded px-4 py-2 text-sm">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>

          {/* Products Grid */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images?.[0] || 'https://via.placeholder.com/500'}
                  category={product.category}
                  stock={product.stock}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 mb-4 text-lg">No products found in this category</p>
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Continue Shopping →
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
