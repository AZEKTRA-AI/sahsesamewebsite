'use client'

import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SpotlightCard from '@/components/ui/SpotlightCard'

const packagingOptions = [
  { label: '25 kg PP woven bags', note: 'Standard export unit' },
  { label: '50 kg PP woven bags', note: 'Bulk handling' },
  { label: 'Kraft paper bags', note: 'With inner food-grade liner' },
  { label: 'Jumbo bags', note: '1 MT flexible bulk containers' },
  { label: 'Buyer-branded packing', note: 'Your artwork, our line' },
  { label: 'Custom formats', note: 'Specified per contract' },
]

const shippingTerms = [
  { label: 'FOB Karachi', description: 'Free on board, loaded at Karachi Port' },
  { label: 'CFR', description: 'Cost and freight to your named port' },
  { label: 'CIF', description: 'Cost, insurance, and freight covered' },
  { label: 'Sample orders', description: 'Small quantities by courier' },
]

const docs = [
  'Commercial invoice',
  'Packing list',
  'Certificate of origin',
  'Phytosanitary certificate',
  'Fumigation certificate',
  'Certificate of analysis',
  'Inspection report',
  'Bill of lading',
  'Insurance certificate',
  'Destination-specific docs',
]

export default function PackagingShipment() {
  return (
    <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
      <div className="container-wide">
        <SectionIntro
          eyebrow="Delivery & flexibility"
          title="Packed your way, shipped on your terms"
          lead="Packing, documentation, and incoterms are set by the contract — not by what happens to be convenient at the mill."
        />

        {/* Port banner with an overlapping glass caption */}
        <Reveal className="relative mt-12 sm:mt-16" duration={0.85}>
          <ParallaxImage
            src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958259/sah-marketing/logistics-port.jpg"
            alt="Container ship loading at Karachi Port"
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
              From Karachi Port to global markets
            </p>
            <p className="mt-3 font-body text-sm text-white/65">
              Primary loading at Karachi Port, with Port Qasim as an alternative when
              berth scheduling demands it.
            </p>
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
              {packagingOptions.map((option) => (
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
              {shippingTerms.map((term, idx) => (
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
            {docs.map((doc) => (
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
