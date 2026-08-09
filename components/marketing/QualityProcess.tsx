'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import type { homeQualityProcessBlock } from '@/lib/content/blocks'

export default function QualityProcess({
  content,
}: {
  content: typeof homeQualityProcessBlock.defaults
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  })
  // Spring keeps the rail gliding instead of snapping frame to frame.
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.25, 0.55, 0.3])

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-sah-earth py-20 text-white sm:py-28">
      {/* Background photograph, heavily dimmed — depth without noise. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={content.backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sah-earth via-sah-earth/92 to-sah-earth" />
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 50% at 50% 0%, rgba(196,163,97,0.22), transparent 60%)',
          }}
        />
      </motion.div>

      <div className="container-wide relative">
        <SectionIntro
          eyebrow={content.tagline}
          title={content.title}
          lead={content.lead}
          tone="dark"
        />

        {/* Scroll-linked progress rail */}
        <div className="relative mt-14 h-px w-full bg-white/10 sm:mt-20">
          <motion.div
            aria-hidden="true"
            style={{ scaleX: railScale }}
            className="absolute inset-0 origin-left bg-gradient-to-r from-sah-gold/50 via-sah-gold to-sah-gold-soft"
          />
        </div>

        <RevealGroup
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          stagger={0.055}
        >
          {content.steps.map((step, idx) => (
            <RevealItem key={step.title} className="h-full">
              <article className="glass-dark group flex h-full flex-col rounded-card p-5 transition-[background-color,border-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/35 hover:bg-white/[0.09]">
                <p className="tnum font-display text-3xl text-sah-gold/35 transition-colors duration-300 group-hover:text-sah-gold/70">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-base italic text-white">{step.title}</h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-white/55">
                  {step.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Assurance pillars */}
        <Reveal delay={0.15}>
          <div className="glass-dark mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-panel sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {content.pillars.map((pillar) => (
              <div
                key={pillar.label}
                className="p-7 transition-colors duration-300 ease-out-expo hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-sah-gold/35">
                  <span className="h-1.5 w-1.5 rounded-full bg-sah-gold" />
                </div>
                <h3 className="font-display text-lg italic text-sah-gold">{pillar.label}</h3>
                <p className="mt-2 font-body text-sm text-white/60">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
