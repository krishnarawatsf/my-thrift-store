import { supabase } from '@/lib/supabase'
import { CollectionsGrid } from '@/components/CollectionsGrid'
import Link from 'next/link'

const LOCAL_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Crect width='800' height='800' fill='%23111827'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff' font-family='Arial' font-size='54' text-anchor='middle' dominant-baseline='middle'%3EThriftELLC%3C/text%3E%3C/svg%3E"

const toSafeImage = (url?: string | null) =>
  !url || url.includes('via.placeholder.com') ? LOCAL_PLACEHOLDER : url

const fallbackCollections = [
  { name: 'Jackets', slug: 'jackets', image: LOCAL_PLACEHOLDER },
  { name: 'Jerseys', slug: 'jerseys', image: LOCAL_PLACEHOLDER },
  { name: 'Shirts', slug: 'shirts', image: LOCAL_PLACEHOLDER },
]

export default async function CollectionsPage() {
  const { data: categories } = await supabase.from('categories').select('*')

  const collectionsData = (categories || []).map((cat: any) => ({
    name: cat.name,
    slug: cat.slug,
    image: toSafeImage(cat.image_url),
  }))

  const safeCollections = collectionsData.length > 0 ? collectionsData : fallbackCollections

  return (
    <main>
      <section className="bg-gradient-to-r from-gray-900 to-gray-950 text-white py-16 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black mb-3">Collections</h1>
          <p className="text-gray-300 max-w-2xl">
            Browse all categories in our premium thrift & streetwear collection.
          </p>
          <div className="mt-6">
            <Link href="/" className="text-sm font-semibold underline underline-offset-4 text-gray-400 hover:text-gray-100 transition">
              ← Back to home
            </Link>
          </div>
        </div>
      </section>

      <CollectionsGrid collections={safeCollections} />
    </main>
  )
}

