import Link from 'next/link'
import ContactForm from '@/components/marketing/ContactForm'

export const metadata = {
  title: 'Contact Us | SAH Company',
  description: 'Get in touch with SAH Company for quotations, samples, or inquiries',
}

export default function ContactPage() {
  return (
    <div className="space-y-16 py-16">
      {/* Hero */}
      <section className="container-wide space-y-8 text-center">
        <h1 className="text-5xl font-bold text-sah-charcoal">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about our products or need a custom quote? We're here to help.
        </p>
      </section>

      {/* Contact Info & Form */}
      <section className="container-wide grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-sah-charcoal">Contact Information</h2>

          <div className="space-y-6">
            {/* Address */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sah-charcoal text-lg">📍 Office Address</h3>
              <p className="text-gray-600">
                Office No. 170<br />
                New Grain Market<br />
                Dijkot Road, Faisalabad<br />
                Pakistan
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sah-charcoal text-lg">📱 Phone</h3>
              <div className="space-y-1">
                <p className="text-gray-600">
                  <a href="tel:+923000959524" className="text-sah-green hover:underline">
                    +92 300 0959524
                  </a>
                </p>
                <p className="text-gray-600">
                  <a href="tel:+923008663396" className="text-sah-green hover:underline">
                    +92 300 8663396
                  </a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sah-charcoal text-lg">✉️ Email</h3>
              <p className="text-gray-600">
                <a href="mailto:sales@sahcompany.pk" className="text-sah-green hover:underline">
                  sales@sahcompany.pk
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                <a href="mailto:info@sahcompany.pk" className="text-sah-green hover:underline">
                  info@sahcompany.pk
                </a>
              </p>
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sah-charcoal text-lg">💬 WhatsApp</h3>
              <a
                href="https://wa.me/923000959524"
                className="inline-flex items-center gap-2 text-sah-green hover:underline font-semibold"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-sah-cream rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-sah-charcoal">🕒 Business Hours</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM (PKT)</p>
              <p>Saturday: 10:00 AM - 4:00 PM (PKT)</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Quick Contact Form */}
        <ContactForm />
      </section>

      {/* RFQ Form CTA */}
      <section className="container-wide bg-gradient-to-r from-sah-green to-sah-charcoal text-white rounded-lg p-12 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Need a Detailed Request for Quotation?</h2>
        <p className="text-lg opacity-90">Use our comprehensive RFQ form to request samples, detailed specifications, or bulk quotations</p>
        <a href="/#rfq-form" className="btn-primary bg-white text-sah-green hover:bg-sah-cream inline-block">
          Open RFQ Form
        </a>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="container-wide space-y-8">
        <h2 className="text-3xl font-bold text-sah-charcoal text-center">Find Us</h2>
        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-3">📍</div>
            <p className="text-gray-600 font-semibold">Faisalabad, Pakistan</p>
            <p className="text-gray-500 text-sm">Office No. 170, New Grain Market</p>
          </div>
        </div>
      </section>
    </div>
  )
}
