export function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-4">THRIFTELLC</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium thrift & streetwear collection. Every piece tells a story. Shop authentic vintage and modern classics.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/thriftellc.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-lg"
              >
                📷
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-lg"
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
                <a href="/collections" className="hover:text-white transition">
                  All Collections
                </a>
              </li>
              <li>
                <a href="/collections/jackets" className="hover:text-white transition">
                  Jackets
                </a>
              </li>
              <li>
                <a href="/collections/jerseys" className="hover:text-white transition">
                  Jerseys
                </a>
              </li>
              <li>
                <a href="/collections/accessories" className="hover:text-white transition">
                  Accessories
                </a>
              </li>
              <li>
                <a href="/collections/new-drop" className="hover:text-white transition font-bold text-green-400">
                  NEW DROPS ✨
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-6">SUPPORT</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
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
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Information
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 ThriftELLC. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>💳 Secure Payments</span>
              <span>🔒 100% Safe</span>
              <span>🚚 Free Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gray-900 py-4 text-center text-sm text-gray-400">
        <p>⭐ Shop with confidence - THRIFTELLC is your destination for premium streetwear</p>
      </div>
    </footer>
  )
}
