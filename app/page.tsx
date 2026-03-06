import { supabase } from '@/lib/supabase'
import { HeroBanner } from '@/components/HeroBanner'
import { CollectionsGrid } from '@/components/CollectionsGrid'
import { ProductCard } from '@/components/ProductCard'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { NewsletterSection } from '@/components/NewsletterSection'
import { Footer } from '@/components/Footer'

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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-bold mb-4">
              ✨ TRENDING NOW
            </span>
            <h2 className="text-5xl font-black text-black mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">
              Latest arrivals in our premium collection. Shop authentic streetwear.
            </p>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 mb-4">No products available yet</p>
              <p className="text-lg text-gray-500">
                Check back soon for our latest collection
              </p>
              <a
                href="/collections"
                className="inline-block mt-6 bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition"
              >
                VIEW ALL COLLECTIONS
              </a>
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
