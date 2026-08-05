'use client'

import { motion } from 'framer-motion'

const steps = [
  { number: '1', title: 'Buyer Specifications', description: 'Receive your exact requirements' },
  { number: '2', title: 'Supplier Selection', description: 'Identify suitable processor' },
  { number: '3', title: 'Lot Inspection', description: 'Initial assessment of inventory' },
  { number: '4', title: 'Sample Preparation', description: 'Prepare representative samples' },
  { number: '5', title: 'Lab Testing', description: 'Arrange laboratory analysis' },
  { number: '6', title: 'Buyer Approval', description: 'Your sign-off on samples' },
  { number: '7', title: 'Processing', description: 'Monitor cleaning and packing' },
  { number: '8', title: 'Pre-Shipment QA', description: 'Third-party inspection' },
  { number: '9', title: 'Documentation', description: 'Complete export paperwork' },
  { number: '10', title: 'Shipment', description: 'Dispatch via chosen terms' },
]

export default function QualityProcess() {
  return (
    <section className="py-16 sm:py-24 bg-sah-earth text-white">
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
            QUALITY & SOURCING
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-white leading-tight mb-6">
            Ten-Step Process for Precision Supply
          </h2>
          <p className="font-body text-lg text-white/80">
            Every order follows a transparent supply process to ensure specifications, testing, traceability, and complete buyer confidence.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 5) * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/8 border border-white/10 backdrop-blur-sm p-6 rounded-lg h-full flex flex-col hover:bg-white/12 hover:border-sah-gold/30 transition-all duration-300">
                {/* Step number */}
                <div className="font-display text-4xl text-sah-gold/30 mb-3">
                  {String(step.number).padStart(2, '0')}
                </div>

                {/* Step title */}
                <h3 className="font-display text-base italic text-white mb-2">
                  {step.title}
                </h3>

                {/* Step description */}
                <p className="font-body text-xs text-white/70 leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Batch Testing', desc: 'Customized lab analysis per shipment lot' },
            { label: 'Product Sampling', desc: 'Representative samples for your approval' },
            { label: 'Pre-Shipment QA', desc: 'Third-party inspection by SGS or Intertek' },
            { label: 'Traceability', desc: 'Complete documentation and audit trail' },
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="border-t border-sah-gold/20 pt-6"
            >
              <h4 className="font-display text-lg italic text-sah-gold mb-2">
                {pillar.label}
              </h4>
              <p className="font-body text-sm text-white/70">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
