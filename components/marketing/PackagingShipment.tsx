'use client'

import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SpotlightCard from '@/components/ui/SpotlightCard'
import type { homePackagingBlock } from '@/lib/content/blocks'

export default function PackagingShipment({
  content,
}: {
  content: typeof homePackagingBlock.defaults
}) {
  return (
    <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
      <div className="container-wide">
        <SectionIntro eyebrow={content.tagline} title={content.title} lead={content.lead} />

        {/* Port banner with an overlapping glass caption */}
        <Reveal className="relative mt-12 sm:mt-16" duration={0.85}>
          <ParallaxImage
            src={content.portImage}
            alt={content.portImageAlt}
            sizes="100vw"
            className="h-64 rounded-panel shadow-lift-lg sm:h-80 lg:h-[26rem]"
            distance={50}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-sah-earth/85 via-sah-earth/35 to-transparent"
            />
          </ParallaxImage>

          <div className="glass-dark absolute bottom-6 left-6 right-6 rounded-card p-6 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-md sm:p-8">
            <p className="font-display text-2xl italic leading-tight text-white sm:text-3xl">
              {content.portCaptionTitle}
            </p>
            <p className="mt-3 font-body text-sm text-white/65">{content.portCaptionText}</p>
          </div>
        </Reveal>

        {/* Packaging + terms */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal blur={false}>
              <h3 className="font-display text-2xl italic text-sah-charcoal">
                Packaging options
              </h3>
            </Reveal>

            <RevealGroup className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2" stagger={0.05}>
              {content.packagingOptions.map((option) => (
                <RevealItem key={option.label}>
                  <SpotlightCard className="h-full rounded-card border border-sah-gold/15 bg-white p-5 transition-[border-color,transform] duration-300 ease-out-expo hover:border-sah-gold/40 hover:-translate-y-0.5">
                    <p className="font-body text-sm font-medium text-sah-charcoal">
                      {option.label}
                    </p>
                    <p className="mt-1 font-body text-xs text-sah-charcoal/55">{option.note}</p>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="lg:col-span-5">
            <Reveal blur={false}>
              <h3 className="font-display text-2xl italic text-sah-charcoal">Shipping terms</h3>
            </Reveal>

            <RevealGroup className="mt-7 overflow-hidden rounded-card border border-sah-gold/15 bg-white">
              {content.shippingTerms.map((term, idx) => (
                <RevealItem key={term.label}>
                  <div
                    className={`p-5 transition-colors duration-200 hover:bg-sah-cream ${
                      idx > 0 ? 'border-t border-sah-gold/12' : ''
                    }`}
                  >
                    <h4 className="font-display text-lg italic text-sah-charcoal">
                      {term.label}
                    </h4>
                    <p className="mt-1 font-body text-sm text-sah-charcoal/65">
                      {term.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-16 lg:mt-24">
          <Reveal>
            <h3 className="font-display text-2xl italic text-sah-charcoal">
              Export documentation
            </h3>
            <p className="mt-3 max-w-2xl font-body text-sah-charcoal/65">
              Prepared per product, destination requirement, and contractual term — checked
              before the container is sealed.
            </p>
          </Reveal>

          <RevealGroup className="mt-7 flex flex-wrap gap-2.5" stagger={0.035}>
            {content.docs.map((doc) => (
              <RevealItem key={doc}>
                <span className="inline-flex items-center gap-2 rounded-lg border border-sah-gold/20 bg-white px-4 py-2.5 font-body text-sm text-sah-charcoal/80 transition-[border-color,color] duration-200 hover:border-sah-gold/50 hover:text-sah-charcoal">
                  <span className="h-1 w-1 rotate-45 bg-sah-gold" aria-hidden="true" />
                  {doc}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
