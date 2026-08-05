'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  const words = ['From the Mills of Pakistan', 'to Markets Worldwide']

  return (
    <section className="relative bg-sah-earth overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" /%3E%3C/filter%3E%3Crect width="400" height="400" filter="url(%23noiseFilter)" opacity="0.5"/%3E%3C/svg%3E")',
        backgroundSize: '200px 200px',
      }} />

      {/* Ghost number watermark "37" - scales down on smaller screens, clipped by overflow-hidden */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="font-display text-[160px] sm:text-[260px] md:text-[400px] lg:text-[560px] xl:text-[700px] font-bold text-white/[0.06] leading-none select-none">
          37
        </div>
      </div>

      {/* Stacked on mobile/tablet, 55/45 split on desktop */}
      <div className="relative flex flex-col lg:flex-row lg:min-h-screen">
        {/* Image panel - shown first (top) on mobile, right side on desktop */}
        <div className="relative order-1 lg:order-2 w-full lg:w-[45%] h-[42vh] sm:h-[48vh] lg:h-auto">
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-sah-gold/20 z-10" />

          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Image
              src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg"
              alt="Premium sesame seeds - Pakistani agricultural heritage"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            {/* Gradient blending image into dark earth background below/beside it */}
            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-sah-earth lg:to-transparent lg:from-sah-earth/40" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sah-earth to-transparent lg:hidden" />
          </motion.div>
        </div>

        {/* Text content panel */}
        <div className="order-2 lg:order-1 w-full lg:w-[55%] flex items-center">
          <div className="container-wide w-full py-12 sm:py-16 lg:py-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-sah-gold font-body text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 sm:mb-8"
            >
              ESTABLISHED 1985 · FAISALABAD, PAKISTAN
            </motion.div>

            <div className="max-w-2xl">
              {/* Main headline - split word reveals */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic leading-tight text-white mb-6 sm:mb-8">
                {words.map((line, lineIdx) => (
                  <div key={lineIdx}>
                    {line.split(' ').map((word, wordIdx) => (
                      <motion.span
                        key={`${lineIdx}-${wordIdx}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1 + (lineIdx * 2 + wordIdx) * 0.08,
                          duration: 0.6,
                          ease: 'easeOut',
                        }}
                        className="inline-block mr-2"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </h1>

              {/* Supporting line */}
              <motion.p
                className="font-body text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Family-run sesame, pulses, and rice — export-grade, since 1985.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Link href="#rfq-form" className="btn-primary text-center">
                  Request a Quotation
                </Link>
                <Link
                  href="/products/sesame"
                  className="px-6 py-3 text-white font-body font-medium hover:text-sah-gold transition-colors text-center"
                >
                  See our products →
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-sah-gold">37</div>
                  <div className="font-body text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">Years</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-sah-gold">3</div>
                  <div className="font-body text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">Categories</div>
                </div>
                <div>
                  <div className="font-display text-xs sm:text-sm text-sah-gold">FOB · CFR · CIF</div>
                  <div className="font-body text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">Shipping</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden sm:block absolute bottom-6 left-1/2 transform -translate-x-1/2"
        animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-sah-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
