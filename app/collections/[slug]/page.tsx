import { supabase } from '@/lib/supabase'
import { ProductCard } from '@/components/ProductCard'
import Link from 'next/link'

const LOCAL_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Crect width='800' height='800' fill='%23111827'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff' font-family='Arial' font-size='54' text-anchor='middle' dominant-baseline='middle'%3EThriftELLC%3C/text%3E%3C/svg%3E"

const toSafeImage = (url?: string | null) =>
  !url || url.includes('via.placeholder.com') ? LOCAL_PLACEHOLDER : url

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

  const categoryCandidates = Array.from(
    new Set([
      slug,
      slug.replace(/-/g, ' '),
      category?.slug,
      category?.name,
      category?.name?.toLowerCase(),
    ].filter(Boolean))
  ) as string[]

  // Fetch products in category; tolerate datasets that store either slug or category name.
  const { data: categoryProducts } = await supabase
    .from('products')
    .select('*')
    .in('category', categoryCandidates)
    .order('created_at', { ascending: false })

  // Fallback to latest products so collection pages are never dead ends.
  const { data: fallbackProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8)

  const products = categoryProducts && categoryProducts.length > 0 ? categoryProducts : fallbackProducts

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2 capitalize">{category?.name || slug}</h1>
          <p className="text-gray-300">
            Explore our collection of {category?.name?.toLowerCase()}
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar (Optional) */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-400">
              {products?.length || 0} products
            </p>
            <select className="border border-gray-800 bg-gray-900 text-gray-100 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700" aria-label="Sort products">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>

          {/* Products Grid */}
          {products && products.length > 0 ? (
            <>
              {(!categoryProducts || categoryProducts.length === 0) && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-4 py-3 mb-6">
                  No exact matches for this collection yet. Showing latest arrivals instead.
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={toSafeImage(product.images?.[0])}
                    category={product.category}
                    stock={product.stock}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4 text-lg">No products found in this category</p>
              <Link href="/" className="text-gray-300 hover:text-gray-100 transition">
                Continue Shopping →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
