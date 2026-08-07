'use client'

import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import SpotlightCard from '@/components/ui/SpotlightCard'

const categories = [
  {
    title: 'Sesame seeds',
    href: '/products/sesame',
    description:
      'Hulled and natural white sesame, cleaned to buyer purity and moisture specs for tahini, bakery, and oil crushing.',
    meta: 'Hulled · Natural',
    image:
      'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg',
  },
  {
    title: 'Pulses',
    href: '/products/pulses',
    description:
      'Chickpeas, lentils, and moong from our own mills and verified processing partners.',
    meta: 'Chickpeas · Lentils · Moong',
    image:
      'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958251/sah-marketing/category-pulses.jpg',
  },
  {
    title: 'Rice',
    href: '/products/rice',
    description:
      'Long-grain Basmati and IRRI varieties for wholesale, import, and re-export markets.',
    meta: '1121 · Super · PK-385 · IRRI-6',
    image:
      'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958253/sah-marketing/category-rice.jpg',
  },
]

function CategoryCard({
  category,
  index,
  feature = false,
}: {
  category: (typeof categories)[number]
  index: number
  feature?: boolean
}) {
  return (
    <SpotlightCard
      as="article"
      className="h-full overflow-hidden rounded-panel bg-sah-earth"
    >
      <Link
        href={category.href}
        className="group relative block h-full transition-transform duration-200 ease-out-expo active:scale-[0.985]"
      >
        <div className={`relative ${feature ? 'h-[26rem] lg:h-full lg:min-h-[34rem]' : 'h-64 sm:h-72'}`}>
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes={feature ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 40vw'}
            className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]"
          />

          {/* Legibility scrim — heavier at the base where the copy sits. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-sah-earth via-sah-earth/45 to-transparent"
          />

          <span
            aria-hidden="true"
            className="absolute left-6 top-6 font-display text-2xl text-white/45"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-sah-gold">
              {category.meta}
            </p>
            <h3
              className={`mt-2 font-display italic text-white ${
                feature ? 'text-3xl sm:text-4xl' : 'text-2xl'
              }`}
            >
              {category.title}
            </h3>
            <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-white/65">
              {category.description}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  )
}

export default function CategoriesShowcase() {
  const [feature, ...rest] = categories

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-wide">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="What we supply"
            title="Three categories, one standard"
          />
          <Reveal delay={0.2} blur={false}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 font-body text-sm font-medium text-sah-charcoal transition-colors duration-200 hover:text-sah-gold active:scale-[0.97]"
            >
              Browse the full catalogue
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
          </Reveal>
        </div>

        {/* Deliberately uneven: one hero tile, two stacked beside it. */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" duration={0.8}>
            <CategoryCard category={feature} index={0} feature />
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-5">
            {rest.map((category, idx) => (
              <Reveal key={category.href} delay={0.12 + idx * 0.1} className="h-full">
                <CategoryCard category={category} index={idx + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
