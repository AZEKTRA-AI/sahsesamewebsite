export const metadata = {
  title: 'Packaging & Logistics | SAH Company',
  description: 'Learn about our flexible packaging options and global shipping capabilities',
}

const packagingOptions = [
  {
    icon: '📦',
    title: 'Bags & Sacks',
    description: 'PP, jute, or cotton bags in 25kg, 50kg, or bulk quantities',
  },
  {
    icon: '🛢️',
    title: 'Bulk Containers',
    description: 'Flexible bulk packaging for large orders (MT quantities)',
  },
  {
    icon: '📋',
    title: 'Custom Labeling',
    description: 'Branded labels and packaging to meet your market requirements',
  },
  {
    icon: '🔒',
    title: 'Sealed Packaging',
    description: 'Food-grade sealing to ensure freshness and compliance',
  },
  {
    icon: '📏',
    title: 'Custom Sizing',
    description: 'Any size or quantity tailored to your supply chain needs',
  },
  {
    icon: '♻️',
    title: 'Eco-Friendly Options',
    description: 'Recyclable and sustainable packaging materials available',
  },
]

const incoterms = [
  {
    term: 'FOB',
    full: 'Free On Board',
    description: 'Seller pays for goods and inland delivery to port. Buyer handles international shipping.',
  },
  {
    term: 'CFR',
    full: 'Cost and Freight',
    description: 'Seller pays for goods, insurance, and shipping to destination port. Buyer takes possession at port.',
  },
  {
    term: 'CIF',
    full: 'Cost, Insurance, and Freight',
    description: 'Seller pays for goods, insurance, and shipping. Full cost coverage until delivery.',
  },
]

export default function PackagingLogisticsPage() {
  return (
    <div className="space-y-16 py-16">
      {/* Hero */}
      <section className="container-wide space-y-8 text-center">
        <h1 className="text-5xl font-bold text-sah-charcoal">Packaging & Logistics</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Flexible packaging solutions and reliable global shipping to meet your needs
        </p>
      </section>

      {/* Packaging Options */}
      <section className="container-wide space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal text-center">Packaging Options</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {packagingOptions.map((option) => (
            <div key={option.title} className="bg-sah-cream rounded-lg p-8 space-y-4 text-center">
              <div className="text-5xl">{option.icon}</div>
              <h3 className="text-lg font-bold text-sah-charcoal">{option.title}</h3>
              <p className="text-gray-600 text-sm">{option.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Incoterms */}
      <section className="container-wide space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal text-center">Shipping Terms (Incoterms)</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {incoterms.map((item) => (
            <div key={item.term} className="border-2 border-sah-cream rounded-lg p-8">
              <div className="flex gap-4 mb-3">
                <div className="bg-sah-green text-white px-4 py-2 rounded font-bold text-lg">
                  {item.term}
                </div>
                <div className="flex items-center text-gray-600">
                  {item.full}
                </div>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Logistics Process */}
      <section className="container-wide bg-sah-cream rounded-lg p-12 space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal text-center">Our Logistics Process</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-semibold text-sah-charcoal text-sm">Preparation</h3>
            <p className="text-xs text-gray-600 mt-1">Package & prepare for shipment</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🚚</div>
            <h3 className="font-semibold text-sah-charcoal text-sm">Transport</h3>
            <p className="text-xs text-gray-600 mt-1">Inland delivery to port/airport</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🚢</div>
            <h3 className="font-semibold text-sah-charcoal text-sm">Shipment</h3>
            <p className="text-xs text-gray-600 mt-1">International ocean or air freight</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-semibold text-sah-charcoal text-sm">Delivery</h3>
            <p className="text-xs text-gray-600 mt-1">Arrival & documentation</p>
          </div>
        </div>
      </section>

      {/* Shipping Partners */}
      <section className="container-wide space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal text-center">Reliable Shipping Partners</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-sah-green rounded-lg p-8 space-y-4">
            <h3 className="text-lg font-bold text-sah-charcoal">Container Shipment</h3>
            <p className="text-gray-600">
              Full container load (FCL) or less-than-container load (LCL) shipping available for bulk orders.
            </p>
            <p className="text-sm text-gray-500">Transit times: 15-30 days depending on destination</p>
          </div>
          <div className="bg-white border-2 border-sah-gold rounded-lg p-8 space-y-4">
            <h3 className="text-lg font-bold text-sah-charcoal">Air Freight</h3>
            <p className="text-gray-600">
              Expedited air shipping available for urgent orders or samples.
            </p>
            <p className="text-sm text-gray-500">Transit times: 3-7 days depending on destination</p>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="container-wide space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal text-center">Documentation Support</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-sah-cream rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-sah-charcoal">📄 Certificates</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Certificate of Origin</li>
              <li>• Certificate of Analysis</li>
              <li>• Phytosanitary Certificates</li>
            </ul>
          </div>
          <div className="bg-sah-cream rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-sah-charcoal">📋 Commercial Docs</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Invoices & Packing Lists</li>
              <li>• Bills of Lading</li>
              <li>• Insurance Documents</li>
            </ul>
          </div>
          <div className="bg-sah-cream rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-sah-charcoal">✓ Compliance</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Regulatory Compliance</li>
              <li>• Quality Assurance Docs</li>
              <li>• Inspection Reports</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide bg-gradient-to-r from-sah-green to-sah-charcoal text-white rounded-lg p-12 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Need Specific Shipping Details?</h2>
        <p className="text-lg opacity-90">Contact us to discuss your packaging and logistics requirements</p>
        <a href="/contact" className="btn-primary bg-white text-sah-green hover:bg-sah-cream inline-block">
          Get a Quote
        </a>
      </section>
    </div>
  )
}
