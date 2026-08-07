import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SpotlightCard from '@/components/ui/SpotlightCard'

export const metadata = {
  title: 'Packaging & logistics',
  description:
    'Packing formats, incoterms, transit times, and export documentation for SAH shipments out of Karachi Port.',
}

const packagingOptions = [
  { title: 'Bags & sacks', description: 'PP woven, jute, or cotton in 25 kg, 50 kg, or bulk fills.' },
  { title: 'Jumbo bags', description: 'One-tonne flexible bulk containers for high-volume contracts.' },
  { title: 'Custom labelling', description: 'Your artwork, language, and barcodes applied on our line.' },
  { title: 'Sealed packaging', description: 'Food-grade inner liners and heat sealing to hold moisture out.' },
  { title: 'Custom sizing', description: 'Any fill weight your distribution or retail channel requires.' },
  { title: 'Recyclable options', description: 'Kraft and recyclable substrates where the market demands them.' },
]

const incoterms = [
  {
    term: 'FOB',
    full: 'Free on board',
    description:
      'We cover the goods, inland haulage, and loading at Karachi Port. You take the freight from the rail.',
  },
  {
    term: 'CFR',
    full: 'Cost and freight',
    description:
      'We cover goods and ocean freight to your named destination port. Insurance stays with you.',
  },
  {
    term: 'CIF',
    full: 'Cost, insurance and freight',
    description:
      'We cover goods, freight, and marine insurance through to the destination port.',
  },
]

const logisticsSteps = [
  { title: 'Preparation', description: 'Cleaned, graded, packed, and marked' },
  { title: 'Transport', description: 'Inland haulage to Karachi Port' },
  { title: 'Shipment', description: 'Ocean freight, or air for samples' },
  { title: 'Delivery', description: 'Discharge and documentation release' },
]

const freight = [
  {
    title: 'Container shipment',
    description:
      'Full container load or LCL consolidation, loaded at Karachi Port with Port Qasim as an alternative.',
    detail: 'Transit 15–30 days depending on destination',
  },
  {
    title: 'Air freight',
    description:
      'Expedited movement for samples, pre-shipment approvals, and small urgent quantities.',
    detail: 'Transit 3–7 days depending on destination',
  },
]

const docs = [
  {
    title: 'Certificates',
    items: ['Certificate of origin', 'Certificate of analysis', 'Phytosanitary certificate', 'Fumigation certificate'],
  },
  {
    title: 'Commercial documents',
    items: ['Commercial invoice', 'Packing list', 'Bill of lading', 'Insurance certificate'],
  },
  {
    title: 'Compliance',
    items: ['Destination regulatory papers', 'Quality assurance records', 'Third-party inspection report'],
  },
]

export default function PackagingLogisticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Delivery & flexibility"
        title="Packed to your spec, shipped on your terms"
        subtitle="Packing format, incoterm, and paperwork are set by the contract — not by whatever is easiest at the mill."
        image="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958260/sah-marketing/packaging-warehouse.jpg"
        imageAlt="Palletised export bags stacked in a warehouse"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Packaging & logistics' }]}
      />

      {/* Packaging */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro
            eyebrow="Packing formats"
            title="Six ways we can bag your order"
            lead="Standard export units through to fully private-label runs — priced per format at quotation."
          />

          <RevealGroup
            className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {packagingOptions.map((option, idx) => (
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
                eyebrow="Shipping terms"
                title="Where our responsibility ends"
                lead="Pick the incoterm that suits your freight arrangements. We quote against all three."
                size="md"
              />
            </div>
          </div>

          <RevealGroup className="lg:col-span-8 space-y-4" stagger={0.09}>
            {incoterms.map((item) => (
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
          src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958259/sah-marketing/logistics-port.jpg"
          alt="Container vessel loading at Karachi Port"
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
              Booked, loaded, and documented from Karachi
            </p>
          </div>
        </ParallaxImage>
      </section>

      {/* Process */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro
            eyebrow="How it moves"
            title="Four stages, one file"
            lead="One coordinator stays on the shipment from packing instruction to discharge."
          />

          <RevealGroup className="relative mt-14 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting rule behind the numbers on wide screens. */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-sah-gold/30 to-transparent lg:block"
            />
            {logisticsSteps.map((step, idx) => (
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
            {freight.map((mode) => (
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
          <SectionIntro
            eyebrow="Paperwork"
            title="Documentation prepared before the seal goes on"
            lead="Checked against the destination’s import requirements, not assembled after the vessel sails."
          />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3" stagger={0.08}>
            {docs.map((group) => (
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
              Additional destination-specific documents are arranged on request — tell us
              the port of discharge and we will confirm what your customs authority expects.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="bg-white py-20 sm:py-28">
        <PageCTA
          title="Need specific shipping details?"
          subtitle="Send the destination port and packing format, and we will come back with terms and transit."
          primaryLabel="Get a quote"
        />
      </div>
    </>
  )
}
