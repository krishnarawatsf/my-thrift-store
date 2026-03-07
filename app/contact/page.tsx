import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-gray-100">Contact</h1>
          <p className="text-gray-400 text-lg mb-10">
            Reach out for order support, sizing questions, or collaborations.
          </p>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-gray-800 p-6 bg-gray-900">
              <h2 className="text-xl font-black mb-2 text-gray-100">Instagram</h2>
              <p className="text-gray-400 mb-3">@thriftellc.in</p>
              <a
                href="https://instagram.com/thriftellc.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex font-semibold underline underline-offset-4 text-gray-300 hover:text-gray-100 transition"
              >
                Message us on Instagram →
              </a>
            </div>

            <div className="rounded-2xl border border-gray-800 p-6 bg-gray-900">
              <h2 className="text-xl font-black mb-2 text-gray-100">Email</h2>
              <p className="text-gray-400 mb-3">support@thriftellc.in</p>
              <a
                href="mailto:support@thriftellc.in"
                className="inline-flex font-semibold underline underline-offset-4 text-gray-300 hover:text-gray-100 transition"
              >
                Send an email →
              </a>
            </div>

            <div className="pt-4">
              <Link href="/" className="font-semibold underline underline-offset-4 text-gray-400 hover:text-gray-100 transition">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

