import type { Metadata } from 'next'
import { CartDrawer } from '@/components/CartDrawer'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ThriftELLC - Premium Thrift and Streetwear',
  description: 'Curated vintage and streetwear collection. Shop authentic jackets, jerseys, and accessories.',
  openGraph: {
    title: 'ThriftELLC',
    description: 'Premium thrift & streetwear collection',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="dark">
      <body className="bg-gray-950 text-gray-100">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-black text-gray-100 hover:text-white transition">
                ThriftELLC
              </Link>
            
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="font-semibold text-sm text-gray-300 hover:text-white transition">
                  Home
                </Link>
                <Link href="/collections" className="font-semibold text-sm text-gray-300 hover:text-white transition">
                  Catalog
                </Link>
                <Link href="/contact" className="font-semibold text-sm text-gray-300 hover:text-white transition">
                  Contact
                </Link>
              </div>
            </div>

            {/* Cart Icon */}
            <CartDrawer />
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-screen bg-gray-950">
          {children}
        </main>
      </body>
    </html>
  )
}
