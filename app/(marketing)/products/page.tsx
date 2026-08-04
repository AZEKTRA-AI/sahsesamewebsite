import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata = {
  title: 'Products | SAH Company - Sesame, Pulses & Rice',
  description: 'Explore our premium sesame seeds, pulses, and rice exports from Pakistan',
}

export default async function ProductsPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  })

  const categoryDescriptions: Record<string, string> = {
    sesame: 'Premium white and black sesame seeds with high oil content and purity.',
    pulses: 'Wide range of pulses including chickpeas, lentils, mung beans, and more.',
    rice: 'Quality rice varieties suitable for various culinary applications.',
  }

  const categoryEmojis: Record<string, string> = {
    sesame: '🌾',
    pulses: '🫘',
    rice: '🍚',
  }

  return (
    <div className="space-y-16 py-16">
      {/* Hero */}
      <section className="container-wide space-y-8 text-center">
        <h1 className="text-5xl font-bold text-sah-charcoal">Our Products</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Premium agricultural commodities sourced directly from Pakistan's agricultural heartland
        </p>
      </section>

      {/* Categories Grid */}
      <section className="container-wide">
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              className="group bg-white border-2 border-sah-cream hover:border-sah-green rounded-lg overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="bg-sah-cream p-12 text-center group-hover:bg-sah-green group-hover:text-white transition-colors">
                <div className="text-6xl mb-4">{category.icon || categoryEmojis[category.slug] || '📦'}</div>
                <h3 className="text-2xl font-bold">{category.name}</h3>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-gray-600 text-sm">
                  {categoryDescriptions[category.slug] || 'Quality products from Pakistan'}
                </p>
                <p className="text-sm font-semibold text-sah-green">
                  {category._count.products} Product{category._count.products !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container-wide bg-sah-cream rounded-lg p-12 space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal text-center">Quality Standards</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="font-semibold text-sah-charcoal">Verified Quality</h3>
            <p className="text-gray-600 text-sm mt-2">Third-party inspection and laboratory testing available</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="font-semibold text-sah-charcoal">Flexible Packaging</h3>
            <p className="text-gray-600 text-sm mt-2">Customized packaging to meet your specifications</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="font-semibold text-sah-charcoal">Global Shipping</h3>
            <p className="text-gray-600 text-sm mt-2">FOB, CFR, and CIF incoterms available</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide text-center space-y-6">
        <h2 className="text-3xl font-bold text-sah-charcoal">Need a Custom Quote?</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Contact us for detailed specifications, samples, or volume quotations
        </p>
        <Link href="/contact" className="btn-primary inline-block">
          Request a Quotation
        </Link>
      </section>
    </div>
  )
}
