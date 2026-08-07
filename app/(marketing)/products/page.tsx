import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import SpotlightCard from '@/components/ui/SpotlightCard'

export const metadata = {
  title: 'Products — sesame, pulses & rice',
  description:
    'Export-grade sesame seeds, pulses, and rice from Pakistan. Hulled and natural sesame, Basmati and IRRI rice, chickpeas, lentils, and moong.',
}

const categoryCopy: Record<string, { description: string; meta: string }> = {
  sesame: {
    description:
      'Hulled and natural white sesame cleaned to your purity and moisture ceiling, for tahini, bakery, and crushing.',
    meta: 'Hulled · Natural',
  },
  pulses: {
    description:
      'White and black chickpeas, split red lentils, and split yellow gram milled under our own supervision.',
    meta: 'Chickpeas · Lentils · Moong',
  },
  rice: {
    description:
      'Long-grain Basmati and IRRI varieties, sortex-cleaned and graded for wholesale and re-export.',
    meta: '1121 · Super · PK-385 · IRRI-6',
  },
}

const categoryImages: Record<string, string> = {
  sesame:
    'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg',
  pulses:
    'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958251/sah-marketing/category-pulses.jpg',
  rice: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958253/sah-marketing/category-rice.jpg',
}

const standards = [
  {
    title: 'Verified quality',
    description: 'Batch lab analysis and third-party inspection through SGS or Intertek on request.',
  },
  {
    title: 'Flexible packaging',
    description: 'From 25 kg PP woven bags to 1 MT jumbo bags and full private-label packing.',
  },
  {
    title: 'Global shipping',
    description: 'FOB Karachi, CFR, and CIF, with documentation prepared per destination.',
  },
]

export default async function ProductsPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  })

  return (
    <>
      <PageHero
        eyebrow="What we supply"
        title="Ten products, three categories"
        subtitle="Everything below is sourced in Punjab, processed to contract specification, and shipped from Karachi."
        image="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg"
        imageAlt="Macro photograph of export-grade sesame seeds"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
            {categories.map((category, idx) => {
              const copy = categoryCopy[category.slug]
              return (
                <RevealItem key={category.id} className="h-full">
                  <SpotlightCard
                    as="article"
                    className="h-full overflow-hidden rounded-panel bg-sah-earth"
                  >
                    <Link
                      href={`/products/${category.slug}`}
                      className="group relative block h-full transition-transform duration-200 ease-out-expo active:scale-[0.985]"
                    >
                      <div className="relative h-[24rem]">
                        <Image
                          src={categoryImages[category.slug] || categoryImages.sesame}
                          alt={category.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-sah-earth via-sah-earth/45 to-transparent"
                        />

                        <span
                          aria-hidden="true"
                          className="absolute left-6 top-6 font-display text-2xl text-white/45"
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        <span className="glass-dark absolute right-5 top-5 rounded-full px-3 py-1.5 font-body text-[11px] uppercase tracking-[0.16em] text-white/80">
                          {category._count.products} product
                          {category._count.products !== 1 ? 's' : ''}
                        </span>

                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-sah-gold">
                            {copy?.meta ?? 'Export grade'}
                          </p>
                          <h2 className="mt-2 font-display text-2xl italic text-white sm:text-3xl">
                            {category.name}
                          </h2>
                          <p className="mt-3 font-body text-sm leading-relaxed text-white/65">
                            {copy?.description ?? 'Quality agricultural products from Pakistan.'}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-sah-gold">
                            View range
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
                      </div>
                    </Link>
                  </SpotlightCard>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Standards */}
      <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow="Our promise"
              title="What holds across every product"
              size="md"
              lead="The category changes. The way we grade, test, pack, and document does not."
            />
          </div>

          <RevealGroup className="lg:col-span-7" stagger={0.08}>
            <div className="overflow-hidden rounded-panel border border-sah-gold/15 bg-white">
              {standards.map((item, idx) => (
                <RevealItem key={item.title}>
                  <div
                    className={`group flex gap-5 p-7 transition-colors duration-300 ease-out-expo hover:bg-sah-cream ${
                      idx > 0 ? 'border-t border-sah-gold/12' : ''
                    }`}
                  >
                    <span className="tnum shrink-0 pt-1 font-display text-sm text-sah-gold/70">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl italic text-sah-charcoal transition-colors duration-200 group-hover:text-sah-gold">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-sah-charcoal/65">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      <div className="bg-white py-20 sm:py-28">
        <PageCTA
          title="Need a custom quote?"
          subtitle="Send the specification, quantity, and destination port. We will price it properly."
          primaryLabel="Request a quotation"
        />
      </div>
    </>
  )
}
