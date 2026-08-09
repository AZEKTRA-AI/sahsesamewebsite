'use client'

import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import Counter from '@/components/ui/Counter'
import type { homeTradingRootsBlock } from '@/lib/content/blocks'

const FOUNDED = 1985
const YEARS = new Date().getFullYear() - FOUNDED

export default function TradingRootsSection({
  content,
}: {
  content: typeof homeTradingRootsBlock.defaults
}) {
  return (
    <section className="relative overflow-hidden border-b border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
      <div className="container-wide">
        {/* Asymmetric split: photo runs wider than the copy and sits lower. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-7">
            <Reveal direction="right" duration={0.9}>
              <ParallaxImage
                src={content.image}
                alt={content.imageAlt}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-72 rounded-panel shadow-lift-lg sm:h-96 lg:h-[30rem]"
                distance={40}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-sah-earth/70 via-sah-earth/10 to-transparent"
                />
                <p className="absolute bottom-6 left-6 right-6 font-display text-xl italic text-white sm:text-2xl">
                  {content.imageCaption}
                </p>
              </ParallaxImage>
            </Reveal>

            {/* Overlapping glass badge — breaks the rectangle and adds depth. */}
            <Reveal delay={0.25} direction="up">
              <div className="glass mx-auto -mt-10 w-[85%] rounded-card px-6 py-5 sm:absolute sm:-bottom-8 sm:-right-6 sm:mt-0 sm:w-auto lg:-right-10">
                <p className="font-display text-3xl italic text-sah-charcoal">
                  <Counter value={YEARS} suffix=" yrs" />
                </p>
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-sah-charcoal/55">
                  {content.badgeLabel}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow={content.tagline}
              title={content.title}
              size="md"
              lead={content.lead}
            />

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-sah-charcoal/70">
                {content.paragraph}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Pillars */}
        <RevealGroup className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-sah-gold/15 sm:mt-28 md:grid-cols-3">
          {content.pillars.map((pillar, idx) => (
            <RevealItem key={pillar.label} className="bg-sah-cream">
              <div className="group h-full bg-sah-cream p-8 transition-colors duration-300 ease-out-expo hover:bg-white">
                <p className="font-display text-4xl text-sah-gold/25 transition-colors duration-300 group-hover:text-sah-gold/50">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 font-display text-xl italic text-sah-charcoal">
                  {pillar.label}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-sah-charcoal/70">
                  {pillar.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
