import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SpotlightCard from '@/components/ui/SpotlightCard'

export const metadata = {
  title: 'Quality & process',
  description:
    'The ten-step sourcing and quality process behind every SAH shipment — verification, lab testing, grading, inspection, and documentation.',
}

const processSteps = [
  {
    title: 'Supplier verification',
    description:
      'We buy only from processors whose plants we have walked and whose output we have graded ourselves.',
  },
  {
    title: 'Batch inspection',
    description:
      'Each lot is checked for quality, origin authenticity, and the condition of the packaging it arrives in.',
  },
  {
    title: 'Lab testing',
    description:
      'Moisture, purity, oil content, free fatty acids, and contaminant screening against your ceiling values.',
  },
  {
    title: 'Grading & sorting',
    description:
      'Sortex cleaning and grading to international standards or to whatever the contract specifies.',
  },
  {
    title: 'Third-party inspection',
    description:
      'Independent verification through SGS or Intertek arranged at the loading point on request.',
  },
  {
    title: 'Customised packaging',
    description:
      'Bag size, liner, and artwork set by the buyer — including full private-label runs.',
  },
  {
    title: 'Documentation',
    description:
      'Certificates of analysis and origin, phytosanitary and fumigation papers, prepared per destination.',
  },
  {
    title: 'Storage & handling',
    description:
      'Controlled storage between processing and loading so moisture does not creep back into the lot.',
  },
  {
    title: 'Logistics coordination',
    description:
      'Booking, inland haulage, and vessel scheduling under FOB, CFR, or CIF terms.',
  },
  {
    title: 'Delivery confirmation',
    description:
      'We stay on the file after discharge — discrepancies get answered, not deflected.',
  },
]

const commitments = [
  {
    title: 'Transparency',
    description:
      'Every batch carries its specification, test results, and origin certificate. Nothing is asserted without paper behind it.',
  },
  {
    title: 'Consistency',
    description:
      'The same grading discipline on the tenth container as on the first, whether the market is tight or long.',
  },
  {
    title: 'Compliance',
    description:
      'Products meet international food safety requirements and the export regulations of the destination market.',
  },
]

export default function QualityProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & sourcing"
        title="Ten checkpoints between the field and your warehouse"
        subtitle="Nothing leaves Pakistan on our account until every stage below has been signed off and documented."
        image="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958261/sah-marketing/quality-lab-testing.jpg"
        imageAlt="Laboratory technician testing a grain sample"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Quality & process' }]}
      />

      {/* Process */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionIntro
                eyebrow="The process"
                title="How a lot becomes a shipment"
                lead="Same route every time, regardless of product or destination."
                size="md"
              />
            </div>
          </div>

          <RevealGroup className="lg:col-span-8" stagger={0.05}>
            <ol className="border-t border-sah-gold/15">
              {processSteps.map((step, idx) => (
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
          src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958261/sah-marketing/quality-lab-testing.jpg"
          alt="Grain samples prepared for laboratory analysis"
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
              Every batch tested. Every shipment verified.
            </p>
          </div>
        </ParallaxImage>
      </section>

      {/* Commitments */}
      <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro
            eyebrow="Our commitments"
            title="Principles we hold to"
            lead="These are not marketing lines — they are the terms we expect to be held to on a claim."
          />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3" stagger={0.09}>
            {commitments.map((item, idx) => (
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
              Independent inspection is arranged through SGS or Intertek at the buyer’s
              election. Where a destination market requires additional certification, we
              obtain it before loading rather than after.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="bg-white py-20 sm:py-28">
        <PageCTA
          title="Want the full specification sheet?"
          subtitle="We will send typical analysis ranges for any product, plus a sample if you need one."
          primaryLabel="Contact the export desk"
        />
      </div>
    </>
  )
}
