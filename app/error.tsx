'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-100">Oops!</h1>
        <p className="text-2xl font-semibold text-gray-200 mt-4">Something went wrong</p>
        <p className="text-gray-400 mt-2 mb-8">
          We&apos;re sorry, but something unexpected happened. Please try again.
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
  )
}
