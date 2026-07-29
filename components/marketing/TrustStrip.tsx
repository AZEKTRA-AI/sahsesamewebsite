'use client'

import { motion } from 'framer-motion'

const trustItems = [
  { icon: '📍', label: 'Faisalabad, Pakistan', description: 'Located in the heart of Pakistan' },
  { icon: '📦', label: 'FOB, CFR & CIF', description: 'Flexible shipping terms' },
  { icon: '🌾', label: '3 Categories', description: 'Sesame, Pulses, Rice' },
  { icon: '⏰', label: 'Since 1992', description: 'Family trading roots' },
]

export default function TrustStrip() {
  return (
    <section className="bg-sah-green text-white py-12">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-lg">{item.label}</h3>
              <p className="text-sm text-green-100">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
