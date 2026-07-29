'use client'

import { motion } from 'framer-motion'

const industries = [
  { icon: '🏭', title: 'Sesame Processors', description: 'Processing facilities for tahini and oil production' },
  { icon: '🍞', title: 'Bakeries', description: 'Sesame supplies for bread and bakery products' },
  { icon: '🍬', title: 'Confectionery', description: 'Sesame and pulses for candy and sweet manufacturing' },
  { icon: '🥄', title: 'Food Ingredient Companies', description: 'Commodity sourcing for food service and manufacturing' },
  { icon: '🏪', title: 'Pulse Importers', description: 'Wholesale distribution and import traders' },
  { icon: '🛒', title: 'Food Wholesalers', description: 'Distribution to retail and food-service channels' },
  { icon: '📦', title: 'Commodity Traders', description: 'B2B trading and re-export markets' },
  { icon: '🏬', title: 'Supermarket Suppliers', description: 'Private-label and branded consumer product supply' },
  { icon: '🌍', title: 'Ethnic Food Distributors', description: 'Supply for specialty and ethnic food markets' },
  { icon: '🏢', title: 'Private-Label Producers', description: 'OEM/ODM manufacturing partners' },
]

export default function IndustriesServed() {
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
          <h2 className="section-heading mb-4">Industries We Serve</h2>
          <p className="text-xl text-sah-charcoal max-w-2xl mx-auto">
            Our buyer network spans food processing, distribution, retail, and specialty markets across the globe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 5) * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="bg-sah-cream p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="text-4xl mb-3 text-center">{industry.icon}</div>
              <h3 className="font-bold text-sah-charcoal mb-2 text-sm leading-snug">{industry.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{industry.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-sah-green/10 to-sah-gold/10 p-8 rounded-lg border border-sah-green/20"
        >
          <p className="text-sah-charcoal text-center">
            <span className="font-bold">Looking for a custom supply arrangement?</span> Contact our export team to discuss your specific needs. We work with buyers of all sizes and are open to long-term partnership opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
