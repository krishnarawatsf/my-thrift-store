import { MetadataRoute } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thrift-store.vercel.app'
  const supabase = createServerSupabaseClient()

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Fetch categories for dynamic routes
  const { data: categories } = await supabase
    .from('categories')
    .select('slug, created_at')
    .order('created_at', { ascending: false })

  const categoryRoutes = (categories || []).map((category) => ({
    url: `${baseUrl}/collections/${category.slug}`,
    lastModified: new Date(category.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fetch products for dynamic routes
  const { data: products } = await supabase
    .from('products')
    .select('id, created_at')
    .order('created_at', { ascending: false })
    .limit(1000) // Limit to prevent huge sitemaps

  const productRoutes = (products || []).map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(product.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...categoryRoutes, ...productRoutes]
}

// Revalidate every 24 hours
export const revalidate = 86400
