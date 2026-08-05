'use client'

import { motion } from 'framer-motion'

const industries = [
  { title: 'Sesame Processors', description: 'Tahini and oil production facilities' },
  { title: 'Bakeries', description: 'Sesame supplies for bread and bakery products' },
  { title: 'Confectionery', description: 'Sesame and pulses for candy manufacturing' },
  { title: 'Food Ingredient Companies', description: 'Commodity sourcing for food service' },
  { title: 'Pulse Importers', description: 'Wholesale distribution and import traders' },
  { title: 'Food Wholesalers', description: 'Distribution to retail and food-service' },
  { title: 'Commodity Traders', description: 'B2B trading and re-export markets' },
  { title: 'Supermarket Suppliers', description: 'Private-label and branded products' },
  { title: 'Ethnic Food Distributors', description: 'Specialty and ethnic food markets' },
  { title: 'Private-Label Producers', description: 'OEM/ODM manufacturing partners' },
]

export default function IndustriesServed() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-4">
            WHO WE SUPPLY
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-sah-charcoal leading-tight mb-6">
            Industries We Serve
          </h2>
          <p className="font-body text-lg text-sah-charcoal/80 max-w-3xl">
            Our buyer network spans food processing, distribution, retail, and specialty markets across the globe.
          </p>
        </motion.div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 5) * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full p-6 bg-sah-light border border-sah-gold/10 rounded-lg hover:bg-sah-cream hover:border-sah-gold/40 transition-all duration-300">
                {/* Number */}
                <div className="font-display text-3xl text-sah-gold/20 mb-4">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Title */}
                <h3 className="font-display text-base italic text-sah-charcoal mb-3 group-hover:text-sah-gold transition-colors leading-tight">
                  {industry.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-sah-charcoal/70">
                  {industry.description}
                </p>

                {/* Accent line */}
                <div className="mt-4 pt-4 border-t border-sah-gold/20 group-hover:border-sah-gold/40 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-sah-earth text-white rounded-lg text-center"
        >
          <h3 className="font-display text-2xl italic mb-4">Not Listed?</h3>
          <p className="font-body text-white/80 mb-6 max-w-2xl mx-auto">
            If your industry or use case is not represented, we welcome inquiries. Contact our export team to discuss your specific sourcing requirements and partnership opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
