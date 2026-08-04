export const metadata = {
  title: 'Privacy Policy | SAH Company',
  description: 'Privacy policy for SAH Company website',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16">
      <div className="container-wide max-w-3xl space-y-8">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-sah-charcoal">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            Sain Abdul Hakim and Company ("we," "us," "our," or "Company") operates the SAH Company website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">2. Information Collection and Use</h2>
          <p className="text-gray-600 leading-relaxed">
            We collect several different types of information for various purposes to provide and improve our service to you.
          </p>
          <div className="space-y-3 ml-4">
            <div>
              <h3 className="font-semibold text-sah-charcoal">Personal Data</h3>
              <p className="text-gray-600 text-sm">
                When you submit a contact form or request for quotation, we may collect: name, email address, phone number, company information, and any messages you provide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sah-charcoal">Usage Data</h3>
              <p className="text-gray-600 text-sm">
                We may collect information on how the website is accessed and used, including pages visited, time spent on pages, and user interactions.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">3. Use of Data</h2>
          <p className="text-gray-600 leading-relaxed">
            SAH Company uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
            <li>To provide and maintain our website</li>
            <li>To respond to your inquiries and quotation requests</li>
            <li>To send you business-related announcements and updates</li>
            <li>To monitor and analyze trends and usage of the website</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">4. Security of Data</h2>
          <p className="text-gray-600 leading-relaxed">
            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">5. Changes to This Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-sah-charcoal">6. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-sah-cream rounded-lg p-6 space-y-2">
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
