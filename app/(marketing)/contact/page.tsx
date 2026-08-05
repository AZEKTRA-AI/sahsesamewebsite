import ContactForm from '@/components/marketing/ContactForm'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'

export const metadata = {
  title: 'Contact Us | SAH Company',
  description: 'Get in touch with SAH Company for quotations, samples, or inquiries',
}

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="WE'D LOVE TO HEAR FROM YOU"
        title="Get in Touch"
        subtitle="Have questions about our products or need a custom quote? We're here to help."
        image="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958254/sah-marketing/contact-handshake.jpg"
        imageAlt="Business partnership handshake"
      />

      {/* Contact Info & Form */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl italic text-sah-charcoal">Contact Information</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-body font-semibold text-sah-gold text-sm uppercase tracking-wider mb-2">Office Address</h3>
                <p className="font-body text-sah-charcoal/80">
                  Office No. 170<br />
                  New Grain Market<br />
                  Dijkot Road, Faisalabad<br />
                  Pakistan
                </p>
              </div>

              <div>
                <h3 className="font-body font-semibold text-sah-gold text-sm uppercase tracking-wider mb-2">Phone</h3>
                <div className="space-y-1 font-body">
                  <p>
                    <a href="tel:+923000959524" className="text-sah-charcoal/80 hover:text-sah-gold transition-colors">
                      +92 300 0959524
                    </a>
                  </p>
                  <p>
                    <a href="tel:+923008663396" className="text-sah-charcoal/80 hover:text-sah-gold transition-colors">
                      +92 300 8663396
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-body font-semibold text-sah-gold text-sm uppercase tracking-wider mb-2">Email</h3>
                <p className="font-body">
                  <a href="mailto:sales@sahcompany.pk" className="text-sah-charcoal/80 hover:text-sah-gold transition-colors">
                    sales@sahcompany.pk
                  </a>
                </p>
                <p className="font-body text-sm">
                  <a href="mailto:info@sahcompany.pk" className="text-sah-charcoal/60 hover:text-sah-gold transition-colors">
                    info@sahcompany.pk
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-body font-semibold text-sah-gold text-sm uppercase tracking-wider mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/923000959524"
                  className="font-body inline-flex items-center gap-2 text-sah-charcoal/80 hover:text-sah-gold transition-colors font-medium"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-sah-light border border-sah-gold/10 rounded-lg p-6 space-y-3">
              <h3 className="font-body font-semibold text-sah-charcoal text-sm uppercase tracking-wider">Business Hours</h3>
              <div className="text-sm font-body text-sah-charcoal/70 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM (PKT)</p>
                <p>Saturday: 10:00 AM - 4:00 PM (PKT)</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* RFQ Form CTA */}
      <div className="pb-16 sm:pb-24 bg-white">
        <PageCTA
          title="Need a Detailed Request for Quotation?"
          subtitle="Use our comprehensive RFQ form to request samples, detailed specifications, or bulk quotations."
          primaryLabel="Open RFQ Form"
          primaryHref="/#rfq-form"
        />
      </div>

      {/* Location */}
      <section className="py-16 sm:py-24 bg-sah-cream border-t border-sah-gold/10">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl italic text-sah-charcoal text-center mb-10 sm:mb-16">
            Find Us
          </h2>
          <div className="bg-sah-earth rounded-lg h-72 sm:h-96 flex items-center justify-center">
            <div className="text-center px-6">
              <p className="font-display text-2xl italic text-sah-gold mb-2">Faisalabad, Pakistan</p>
              <p className="font-body text-white/60 text-sm">Office No. 170, New Grain Market</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
