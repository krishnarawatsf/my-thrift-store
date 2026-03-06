interface CollectionsGridProps {
  collections: Array<{ name: string; slug: string; image: string }>
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <section className="py-16 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {collections.map((collection) => (
          <a
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group relative overflow-hidden rounded-lg h-64 cursor-pointer"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 group-hover:from-gray-500 group-hover:to-gray-700 transition-all duration-300" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                {collection.name}
              </h3>
              <p className="text-sm opacity-90">Explore Collection →</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
