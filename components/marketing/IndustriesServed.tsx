'use client'

import Link from 'next/link'
import Image from 'next/image'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import SpotlightCard from '@/components/ui/SpotlightCard'
import type { homeIndustriesBlock } from '@/lib/content/blocks'

export default function IndustriesServed({
  content,
}: {
  content: typeof homeIndustriesBlock.defaults
}) {
  const first = content.industries.slice(0, 3)
  const rest = content.industries.slice(3)

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-wide">
        <SectionIntro eyebrow={content.tagline} title={content.title} lead={content.lead} />

        {/* Bento: trade tiles interleaved with a photo and a closing panel. */}
        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.05}
        >
          {first.map((industry, idx) => (
            <IndustryTile key={industry.title} industry={industry} index={idx} />
          ))}

          {/* Photo tile breaks up the run of text cards. */}
          <RevealItem className="h-full">
            <div className="relative h-full min-h-[13rem] overflow-hidden rounded-card">
              <Image
                src={content.photoImage}
                alt={content.photoAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-sah-earth/85 via-sah-earth/25 to-transparent"
              />
              <p className="absolute bottom-5 left-5 right-5 font-display text-lg italic text-white">
                {content.photoCaption}
              </p>
            </div>
          </RevealItem>

          {rest.map((industry, idx) => (
            <IndustryTile key={industry.title} industry={industry} index={idx + 3} />
          ))}

          {/* Closing panel completes the final row instead of leaving a gap. */}
          <RevealItem className="h-full">
            <div className="grain relative flex h-full min-h-[13rem] flex-col justify-between overflow-hidden rounded-card bg-sah-earth p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(90% 70% at 20% 0%, rgba(196,163,97,0.22), transparent 65%)',
                }}
              />
              <div className="relative">
                <h3 className="font-display text-xl italic text-white">{content.closingTitle}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/65">
                  {content.closingText}
                </p>
              </div>
              <Link
                href="/contact"
                className="group relative mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-sah-gold transition-colors duration-200 hover:text-white active:scale-[0.97]"
              >
                {content.closingLinkLabel}
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
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}

function IndustryTile({
  industry,
  index,
}: {
  industry: { title: string; description: string }
  index: number
}) {
  return (
    <RevealItem className="h-full">
      <SpotlightCard className="group flex h-full min-h-[13rem] flex-col justify-between rounded-card border border-sah-gold/15 bg-sah-light p-6 transition-[border-color,background-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/40 hover:bg-white">
        <p className="tnum font-display text-3xl text-sah-gold/20 transition-colors duration-300 group-hover:text-sah-gold/45">
          {String(index + 1).padStart(2, '0')}
        </p>
        <div>
          <h3 className="font-display text-lg italic leading-tight text-sah-charcoal transition-colors duration-200 group-hover:text-sah-gold">
            {industry.title}
          </h3>
          <p className="mt-2 font-body text-sm text-sah-charcoal/60">{industry.description}</p>
        </div>
      </SpotlightCard>
    </RevealItem>
  )
}
