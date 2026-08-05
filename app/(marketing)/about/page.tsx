import Image from 'next/image'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'

export const metadata = {
  title: 'About SAH Company | Premium Agricultural Exports',
  description: 'Learn about SAH Company - family trading roots since 1985, based in Faisalabad, Pakistan',
}

const facts = [
  {
    title: '37 Years of Experience',
    description: 'Family trading roots grounded in the pulses business since 1985, now expanded to sesame and rice exports.',
  },
  {
    title: 'Direct Sourcing',
    description: 'Established supplier relationships in Faisalabad give us direct access to quality production and fair pricing.',
  },
  {
    title: 'Flexible Incoterms',
    description: 'We arrange shipments FOB, CFR, and CIF to meet your supply chain needs and regulations.',
  },
]

export default async function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="ESTABLISHED 1985 · FAISALABAD, PAKISTAN"
        title="Family Trading Roots Since 1985"
        subtitle="Premium agricultural commodities from Pakistan, backed by nearly four decades of family expertise."
        image="/heritage-field.jpg"
        imageAlt="Golden agricultural fields of Pakistan"
      />

      {/* Company Overview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-6">OUR HERITAGE</p>
            <h2 className="font-display text-3xl sm:text-4xl italic text-sah-charcoal mb-6 leading-tight">
              Three Decades of Trust, One Family Name
            </h2>
            <p className="font-body text-base sm:text-lg text-sah-charcoal/80 leading-relaxed mb-4">
              Sain Abdul Hakim and Company brings nearly four decades of agricultural commodity trading expertise to the global market. Rooted in the pulses business since 1985, our family legacy combines traditional agricultural knowledge with modern B2B supply chain practices.
            </p>
            <p className="font-body text-base sm:text-lg text-sah-charcoal/80 leading-relaxed">
              Based in Faisalabad, the agricultural heartland of Pakistan, we have direct access to verified suppliers and established relationships across sesame seeds, pulses, and rice production.
            </p>
          </div>
          <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden">
            <Image
              src="/about-hands-grain.jpg"
              alt="Hands holding a harvest of grain"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-16 sm:py-24 bg-sah-cream border-y border-sah-gold/10">
        <div className="container-wide">
          <div className="mb-10 sm:mb-16 text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-4">WHY WE'RE DIFFERENT</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-sah-charcoal leading-tight">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {facts.map((fact, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-sah-gold/10">
                <div className="font-display text-4xl text-sah-gold/20 mb-4">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-xl italic text-sah-charcoal mb-3">{fact.title}</h3>
                <p className="font-body text-sm text-sah-charcoal/75 leading-relaxed">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field photo banner */}
      <section className="relative h-64 sm:h-80 md:h-96">
        <Image
          src="/about-farmer-field.jpg"
          alt="Agricultural field at work in Pakistan"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-sah-earth/40" />
      </section>

      {/* CTA */}
      <div className="py-16 sm:py-24 bg-white">
        <PageCTA
          title="Ready to Work Together?"
          subtitle="Get in touch for quotations, samples, or to discuss your supply needs."
        />
      </div>
    </div>
  )
}
