'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const pillars = [
  {
    label: 'Pulses Heritage',
    description: 'Decades of experience in Pakistan\'s pulses trade, with ownership of two modern mills in Faisalabad.',
  },
  {
    label: 'Global Reach',
    description: 'Connecting Pakistani agricultural products with international buyers through professional supply networks.',
  },
  {
    label: 'Quality First',
    description: 'Buyer-specific specifications, batch testing, and transparent communication in every transaction.',
  },
]

export default function TradingRootsSection() {
  return (
    <section className="py-16 sm:py-24 bg-sah-cream border-y border-sah-gold/10">
      <div className="container-wide">
        {/* Image + Heading/Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-64 sm:h-80 lg:h-[28rem] rounded-lg overflow-hidden order-1"
          >
            <Image
              src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958255/sah-marketing/heritage-field.jpg"
              alt="Golden agricultural fields of Pakistan at harvest"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sah-earth/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-xl sm:text-2xl italic text-white">Faisalabad, Pakistan</p>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="order-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-6"
            >
              EST. 1985 · FAMILY TRADITION
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl md:text-5xl italic text-sah-charcoal mb-6 leading-tight"
            >
              Family Trading Roots Since 1985
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="font-body text-base sm:text-lg leading-relaxed text-sah-charcoal"
            >
              For nearly four decades, our family has built trust through consistent quality and transparent relationships. From our mills in Faisalabad to buyers worldwide, we bring deep knowledge of agricultural sourcing, rigorous quality evaluation, and reliable supply chains that have defined our reputation.
            </motion.p>
          </div>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col h-full">
                {/* Icon circle */}
                <div className="w-12 h-12 rounded-full bg-sah-gold/15 flex items-center justify-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-sah-gold" />
                </div>

                {/* Label */}
                <h3 className="font-display text-xl italic text-sah-charcoal mb-4">
                  {pillar.label}
                </h3>

                {/* Description */}
                <p className="font-body text-sm leading-relaxed text-sah-charcoal/80">
                  {pillar.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 pt-6 border-t border-sah-gold/20 flex-grow" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
