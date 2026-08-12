import Link from 'next/link'
import Image from 'next/image'
import type { getContent } from '@/lib/content/store'
import type { globalContactBlock, globalBrandBlock } from '@/lib/content/blocks'

const productLinks = [
  { label: 'Sesame seeds', href: '/products/sesame' },
  { label: 'Pulses', href: '/products/pulses' },
  { label: 'Rice', href: '/products/rice' },
  { label: 'All products', href: '/products' },
]

const companyLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Quality & process', href: '/quality-process' },
  { label: 'Packaging & logistics', href: '/packaging-logistics' },
  { label: 'Request a quote', href: '/contact' },
]

type ContactContent = Awaited<ReturnType<typeof getContent<(typeof globalContactBlock)['defaults']>>>
type BrandContent = Awaited<ReturnType<typeof getContent<(typeof globalBrandBlock)['defaults']>>>

export default function Footer({
  contact,
  brand,
}: {
  contact: ContactContent
  brand: BrandContent
}) {
  const year = new Date().getFullYear()
  const waHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, '')}`

  return (
    <footer className="grain relative overflow-hidden bg-sah-earth text-white">
      {/* Warm glow anchoring the footer to the rest of the dark sections. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 60% at 10% 0%, rgba(196,163,97,0.13), transparent 60%)',
        }}
      />

      {/* Oversized wordmark — sits behind the columns instead of adding its
          own height, so the footer stays compact. Placed before the content
          in the DOM (and unpositioned relative to it) so it paints behind. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
      >
        <p className="whitespace-nowrap font-display text-[19vw] italic leading-[0.8] text-white/[0.045] lg:text-[15vw]">
          Sesame · Pulses · Rice
        </p>
      </div>

      <div className="container-wide relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958262/sah-marketing/sahlogo.png"
                alt=""
                width={56}
                height={56}
                className="h-12 w-auto"
              />
              <span className="font-display text-xl italic leading-tight text-white">
                {brand.legalName}
                <span className="block font-body text-[10px] uppercase tracking-[0.24em] text-sah-gold">
                  Est. 1985
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-white/60">
              {brand.blurb}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="glass-dark flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:text-sah-gold active:scale-[0.94]"
              >
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43l-.47-.01c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
                </svg>
              </a>
              {contact.linkedinUrl && (
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="glass-dark flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:text-sah-gold active:scale-[0.94]"
                >
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {contact.facebookUrl && (
                <a
                  href={contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="glass-dark flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:text-sah-gold active:scale-[0.94]"
                >
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <nav className="lg:col-span-2" aria-label="Products">
            <h2 className="font-body text-[11px] uppercase tracking-[0.24em] text-sah-gold">
              Products
            </h2>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline font-body text-sm text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Company">
            <h2 className="font-body text-[11px] uppercase tracking-[0.24em] text-sah-gold">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline font-body text-sm text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-body text-[11px] uppercase tracking-[0.24em] text-sah-gold">
              Contact
            </h2>
            <address className="mt-5 space-y-4 font-body text-sm not-italic text-white/65">
              <p className="whitespace-pre-line leading-relaxed">{contact.address}</p>
              <p className="tnum">
                <a href={`tel:${contact.phone1}`} className="block transition-colors duration-200 hover:text-white">
                  {contact.phone1}
                </a>
                {contact.phone2 && (
                  <a href={`tel:${contact.phone2}`} className="block transition-colors duration-200 hover:text-white">
                    {contact.phone2}
                  </a>
                )}
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-underline transition-colors duration-200 hover:text-white"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="rule-fade mt-10" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-xs text-white/45">
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="font-body text-xs text-white/45 transition-colors duration-200 hover:text-sah-gold"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms-conditions"
              className="font-body text-xs text-white/45 transition-colors duration-200 hover:text-sah-gold"
            >
              Terms &amp; conditions
            </Link>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="https://www.azektra.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-white/5 py-1.5 pl-3 pr-1.5 transition-colors duration-200 hover:bg-white/10"
          >
            <span className="font-body text-[11px] text-white/40 group-hover:text-white/60">
              Powered by
            </span>
            <span className="inline-flex items-center rounded bg-white px-1.5 py-1">
              <Image
                src="https://res.cloudinary.com/pjhvvbam/image/upload/v1786516778/sah-marketing/azektra-logo.jpg"
                alt="Azektra"
                width={80}
                height={20}
                className="h-3 w-auto"
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
