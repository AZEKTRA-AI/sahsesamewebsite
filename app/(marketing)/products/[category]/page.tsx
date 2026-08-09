import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { getContent } from '@/lib/content/store'
import { catalogCategoriesBlock } from '@/lib/content/blocks'

async function getCategoryContent(slug: string) {
  const catalog = await getContent(catalogCategoriesBlock)
  return catalog.items.find((item) => item.slug === slug) ?? catalog.items[0]
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.category } })
  if (!category) return { title: 'Not found' }

  const copy = await getCategoryContent(category.slug)

  return {
    title: category.name,
    description: copy?.description ?? `Export-grade ${category.name.toLowerCase()} from Pakistan.`,
  }
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany()
  return categories.map((cat) => ({ category: cat.slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = await prisma.category.findUnique({
    where: { slug: params.category },
    include: {
      products: {
        where: { status: 'PUBLISHED' },
        orderBy: { sortOrder: 'asc' },
        include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
      },
    },
  })

  if (!category) notFound()

  const copy = await getCategoryContent(category.slug)
  const heroImage = copy?.image ?? catalogCategoriesBlock.defaults.items[0].image

  return (
    <>
      <PageHero
        eyebrow="Product category"
        title={category.name}
        subtitle={copy?.description ?? `Export-grade ${category.name.toLowerCase()} sourced from Pakistan's agricultural heartland.`}
        image={heroImage}
        imageAlt={copy?.imageAlt || category.name}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category.name },
        ]}
      />

      {category.products.length > 0 ? (
        <section className="bg-white py-20 sm:py-28">
          <div className="container-wide">
            <div className="mb-10 flex items-baseline justify-between gap-4 sm:mb-14">
              <h2 className="font-display text-2xl italic text-sah-charcoal sm:text-3xl">
                The {category.name.toLowerCase()} range
              </h2>
              <p className="tnum shrink-0 font-body text-sm text-sah-charcoal/50">
                {category.products.length} product
                {category.products.length !== 1 ? 's' : ''}
              </p>
            </div>

            <RevealGroup
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.07}
            >
              {category.products.map((product, idx) => (
                <RevealItem key={product.id} className="h-full">
                  <SpotlightCard
                    as="article"
                    className="h-full overflow-hidden rounded-card border border-sah-gold/15 bg-white transition-[border-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/40 hover:shadow-lift"
                  >
                    <Link
                      href={`/products/${category.slug}/${product.slug}`}
                      className="group block h-full transition-transform duration-200 ease-out-expo active:scale-[0.985]"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={product.images[0]?.url || heroImage}
                          alt={product.images[0]?.alt || product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.07]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-sah-earth/55 via-transparent to-transparent"
                        />
                        <span
                          aria-hidden="true"
                          className="tnum absolute left-4 top-4 font-display text-lg text-white/60"
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="p-6">
                        <h3 className="font-display text-lg italic leading-snug text-sah-charcoal transition-colors duration-200 group-hover:text-sah-gold">
                          {product.name}
                        </h3>
                        {product.origin && (
                          <p className="mt-1.5 font-body text-sm text-sah-charcoal/60">
                            {product.origin}
                          </p>
                        )}
                        <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-sah-gold">
                          Specifications
                          <svg
                            className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14M13 6l6 6-6 6"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : (
        <section className="bg-white py-20 sm:py-28">
          <div className="container-wide">
            <div className="mx-auto max-w-md rounded-panel border border-sah-gold/15 bg-sah-light p-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-sah-gold/35">
                <span className="h-1.5 w-1.5 rounded-full bg-sah-gold" />
              </div>
              <h2 className="font-display text-xl italic text-sah-charcoal">
                Nothing listed here yet
              </h2>
              <p className="mt-3 font-body text-sm text-sah-charcoal/65">
                We are still preparing the {category.name.toLowerCase()} listings. Tell us
                what you need and we will quote against your specification directly.
              </p>
              <Link href="/contact" className="btn-solid mt-7">
                Send an enquiry
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="bg-white pb-20 sm:pb-28">
        <PageCTA
          title={`Interested in ${category.name.toLowerCase()}?`}
          subtitle="Request a detailed quotation, a certificate of analysis, or a sample before you contract."
        />
      </div>
    </>
  )
}
