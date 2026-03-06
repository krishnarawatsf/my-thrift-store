import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ThriftStore - Premium Thrift & Streetwear',
  description: 'Curated thrift and streetwear collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}
