export function NewsletterSection() {
  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 px-6 my-20 border-y border-gray-800">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-4">GET 10% OFF</h2>
        <p className="text-xl text-gray-300 mb-8">
          Subscribe to our newsletter for exclusive offers, new arrivals, and insider drops.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-4 rounded-lg bg-gray-950 text-gray-100 border border-gray-700 font-semibold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          />
          <button
            type="submit"
            className="bg-gray-100 text-gray-950 px-8 py-4 rounded-lg font-bold hover:bg-white transition transform hover:scale-105 whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6">
          Use code <span className="font-bold text-white">ELLC10</span> for 10% off your first order
        </p>
      </div>
    </section>
  )
}
