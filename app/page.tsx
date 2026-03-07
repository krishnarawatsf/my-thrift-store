import { supabase } from '@/lib/supabase'
import { HeroBanner } from '@/components/HeroBanner'
import { CollectionsGrid } from '@/components/CollectionsGrid'
import { ProductCard } from '@/components/ProductCard'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { NewsletterSection } from '@/components/NewsletterSection'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

const LOCAL_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Crect width='800' height='800' fill='%23111827'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff' font-family='Arial' font-size='54' text-anchor='middle' dominant-baseline='middle'%3EThriftELLC%3C/text%3E%3C/svg%3E"

const toSafeImage = (url?: string | null) =>
  !url || url.includes('via.placeholder.com') ? LOCAL_PLACEHOLDER : url

const fallbackCollections = [
  { name: 'Jackets', slug: 'jackets', image: LOCAL_PLACEHOLDER },
  { name: 'Shirts', slug: 'shirts', image: LOCAL_PLACEHOLDER },
  { name: 'Accessories', slug: 'accessories', image: LOCAL_PLACEHOLDER },
]

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
    image: toSafeImage(cat.image_url),
  }))

  const safeCollections = collectionsData.length > 0 ? collectionsData : fallbackCollections

  return (
    <main>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Collections */}
      <CollectionsGrid collections={safeCollections} />

      {/* Featured Products */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-100">Featured products</h2>
              <p className="text-gray-400 mt-2">Latest arrivals from the drop.</p>
            </div>
            <Link
              href="/collections"
              className="hidden sm:inline-flex text-sm font-semibold underline underline-offset-4 text-gray-400 hover:text-gray-100 transition"
            >
              View all
            </Link>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-400 mb-4">No products available yet</p>
              <p className="text-lg text-gray-500">
                Check back soon for our latest collection
              </p>
              <Link
                href="/collections"
                className="inline-block mt-6 bg-gray-100 text-gray-950 px-8 py-3 rounded-full font-black hover:bg-white transition"
              >
                View all
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
