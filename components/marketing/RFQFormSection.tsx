'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const EMPTY_FORM = {
  buyerName: '',
  company: '',
  country: '',
  email: '',
  phone: '',
  product: '',
  quantity: '',
  packaging: '',
  incoterm: 'FOB',
  sampleRequest: false,
  comments: '',
  website: '', // honeypot
}

export default function RFQFormSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState(EMPTY_FORM)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setError(null)

    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'Something went wrong. Please try again.')
        setFormState('idle')
        return
      }

      setFormState('submitted')
      setFormData(EMPTY_FORM)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setFormState('idle')
    }
  }

  return (
    <section id="rfq-form" className="py-20 bg-sah-light">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">Request a Quotation</h2>
          <p className="text-xl text-sah-charcoal max-w-2xl mx-auto">
            Share your requirements and we'll respond with specifications, samples, and quotations within 24–48 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          {formState === 'submitted' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-sah-green mb-2">Thank You for Your Enquiry</h3>
              <p className="text-sah-charcoal text-lg">
                Our team will review your specifications and contact you shortly via email or WhatsApp.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Buyer Info */}
              <div>
                <h3 className="font-bold text-sah-green mb-4">Buyer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="buyerName"
                      value={formData.buyerName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                      placeholder="Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                      placeholder="+92 3001234567"
                    />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="font-bold text-sah-green mb-4">Product Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Product *</label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                    >
                      <option value="">Select a product</option>
                      <option value="sesame">Sesame Seeds</option>
                      <option value="pulses">Pulses</option>
                      <option value="rice">Rice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Quantity (metric tons)</label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                      placeholder="E.g., 10 MT"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Packaging Requirement</label>
                    <input
                      type="text"
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                      placeholder="E.g., 50kg PP woven bags"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sah-charcoal mb-2">Incoterm</label>
                    <select
                      name="incoterm"
                      value={formData.incoterm}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                    >
                      <option value="FOB">FOB Karachi</option>
                      <option value="CFR">CFR</option>
                      <option value="CIF">CIF</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    name="sampleRequest"
                    checked={formData.sampleRequest}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-sah-green cursor-pointer"
                  />
                  <label className="text-sah-charcoal font-medium cursor-pointer">
                    I would like a sample
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sah-charcoal mb-2">Additional Comments or Specifications</label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sah-green"
                    placeholder="Describe any special requirements, grades, certifications, or other details..."
                  />
                </div>
              </div>

              {/* Honeypot — hidden from users, bots fill it in */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formState === 'submitting'}
                whileHover={formState === 'submitting' ? undefined : { scale: 1.02 }}
                whileTap={formState === 'submitting' ? undefined : { scale: 0.98 }}
                className="w-full btn-primary text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? 'Submitting…' : 'Submit Enquiry'}
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our <Link href="/privacy-policy" className="hover:text-sah-green">Privacy Policy</Link> and <Link href="/terms-conditions" className="hover:text-sah-green">Terms & Conditions</Link>.
              </p>
            </form>
          )}
        </motion.div>

        {/* Contact options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">📧</div>
            <h4 className="font-bold text-sah-charcoal mb-2">Email Us</h4>
            <p className="text-sah-green hover:text-sah-charcoal transition-colors">
              <a href="mailto:sales@sahcompany.com">sales@sahcompany.com</a>
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📞</div>
            <h4 className="font-bold text-sah-charcoal mb-2">Call Us</h4>
            <p className="text-sah-charcoal">
              +92 300 0959524<br />
              +92 300 8663396
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <h4 className="font-bold text-sah-charcoal mb-2">WhatsApp</h4>
            <a
              href="https://wa.me/923000959524"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sah-green hover:text-sah-charcoal transition-colors font-medium"
            >
              Chat with us →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
