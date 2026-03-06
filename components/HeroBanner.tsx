export function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-black to-gray-800 text-white py-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          Premium Thrift & Streetwear
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Curated vintage and streetwear collection from around the world. 
          Find authentic pieces that tell a story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/collections/jackets"
            className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </a>
          <a
            href="#collections"
            className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-black transition"
          >
            Browse Collections
          </a>
        </div>
      </div>
    </section>
  )
}
