'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    title: 'Sesame Seeds',
    href: '/products/sesame',
    description: 'Natural white, hulled, and black varieties sourced and processed to your exact specifications.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg',
  },
  {
    title: 'Pulses',
    href: '/products/pulses',
    description: 'Chickpeas, mung beans, lentils, and more sourced from our mills and verified partners.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958251/sah-marketing/category-pulses.jpg',
  },
  {
    title: 'Rice',
    href: '/products/rice',
    description: 'Premium Pakistani rice varieties for wholesale, import, and distribution markets.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958253/sah-marketing/category-rice.jpg',
  },
]

export default function CategoriesShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-4">
            WHAT WE SUPPLY
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-sah-charcoal leading-tight">
            Three Categories of Export-Grade Quality
          </h2>
        </motion.div>

        {/* Product cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={cat.href} className="block h-full">
                <div className="relative h-full bg-white border border-sah-gold/10 rounded-lg overflow-hidden hover:border-sah-gold/40 transition-all duration-300">
                  {/* Photo */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sah-earth/70 via-transparent to-transparent" />
                    {/* Number badge on photo */}
                    <div className="absolute top-4 left-4 font-display text-2xl text-white/90">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col">
                    {/* Title */}
                    <h3 className="font-display text-xl sm:text-2xl italic text-sah-charcoal mb-3 sm:mb-4 group-hover:text-sah-gold transition-colors">
                      {cat.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm leading-relaxed text-sah-charcoal/75 mb-6 sm:mb-8">
                      {cat.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-sah-gold font-body font-medium group-hover:translate-x-1 transition-transform">
                      View Details
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
