import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'

const categoryImages: Record<string, string> = {
  sesame: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg',
  pulses: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958251/sah-marketing/category-pulses.jpg',
  rice: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958253/sah-marketing/category-rice.jpg',
}

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

  const heroImage = categoryImages[category.slug] || 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg'

  return (
    <div>
      <PageHero
        eyebrow="PRODUCT CATEGORY"
        title={category.name}
        subtitle={`Premium ${category.name.toLowerCase()} sourced directly from Pakistan's agricultural heartland.`}
        image={heroImage}
        imageAlt={category.name}
      />

      {/* Products Grid */}
      {category.products.length > 0 ? (
        <section className="py-16 sm:py-24 bg-white">
          <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {category.products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${category.slug}/${product.slug}`}
                className="group bg-white border border-sah-gold/10 rounded-lg overflow-hidden hover:border-sah-gold/40 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={heroImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sah-earth/60 via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-display text-lg italic text-sah-charcoal group-hover:text-sah-gold transition-colors">
                    {product.name}
                  </h3>
                  {product.origin && (
                    <p className="font-body text-sm text-sah-charcoal/70">{product.origin}</p>
                  )}
                  <p className="font-body text-sm text-sah-gold font-medium">View Details →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="py-16 sm:py-24 bg-white text-center">
          <p className="font-body text-sah-charcoal/70 text-lg">No products available in this category yet.</p>
        </section>
      )}

      {/* CTA */}
      <div className="pb-16 sm:pb-24 bg-white">
        <PageCTA
          title={`Interested in ${category.name}?`}
          subtitle="Request a detailed quotation or samples."
        />
      </div>
    </div>
  )
}
