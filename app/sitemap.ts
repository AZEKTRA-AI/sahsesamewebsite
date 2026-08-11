import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { getSiteUrl } from '@/lib/site'
import { getContent } from '@/lib/content/store'
import { globalFeaturesBlock } from '@/lib/content/blocks'

// Crawlers hit this rarely enough that an hourly cache is plenty fresh
// without querying the DB on every request.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/quality-process`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/packaging-logistics`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const [categories, products, features] = await Promise.all([
    prisma.category.findMany(),
    prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      include: { category: true },
    }),
    getContent(globalFeaturesBlock),
  ])

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/products/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/products/${product.category.slug}/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  let blogRoutes: MetadataRoute.Sitemap = []
  if (features.blogEnabled) {
    const posts = await prisma.blogPost.findMany({ where: { status: 'PUBLISHED' } })
    blogRoutes = [
      { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
      ...posts.map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'yearly' as const,
        priority: 0.5,
      })),
    ]
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes]
}
