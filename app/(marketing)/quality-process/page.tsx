export const metadata = {
  title: 'Quality & Sourcing Process | SAH Company',
  description: 'Learn about our 10-step quality assurance and sourcing process for agricultural commodities',
}

const processSteps = [
  {
    number: '1',
    title: 'Supplier Verification',
    description: 'Establish relationships with verified suppliers across Faisalabad region',
  },
  {
    number: '2',
    title: 'Batch Inspection',
    description: 'Inspect each batch for quality, origin authenticity, and packaging standards',
  },
  {
    number: '3',
    title: 'Lab Testing',
    description: 'Conduct laboratory tests for moisture, purity, oil content, and contaminants',
  },
  {
    number: '4',
    title: 'Grading & Sorting',
    description: 'Grade products according to international standards and buyer specifications',
  },
  {
    number: '5',
    title: 'Third-Party Inspection',
    description: 'Arrange independent inspection via SGS or Intertek if requested',
  },
  {
    number: '6',
    title: 'Customized Packaging',
    description: 'Package in sizes and materials meeting buyer requirements and regulations',
  },
  {
    number: '7',
    title: 'Documentation Preparation',
    description: 'Prepare certificates of analysis, certificates of origin, and compliance docs',
  },
  {
    number: '8',
    title: 'Storage & Handling',
    description: 'Maintain proper storage conditions to preserve quality until shipment',
  },
  {
    number: '9',
    title: 'Logistics Coordination',
    description: 'Arrange shipment under FOB, CFR, or CIF terms with reliable carriers',
  },
  {
    number: '10',
    title: 'Delivery Confirmation',
    description: 'Confirm delivery and provide post-delivery support for any concerns',
  },
]

export default function QualityProcessPage() {
  return (
    <div className="space-y-16 py-16">
      {/* Hero */}
      <section className="container-wide space-y-8 text-center">
        <h1 className="text-5xl font-bold text-sah-charcoal">Quality & Sourcing Process</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our rigorous 10-step process ensures only the finest agricultural products reach your supply chain
        </p>
      </section>

      {/* Timeline */}
      <section className="container-wide">
        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Timeline line */}
              {index !== processSteps.length - 1 && (
                <div className="absolute left-12 top-20 h-24 w-1 bg-sah-gold"></div>
              )}

              {/* Step */}
              <div className="flex gap-6 mb-8">
                {/* Circle */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-sah-green text-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white border-2 border-sah-cream rounded-lg p-6 mt-2">
                  <h3 className="text-lg font-bold text-sah-charcoal mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Principles */}
      <section className="container-wide space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal text-center">Our Commitments</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-sah-cream rounded-lg p-8 space-y-4">
            <h3 className="text-xl font-bold text-sah-charcoal">Transparency</h3>
            <p className="text-gray-600">
              Every batch is documented with clear specifications, test results, and origin certificates.
            </p>
          </div>
          <div className="bg-sah-cream rounded-lg p-8 space-y-4">
            <h3 className="text-xl font-bold text-sah-charcoal">Consistency</h3>
            <p className="text-gray-600">
              Rigorous standards applied across all shipments to ensure predictable quality.
            </p>
          </div>
          <div className="bg-sah-cream rounded-lg p-8 space-y-4">
            <h3 className="text-xl font-bold text-sah-charcoal">Compliance</h3>
            <p className="text-gray-600">
              All products meet international food safety and export regulations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide bg-gradient-to-r from-sah-green to-sah-charcoal text-white rounded-lg p-12 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Want to Know More?</h2>
        <p className="text-lg opacity-90">Request detailed specifications or schedule a discussion about our quality process</p>
        <a href="/contact" className="btn-primary bg-white text-sah-green hover:bg-sah-cream inline-block">
          Contact Us
        </a>
      </section>
    </div>
  )
}
