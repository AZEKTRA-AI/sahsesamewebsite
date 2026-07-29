'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-sah-cream via-white to-sah-light overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-80 h-80 bg-sah-green opacity-5 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-sah-gold opacity-5 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-wide relative h-full flex items-center min-h-[600px]">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtitle */}
          <motion.p
            className="text-sah-gold font-medium text-lg mb-4 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Global Agricultural Export
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-sah-charcoal mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Pakistani Sesame Seeds and Pulses for Global Markets
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-sah-charcoal mb-8 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            We source and supply export-grade sesame seeds, pulses, and rice from Pakistan through selected processing and supply partners, supported by buyer-specific specifications, quality inspection, documentation, and flexible packaging.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link href="/request-a-quote" className="btn-primary">
              Request a Quotation
            </Link>
            <Link href="/products/sesame" className="btn-secondary">
              Explore Products
            </Link>
            <a
              href="https://wa.me/923000959524"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-sah-green text-white rounded-lg font-medium hover:bg-sah-charcoal transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.905 10.23.846 1.668 2.355 2.913 4.568 3.557.987.243 2.468.271 3.617.045l.3-.047c1.013-.188 1.969-.644 2.757-1.289.832-.639 1.432-1.613 1.846-2.613.414-1 .645-2.094.645-3.231 0-2.59-1.039-5.02-2.614-6.76-1.575-1.74-3.716-2.747-5.925-2.747zm10.906-9.142c-3.857-3.6-9.648-4.211-14.143-1.432C.904.757-1.25 4.469.825 8.31c1.054 1.93 2.94 3.398 5.228 4.118 2.287.72 4.882.545 6.931-.52 1.339-.688 2.440-1.553 3.268-2.66 1.27-1.7 1.708-3.887 1.241-5.993-.467-2.106-1.609-3.976-3.27-5.195z" />
              </svg>
              WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-sah-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
