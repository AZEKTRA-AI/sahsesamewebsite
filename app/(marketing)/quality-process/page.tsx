import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { getContentMap } from '@/lib/content/store'
import {
  qualityHeroBlock,
  qualityStepsBlock,
  qualityBannerBlock,
  qualityCommitmentsBlock,
  qualityCtaBlock,
} from '@/lib/content/blocks'

// See app/(marketing)/page.tsx for why this exists on every content-driven page.
export const revalidate = 60

export const metadata = {
  title: 'Quality & process',
  description:
    'The step-by-step sourcing and quality process behind every SAH shipment — verification, lab testing, grading, inspection, and documentation.',
}

export default async function QualityProcessPage() {
  const { hero, steps, banner, commitments, cta } = await getContentMap({
    hero: qualityHeroBlock,
    steps: qualityStepsBlock,
    banner: qualityBannerBlock,
    commitments: qualityCommitmentsBlock,
    cta: qualityCtaBlock,
  })

  return (
    <>
      <PageHero
        eyebrow={hero.tagline}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Quality & process' }]}
      />

      {/* Process */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionIntro eyebrow={steps.tagline} title={steps.title} lead={steps.lead} size="md" />
            </div>
          </div>

          <RevealGroup className="lg:col-span-8" stagger={0.05}>
            <ol className="border-t border-sah-gold/15">
              {steps.items.map((step, idx) => (
                <li key={step.title} className="group relative border-b border-sah-gold/15">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 z-10 h-full w-[2px] origin-top scale-y-0 bg-sah-gold transition-transform duration-300 ease-out-expo group-hover:scale-y-100"
                  />
                  <RevealItem>
                    <div className="flex gap-5 py-6 transition-[padding-left,background-color] duration-300 ease-out-expo group-hover:bg-sah-light group-hover:pl-5 sm:gap-7">
                      <span className="tnum shrink-0 pt-1 font-display text-sm text-sah-gold/70">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-display text-xl italic text-sah-charcoal transition-colors duration-200 group-hover:text-sah-gold">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-sah-charcoal/65">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                </li>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </section>

      {/* Lab banner */}
      <section aria-label="Testing standards" className="relative">
        <ParallaxImage
          src={banner.image}
          alt={banner.imageAlt}
          sizes="100vw"
          className="h-64 sm:h-80 lg:h-96"
          distance={55}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-sah-earth/88 via-sah-earth/55 to-sah-earth/25"
          />
          <div className="container-wide absolute inset-0 flex items-center">
            <p className="max-w-xl font-display text-2xl italic leading-tight text-white sm:text-4xl">
              {banner.text}
            </p>
          </div>
        </ParallaxImage>
      </section>

      {/* Commitments */}
      <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro
            eyebrow={commitments.tagline}
            title={commitments.title}
            lead={commitments.lead}
          />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3" stagger={0.09}>
            {commitments.items.map((item, idx) => (
              <RevealItem key={item.title} className="h-full">
                <SpotlightCard className="group h-full rounded-card border border-sah-gold/15 bg-white p-8 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/40">
                  <p className="tnum font-display text-4xl text-sah-gold/25 transition-colors duration-300 group-hover:text-sah-gold/50">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-5 font-display text-xl italic text-sah-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-sah-charcoal/65">
                    {item.description}
                  </p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl font-body text-sm text-sah-charcoal/55">
              {commitments.footnote}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="bg-white py-20 sm:py-28">
        <PageCTA title={cta.title} subtitle={cta.subtitle} primaryLabel="Contact the export desk" />
      </div>
    </>
  )
}
