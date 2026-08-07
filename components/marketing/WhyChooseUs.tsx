'use client'

import Link from 'next/link'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import ParallaxImage from '@/components/ui/ParallaxImage'

const reasons = [
  {
    title: 'Family experience',
    description: 'Decades of commodity trading grounded in real agricultural operations since 1985.',
  },
  {
    title: 'Pakistan-based sourcing',
    description: 'Direct access to the agricultural heartland and long-standing supplier relationships.',
  },
  {
    title: 'Verified partners',
    description: 'We work only with processors whose plants and output we have inspected ourselves.',
  },
  {
    title: 'Buyer specifications',
    description: 'Lots cleaned and graded to your exact purity, moisture, and sizing requirements.',
  },
  {
    title: 'Testing & inspection',
    description: 'Batch analysis and third-party inspection through SGS or Intertek on request.',
  },
  {
    title: 'Flexible packaging',
    description: 'From 25 kg PP woven bags to jumbo bags and fully private-label packing.',
  },
  {
    title: 'Export support',
    description: 'Complete documentation and logistics handled for FOB, CFR, and CIF shipments.',
  },
  {
    title: 'Direct communication',
    description: 'One point of contact from enquiry to bill of lading — no agents in between.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="border-y border-sah-gold/10 bg-sah-light py-20 sm:py-28">
      <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky column — the heading holds while the list moves past it. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionIntro
              eyebrow="Why choose SAH"
              title="Eight reasons buyers stay with us"
              lead="Agricultural heritage run on modern B2B discipline — from first sample through to the bill of lading."
              size="md"
            />

            <Reveal delay={0.2}>
              <ParallaxImage
                src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958248/sah-marketing/about-hands-grain.jpg"
                alt="Hands running through freshly milled grain"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="mt-10 hidden h-56 rounded-card shadow-lift lg:block"
                distance={30}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-sah-earth/55 to-transparent"
                />
              </ParallaxImage>
            </Reveal>

            <Reveal delay={0.3} blur={false}>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 font-body text-sm font-medium text-sah-gold transition-colors duration-200 hover:text-sah-charcoal active:scale-[0.97]"
              >
                Read our story
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
            </Reveal>
          </div>
        </div>

        {/* Numbered rows rather than another grid of identical boxes. */}
        <RevealGroup className="lg:col-span-7" stagger={0.06}>
          <ol className="border-t border-sah-gold/15">
            {reasons.map((reason, idx) => (
              <li key={reason.title} className="group relative border-b border-sah-gold/15">
                {/* Gold bar wipes down the left edge on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-10 h-full w-[2px] origin-top scale-y-0 bg-sah-gold transition-transform duration-300 ease-out-expo group-hover:scale-y-100"
                />
                <RevealItem>
                  <div className="flex gap-5 py-6 pl-0 transition-[padding-left,background-color] duration-300 ease-out-expo group-hover:bg-white group-hover:pl-5 sm:gap-7">
                    <span className="tnum shrink-0 pt-1 font-display text-sm text-sah-gold/70">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl italic text-sah-charcoal transition-colors duration-200 group-hover:text-sah-gold">
                        {reason.title}
                      </h3>
                      <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-sah-charcoal/65">
                        {reason.description}
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
  )
}
