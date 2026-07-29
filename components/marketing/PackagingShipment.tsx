'use client'

import { motion } from 'framer-motion'

const packagingOptions = [
  '25 kg PP woven bags',
  '50 kg PP woven bags',
  'Kraft paper bags with inner liner',
  'Jumbo bags',
  'Buyer-branded or private-label',
  'Custom packaging per requirements',
]

const shippingTerms = [
  { label: 'FOB Karachi', description: 'Free on Board from Karachi Port' },
  { label: 'CFR', description: 'Cost and Freight included' },
  { label: 'CIF', description: 'Cost, Insurance & Freight' },
  { label: 'Sample Orders', description: 'Small quantities where commercially possible' },
]

export default function PackagingShipment() {
  return (
    <section className="py-20 bg-sah-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">Packaging & Logistics</h2>
          <p className="text-xl text-sah-charcoal max-w-2xl mx-auto">
            Flexible solutions tailored to your destination, regulations, and commercial requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Packaging */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-sah-charcoal mb-8">Packaging Options</h3>
            <div className="space-y-4">
              {packagingOptions.map((option, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-sah-gold/20 rounded-full flex items-center justify-center text-sah-gold mt-1">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-sah-charcoal">{option}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-sah-charcoal">Note:</span> Specific packaging sizes, materials, MOQ, and private-label options are finalized per product and buyer requirements. All arrangements are subject to confirmation.
              </p>
            </div>
          </motion.div>

          {/* Shipping Terms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-sah-charcoal mb-8">Shipping Terms & Ports</h3>
            <div className="space-y-4 mb-8">
              {shippingTerms.map((term, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-sah-green mb-1">{term.label}</h4>
                  <p className="text-sm text-gray-600">{term.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg border border-sah-green/30">
              <h4 className="font-bold text-sah-charcoal mb-3">Ports of Departure</h4>
              <p className="text-sah-charcoal mb-3">We ship from:</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sah-gold rounded-full"></span>
                  Karachi Port (primary)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sah-gold rounded-full"></span>
                  Port Qasim (alternative)
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <span className="font-medium text-sah-charcoal">Full-container and LCL (Less than Container Load) shipments available.</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-white p-8 rounded-lg shadow-sm"
        >
          <h3 className="text-2xl font-bold text-sah-charcoal mb-6">Export Documentation</h3>
          <p className="text-gray-600 mb-4 text-sm">
            We arrange documentation according to the product, destination-country requirements, and agreed contractual terms:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Commercial Invoice',
              'Packing List',
              'Certificate of Origin',
              'Phytosanitary Certificate',
              'Fumigation Certificate',
              'Certificate of Analysis',
              'Inspection Report',
              'Bill of Lading',
              'Insurance Certificate (CIF)',
              'Destination-Specific Docs',
            ].map((doc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-sah-light p-4 rounded-lg text-sm text-center text-sah-charcoal font-medium border border-sah-gold/30"
              >
                {doc}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
