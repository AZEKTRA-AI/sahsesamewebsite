'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'

const steps = [
  { title: 'Buyer specifications', description: 'Your exact grade, purity, and packing requirements.' },
  { title: 'Supplier selection', description: 'Matching the lot to a processor we have vetted.' },
  { title: 'Lot inspection', description: 'Physical assessment of the standing inventory.' },
  { title: 'Sample preparation', description: 'Representative samples drawn and dispatched.' },
  { title: 'Lab testing', description: 'Moisture, FFA, purity, and admixture analysis.' },
  { title: 'Buyer approval', description: 'Your written sign-off before anything moves.' },
  { title: 'Processing', description: 'Cleaning, grading, and packing under supervision.' },
  { title: 'Pre-shipment QA', description: 'Third-party inspection at the loading point.' },
  { title: 'Documentation', description: 'Full export paperwork prepared per destination.' },
  { title: 'Shipment', description: 'Dispatched on your chosen incoterm from Karachi.' },
]

const pillars = [
  { label: 'Batch testing', desc: 'Lab analysis matched to each shipment lot' },
  { label: 'Product sampling', desc: 'Representative samples sent for approval' },
  { label: 'Pre-shipment QA', desc: 'Third-party inspection by SGS or Intertek' },
  { label: 'Traceability', desc: 'Complete documentation and audit trail' },
]

export default function QualityProcess() {
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
          src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958261/sah-marketing/quality-lab-testing.jpg"
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
          eyebrow="Quality & sourcing"
          title="Ten steps between your spec and the vessel"
          lead="Every order runs the same route. Nothing ships until each stage is signed off and documented."
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
          {steps.map((step, idx) => (
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
            {pillars.map((pillar) => (
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
