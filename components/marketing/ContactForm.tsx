'use client'

import { useState } from 'react'

const EMPTY_FORM = {
  buyerName: '',
  company: '',
  country: '',
  email: '',
  phone: '',
  product: '',
  comments: '',
  website: '', // honeypot
}

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState(EMPTY_FORM)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('submitting')
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
        setState('idle')
        return
      }

      setState('submitted')
      setFormData(EMPTY_FORM)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setState('idle')
    }
  }

  if (state === 'submitted') {
    return (
      <div className="bg-sah-light border border-sah-gold/10 rounded-lg p-8 text-center space-y-3">
        <h2 className="font-display text-2xl italic text-sah-gold">Thank You</h2>
        <p className="font-body text-sah-charcoal/75">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setState('idle')}
          className="font-body text-sah-gold underline text-sm hover:text-sah-charcoal transition-colors"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-sah-light border border-sah-gold/10 rounded-lg p-8 space-y-6">
      <h2 className="font-display text-2xl italic text-sah-charcoal">Quick Inquiry</h2>
      <form onSubmit={handleSubmit} className="relative space-y-5">
        <div>
          <label className="block text-sm font-body font-medium text-sah-charcoal mb-2">Your Name</label>
          <input
            type="text"
            name="buyerName"
            value={formData.buyerName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-sah-gold/20 rounded-lg focus:outline-none focus:border-sah-gold font-body"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-sah-charcoal mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company"
            className="w-full px-4 py-2 border border-sah-gold/20 rounded-lg focus:outline-none focus:border-sah-gold font-body"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-sah-charcoal mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United Arab Emirates"
            className="w-full px-4 py-2 border border-sah-gold/20 rounded-lg focus:outline-none focus:border-sah-gold font-body"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-sah-charcoal mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-sah-gold/20 rounded-lg focus:outline-none focus:border-sah-gold font-body"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-sah-charcoal mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-2 border border-sah-gold/20 rounded-lg focus:outline-none focus:border-sah-gold font-body"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-sah-charcoal mb-2">
            Product Interest
          </label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-sah-gold/20 rounded-lg focus:outline-none focus:border-sah-gold font-body"
            required
          >
            <option value="">Select a product</option>
            <option value="Sesame Seeds">Sesame Seeds</option>
            <option value="Pulses">Pulses</option>
            <option value="Rice">Rice</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-sah-charcoal mb-2">Message</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Tell us about your inquiry..."
            rows={4}
            className="w-full px-4 py-2 border border-sah-gold/20 rounded-lg focus:outline-none focus:border-sah-gold font-body resize-none"
          />
        </div>

        {/* Honeypot — hidden from users, bots fill it in */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            type="text"
            id="contact-website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 font-body">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={state === 'submitting'}
          className="w-full bg-sah-gold text-white font-body font-medium py-3 rounded-lg hover:bg-sah-charcoal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === 'submitting' ? 'Sending…' : 'Send Inquiry'}
        </button>

        <p className="text-xs font-body text-sah-charcoal/50 text-center">
          We&apos;ll get back to you within 24 hours
        </p>
      </form>
    </div>
  )
}
