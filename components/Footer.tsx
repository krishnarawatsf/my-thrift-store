import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-20 border-t border-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-4">Thriftellc</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Trendy jackets, jerseys, and premium accessories.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/thriftellc.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-gray-950 transition text-lg"
              >
                📷
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-gray-950 transition text-lg"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">SHOP</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-100 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-gray-100 transition">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-100 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gray-100 transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/collections/new-drop" className="hover:text-gray-100 transition font-bold">
                  New drop
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-6">SUPPORT</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-gray-100 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6">LEGAL</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Contact Information
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Thriftellc
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>Payment methods</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="py-4 text-center text-sm text-gray-500">
        <p>Powered by Next.js</p>
      </div>
    </footer>
  )
}
