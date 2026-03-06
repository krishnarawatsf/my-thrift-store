import type { Metadata } from 'next'
import { CartDrawer } from '@/components/CartDrawer'
import './globals.css'

export const metadata: Metadata = {
  title: 'ThriftStore - Premium Thrift & Streetwear',
  description: 'Curated thrift and streetwear collection from around the world.',
  openGraph: {
    title: 'ThriftStore',
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
        <header className="sticky top-0 z-40 bg-white border-b">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              ThriftStore
            </a>
            <div className="flex items-center gap-6">
              <a href="/collections/jackets" className="text-sm hover:text-gray-600 transition">
                Shop
              </a>
              <a href="/admin" className="text-sm hover:text-gray-600 transition">
                Admin
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <div className="min-h-screen bg-white">
          {children}
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">ThriftStore</h3>
                <p className="text-gray-400 text-sm">
                  Premium curated thrift and streetwear collection from around the world.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/collections/jackets" className="hover:text-white transition">Jackets</a></li>
                  <li><a href="/collections/jerseys" className="hover:text-white transition">Jerseys</a></li>
                  <li><a href="/collections/shirts" className="hover:text-white transition">Shirts</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Help</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Shipping</a></li>
                  <li><a href="#" className="hover:text-white transition">Returns</a></li>
                  <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-sm text-gray-400">
                  support@thriftstore.in
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2026 ThriftStore. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Cart Drawer */}
        <CartDrawer />
      </body>
    </html>
  )
}
