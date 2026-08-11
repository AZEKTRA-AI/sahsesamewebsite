import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageHero from '@/components/marketing/PageHero'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { getContent } from '@/lib/content/store'
import { blogHeroBlock, globalFeaturesBlock } from '@/lib/content/blocks'

// See app/(marketing)/page.tsx for why this exists on every content-driven page.
export const revalidate = 60

export const metadata = {
  title: 'Blog',
  description: 'Harvest updates, shipments, and news from Sain Abdul Hakim and Company.',
  alternates: { canonical: '/blog' },
}

export default async function BlogIndexPage() {
  const features = await getContent(globalFeaturesBlock)
  if (!features.blogEnabled) notFound()

  const [hero, posts] = await Promise.all([
    getContent(blogHeroBlock),
    prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
    }),
  ])

  return (
    <>
      <PageHero
        eyebrow={hero.tagline}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          {posts.length > 0 ? (
            <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {posts.map((post) => (
                <RevealItem key={post.id} className="h-full">
                  <SpotlightCard
                    as="article"
                    className="h-full overflow-hidden rounded-card border border-sah-gold/15 bg-white transition-[border-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/40 hover:shadow-lift"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block h-full transition-transform duration-200 ease-out-expo active:scale-[0.985]"
                    >
                      {post.coverImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.coverImageAlt || post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.07]"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {post.publishedAt && (
                          <p className="font-body text-xs uppercase tracking-[0.18em] text-sah-gold">
                            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                        <h2 className="mt-2 font-display text-lg italic leading-snug text-sah-charcoal transition-colors duration-200 group-hover:text-sah-gold">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="mt-2.5 font-body text-sm leading-relaxed text-sah-charcoal/65">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <div className="mx-auto max-w-md rounded-panel border border-sah-gold/15 bg-sah-light p-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-sah-gold/35">
                <span className="h-1.5 w-1.5 rounded-full bg-sah-gold" />
              </div>
              <h2 className="font-display text-xl italic text-sah-charcoal">Nothing published yet</h2>
              <p className="mt-3 font-body text-sm text-sah-charcoal/65">
                Check back soon for updates from the export desk.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
