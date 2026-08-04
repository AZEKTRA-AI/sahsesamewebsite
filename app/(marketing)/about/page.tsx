import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'About SAH Company | Premium Agricultural Exports',
  description: 'Learn about SAH Company - family trading roots since 1992, based in Faisalabad, Pakistan',
}

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findMany()

  return (
    <div className="space-y-16 py-16">
      {/* Hero Section */}
      <section className="container-wide space-y-8 text-center">
        <h1 className="text-5xl font-bold text-sah-charcoal">About SAH Company</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Family Trading Roots Since 1992 — Premium agricultural commodities from Pakistan
        </p>
      </section>

      {/* Company Overview */}
      <section className="container-wide grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-sah-charcoal">Our Heritage</h2>
          <p className="text-gray-600 leading-relaxed">
            Sain Abdul Hakim and Company brings three decades of agricultural commodity trading expertise to the global market. Rooted in the pulses business since 1992, our family legacy combines traditional agricultural knowledge with modern B2B supply chain practices.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Based in Faisalabad, the agricultural heartland of Pakistan, we have direct access to verified suppliers and established relationships across sesame seeds, pulses, and rice production.
          </p>
        </div>
        <div className="bg-sah-cream rounded-lg p-12 text-center">
          <div className="text-5xl mb-4">🌾</div>
          <p className="text-gray-600">Direct access to Pakistan's agricultural heartland</p>
        </div>
      </section>

      {/* Key Facts */}
      <section className="container-wide">
        <h2 className="text-3xl font-bold text-sah-charcoal mb-12 text-center">Why We're Different</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-sah-cream rounded-lg p-8 space-y-4">
            <h3 className="text-xl font-bold text-sah-charcoal">30+ Years of Experience</h3>
            <p className="text-gray-600">Family trading roots grounded in the pulses business, now expanded to sesame and rice exports.</p>
          </div>
          <div className="bg-sah-cream rounded-lg p-8 space-y-4">
            <h3 className="text-xl font-bold text-sah-charcoal">Direct Sourcing</h3>
            <p className="text-gray-600">Established supplier relationships in Faisalabad give us direct access to quality production and fair pricing.</p>
          </div>
          <div className="bg-sah-cream rounded-lg p-8 space-y-4">
            <h3 className="text-xl font-bold text-sah-charcoal">Flexible Incoterms</h3>
            <p className="text-gray-600">We arrange shipments FOB, CFR, and CIF to meet your supply chain needs and regulations.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container-wide bg-gradient-to-r from-sah-green to-sah-charcoal text-white rounded-lg p-12 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Ready to Work Together?</h2>
        <p className="text-lg opacity-90">Get in touch for quotations, samples, or to discuss your supply needs.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="btn-primary bg-white text-sah-green hover:bg-sah-cream">
            Request a Quote
          </a>
          <a href="https://wa.me/923000959524" className="btn-primary border border-white hover:bg-white/10">
            WhatsApp Us
          </a>
        </div>
      </section>
    </div>
  )
}
