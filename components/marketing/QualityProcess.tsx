'use client'

import { motion } from 'framer-motion'

const steps = [
  { number: '1', title: 'Buyer Specifications', description: 'Receive your exact requirements' },
  { number: '2', title: 'Supplier Selection', description: 'Identify suitable processor or supplier' },
  { number: '3', title: 'Lot Inspection', description: 'Initial assessment of available inventory' },
  { number: '4', title: 'Sample Prep', description: 'Prepare representative samples' },
  { number: '5', title: 'Lab Testing', description: 'Arrange laboratory analysis if required' },
  { number: '6', title: 'Buyer Approval', description: 'Obtain your sign-off on samples' },
  { number: '7', title: 'Processing', description: 'Monitor cleaning and packing' },
  { number: '8', title: 'Pre-Shipment Inspection', description: 'Third-party inspection arranged' },
  { number: '9', title: 'Documentation', description: 'Complete export paperwork' },
  { number: '10', title: 'Shipment', description: 'Dispatch via your chosen port & terms' },
]

export default function QualityProcess() {
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
          <h2 className="section-heading mb-4">Sourcing & Quality Process</h2>
          <p className="text-xl text-sah-charcoal max-w-2xl mx-auto">
            Every order follows a transparent 10-step supply process to ensure specifications, testing, and traceability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 5) * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-sah-cream p-6 rounded-lg h-full flex flex-col">
                <div className="w-12 h-12 bg-sah-green text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {step.number}
                </div>
                <h3 className="font-bold text-sah-charcoal mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 flex-grow">{step.description}</p>
              </div>

              {/* Arrow between items */}
              {idx < steps.length - 1 && idx % 5 !== 4 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-sah-gold"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-green-50 p-6 rounded-lg border border-sah-green/20">
            <div className="text-2xl mb-3">🧪</div>
            <h4 className="font-bold text-sah-charcoal mb-2">Batch Testing</h4>
            <p className="text-sm text-gray-600">Customized lab analysis per shipment lot.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-sah-green/20">
            <div className="text-2xl mb-3">📸</div>
            <h4 className="font-bold text-sah-charcoal mb-2">Product Sampling</h4>
            <p className="text-sm text-gray-600">Representative samples for buyer approval.</p>
          </div>
          <div className="bg-amber-50 p-6 rounded-lg border border-sah-green/20">
            <div className="text-2xl mb-3">✓</div>
            <h4 className="font-bold text-sah-charcoal mb-2">Pre-Shipment QA</h4>
            <p className="text-sm text-gray-600">Third-party inspection by SGS/Intertek.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border border-sah-green/20">
            <div className="text-2xl mb-3">📋</div>
            <h4 className="font-bold text-sah-charcoal mb-2">Traceability</h4>
            <p className="text-sm text-gray-600">Complete documentation and audit trail.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
