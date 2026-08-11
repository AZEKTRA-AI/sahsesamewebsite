import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/marketing/ProductGallery'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { getContentMap } from '@/lib/content/store'
import { catalogCategoriesBlock, catalogProductCtaBlock } from '@/lib/content/blocks'
import JsonLd from '@/components/seo/JsonLd'
import { getSiteUrl } from '@/lib/site'

// See app/(marketing)/page.tsx for why this exists on every content-driven page.
// Combined with generateStaticParams below, this is ISR: statically built per
// product, then revalidated on the next request after 60s.
export const revalidate = 60

const infoCards = [
  {
    title: 'Quality assurance',
    description:
      'Batch lab analysis and third-party inspection by SGS or Intertek arranged on request.',
  },
  {
    title: 'Flexible packaging',
    description:
      '25 and 50 kg PP woven bags, kraft with liner, jumbo bags, or your own private-label artwork.',
  },
  {
    title: 'Global shipping',
    description:
      'FOB Karachi, CFR, and CIF, with full export documentation prepared for your destination.',
  },
]

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
  })
  if (!product) return { title: 'Not found' }

  const description = `${product.name} from ${product.origin || 'Pakistan'} — export-grade, packed and documented to contract specification.`
  const image = product.images[0]?.url

  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${product.category.slug}/${product.slug}` },
    openGraph: image ? { images: [{ url: image }] } : undefined,
  }
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ include: { category: true } })
  return products.map((product) => ({
    category: product.category.slug,
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
    },
  })

  if (!product || product.category.slug !== params.category) notFound()

  const [related, content] = await Promise.all([
    prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        status: 'PUBLISHED',
        NOT: { id: product.id },
      },
      orderBy: { sortOrder: 'asc' },
      take: 3,
      include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
    }),
    getContentMap({ categories: catalogCategoriesBlock, cta: catalogProductCtaBlock }),
  ])

  const specs = (product.specs as Record<string, unknown>) || {}
  const specEntries = Object.entries(specs)
  const fallbackImage =
    content.categories.items.find((item) => item.slug === product.category.slug)?.image ??
    content.categories.items[0].image

  const siteUrl = getSiteUrl()
  const categoryPath = `/products/${product.category.slug}`
  const productPath = `${categoryPath}/${product.slug}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.category.name, item: `${siteUrl}${categoryPath}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: `${siteUrl}${productPath}` },
    ],
  }

  // No price/offers — this is a B2B catalog, not a storefront, and Google
  // penalizes Product rich results that carry an Offer without real
  // availability/price data. Name, image, and brand are all that's true here.
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: `${product.name} from ${product.origin || 'Pakistan'} — export-grade, packed and documented to contract specification.`,
    image: product.images.length ? product.images.map((img) => img.url) : [fallbackImage],
    category: product.category.name,
    brand: { '@type': 'Brand', name: 'Sain Abdul Hakim and Company' },
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={productJsonLd} />
      {/* Breadcrumb bar */}
      <div className="border-b border-sah-gold/12 bg-sah-light">
        <nav aria-label="Breadcrumb" className="container-wide py-4">
          <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-xs text-sah-charcoal/55">
            <li>
              <Link href="/products" className="transition-colors duration-200 hover:text-sah-gold">
                Products
              </Link>
            </li>
            <li aria-hidden="true" className="h-1 w-1 rotate-45 bg-sah-gold/60" />
            <li>
              <Link
                href={`/products/${product.category.slug}`}
                className="transition-colors duration-200 hover:text-sah-gold"
              >
                {product.category.name}
              </Link>
            </li>
            <li aria-hidden="true" className="h-1 w-1 rotate-45 bg-sah-gold/60" />
            <li className="font-medium text-sah-gold">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Overview */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-wide grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6" duration={0.8}>
            <div className="lg:sticky lg:top-32">
              <ProductGallery
                images={product.images}
                productName={product.name}
                fallbackImage={fallbackImage}
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal blur={false} duration={0.6}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-sah-gold/60" />
                <p className="eyebrow">{product.category.name}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display-lg text-3xl text-sah-charcoal sm:text-4xl md:text-5xl">
                {product.name}
              </h1>
            </Reveal>

            {product.origin && (
              <Reveal delay={0.16}>
                <p className="mt-4 font-body text-sah-charcoal/65">
                  <span className="text-sah-charcoal/45">Origin — </span>
                  {product.origin}
                </p>
              </Reveal>
            )}

            {specEntries.length > 0 && (
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <h2 className="font-display text-lg italic text-sah-charcoal">
                    Specifications
                  </h2>
                  <dl className="mt-4 overflow-hidden rounded-card border border-sah-gold/15 bg-sah-light">
                    {specEntries.map(([key, value], idx) => (
                      <div
                        key={key}
                        className={`flex items-baseline justify-between gap-6 px-5 py-3.5 transition-colors duration-200 hover:bg-white ${
                          idx > 0 ? 'border-t border-sah-gold/12' : ''
                        }`}
                      >
                        <dt className="font-body text-sm capitalize text-sah-charcoal/60">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="tnum text-right font-body text-sm font-medium text-sah-charcoal">
                          {String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.28} blur={false}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-solid text-center">
                  Request quotation
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-sah-gold/45 px-7 py-3 font-body font-medium text-sah-gold transition-[background-color,border-color,transform] duration-200 ease-out-expo hover:border-sah-gold hover:bg-sah-gold/10 active:scale-[0.97]"
                >
                  Request a sample
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <p className="mt-5 font-body text-xs leading-relaxed text-sah-charcoal/45">
                Specifications shown are typical export ranges. Final contract values are
                agreed per lot and confirmed on the certificate of analysis.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Assurances */}
      <section className="border-y border-sah-gold/10 bg-sah-cream py-16 sm:py-20">
        <div className="container-wide">
          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.08}>
            {infoCards.map((card, idx) => (
              <RevealItem key={card.title} className="h-full">
                <SpotlightCard className="group h-full rounded-card border border-sah-gold/15 bg-white p-7 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/40">
                  <p className="tnum font-display text-3xl text-sah-gold/25 transition-colors duration-300 group-hover:text-sah-gold/50">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-4 font-display text-lg italic text-sah-charcoal">
                    {card.title}
                  </h2>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-sah-charcoal/65">
                    {card.description}
                  </p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-wide">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl italic text-sah-charcoal">
                Also in {product.category.name.toLowerCase()}
              </h2>
              <Link
                href={`/products/${product.category.slug}`}
                className="group inline-flex shrink-0 items-center gap-2 font-body text-sm font-medium text-sah-gold transition-colors duration-200 hover:text-sah-charcoal"
              >
                View all
                <svg
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-3" stagger={0.08}>
              {related.map((item) => (
                <RevealItem key={item.id} className="h-full">
                  <Link
                    href={`/products/${product.category.slug}/${item.slug}`}
                    className="group block h-full overflow-hidden rounded-card border border-sah-gold/15 transition-[border-color,transform] duration-300 ease-out-expo hover:border-sah-gold/40 active:scale-[0.985]"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={item.images[0]?.url || fallbackImage}
                        alt={item.images[0]?.alt || item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.07]"
                      />
                    </div>
                    <p className="p-5 font-display text-base italic text-sah-charcoal transition-colors duration-200 group-hover:text-sah-gold">
                      {item.name}
                    </p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <div className="bg-white pb-20 sm:pb-28">
        <PageCTA title={content.cta.title} subtitle={content.cta.subtitle} />
      </div>
    </>
  )
}
