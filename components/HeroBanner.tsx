import Link from 'next/link'

export function HeroBanner() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gray-900 text-gray-100 py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm font-semibold tracking-wide">
          10% OFF — USE CODE <span className="font-black text-white">&quot;ELLC10&quot;</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 py-16 md:py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
          
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
              Thriftellc
            </h1>
          
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Trendy jackets, jerseys, and premium accessories. Style should be affordable,
              comfortable, and bold — just like you.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#collections"
                className="bg-gray-100 text-gray-950 px-10 py-4 rounded-full font-black text-lg hover:bg-white transition"
              >
                Explore Now
              </Link>
              <Link
                href="/collections"
                className="border border-gray-100 text-gray-100 px-10 py-4 rounded-full font-black text-lg hover:bg-gray-100 hover:text-gray-950 transition"
              >
                View all
              </Link>
            </div>

            {/* Badges */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-200 w-full max-w-3xl">
              <div className="rounded-2xl border border-gray-800 bg-gray-900 px-5 py-4 font-semibold">
                ✅ Premium Quality
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900 px-5 py-4 font-semibold">
                🚚 Free Prepaid Shipping
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold">
                📦 Trendy Styles Weekly
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
