'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import type { homeRfqIntroBlock, globalContactBlock } from '@/lib/content/blocks'

const EASE = [0.23, 1, 0.32, 1] as const

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

export default function RFQFormSection({
  intro,
  contact,
}: {
  intro: typeof homeRfqIntroBlock.defaults
  contact: typeof globalContactBlock.defaults
}) {
  const contactRoutes = [
    {
      label: 'Email',
      value: contact.salesEmail,
      href: `mailto:${contact.salesEmail}`,
      note: 'Specifications and quotations',
    },
    {
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, '')}`,
      note: 'Fastest route during Pakistan business hours',
    },
    {
      label: 'Office',
      value: contact.phone2 || contact.phone1,
      href: `tel:${contact.phone2 || contact.phone1}`,
      note: 'New Grain Market, Faisalabad',
    },
  ]

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState(EMPTY_FORM)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
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
        setError(result.error || 'We could not send that. Please try again.')
        setFormState('idle')
        return
      }

      setFormState('submitted')
      setFormData(EMPTY_FORM)
    } catch {
      setError('Connection failed. Check your network and try again.')
      setFormState('idle')
    }
  }

  return (
    <section id="rfq-form" className="scroll-mt-32 border-t border-sah-gold/10 bg-sah-light py-20 sm:py-28">
      <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left rail */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionIntro
              eyebrow={intro.tagline}
              title={intro.title}
              lead={intro.lead}
              size="md"
            />

            <div className="mt-10 space-y-px overflow-hidden rounded-card border border-sah-gold/15 bg-white">
              {contactRoutes.map((route, idx) => (
                <Reveal key={route.label} delay={0.1 + idx * 0.08} blur={false}>
                  <a
                    href={route.href}
                    target={route.href.startsWith('http') ? '_blank' : undefined}
                    rel={route.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`group block p-5 transition-colors duration-200 hover:bg-sah-cream ${
                      idx > 0 ? 'border-t border-sah-gold/12' : ''
                    }`}
                  >
                    <p className="font-body text-[11px] uppercase tracking-[0.2em] text-sah-gold">
                      {route.label}
                    </p>
                    <p className="mt-1.5 font-display text-lg italic text-sah-charcoal transition-colors duration-200 group-hover:text-sah-gold">
                      {route.value}
                    </p>
                    <p className="mt-0.5 font-body text-xs text-sah-charcoal/55">{route.note}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <Reveal className="lg:col-span-7" delay={0.1} duration={0.8}>
          <div className="glass rounded-panel p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {formState === 'submitted' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="py-12 text-center"
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
                  <h3 className="font-display text-2xl italic text-sah-charcoal">
                    Enquiry received
                  </h3>
                  <p className="mx-auto mt-3 max-w-md font-body text-sah-charcoal/65">
                    Our export desk will review your specification and reply by email or
                    WhatsApp, usually within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="mt-7 font-body text-sm font-medium text-sah-gold underline-offset-4 transition-colors duration-200 hover:text-sah-charcoal hover:underline active:scale-[0.97]"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={false}
                  className="relative space-y-8"
                >
                  {/* Buyer */}
                  <fieldset className="space-y-4" disabled={formState === 'submitting'}>
                    <legend className="mb-4 font-display text-lg italic text-sah-charcoal">
                      Your details
                    </legend>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="buyerName" className="field-label">
                          Full name *
                        </label>
                        <input
                          id="buyerName"
                          type="text"
                          name="buyerName"
                          value={formData.buyerName}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                          className="field"
                          placeholder="Amara Okonjo"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="field-label">
                          Company *
                        </label>
                        <input
                          id="company"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          autoComplete="organization"
                          className="field"
                          placeholder="Levant Food Ingredients"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="field-label">
                          Country *
                        </label>
                        <input
                          id="country"
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          autoComplete="country-name"
                          className="field"
                          placeholder="Türkiye"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="field-label">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                          className="field"
                          placeholder="purchasing@yourcompany.com"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="phone" className="field-label">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          autoComplete="tel"
                          className="field tnum"
                          placeholder="+90 532 417 6083"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <div className="rule-fade" />

                  {/* Requirement */}
                  <fieldset className="space-y-4" disabled={formState === 'submitting'}>
                    <legend className="mb-4 font-display text-lg italic text-sah-charcoal">
                      What you need
                    </legend>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="product" className="field-label">
                          Product *
                        </label>
                        <select
                          id="product"
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          required
                          className="field"
                        >
                          <option value="">Select a product</option>
                          <option value="sesame">Sesame seeds</option>
                          <option value="pulses">Pulses</option>
                          <option value="rice">Rice</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="quantity" className="field-label">
                          Quantity
                        </label>
                        <input
                          id="quantity"
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="field"
                          placeholder="2 x 20ft, approx. 48 MT"
                        />
                      </div>
                      <div>
                        <label htmlFor="packaging" className="field-label">
                          Packaging
                        </label>
                        <input
                          id="packaging"
                          type="text"
                          name="packaging"
                          value={formData.packaging}
                          onChange={handleChange}
                          className="field"
                          placeholder="25 kg PP woven, buyer artwork"
                        />
                      </div>
                      <div>
                        <label htmlFor="incoterm" className="field-label">
                          Incoterm
                        </label>
                        <select
                          id="incoterm"
                          name="incoterm"
                          value={formData.incoterm}
                          onChange={handleChange}
                          className="field"
                        >
                          <option value="FOB">FOB Karachi</option>
                          <option value="CFR">CFR</option>
                          <option value="CIF">CIF</option>
                        </select>
                      </div>
                    </div>

                    <label
                      htmlFor="sampleRequest"
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-sah-gold/20 bg-white/60 p-4 transition-colors duration-200 hover:border-sah-gold/45"
                    >
                      <input
                        id="sampleRequest"
                        type="checkbox"
                        name="sampleRequest"
                        checked={formData.sampleRequest}
                        onChange={handleChange}
                        className="h-4 w-4 cursor-pointer rounded border-sah-charcoal/30 text-sah-gold accent-[#C4A361]"
                      />
                      <span className="font-body text-sm text-sah-charcoal">
                        Send a sample before we contract
                      </span>
                    </label>

                    <div>
                      <label htmlFor="comments" className="field-label">
                        Specification notes
                      </label>
                      <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        rows={5}
                        className="field resize-y"
                        placeholder="Grade, purity, moisture ceiling, certifications, destination port, shipment window…"
                      />
                    </div>
                  </fieldset>

                  {/* Honeypot — off-screen, bots fill it in */}
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

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="btn-solid w-full disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-sah-earth/25 border-t-sah-earth"
                          />
                          Sending…
                        </span>
                      ) : (
                        'Submit enquiry'
                      )}
                    </button>

                    <p className="text-center font-body text-xs text-sah-charcoal/50">
                      By submitting you agree to our{' '}
                      <Link
                        href="/privacy-policy"
                        className="text-sah-charcoal/70 underline-offset-2 transition-colors duration-200 hover:text-sah-gold hover:underline"
                      >
                        privacy policy
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/terms-conditions"
                        className="text-sah-charcoal/70 underline-offset-2 transition-colors duration-200 hover:text-sah-gold hover:underline"
                      >
                        terms
                      </Link>
                      .
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
