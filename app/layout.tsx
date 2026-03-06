import type { Metadata } from 'next'
import { CartDrawer } from '@/components/CartDrawer'
import './globals.css'

export const metadata: Metadata = {
  title: 'ThriftELLC - Premium Thrift & Streetwear',
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
    <html lang="en">
      <body className="bg-white text-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-black text-black hover:text-gray-800 transition">
              THRIFTELLC
            </a>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="/collections" className="font-semibold text-sm hover:text-gray-600 transition">
                COLLECTIONS
              </a>
              <a href="/new-drop" className="font-semibold text-sm hover:text-gray-600 transition text-green-600">
                NEW DROP ✨
              </a>
              <a href="/admin" className="font-semibold text-sm hover:text-gray-600 transition">
                ADMIN
              </a>
            </div>

            {/* Cart Icon */}
            <CartDrawer />
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  )
}
