'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  {
    title: 'Sesame Seeds',
    href: '/products/sesame',
    description: 'Natural white, hulled, and black sesame varieties sourced and processed to buyer specifications.',
    icon: '🌾',
    color: 'from-yellow-100 to-yellow-50',
  },
  {
    title: 'Pulses',
    href: '/products/pulses',
    description: 'Chickpeas, mung beans, lentils, and more—sourced from our mills and select partners.',
    icon: '🫘',
    color: 'from-amber-100 to-amber-50',
  },
  {
    title: 'Rice',
    href: '/products/rice',
    description: 'Premium Pakistani rice varieties for wholesale, import, and retail distribution.',
    icon: '🍚',
    color: 'from-orange-100 to-orange-50',
  },
]

export default function CategoriesShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">Our Product Categories</h2>
          <p className="text-xl text-sah-charcoal max-w-2xl mx-auto">
            Three core categories of export-grade agricultural commodities, each backed by rigorous sourcing and quality assurance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={cat.href}>
                <div className={`bg-gradient-to-br ${cat.color} p-12 rounded-xl shadow-md group-hover:shadow-lg transition-all h-full`}>
                  <div className="text-6xl mb-6">{cat.icon}</div>
                  <h3 className="text-2xl font-bold text-sah-charcoal mb-4">{cat.title}</h3>
                  <p className="text-sah-charcoal text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                  <div className="flex items-center text-sah-green font-medium group-hover:translate-x-2 transition-transform">
                    Learn More
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
