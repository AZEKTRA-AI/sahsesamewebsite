import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/marketing/ProductGallery'
import PageCTA from '@/components/marketing/PageCTA'

const categoryImages: Record<string, string> = {
  sesame: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg',
  pulses: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958251/sah-marketing/category-pulses.jpg',
  rice: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958253/sah-marketing/category-rice.jpg',
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  if (!product) return { title: 'Not Found' }

  return {
    title: `${product.name} | SAH Company`,
    description: `${product.name} - ${product.origin || 'Premium product'} from Pakistan`,
  }
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    include: { category: true },
  })
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

  if (!product || product.category.slug !== params.category) {
    notFound()
  }

  const specs = (product.specs as Record<string, any>) || {}
  const fallbackImage = categoryImages[product.category.slug] || 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg'

  const infoCards = [
    { title: 'Quality Assurance', description: 'Third-party inspection and laboratory testing available upon request' },
    { title: 'Flexible Packaging', description: 'Customized packaging options to meet your specific requirements' },
    { title: 'Global Shipping', description: 'FOB, CFR, and CIF incoterms available for worldwide delivery' },
  ]

  return (
    <div className="pt-8">
      {/* Breadcrumb */}
      <section className="container-wide mb-8">
        <div className="flex items-center gap-2 text-sm font-body text-sah-charcoal/60">
          <Link href="/products" className="hover:text-sah-gold transition-colors">Products</Link>
          <span>·</span>
          <Link href={`/products/${product.category.slug}`} className="hover:text-sah-gold transition-colors">
            {product.category.name}
          </Link>
          <span>·</span>
          <span className="text-sah-gold font-medium">{product.name}</span>
        </div>
      </section>

      {/* Product Overview */}
      <section className="container-wide grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-16 sm:mb-24">
        <ProductGallery images={product.images} productName={product.name} fallbackImage={fallbackImage} />

        <div className="space-y-8">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-4">{product.category.name}</p>
            <h1 className="font-display text-3xl sm:text-4xl italic text-sah-charcoal mb-3">{product.name}</h1>
            {product.origin && (
              <p className="font-body text-sah-charcoal/70">Origin: {product.origin}</p>
            )}
          </div>

          {Object.keys(specs).length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg italic text-sah-charcoal">Specifications</h2>
              <div className="bg-sah-light rounded-lg p-6 space-y-3 border border-sah-gold/10">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center pb-3 border-b border-sah-gold/10 last:border-0 last:pb-0">
                    <span className="capitalize font-body text-sm text-sah-charcoal/70">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-body text-sm font-medium text-sah-charcoal">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/contact" className="px-6 py-3 bg-sah-gold text-white font-body font-medium rounded-lg hover:bg-sah-charcoal transition-colors text-center">
              Request Quotation
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-sah-gold text-sah-gold font-body font-medium rounded-lg hover:bg-sah-cream transition-colors text-center">
              Request Sample
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="container-wide grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 sm:mb-24">
        {infoCards.map((card, idx) => (
          <div key={idx} className="bg-sah-light rounded-lg p-6 border border-sah-gold/10">
            <h3 className="font-display text-base italic text-sah-charcoal mb-2">{card.title}</h3>
            <p className="font-body text-sm text-sah-charcoal/70">{card.description}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <div className="pb-16 sm:pb-24">
        <PageCTA
          title="Ready to Place an Order?"
          subtitle="Get in touch for quotations, samples, or to discuss bulk orders."
        />
      </div>
    </div>
  )
}
