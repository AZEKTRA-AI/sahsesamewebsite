import ContactForm from '@/components/marketing/ContactForm'
import PageHero from '@/components/marketing/PageHero'
import PageCTA from '@/components/marketing/PageCTA'
import Reveal from '@/components/ui/Reveal'
import SectionIntro from '@/components/ui/SectionIntro'
import { getContentMap } from '@/lib/content/store'
import { contactHeroBlock, contactCtaBlock, globalContactBlock } from '@/lib/content/blocks'

export const metadata = {
  title: 'Contact',
  description:
    'Reach the SAH export desk in Faisalabad for quotations, samples, and specification enquiries.',
}

export default async function ContactPage() {
  const { hero, cta, contact } = await getContentMap({
    hero: contactHeroBlock,
    cta: contactCtaBlock,
    contact: globalContactBlock,
  })

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`

  const details = [
    { label: 'Office', lines: [contact.address] },
    {
      label: 'Phone',
      lines: [contact.phone1, contact.phone2].filter(Boolean),
      hrefs: [`tel:${contact.phone1}`, contact.phone2 ? `tel:${contact.phone2}` : ''].filter(Boolean),
    },
    {
      label: 'Email',
      lines: [contact.email, contact.salesEmail].filter(Boolean),
      hrefs: [`mailto:${contact.email}`, contact.salesEmail ? `mailto:${contact.salesEmail}` : ''].filter(
        Boolean
      ),
    },
    {
      label: 'WhatsApp',
      lines: [contact.whatsapp],
      hrefs: [`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, '')}`],
    },
  ]

  return (
    <>
      <PageHero
        eyebrow={hero.tagline}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <SectionIntro eyebrow="Where to find us" title="Contact details" size="md" />

            <div className="mt-10 overflow-hidden rounded-card border border-sah-gold/15 bg-sah-light">
              {details.map((detail, idx) => (
                <Reveal key={detail.label} delay={0.06 * idx} blur={false}>
                  <div
                    className={`p-6 transition-colors duration-200 hover:bg-white ${
                      idx > 0 ? 'border-t border-sah-gold/12' : ''
                    }`}
                  >
                    <p className="font-body text-[11px] uppercase tracking-[0.22em] text-sah-gold">
                      {detail.label}
                    </p>
                    <div className="mt-2.5 space-y-1">
                      {detail.lines.map((line, lineIdx) => {
                        const href = detail.hrefs?.[lineIdx]
                        const external = href?.startsWith('http')
                        return href ? (
                          <a
                            key={line}
                            href={href}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            className="tnum block font-body text-sah-charcoal/80 transition-colors duration-200 hover:text-sah-gold"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="whitespace-pre-line font-body text-sah-charcoal/80">
                            {line}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Hours */}
            <Reveal delay={0.2}>
              <div className="mt-6 rounded-card border border-sah-gold/15 bg-white p-6">
                <h2 className="font-body text-[11px] uppercase tracking-[0.22em] text-sah-charcoal/55">
                  Business hours
                </h2>
                <dl className="mt-4 space-y-2.5">
                  {contact.hours.map((entry) => (
                    <div key={entry.day} className="flex items-baseline justify-between gap-6">
                      <dt className="font-body text-sm text-sah-charcoal/70">{entry.day}</dt>
                      <dd className="tnum font-body text-sm text-sah-charcoal">{entry.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {contact.facilities.length > 0 && (
              <Reveal delay={0.25}>
                <div className="mt-6 rounded-card border border-sah-gold/15 bg-white p-6">
                  <h2 className="font-body text-[11px] uppercase tracking-[0.22em] text-sah-charcoal/55">
                    Our facilities
                  </h2>
                  <div className="mt-4 space-y-4">
                    {contact.facilities.map((facility) => (
                      <div key={facility.name}>
                        <p className="font-display text-base italic text-sah-charcoal">
                          {facility.name}
                        </p>
                        <p className="mt-0.5 whitespace-pre-line font-body text-sm text-sah-charcoal/65">
                          {facility.address}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Form */}
          <Reveal className="lg:col-span-7" delay={0.1} duration={0.8}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Location */}
      <section className="border-y border-sah-gold/10 bg-sah-cream py-20 sm:py-28">
        <div className="container-wide">
          <SectionIntro
            eyebrow="Our location"
            title="Faisalabad, Punjab"
            lead="We sit inside the New Grain Market — the trading floor our family has worked since 1985."
          />

          <Reveal delay={0.15}>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="grain group relative mt-12 flex h-72 items-end overflow-hidden rounded-panel bg-sah-earth p-8 transition-transform duration-300 ease-out-expo active:scale-[0.99] sm:mt-16 sm:h-96 sm:p-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(70% 70% at 30% 20%, rgba(196,163,97,0.2), transparent 60%)',
                }}
              />
              {/* Simple coordinate grid stands in for a map tile. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '56px 56px',
                }}
              />

              {/* Pin */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              >
                <span className="absolute h-4 w-4 rounded-full bg-sah-gold/40 animate-pulse-ring" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-sah-gold" />
              </span>

              <div className="relative">
                <p className="whitespace-pre-line font-display text-2xl italic text-white sm:text-3xl">
                  {contact.address}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-sah-gold">
                  Open in Google Maps
                  <svg
                    className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      <div className="bg-white py-20 sm:py-28">
        <PageCTA
          title={cta.title}
          subtitle={cta.subtitle}
          primaryLabel={cta.primaryLabel}
          primaryHref="/#rfq-form"
        />
      </div>
    </>
  )
}
