import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'

export const metadata = {
  title: 'Products | SAH Company - Sesame, Pulses & Rice',
  description: 'Explore our premium sesame seeds, pulses, and rice exports from Pakistan',
}

const categoryDescriptions: Record<string, string> = {
  sesame: 'Premium white and black sesame seeds with high oil content and purity.',
  pulses: 'Wide range of pulses including chickpeas, lentils, mung beans, and more.',
  rice: 'Quality rice varieties suitable for various culinary applications.',
}

const categoryImages: Record<string, string> = {
  sesame: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg',
  pulses: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958251/sah-marketing/category-pulses.jpg',
  rice: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958253/sah-marketing/category-rice.jpg',
}

const standards = [
  { title: 'Verified Quality', description: 'Third-party inspection and laboratory testing available' },
  { title: 'Flexible Packaging', description: 'Customized packaging to meet your specifications' },
  { title: 'Global Shipping', description: 'FOB, CFR, and CIF incoterms available' },
]

export default async function ProductsPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  })

  return (
    <div>
      <PageHero
        eyebrow="WHAT WE SUPPLY"
        title="Our Products"
        subtitle="Premium agricultural commodities sourced directly from Pakistan's agricultural heartland."
        image="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg"
        imageAlt="Sesame seeds macro photography"
      />

      {/* Categories Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, idx) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              className="group bg-white border border-sah-gold/10 rounded-lg overflow-hidden hover:border-sah-gold/40 transition-all"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src={categoryImages[category.slug] || 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg'}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sah-earth/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-display text-2xl text-white/90">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-xl sm:text-2xl italic text-sah-charcoal mb-3 group-hover:text-sah-gold transition-colors">
                  {category.name}
                </h3>
                <p className="font-body text-sm text-sah-charcoal/75 mb-4">
                  {categoryDescriptions[category.slug] || 'Quality products from Pakistan'}
                </p>
                <p className="font-body text-sm font-medium text-sah-gold">
                  {category._count.products} Product{category._count.products !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 sm:py-24 bg-sah-cream border-y border-sah-gold/10">
        <div className="container-wide">
          <div className="mb-10 sm:mb-16 text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-4">OUR PROMISE</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-sah-charcoal leading-tight">
              Quality Standards
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {standards.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-sah-gold/10 text-center">
                <div className="font-display text-4xl text-sah-gold/20 mb-4">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-lg italic text-sah-charcoal mb-3">{item.title}</h3>
                <p className="font-body text-sm text-sah-charcoal/75">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-16 sm:py-24 bg-white">
        <PageCTA
          title="Need a Custom Quote?"
          subtitle="Contact us for detailed specifications, samples, or volume quotations."
          primaryLabel="Request a Quotation"
        />
      </div>
    </div>
  )
}
