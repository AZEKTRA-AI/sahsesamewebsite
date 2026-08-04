import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/marketing/ProductGallery'

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

  return (
    <div className="space-y-12 py-16">
      {/* Breadcrumb */}
      <section className="container-wide">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/products" className="hover:text-sah-green">Products</Link>
          <span>•</span>
          <Link href={`/products/${product.category.slug}`} className="hover:text-sah-green">
            {product.category.name}
          </Link>
          <span>•</span>
          <span className="text-sah-green font-semibold">{product.name}</span>
        </div>
      </section>

      {/* Product Overview */}
      <section className="container-wide grid md:grid-cols-2 gap-12">
        {/* Image gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-sah-charcoal mb-2">{product.name}</h1>
            {product.origin && (
              <p className="text-gray-600 text-lg">📍 Origin: {product.origin}</p>
            )}
          </div>

          {/* Specifications */}
          {Object.keys(specs).length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-sah-charcoal">Specifications</h2>
              <div className="bg-sah-cream rounded-lg p-6 space-y-3">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center pb-3 border-b border-white last:border-0">
                    <span className="capitalize text-gray-700 font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="text-sah-charcoal font-semibold">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/contact" className="btn-primary bg-sah-green text-white hover:bg-sah-charcoal">
              Request Quotation
            </Link>
            <Link href="/contact" className="btn-primary border-2 border-sah-green text-sah-green hover:bg-sah-cream">
              Request Sample
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="container-wide grid md:grid-cols-3 gap-8">
        <div className="bg-sah-cream rounded-lg p-6 space-y-3">
          <h3 className="font-bold text-sah-charcoal">Quality Assurance</h3>
          <p className="text-sm text-gray-600">
            Third-party inspection and laboratory testing available upon request
          </p>
        </div>
        <div className="bg-sah-cream rounded-lg p-6 space-y-3">
          <h3 className="font-bold text-sah-charcoal">Flexible Packaging</h3>
          <p className="text-sm text-gray-600">
            Customized packaging options to meet your specific requirements
          </p>
        </div>
        <div className="bg-sah-cream rounded-lg p-6 space-y-3">
          <h3 className="font-bold text-sah-charcoal">Global Shipping</h3>
          <p className="text-sm text-gray-600">
            FOB, CFR, and CIF incoterms available for worldwide delivery
          </p>
        </div>
      </section>

      {/* Related Products */}
      <section className="container-wide space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal">More from {product.category.name}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Related products would go here */}
          <p className="text-gray-600 col-span-full">Browse other products in this category</p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide bg-gradient-to-r from-sah-green to-sah-charcoal text-white rounded-lg p-12 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Ready to Place an Order?</h2>
        <p className="text-lg opacity-90">Get in touch for quotations, samples, or to discuss bulk orders</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary bg-white text-sah-green hover:bg-sah-cream">
            Request Quote
          </Link>
          <a href="https://wa.me/923000959524" className="btn-primary border border-white hover:bg-white/10">
            WhatsApp Us
          </a>
        </div>
      </section>
    </div>
  )
}
