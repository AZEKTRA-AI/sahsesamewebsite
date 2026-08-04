export const metadata = {
  title: 'Terms & Conditions | SAH Company',
  description: 'Terms and conditions for SAH Company website',
}

export default function TermsConditionsPage() {
  return (
    <div className="py-16">
      <div className="container-wide max-w-3xl space-y-8">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-sah-charcoal">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing and using the SAH Company website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">2. Use of Website</h2>
          <p className="text-gray-600 leading-relaxed">
            This website is intended for business-to-business (B2B) inquiries and product information. You agree to use the website only for lawful purposes and in a way that does not infringe upon the rights of others.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">3. Product Information</h2>
          <p className="text-gray-600 leading-relaxed">
            Product specifications, quantities, and pricing displayed on this website are subject to confirmation. All product details are provided in good faith but should be verified before order placement. Specifications may vary by batch and are subject to laboratory analysis.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">4. Quotations and Orders</h2>
          <p className="text-gray-600 leading-relaxed">
            Quotations provided through this website or by our team are estimates and subject to final confirmation. Orders are subject to product availability, our acceptance, and separate written agreement including terms of payment, delivery, and quality specifications.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">5. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">
            All content on this website, including text, graphics, logos, images, and software, is the property of Sain Abdul Hakim and Company or its content suppliers and is protected by international copyright laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">6. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            SAH Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or products purchased through us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">7. External Links</h2>
          <p className="text-gray-600 leading-relaxed">
            This website may contain links to third-party websites. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies or content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">8. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Faisalabad, Pakistan.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">9. Modifications</h2>
          <p className="text-gray-600 leading-relaxed">
            SAH Company reserves the right to modify these terms at any time. Continued use of the website after modifications constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">10. Contact Information</h2>
          <p className="text-gray-600 leading-relaxed">
            For questions regarding these Terms & Conditions:
          </p>
          <div className="bg-sah-cream rounded-lg p-6 space-y-2">
            <p className="text-gray-600">
              <strong>Company:</strong> Sain Abdul Hakim and Company
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong>{' '}
              <a href="mailto:info@sahcompany.pk" className="text-sah-green hover:underline">
                info@sahcompany.pk
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong>{' '}
              <a href="tel:+923000959524" className="text-sah-green hover:underline">
                +92 300 0959524
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> Office No. 170, New Grain Market, Dijkot Road, Faisalabad, Pakistan
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
