'use client'

import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-gray-100">500</h1>
            <p className="text-2xl font-semibold text-gray-200 mt-4">Server Error</p>
            <p className="text-gray-400 mt-2 mb-8">
              An unexpected server error occurred. Our team has been notified.
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500 mb-4">Error ID: {error.digest}</p>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-gray-100 text-gray-950 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
