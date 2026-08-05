import Image from 'next/image'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'

export const metadata = {
  title: 'Quality & Sourcing Process | SAH Company',
  description: 'Learn about our 10-step quality assurance and sourcing process for agricultural commodities',
}

const processSteps = [
  { number: '01', title: 'Supplier Verification', description: 'Establish relationships with verified suppliers across Faisalabad region' },
  { number: '02', title: 'Batch Inspection', description: 'Inspect each batch for quality, origin authenticity, and packaging standards' },
  { number: '03', title: 'Lab Testing', description: 'Conduct laboratory tests for moisture, purity, oil content, and contaminants' },
  { number: '04', title: 'Grading & Sorting', description: 'Grade products according to international standards and buyer specifications' },
  { number: '05', title: 'Third-Party Inspection', description: 'Arrange independent inspection via SGS or Intertek if requested' },
  { number: '06', title: 'Customized Packaging', description: 'Package in sizes and materials meeting buyer requirements and regulations' },
  { number: '07', title: 'Documentation Preparation', description: 'Prepare certificates of analysis, certificates of origin, and compliance docs' },
  { number: '08', title: 'Storage & Handling', description: 'Maintain proper storage conditions to preserve quality until shipment' },
  { number: '09', title: 'Logistics Coordination', description: 'Arrange shipment under FOB, CFR, or CIF terms with reliable carriers' },
  { number: '10', title: 'Delivery Confirmation', description: 'Confirm delivery and provide post-delivery support for any concerns' },
]

const commitments = [
  { title: 'Transparency', description: 'Every batch is documented with clear specifications, test results, and origin certificates.' },
  { title: 'Consistency', description: 'Rigorous standards applied across all shipments to ensure predictable quality.' },
  { title: 'Compliance', description: 'All products meet international food safety and export regulations.' },
]

export default function QualityProcessPage() {
  return (
    <div>
      <PageHero
        eyebrow="QUALITY & SOURCING"
        title="Quality & Sourcing Process"
        subtitle="Our rigorous 10-step process ensures only the finest agricultural products reach your supply chain."
        image="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958261/sah-marketing/quality-lab-testing.jpg"
        imageAlt="Laboratory quality testing"
      />

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="bg-sah-light border border-sah-gold/10 rounded-lg p-6 hover:border-sah-gold/40 transition-all"
              >
                <div className="font-display text-3xl text-sah-gold/30 mb-3">{step.number}</div>
                <h3 className="font-display text-lg italic text-sah-charcoal mb-2">{step.title}</h3>
                <p className="font-body text-sm text-sah-charcoal/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab photo banner */}
      <section className="relative h-64 sm:h-80">
        <Image src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958261/sah-marketing/quality-lab-testing.jpg" alt="Laboratory sample testing" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-sah-earth/50 flex items-center justify-center text-center px-6">
          <p className="font-display text-2xl sm:text-3xl italic text-white max-w-xl">
            Every batch tested. Every shipment verified.
          </p>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 sm:py-24 bg-sah-cream border-y border-sah-gold/10">
        <div className="container-wide">
          <div className="mb-10 sm:mb-16 text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-4">OUR COMMITMENTS</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-sah-charcoal leading-tight">
              Principles We Hold
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {commitments.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-sah-gold/10">
                <div className="font-display text-4xl text-sah-gold/20 mb-4">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-xl italic text-sah-charcoal mb-3">{item.title}</h3>
                <p className="font-body text-sm text-sah-charcoal/75">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-16 sm:py-24 bg-white">
        <PageCTA
          title="Want to Know More?"
          subtitle="Request detailed specifications or schedule a discussion about our quality process."
          primaryLabel="Contact Us"
        />
      </div>
    </div>
  )
}
