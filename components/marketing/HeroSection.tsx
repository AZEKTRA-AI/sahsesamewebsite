'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Counter from '@/components/ui/Counter'
import Magnetic from '@/components/ui/Magnetic'
import useReducedMotionSafe from '@/components/ui/useReducedMotionSafe'

const EASE = [0.23, 1, 0.32, 1] as const

const FOUNDED = 1985
const YEARS = new Date().getFullYear() - FOUNDED

const LINES = ['From the Mills of Pakistan', 'to Markets Worldwide']

export default function HeroSection() {
  // Safe variant: this value picks which styles render, so it must not differ
  // between the server and the first client paint.
  const reduceMotion = useReducedMotionSafe()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // The photo drifts and the copy lifts slightly as the hero scrolls away.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden bg-sah-earth"
    >
      {/* Warm ambient wash so the dark field isn't a flat block of colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 80% at 12% 0%, rgba(196,163,97,0.16), transparent 58%), radial-gradient(80% 70% at 92% 100%, rgba(196,163,97,0.09), transparent 62%)',
        }}
      />

      {/* Ghost year-count watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-[6%]"
      >
        <span className="select-none font-display text-[140px] font-bold leading-none text-white/[0.05] sm:text-[220px] md:text-[300px] lg:text-[380px] xl:text-[440px]">
          {YEARS}
        </span>
      </div>

      {/* Stacked on mobile, 55/45 split on desktop */}
      <div className="relative flex flex-col lg:min-h-[30rem] lg:flex-row lg:items-stretch xl:min-h-[34rem]">
        {/* Photo — top band on mobile, right panel on desktop */}
        <div className="relative order-1 h-[30vh] w-full min-h-[13rem] sm:h-[34vh] lg:order-2 lg:h-auto lg:w-[45%]">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 z-10 hidden h-full w-px bg-gradient-to-b from-transparent via-sah-gold/35 to-transparent lg:block"
          />

          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <motion.div
              className="absolute -inset-y-[8%] inset-x-0"
              style={{ y: reduceMotion ? 0 : imageY }}
            >
              <Image
                src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg"
                alt="Export-grade Pakistani sesame seeds photographed up close"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </motion.div>

            {/* Blend the photo into the dark field on every breakpoint. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-sah-earth/30 via-transparent to-sah-earth lg:bg-gradient-to-r lg:from-sah-earth lg:via-sah-earth/10 lg:to-transparent"
            />
          </motion.div>
        </div>

        {/* Copy */}
        <motion.div
          className="order-2 flex w-full items-center lg:order-1 lg:w-[55%]"
          style={
            reduceMotion ? { y: 0, opacity: 1 } : { y: copyY, opacity: copyOpacity }
          }
        >
          <div className="container-wide w-full py-10 sm:py-14 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 flex items-center gap-3 sm:mb-7"
            >
              <span className="h-px w-8 bg-sah-gold/60" />
              <p className="font-body text-[10px] uppercase tracking-[0.28em] text-sah-gold sm:text-[11px] sm:tracking-[0.32em]">
                Established {FOUNDED} · Faisalabad, Pakistan
              </p>
            </motion.div>

            <div className="max-w-2xl">
              <h1 className="display-xl mb-5 text-4xl text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl">
                {LINES.map((line, lineIdx) => (
                  <span key={lineIdx} className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                      className="block"
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        delay: 0.12 + lineIdx * 0.11,
                        duration: 0.95,
                        ease: EASE,
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="mb-7 max-w-lg font-body text-base leading-relaxed text-white/65 sm:mb-9 sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
              >
                Family-run sesame, pulses, and rice — export-grade, since {FOUNDED}.
              </motion.p>

              <motion.div
                className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.7, ease: EASE }}
              >
                <Magnetic strength={0.22} className="w-full sm:w-auto">
                  <Link href="#rfq-form" className="btn-primary w-full sm:w-auto">
                    Request a quotation
                  </Link>
                </Magnetic>
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2 px-2 py-3 font-body font-medium text-white/85 transition-colors duration-200 hover:text-sah-gold active:scale-[0.97]"
                >
                  See our products
                  <svg
                    className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </motion.div>

              {/* Stats — glass panel rather than three bare numbers */}
              <motion.dl
                className="glass-dark grid max-w-lg grid-cols-3 divide-x divide-white/10 rounded-card px-1 py-4 sm:py-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.7, ease: EASE }}
              >
                <div className="px-3 sm:px-5">
                  <dt className="sr-only">Years in trade</dt>
                  <dd className="font-display text-2xl text-sah-gold sm:text-3xl">
                    <Counter value={YEARS} />
                  </dd>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Years
                  </p>
                </div>
                <div className="px-3 sm:px-5">
                  <dt className="sr-only">Product categories</dt>
                  <dd className="font-display text-2xl text-sah-gold sm:text-3xl">
                    <Counter value={3} />
                  </dd>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Categories
                  </p>
                </div>
                <div className="px-3 sm:px-5">
                  <dt className="sr-only">Incoterms offered</dt>
                  <dd className="font-display text-sm text-sah-gold sm:text-base">
                    FOB · CFR · CIF
                  </dd>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Shipping
                  </p>
                </div>
              </motion.dl>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <span className="relative flex h-9 w-[22px] items-start justify-center rounded-full border border-sah-gold/35 pt-1.5">
          <span className="h-1.5 w-[3px] rounded-full bg-sah-gold animate-scroll-hint" />
        </span>
      </div>
    </section>
  )
}
