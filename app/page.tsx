import { supabase } from '@/lib/supabase'
import { HeroBanner } from '@/components/HeroBanner'
import { CollectionsGrid } from '@/components/CollectionsGrid'
import { ProductCard } from '@/components/ProductCard'

export default async function HomePage() {
  // Fetch featured products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(6)

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')

  const collectionsData = (categories || []).map((cat: any) => ({
    name: cat.name,
    slug: cat.slug,
    image: cat.image_url || 'https://via.placeholder.com/500',
  }))

  return (
    <main>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Collections */}
      <CollectionsGrid collections={collectionsData} />

      {/* Featured Products */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Latest arrivals in our collection</p>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products available yet</p>
              <p className="text-sm text-gray-500">Check back soon for our latest collection</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
