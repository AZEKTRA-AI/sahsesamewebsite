import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/seo/JsonLd'
import { getContent } from '@/lib/content/store'
import { globalFeaturesBlock, catalogCtaBlock } from '@/lib/content/blocks'
import { getSiteUrl } from '@/lib/site'

// See app/(marketing)/page.tsx for why this exists on every content-driven page.
export const revalidate = 60

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  })
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const features = await getContent(globalFeaturesBlock)
  if (!features.blogEnabled) return { title: 'Not found' }

  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
  if (!post || post.status !== 'PUBLISHED') return { title: 'Not found' }

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: post.coverImage ? { images: [{ url: post.coverImage }] } : undefined,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const features = await getContent(globalFeaturesBlock)
  if (!features.blogEnabled) notFound()

  const [post, cta] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug: params.slug } }),
    getContent(catalogCtaBlock),
  ])

  if (!post || post.status !== 'PUBLISHED') notFound()

  const paragraphs = post.content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const siteUrl = getSiteUrl()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Organization', name: 'Sain Abdul Hakim and Company' },
    publisher: { '@type': 'Organization', name: 'Sain Abdul Hakim and Company' },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />

      {/* Breadcrumb bar */}
      <div className="border-b border-sah-gold/12 bg-sah-light">
        <nav aria-label="Breadcrumb" className="container-wide py-4">
          <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-xs text-sah-charcoal/55">
            <li>
              <Link href="/blog" className="transition-colors duration-200 hover:text-sah-gold">
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="h-1 w-1 rotate-45 bg-sah-gold/60" />
            <li className="font-medium text-sah-gold">{post.title}</li>
          </ol>
        </nav>
      </div>

      <article className="bg-white py-14 sm:py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl">
            <Reveal blur={false} duration={0.6}>
              {post.publishedAt && (
                <p className="font-body text-xs uppercase tracking-[0.2em] text-sah-gold">
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              )}
              <h1 className="mt-3 display-lg text-3xl text-sah-charcoal sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
            </Reveal>

            {post.coverImage && (
              <Reveal delay={0.1}>
                <div className="relative mt-10 h-64 overflow-hidden rounded-panel shadow-lift-lg sm:h-96">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 42rem"
                    className="object-cover"
                    priority
                  />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <div className="mt-10 space-y-5 font-body text-base leading-relaxed text-sah-charcoal/80 sm:text-lg">
                {paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <div className="bg-sah-cream py-16 sm:py-20">
        <PageCTA title={cta.title} subtitle={cta.subtitle} primaryLabel={cta.primaryLabel} />
      </div>
    </>
  )
}
