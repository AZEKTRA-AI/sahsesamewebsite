'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const packagingOptions = [
  '25 kg PP woven bags',
  '50 kg PP woven bags',
  'Kraft paper bags with inner liner',
  'Jumbo bags (IBC containers)',
  'Buyer-branded or private-label',
  'Custom packaging per requirements',
]

const shippingTerms = [
  { label: 'FOB Karachi', description: 'Free on Board from Karachi Port' },
  { label: 'CFR', description: 'Cost and Freight included' },
  { label: 'CIF', description: 'Cost, Insurance & Freight' },
  { label: 'Sample Orders', description: 'Small quantities available' },
]

const docs = [
  'Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Phytosanitary Certificate',
  'Fumigation Certificate', 'Certificate of Analysis', 'Inspection Report', 'Bill of Lading',
  'Insurance Certificate', 'Destination-Specific Docs',
]

export default function PackagingShipment() {
  return (
    <section className="py-16 sm:py-24 bg-sah-cream border-y border-sah-gold/10">
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
            DELIVERY & FLEXIBILITY
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-sah-charcoal leading-tight">
            Packaging & Logistics
          </h2>
        </motion.div>

        {/* Port banner photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-56 sm:h-72 lg:h-80 rounded-lg overflow-hidden mb-16 sm:mb-20"
        >
          <Image
            src="/logistics-port.jpg"
            alt="Shipping containers at port for global export"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sah-earth/80 via-sah-earth/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 sm:px-10 max-w-xl">
              <p className="font-display text-2xl sm:text-3xl md:text-4xl italic text-white leading-tight">
                From Karachi Port to Global Markets
              </p>
            </div>
          </div>
        </motion.div>

        {/* Packaging & Shipping Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Packaging */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl italic text-sah-charcoal mb-8">Packaging Options</h3>
            <div className="space-y-3">
              {packagingOptions.map((option, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-white border border-sah-gold/10 rounded-lg hover:border-sah-gold/40 transition-all"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sah-gold" />
                  <span className="font-body text-sah-charcoal">{option}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Shipping Terms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl italic text-sah-charcoal mb-8">Shipping Terms</h3>
            <div className="space-y-3 mb-8">
              {shippingTerms.map((term, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-4 bg-white border border-sah-gold/10 rounded-lg hover:border-sah-gold/40 transition-all"
                >
                  <h4 className="font-display italic text-sah-charcoal mb-1">{term.label}</h4>
                  <p className="font-body text-sm text-sah-charcoal/75">{term.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg border border-sah-gold/20">
              <h4 className="font-display italic text-sah-charcoal mb-3">Ports of Departure</h4>
              <ul className="space-y-2 text-sm text-sah-charcoal/75 font-body">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sah-gold rounded-full" />
                  Karachi Port (primary)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sah-gold rounded-full" />
                  Port Qasim (alternative)
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h3 className="font-display text-2xl italic text-sah-charcoal mb-3">Export Documentation</h3>
            <p className="font-body text-sah-charcoal/75 mb-8">
              Complete documentation arranged per product, destination requirements, and contractual terms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {docs.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg border border-sah-gold/10 text-center hover:border-sah-gold/40 transition-all"
              >
                <p className="font-body text-sm text-sah-charcoal">{doc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
