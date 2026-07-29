'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    icon: '👨‍🌾',
    title: 'Family Experience',
    description: 'Decades of commodity-trading experience grounded in the pulses business since 1992.',
  },
  {
    icon: '📍',
    title: 'Pakistan-Based Sourcing',
    description: 'Direct access to Pakistan's agricultural heartland with established supplier relationships.',
  },
  {
    icon: '🤝',
    title: 'Selected Partners',
    description: 'Work with verified processors and supply partners for quality assurance at every step.',
  },
  {
    icon: '📋',
    title: 'Buyer-Specific Specs',
    description: 'Products tailored to your exact requirements, with flexible specifications and packaging.',
  },
  {
    icon: '✓',
    title: 'Testing & Inspection',
    description: 'Batch-specific testing and third-party inspection arrangements available on request.',
  },
  {
    icon: '📦',
    title: 'Flexible Packaging',
    description: 'Multiple packaging options from standard bags to custom solutions, per your needs.',
  },
  {
    icon: '📄',
    title: 'Export Support',
    description: 'Complete documentation and logistics support for FOB, CFR, and CIF shipments.',
  },
  {
    icon: '💬',
    title: 'Direct Communication',
    description: 'Transparent, responsive dialogue with your team throughout the supply process.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-sah-light">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">Why Choose SAH Company</h2>
          <p className="text-xl text-sah-charcoal max-w-2xl mx-auto">
            Our approach combines agricultural heritage with modern B2B supply practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-lg font-bold text-sah-charcoal mb-3">{reason.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
