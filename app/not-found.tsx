import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-100">404</h1>
        <p className="text-2xl font-semibold text-gray-200 mt-4">Page Not Found</p>
        <p className="text-gray-400 mt-2 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-950 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Go Home
          </Link>
          <Link
            href="/collections"
            className="px-6 py-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </div>
  )
}
