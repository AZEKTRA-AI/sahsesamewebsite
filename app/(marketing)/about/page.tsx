import Link from 'next/link'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SpotlightCard from '@/components/ui/SpotlightCard'
import Counter from '@/components/ui/Counter'
import { getContentMap } from '@/lib/content/store'
import {
  aboutHeroBlock,
  aboutHeritageBlock,
  aboutMilestonesBlock,
  aboutFactsBlock,
  aboutBannerBlock,
  aboutCtaBlock,
  globalContactBlock,
} from '@/lib/content/blocks'

// See app/(marketing)/page.tsx for why this exists on every content-driven page.
export const revalidate = 60

export const metadata = {
  title: 'About us',
  description:
    'Sain Abdul Hakim and Company — a Faisalabad family business trading sesame, pulses, and rice since 1985.',
}

const FOUNDED = 1985
const YEARS = new Date().getFullYear() - FOUNDED

export default async function AboutPage() {
  const { hero, heritage, milestones, facts, banner, cta, contact } = await getContentMap({
    hero: aboutHeroBlock,
    heritage: aboutHeritageBlock,
    milestones: aboutMilestonesBlock,
    facts: aboutFactsBlock,
    banner: aboutBannerBlock,
    cta: aboutCtaBlock,
    contact: globalContactBlock,
  })

  return (
    <>
      <PageHero
        eyebrow={hero.tagline}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Heritage */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionIntro eyebrow={heritage.tagline} title={heritage.title} size="md" />
            <Reveal delay={0.15}>
              <p className="mt-6 font-body text-base leading-relaxed text-sah-charcoal/75 sm:text-lg">
                {heritage.paragraph1}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-5 font-body text-base leading-relaxed text-sah-charcoal/75 sm:text-lg">
                {heritage.paragraph2}
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid grid-cols-3 gap-6" stagger={0.08}>
              <RevealItem>
                <p className="font-display text-3xl italic text-sah-gold">
                  <Counter value={YEARS} />
                </p>
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-sah-charcoal/55">
                  Years trading
                </p>
              </RevealItem>
              {heritage.stats.map((stat) => (
                <RevealItem key={stat.label}>
                  <p className="font-display text-3xl italic text-sah-gold">
                    <Counter value={stat.value} />
                  </p>
                  <p className="mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-sah-charcoal/55">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="lg:col-span-6" direction="left" duration={0.9}>
            <ParallaxImage
              src={heritage.image}
              alt={heritage.imageAlt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-80 rounded-panel shadow-lift-lg sm:h-[28rem]"
              distance={40}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-sah-earth/45 to-transparent"
              />
            </ParallaxImage>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro eyebrow={milestones.tagline} title={milestones.title} lead={milestones.lead} />

          <RevealGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-panel bg-sah-gold/15 sm:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {milestones.items.map((milestone) => (
              <RevealItem key={milestone.year + milestone.title} className="h-full">
                <article className="group h-full bg-sah-cream p-7 transition-colors duration-300 ease-out-expo hover:bg-white">
                  <p className="tnum font-display text-2xl italic text-sah-gold">
                    {milestone.year}
                  </p>
                  <div className="mt-4 h-px w-10 bg-sah-gold/35 transition-[width] duration-300 ease-out-expo group-hover:w-16" />
                  <h3 className="mt-4 font-display text-lg italic leading-snug text-sah-charcoal">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-sah-charcoal/65">
                    {milestone.description}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro eyebrow={facts.tagline} title={facts.title} />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3">
            {facts.items.map((fact, idx) => (
              <RevealItem key={fact.title} className="h-full">
                <SpotlightCard className="group h-full rounded-card border border-sah-gold/15 bg-sah-light p-8 transition-[border-color,background-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/40 hover:bg-white">
                  <p className="tnum font-display text-4xl text-sah-gold/25 transition-colors duration-300 group-hover:text-sah-gold/50">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-5 font-display text-xl italic text-sah-charcoal">
                    {fact.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-sah-charcoal/65">
                    {fact.description}
                  </p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Facilities */}
      {contact.facilities.length > 0 && (
        <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
          <div className="container-wide">
            <SectionIntro
              eyebrow="Our facilities"
              title="The mills behind every shipment"
              lead="Every lot is cleaned, graded, and packed inside our own facilities in Faisalabad — not outsourced to a third party."
            />

            <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:mt-16" stagger={0.1}>
              {contact.facilities.map((facility, idx) => (
                <RevealItem key={facility.name}>
                  <SpotlightCard className="group rounded-card border border-sah-gold/15 bg-white p-8 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/40 sm:p-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                      <div className="sm:flex-1">
                        <p className="tnum font-display text-3xl text-sah-gold/25 transition-colors duration-300 group-hover:text-sah-gold/50">
                          {String(idx + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-3 font-display text-2xl italic text-sah-charcoal">
                          {facility.name}
                        </h3>
                        {facility.description && (
                          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-sah-charcoal/65">
                            {facility.description}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 border-t border-sah-gold/12 pt-5 sm:max-w-xs sm:border-t-0 sm:border-l sm:pl-10 sm:pt-0">
                        <p className="font-body text-[11px] uppercase tracking-[0.2em] text-sah-gold">
                          Address
                        </p>
                        <p className="mt-2 whitespace-pre-line font-body text-sm text-sah-charcoal/70">
                          {facility.address}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Full-bleed field banner */}
      <section aria-label="Our sourcing region" className="relative">
        <ParallaxImage
          src={banner.image}
          alt={banner.imageAlt}
          sizes="100vw"
          className="h-72 sm:h-96 lg:h-[30rem]"
          distance={60}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-sah-earth/85 via-sah-earth/40 to-transparent"
          />
          <div className="container-wide absolute inset-0 flex items-center">
            <div className="max-w-lg">
              <p className="font-display text-2xl italic leading-tight text-white sm:text-4xl">
                {banner.title}
              </p>
              <p className="mt-4 font-body text-sm text-white/70 sm:text-base">{banner.text}</p>
              <Link
                href="/quality-process"
                className="group mt-6 inline-flex items-center gap-2 font-body text-sm font-medium text-sah-gold transition-colors duration-200 hover:text-white active:scale-[0.97]"
              >
                {banner.linkLabel}
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
          </div>
        </ParallaxImage>
      </section>

      <div className="bg-white py-20 sm:py-28">
        <PageCTA title={cta.title} subtitle={cta.subtitle} />
      </div>
    </>
  )
}
