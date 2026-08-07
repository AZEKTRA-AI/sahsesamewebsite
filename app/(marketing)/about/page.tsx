import Link from 'next/link'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SpotlightCard from '@/components/ui/SpotlightCard'
import Counter from '@/components/ui/Counter'

export const metadata = {
  title: 'About us',
  description:
    'Sain Abdul Hakim & Company — a Faisalabad family business trading sesame, pulses, and rice since 1985.',
}

const FOUNDED = 1985
const YEARS = new Date().getFullYear() - FOUNDED

const facts = [
  {
    title: `${YEARS} years in the trade`,
    description:
      'Family trading roots in the pulses business since 1985, later extended into sesame and rice for export.',
  },
  {
    title: 'Sourced at origin',
    description:
      'Supplier relationships built over decades in Faisalabad give us first call on quality lots and honest pricing.',
  },
  {
    title: 'Terms that fit you',
    description:
      'Shipments arranged FOB, CFR, or CIF, with documentation prepared for your destination’s requirements.',
  },
]

const milestones = [
  {
    year: '1985',
    title: 'The family enters the pulses trade',
    description:
      'Trading begins at the New Grain Market in Faisalabad, buying and grading pulses for the domestic wholesale trade.',
  },
  {
    year: '1990s',
    title: 'Milling brought in-house',
    description:
      'Two mills come under family ownership, moving cleaning and grading out of third-party hands and under our own supervision.',
  },
  {
    year: '2000s',
    title: 'First export contracts',
    description:
      'Relationships with importers across the Middle East and South Asia turn a domestic trading house into an exporter.',
  },
  {
    year: 'Today',
    title: 'Three categories, one desk',
    description:
      'Sesame, pulses, and rice supplied to processors, wholesalers, and private-label producers worldwide.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Established ${FOUNDED} · Faisalabad, Pakistan`}
        title="A family name on every container"
        subtitle="Four decades of grading, milling, and shipping Pakistani agricultural commodities — run by the same family that started it."
        image="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958255/sah-marketing/heritage-field.jpg"
        imageAlt="Golden fields of the Punjab at harvest"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Heritage */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionIntro
              eyebrow="Our heritage"
              title="Four decades of trust, one family name"
              size="md"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 font-body text-base leading-relaxed text-sah-charcoal/75 sm:text-lg">
                Sain Abdul Hakim &amp; Company has traded agricultural commodities for
                nearly forty years. What began in the pulses business in {FOUNDED} now
                combines old-fashioned grading judgement with the documentation and
                inspection standards international buyers expect.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-5 font-body text-base leading-relaxed text-sah-charcoal/75 sm:text-lg">
                We sit in Faisalabad, in the middle of Pakistan’s agricultural belt.
                That proximity is the whole point: we see the lots, we know the
                processors, and we can answer for what goes into the bag.
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
              <RevealItem>
                <p className="font-display text-3xl italic text-sah-gold">
                  <Counter value={2} />
                </p>
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-sah-charcoal/55">
                  Own mills
                </p>
              </RevealItem>
              <RevealItem>
                <p className="font-display text-3xl italic text-sah-gold">
                  <Counter value={10} />
                </p>
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-sah-charcoal/55">
                  Export products
                </p>
              </RevealItem>
            </RevealGroup>
          </div>

          <Reveal className="lg:col-span-6" direction="left" duration={0.9}>
            <ParallaxImage
              src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958248/sah-marketing/about-hands-grain.jpg"
              alt="Hands running through freshly milled grain"
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
          <SectionIntro
            eyebrow="How we got here"
            title="From a market stall to a shipping line"
            lead="No sudden pivot, no rebrand — just the same trade, done at a larger scale each decade."
          />

          <RevealGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-panel bg-sah-gold/15 sm:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone) => (
              <RevealItem key={milestone.year} className="h-full">
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
          <SectionIntro
            eyebrow="Why we’re different"
            title="What buyers actually get"
          />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3">
            {facts.map((fact, idx) => (
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

      {/* Full-bleed field banner */}
      <section aria-label="Our sourcing region" className="relative">
        <ParallaxImage
          src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958245/sah-marketing/about-farmer-field.jpg"
          alt="A grower walking the crop rows before harvest"
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
                Everything starts in the Punjab
              </p>
              <p className="mt-4 font-body text-sm text-white/70 sm:text-base">
                Sesame from the central belt, rice from Gujranwala and Sheikhupura,
                pulses milled in Faisalabad — all within a day’s drive of our office.
              </p>
              <Link
                href="/quality-process"
                className="group mt-6 inline-flex items-center gap-2 font-body text-sm font-medium text-sah-gold transition-colors duration-200 hover:text-white active:scale-[0.97]"
              >
                See how we grade and test
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
        <PageCTA
          title="Ready to work together?"
          subtitle="Send us a specification and we will come back with grades, packing options, and a price."
        />
      </div>
    </>
  )
}
