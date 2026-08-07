'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1] as const

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
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        setError(result.error || 'We could not send that. Please try again.')
        setState('idle')
        return
      }

      setState('submitted')
      setFormData(EMPTY_FORM)
    } catch {
      setError('Connection failed. Check your network and try again.')
      setState('idle')
    }
  }

  return (
    <div className="glass rounded-panel p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {state === 'submitted' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="py-10 text-center"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-sah-gold/40 bg-sah-gold/10">
              <motion.svg
                className="h-6 w-6 text-sah-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                />
              </motion.svg>
            </div>
            <h2 className="font-display text-2xl italic text-sah-charcoal">Message received</h2>
            <p className="mx-auto mt-3 max-w-sm font-body text-sm text-sah-charcoal/65">
              We will come back to you within one business day, by email or WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => setState('idle')}
              className="mt-6 font-body text-sm font-medium text-sah-gold underline-offset-4 transition-colors duration-200 hover:text-sah-charcoal hover:underline active:scale-[0.97]"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={false}>
            <h2 className="font-display text-2xl italic text-sah-charcoal">Quick enquiry</h2>
            <p className="mt-2 font-body text-sm text-sah-charcoal/60">
              For a full specification and quantity breakdown, use the detailed RFQ form
              instead.
            </p>

            <form onSubmit={handleSubmit} className="relative mt-7 space-y-5">
              <fieldset disabled={state === 'submitting'} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="field-label">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="buyerName"
                      value={formData.buyerName}
                      onChange={handleChange}
                      placeholder="Rashid Karim"
                      autoComplete="name"
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="field-label">
                      Company
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Gulf Pulse Trading"
                      autoComplete="organization"
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-country" className="field-label">
                      Country
                    </label>
                    <input
                      id="contact-country"
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="United Arab Emirates"
                      autoComplete="country-name"
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-product" className="field-label">
                      Product interest
                    </label>
                    <select
                      id="contact-product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="field"
                      required
                    >
                      <option value="">Select a product</option>
                      <option value="Sesame Seeds">Sesame seeds</option>
                      <option value="Pulses">Pulses</option>
                      <option value="Rice">Rice</option>
                      <option value="Other">Something else</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="field-label">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="purchasing@yourcompany.com"
                      autoComplete="email"
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="field-label">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 274 6118"
                      autoComplete="tel"
                      className="field tnum"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="field-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Quantity, destination port, and any grade requirements…"
                    rows={4}
                    className="field resize-y"
                  />
                </div>
              </fieldset>

              {/* Honeypot — off-screen, bots fill it in */}
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

              <AnimatePresence>
                {error && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden rounded-xl border border-[#9B2C2C]/25 bg-[#9B2C2C]/[0.06] px-4 py-3 font-body text-sm text-[#9B2C2C]"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={state === 'submitting'}
                className="btn-solid w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state === 'submitting' ? (
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-sah-earth/25 border-t-sah-earth"
                    />
                    Sending…
                  </span>
                ) : (
                  'Send enquiry'
                )}
              </button>

              <p className="text-center font-body text-xs text-sah-charcoal/45">
                Replies typically within one business day
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
