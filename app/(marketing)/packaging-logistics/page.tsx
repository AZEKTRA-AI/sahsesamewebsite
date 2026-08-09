import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { getContentMap } from '@/lib/content/store'
import {
  packagingHeroBlock,
  packagingOptionsBlock,
  packagingIncotermsBlock,
  packagingBannerBlock,
  packagingProcessBlock,
  packagingDocsBlock,
  packagingCtaBlock,
} from '@/lib/content/blocks'

export const metadata = {
  title: 'Packaging & logistics',
  description:
    'Packing formats, incoterms, transit times, and export documentation for SAH shipments out of Karachi Port.',
}

export default async function PackagingLogisticsPage() {
  const { hero, options, incoterms, banner, process, docs, cta } = await getContentMap({
    hero: packagingHeroBlock,
    options: packagingOptionsBlock,
    incoterms: packagingIncotermsBlock,
    banner: packagingBannerBlock,
    process: packagingProcessBlock,
    docs: packagingDocsBlock,
    cta: packagingCtaBlock,
  })

  return (
    <>
      <PageHero
        eyebrow={hero.tagline}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Packaging & logistics' }]}
      />

      {/* Packaging */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro eyebrow={options.tagline} title={options.title} lead={options.lead} />

          <RevealGroup
            className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {options.items.map((option, idx) => (
              <RevealItem key={option.title} className="h-full">
                <SpotlightCard className="group h-full rounded-card border border-sah-gold/15 bg-sah-light p-7 transition-[border-color,background-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-sah-gold/40 hover:bg-white">
                  <p className="tnum font-display text-3xl text-sah-gold/25 transition-colors duration-300 group-hover:text-sah-gold/50">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-display text-lg italic text-sah-charcoal">
                    {option.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-sah-charcoal/65">
                    {option.description}
                  </p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Incoterms */}
      <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionIntro
                eyebrow={incoterms.tagline}
                title={incoterms.title}
                lead={incoterms.lead}
                size="md"
              />
            </div>
          </div>

          <RevealGroup className="space-y-4 lg:col-span-8" stagger={0.09}>
            {incoterms.items.map((item) => (
              <RevealItem key={item.term}>
                <article className="group flex flex-col gap-5 rounded-card border border-sah-gold/15 bg-white p-6 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-sah-gold/40 sm:flex-row sm:items-center sm:p-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card bg-sah-gold/10 transition-colors duration-300 group-hover:bg-sah-gold/20">
                    <span className="font-display text-xl italic text-sah-gold">{item.term}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl italic text-sah-charcoal">{item.full}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-sah-charcoal/65">
                      {item.description}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Port banner */}
      <section aria-label="Shipping partners" className="relative">
        <ParallaxImage
          src={banner.image}
          alt={banner.imageAlt}
          sizes="100vw"
          className="h-64 sm:h-80 lg:h-96"
          distance={55}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-sah-earth/88 via-sah-earth/50 to-transparent"
          />
          <div className="container-wide absolute inset-0 flex items-center">
            <p className="max-w-xl font-display text-2xl italic leading-tight text-white sm:text-4xl">
              {banner.text}
            </p>
          </div>
        </ParallaxImage>
      </section>

      {/* Process */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro eyebrow={process.tagline} title={process.title} lead={process.lead} />

          <RevealGroup className="relative mt-14 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting rule behind the numbers on wide screens. */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-sah-gold/30 to-transparent lg:block"
            />
            {process.steps.map((step, idx) => (
              <RevealItem key={step.title}>
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sah-gold/35 bg-white">
                    <span className="tnum font-display text-sm text-sah-gold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg italic text-sah-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-sah-charcoal/65">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Freight modes */}
          <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-2" stagger={0.1}>
            {process.freight.map((mode) => (
              <RevealItem key={mode.title} className="h-full">
                <SpotlightCard className="h-full rounded-card border border-sah-gold/15 bg-sah-light p-8 transition-[border-color] duration-300 ease-out-expo hover:border-sah-gold/40">
                  <h3 className="font-display text-xl italic text-sah-charcoal">{mode.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-sah-charcoal/65">
                    {mode.description}
                  </p>
                  <p className="mt-5 border-t border-sah-gold/15 pt-4 font-body text-xs uppercase tracking-[0.14em] text-sah-gold">
                    {mode.detail}
                  </p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Documentation */}
      <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro eyebrow={docs.tagline} title={docs.title} lead={docs.lead} />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3" stagger={0.08}>
            {docs.groups.map((group) => (
              <RevealItem key={group.title} className="h-full">
                <div className="h-full rounded-card border border-sah-gold/15 bg-white p-7">
                  <h3 className="font-display text-lg italic text-sah-charcoal">{group.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 font-body text-sm text-sah-charcoal/70"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-sah-gold"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl font-body text-sm text-sah-charcoal/55">
              {docs.footnote}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="bg-white py-20 sm:py-28">
        <PageCTA title={cta.title} subtitle={cta.subtitle} primaryLabel="Get a quote" />
      </div>
    </>
  )
}
