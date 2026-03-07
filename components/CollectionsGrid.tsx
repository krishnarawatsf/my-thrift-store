import Link from 'next/link'

interface CollectionsGridProps {
  collections: Array<{ name: string; slug: string; image: string }>
  title?: string
}

export function CollectionsGrid({
  collections,
  title = 'Collections',
}: CollectionsGridProps) {
  return (
    <section className="py-16 px-6 bg-gray-950" id="collections">
      <div className="max-w-7xl mx-auto flex items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-100">{title}</h2>
        <Link
          href="/collections"
          className="text-sm font-semibold underline underline-offset-4 text-gray-400 hover:text-gray-100 transition"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group relative overflow-hidden rounded-2xl h-64 md:h-72 cursor-pointer border border-gray-800 bg-gray-900"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${collection.image})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-950/50 group-hover:bg-gray-950/60 transition-colors duration-300" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
              <h3 className="text-3xl font-black mb-2 group-hover:scale-105 transition-transform duration-300">
                {collection.name}
              </h3>
              <p className="text-sm opacity-90 font-semibold">Explore →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
