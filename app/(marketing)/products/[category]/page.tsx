import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.category },
  })

  if (!category) return { title: 'Not Found' }

  return {
    title: `${category.name} | SAH Company`,
    description: `Browse our premium ${category.name.toLowerCase()} collection from Pakistan`,
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
      },
    },
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="space-y-16 py-16">
      {/* Hero */}
      <section className="container-wide space-y-6 text-center">
        <div className="text-6xl mb-4">{category.icon}</div>
        <h1 className="text-5xl font-bold text-sah-charcoal">{category.name}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Premium {category.name.toLowerCase()} sourced directly from Pakistan's agricultural heartland
        </p>
      </section>

      {/* Products Grid */}
      {category.products.length > 0 ? (
        <section className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {category.products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${category.slug}/${product.slug}`}
                className="group bg-white border-2 border-sah-cream hover:border-sah-green rounded-lg overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="bg-sah-cream p-8 h-48 flex items-center justify-center group-hover:bg-sah-green/10 transition-colors">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📦</div>
                    <p className="text-sm text-gray-500">Product Image</p>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-sah-charcoal group-hover:text-sah-green transition-colors">
                    {product.name}
                  </h3>
                  {product.origin && (
                    <p className="text-sm text-gray-600">📍 {product.origin}</p>
                  )}
                  <p className="text-sm text-sah-green font-semibold">View Details →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="container-wide text-center py-12">
          <p className="text-gray-600 text-lg">No products available in this category yet.</p>
        </section>
      )}

      {/* CTA */}
      <section className="container-wide bg-gradient-to-r from-sah-green to-sah-charcoal text-white rounded-lg p-12 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Interested in {category.name}?</h2>
        <p className="text-lg opacity-90">Request a detailed quotation or samples</p>
        <Link href="/contact" className="btn-primary bg-white text-sah-green hover:bg-sah-cream inline-block">
          Request a Quote
        </Link>
      </section>
    </div>
  )
}
