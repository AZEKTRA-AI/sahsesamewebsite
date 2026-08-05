import Image from 'next/image'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'

export const metadata = {
  title: 'Packaging & Logistics | SAH Company',
  description: 'Learn about our flexible packaging options and global shipping capabilities',
}

const packagingOptions = [
  { title: 'Bags & Sacks', description: 'PP, jute, or cotton bags in 25kg, 50kg, or bulk quantities' },
  { title: 'Bulk Containers', description: 'Flexible bulk packaging for large orders (MT quantities)' },
  { title: 'Custom Labeling', description: 'Branded labels and packaging to meet your market requirements' },
  { title: 'Sealed Packaging', description: 'Food-grade sealing to ensure freshness and compliance' },
  { title: 'Custom Sizing', description: 'Any size or quantity tailored to your supply chain needs' },
  { title: 'Eco-Friendly Options', description: 'Recyclable and sustainable packaging materials available' },
]

const incoterms = [
  { term: 'FOB', full: 'Free On Board', description: 'Seller pays for goods and inland delivery to port. Buyer handles international shipping.' },
  { term: 'CFR', full: 'Cost and Freight', description: 'Seller pays for goods, insurance, and shipping to destination port. Buyer takes possession at port.' },
  { term: 'CIF', full: 'Cost, Insurance, and Freight', description: 'Seller pays for goods, insurance, and shipping. Full cost coverage until delivery.' },
]

const logisticsSteps = [
  { title: 'Preparation', description: 'Package & prepare for shipment' },
  { title: 'Transport', description: 'Inland delivery to port/airport' },
  { title: 'Shipment', description: 'International ocean or air freight' },
  { title: 'Delivery', description: 'Arrival & documentation' },
]

const docs = [
  { title: 'Certificates', items: ['Certificate of Origin', 'Certificate of Analysis', 'Phytosanitary Certificates'] },
  { title: 'Commercial Docs', items: ['Invoices & Packing Lists', 'Bills of Lading', 'Insurance Documents'] },
  { title: 'Compliance', items: ['Regulatory Compliance', 'Quality Assurance Docs', 'Inspection Reports'] },
]

export default function PackagingLogisticsPage() {
  return (
    <div>
      <PageHero
        eyebrow="DELIVERY & FLEXIBILITY"
        title="Packaging & Logistics"
        subtitle="Flexible packaging solutions and reliable global shipping to meet your needs."
        image="/packaging-warehouse.jpg"
        imageAlt="Warehouse storage with palletized goods"
      />

      {/* Packaging Options */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl italic text-sah-charcoal text-center mb-10 sm:mb-16">
            Packaging Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {packagingOptions.map((option, idx) => (
              <div key={option.title} className="bg-sah-light border border-sah-gold/10 rounded-lg p-8 hover:border-sah-gold/40 transition-all">
                <div className="w-5 h-5 rounded-full bg-sah-gold mb-4" />
                <h3 className="font-display text-lg italic text-sah-charcoal mb-2">{option.title}</h3>
                <p className="font-body text-sm text-sah-charcoal/70">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incoterms */}
      <section className="py-16 sm:py-24 bg-sah-cream border-y border-sah-gold/10">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl italic text-sah-charcoal text-center mb-10 sm:mb-16">
            Shipping Terms (Incoterms)
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {incoterms.map((item) => (
              <div key={item.term} className="bg-white border border-sah-gold/10 rounded-lg p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="bg-sah-gold text-white px-4 py-1.5 rounded font-display italic text-lg">
                    {item.term}
                  </div>
                  <div className="font-body text-sah-charcoal/70">{item.full}</div>
                </div>
                <p className="font-body text-sah-charcoal/80 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Port photo banner */}
      <section className="relative h-64 sm:h-80">
        <Image src="/logistics-port.jpg" alt="Container port for global shipping" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-sah-earth/50 flex items-center">
          <div className="container-wide">
            <p className="font-display text-2xl sm:text-3xl md:text-4xl italic text-white max-w-lg">
              Reliable shipping partners, every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Logistics Process */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl italic text-sah-charcoal text-center mb-10 sm:mb-16">
            Our Logistics Process
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {logisticsSteps.map((step, idx) => (
              <div key={step.title} className="text-center">
                <div className="font-display text-3xl text-sah-gold/30 mb-3">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="font-display italic text-sah-charcoal mb-1">{step.title}</h3>
                <p className="font-body text-xs text-sah-charcoal/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Partners */}
      <section className="py-16 sm:py-24 bg-sah-cream border-y border-sah-gold/10">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl italic text-sah-charcoal text-center mb-10 sm:mb-16">
            Reliable Shipping Partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white border border-sah-gold/20 rounded-lg p-8">
              <h3 className="font-display text-lg italic text-sah-charcoal mb-3">Container Shipment</h3>
              <p className="font-body text-sah-charcoal/75 text-sm mb-3">
                Full container load (FCL) or less-than-container load (LCL) shipping available for bulk orders.
              </p>
              <p className="font-body text-xs text-sah-gold">Transit times: 15-30 days depending on destination</p>
            </div>
            <div className="bg-white border border-sah-gold/20 rounded-lg p-8">
              <h3 className="font-display text-lg italic text-sah-charcoal mb-3">Air Freight</h3>
              <p className="font-body text-sah-charcoal/75 text-sm mb-3">
                Expedited air shipping available for urgent orders or samples.
              </p>
              <p className="font-body text-xs text-sah-gold">Transit times: 3-7 days depending on destination</p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl italic text-sah-charcoal text-center mb-10 sm:mb-16">
            Documentation Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {docs.map((group) => (
              <div key={group.title} className="bg-sah-light border border-sah-gold/10 rounded-lg p-6">
                <h3 className="font-display italic text-sah-charcoal mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-body text-sm text-sah-charcoal/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sah-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-16 sm:py-24 bg-sah-cream border-t border-sah-gold/10">
        <PageCTA
          title="Need Specific Shipping Details?"
          subtitle="Contact us to discuss your packaging and logistics requirements."
          primaryLabel="Get a Quote"
        />
      </div>
    </div>
  )
}
