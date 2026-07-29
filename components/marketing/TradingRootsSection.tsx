'use client'

import { motion } from 'framer-motion'

export default function TradingRootsSection() {
  return (
    <section className="py-20 bg-sah-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-sah-gold/20 rounded-full mb-4">
              <span className="text-sah-gold font-medium">Our Heritage</span>
            </div>
          </div>
          <h2 className="section-heading mb-6">Family Trading Roots Since 1992</h2>
          <p className="text-xl text-sah-charcoal leading-relaxed mb-8">
            Rooted in a family pulses business operating since 1992, SAH Company brings decades of commodity-trading experience to the sourcing and export of Pakistani sesame seeds, pulses, and rice. Our foundation is built on deep knowledge of agricultural sourcing, quality evaluation, and reliable supply chains that connect Pakistani products with buyers worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="font-bold text-lg text-sah-green mb-3">Pulses Heritage</h3>
              <p className="text-sah-charcoal text-sm">Decades of experience in Pakistan's pulses trade, including ownership of two modern pulse mills.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="font-bold text-lg text-sah-green mb-3">Global Reach</h3>
              <p className="text-sah-charcoal text-sm">Connecting Pakistani agricultural products with international buyers through professional supply networks.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-5xl mb-4">✓</div>
              <h3 className="font-bold text-lg text-sah-green mb-3">Quality Focus</h3>
              <p className="text-sah-charcoal text-sm">Buyer-specific specifications, batch testing, and transparent communication—every order.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
