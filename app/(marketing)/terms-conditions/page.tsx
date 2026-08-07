import LegalShell from '@/components/marketing/LegalShell'

export const metadata = {
  title: 'Terms & conditions',
  description: 'Terms and conditions governing use of the SAH Company website.',
}

export default function TermsConditionsPage() {
  return (
    <LegalShell title="Terms & conditions" updated="12 January 2026">
      <section>
        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing and using the SAH Company website you accept and agree to be bound
          by these terms. If you do not agree to them, please do not use this website.
        </p>
      </section>

      <section>
        <h2>2. Use of the website</h2>
        <p>
          This website is intended for business-to-business enquiries and product
          information. You agree to use it only for lawful purposes and in a way that does
          not infringe the rights of others.
        </p>
      </section>

      <section>
        <h2>3. Product information</h2>
        <p>
          Specifications, quantities, and prices shown on this website are subject to
          confirmation. All product details are given in good faith and should be verified
          before an order is placed. Specifications vary by batch and are confirmed by
          laboratory analysis.
        </p>
      </section>

      <section>
        <h2>4. Quotations and orders</h2>
        <p>
          Quotations provided through this website or by our team are estimates and remain
          subject to final confirmation. Orders depend on availability, our acceptance, and
          a separate written agreement covering payment, delivery, and quality
          specifications.
        </p>
      </section>

      <section>
        <h2>5. Intellectual property</h2>
        <p>
          All content on this website — text, graphics, logos, images, and software — is
          the property of Sain Abdul Hakim &amp; Company or its content suppliers, and is
          protected by international copyright law.
        </p>
      </section>

      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          SAH Company is not liable for indirect, incidental, special, consequential, or
          punitive damages arising from your use of, or inability to use, this website or
          products purchased through us.
        </p>
      </section>

      <section>
        <h2>7. External links</h2>
        <p>
          This website may link to third-party sites. We have no control over their content
          or practices and accept no responsibility for their privacy policies or material.
        </p>
      </section>

      <section>
        <h2>8. Governing law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of Pakistan.
          Any dispute arising from them is subject to the exclusive jurisdiction of the
          courts of Faisalabad, Pakistan.
        </p>
      </section>

      <section>
        <h2>9. Modifications</h2>
        <p>
          SAH Company may modify these terms at any time. Continued use of the website after
          a modification constitutes acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>For questions about these terms:</p>
        <div className="mt-4 rounded-card border border-sah-gold/15 bg-sah-light p-6">
          <p>
            <strong>Company:</strong> Sain Abdul Hakim &amp; Company
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:info@sahcompany.com">info@sahcompany.com</a>
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
