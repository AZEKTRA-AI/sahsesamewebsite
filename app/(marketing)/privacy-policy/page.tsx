import LegalShell from '@/components/marketing/LegalShell'

export const metadata = {
  title: 'Privacy policy',
  description: 'How SAH Company collects, uses, and protects personal data submitted through this website.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Privacy policy" updated="12 January 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Sain Abdul Hakim and Company (“we”, “us”, “our”) operates the SAH Company
          website. This page explains what personal data we collect, how we use it, and the
          choices you have.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <p>
          We collect a small amount of information, for clearly defined purposes.
        </p>
        <h3>Personal data</h3>
        <p>
          When you submit a contact form or a request for quotation we collect your name,
          email address, phone number, company details, and whatever message you write.
        </p>
        <h3>Usage data</h3>
        <p>
          We may collect information about how the website is accessed and used, including
          pages visited, time spent on them, and interactions.
        </p>
      </section>

      <section>
        <h2>3. How we use it</h2>
        <p>SAH Company uses the collected data to:</p>
        <ul>
          <li>Provide and maintain this website</li>
          <li>Respond to your enquiries and quotation requests</li>
          <li>Send business-related announcements where you have asked for them</li>
          <li>Monitor and analyse usage trends</li>
          <li>Detect, prevent, and address technical problems</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>4. Security of data</h2>
        <p>
          We take the security of your data seriously, but no method of transmission over
          the internet or of electronic storage is completely secure. We use commercially
          reasonable measures to protect your personal data and cannot guarantee absolute
          security.
        </p>
      </section>

      <section>
        <h2>5. Changes to this policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes are published on this
          page along with a revised effective date.
        </p>
      </section>

      <section>
        <h2>6. Contact</h2>
        <p>If you have questions about this policy:</p>
        <div className="mt-4 rounded-card border border-sah-gold/15 bg-sah-light p-6">
          <p>
            <strong>Email:</strong> <a href="mailto:info@sainabdulhakim.com">info@sainabdulhakim.com</a>
          </p>
          <p>
            <strong>Phone:</strong> <a href="tel:+923000959524">+92 300 0959524</a>
          </p>
          <p>
            <strong>Address:</strong> Office No. 170, New Grain Market, Dijkot Road,
            Faisalabad, Pakistan
          </p>
        </div>
      </section>
    </LegalShell>
  )
}
