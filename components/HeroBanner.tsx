export function HeroBanner() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white py-3 overflow-hidden">
        <div className="animate-pulse text-center text-sm md:text-base font-semibold">
          🎉 FREE SHIPPING ON ALL PREPAID ORDERS!
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-40 px-6 relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-black opacity-40" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-white bg-opacity-10 rounded-full">
            <span className="text-sm font-semibold text-white">✨ THRIFTELLC COLLECTION</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight animate-fade-in">
            Premium Thrift & Streetwear
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Curated vintage jackets, jerseys, and premium accessories. Every piece tells a story.
            Shop authentic streetwear that stands out.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/collections"
              className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              SHOP NOW
            </a>
            <a
              href="#collections"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              EXPLORE COLLECTIONS
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto text-sm">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">✅</span>
              <span>Premium Quality</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🔄</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
