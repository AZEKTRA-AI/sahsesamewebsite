'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    title: 'Family Experience',
    description: 'Decades of commodity trading grounded in agricultural operations since 1985.',
  },
  {
    title: 'Pakistan-Based Sourcing',
    description: 'Direct access to agricultural heartland with established supplier relationships.',
  },
  {
    title: 'Verified Partners',
    description: 'Work exclusively with verified processors for quality assurance at every step.',
  },
  {
    title: 'Buyer Specifications',
    description: 'Products tailored to exact requirements with flexible packaging and sizing.',
  },
  {
    title: 'Testing & Inspection',
    description: 'Batch testing and third-party inspection arrangements available on request.',
  },
  {
    title: 'Flexible Packaging',
    description: 'Multiple options from standard bags to fully customized solutions.',
  },
  {
    title: 'Export Support',
    description: 'Complete documentation and logistics for FOB, CFR, and CIF shipments.',
  },
  {
    title: 'Direct Communication',
    description: 'Transparent, responsive dialogue with your team throughout supply process.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-sah-gold/10">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 max-w-3xl"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-4">
            WHY CHOOSE SAH
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-sah-charcoal leading-tight mb-6">
            Eight Reasons to Partner With Us
          </h2>
          <p className="font-body text-lg text-sah-charcoal/80">
            Our approach combines agricultural heritage with modern B2B supply excellence—from sourcing to delivery.
          </p>
        </motion.div>

        {/* 2x4 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 4) * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-8 bg-sah-light rounded-lg border border-sah-gold/10 hover:border-sah-gold/40 hover:bg-sah-cream transition-all duration-300 h-full">
                {/* Number badge */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-sah-gold/10 flex items-center justify-center font-display text-sm text-sah-gold group-hover:bg-sah-gold group-hover:text-white transition-all">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <h3 className="font-display text-xl italic text-sah-charcoal mb-3 pr-12">
                  {reason.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-sah-charcoal/75">
                  {reason.description}
                </p>

                {/* Accent line */}
                <div className="mt-6 pt-6 border-t border-sah-gold/20 group-hover:border-sah-gold/40 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
