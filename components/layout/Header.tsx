'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1] as const

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Quality & Process', href: '/quality-process' },
  { label: 'Packaging & Logistics', href: '/packaging-logistics' },
  { label: 'Contact', href: '/contact' },
]

const productLinks = [
  { label: 'Sesame Seeds', href: '/products/sesame', hint: 'Hulled · Natural' },
  { label: 'Pulses', href: '/products/pulses', hint: 'Chickpeas · Lentils · Moong' },
  { label: 'Rice', href: '/products/rice', hint: '1121 · Super · PK-385 · IRRI-6' },
]

export default function Header({ whatsapp }: { whatsapp: string }) {
  const waHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  // Condense the bar once the page has moved past the first fold of the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Route change closes whatever is open.
  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
  }, [pathname])

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const productsActive = pathname.startsWith('/products')

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out-expo ${
          scrolled
            ? 'border-b border-sah-gold/15 bg-white/80 shadow-[0_8px_32px_-24px_rgba(42,32,12,0.5)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-white/55 backdrop-blur-md backdrop-saturate-150'
        }`}
      >
        <div
          className={`container-wide flex items-center justify-between transition-[height] duration-300 ease-out-expo ${
            scrolled ? 'h-[4.5rem]' : 'h-[5.5rem] lg:h-24'
          }`}
        >
          {/* Logo — the mark itself carries the name, so it stands alone at a
              size where its own lettering is actually legible. */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center rounded-lg"
            aria-label="SAH Company — home"
          >
            <Image
              src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958262/sah-marketing/sahlogo.png"
              alt="Sain Abdul Hakim & Company"
              width={120}
              height={120}
              priority
              className={`w-auto transition-[height] duration-300 ease-out-expo ${
                scrolled ? 'h-12' : 'h-16 lg:h-20'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`relative rounded-lg px-3.5 py-2 font-body text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-sah-gold'
                    : 'text-sah-charcoal/80 hover:text-sah-charcoal'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-sah-gold"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
              </Link>
            ))}

            {/* Products */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                aria-expanded={productsOpen}
                aria-haspopup="true"
                onClick={() => setProductsOpen((open) => !open)}
                className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-body text-sm font-medium transition-colors duration-200 ${
                  productsActive ? 'text-sah-gold' : 'text-sah-charcoal/80 hover:text-sah-charcoal'
                }`}
              >
                Products
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ease-out-expo ${
                    productsOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
                {productsActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-sah-gold"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: EASE }}
                    // Scales out of the trigger above it, not from its own middle.
                    style={{ transformOrigin: 'top center' }}
                    className="glass absolute left-1/2 top-full w-72 -translate-x-1/2 overflow-hidden rounded-card p-1.5"
                  >
                    <Link
                      href="/products"
                      className="block rounded-xl px-4 py-2.5 font-body text-xs uppercase tracking-[0.18em] text-sah-gold transition-colors duration-150 hover:bg-sah-gold/10"
                    >
                      All products
                    </Link>
                    <div className="rule-fade mx-3 my-1" />
                    {productLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group block rounded-xl px-4 py-3 transition-colors duration-150 hover:bg-sah-gold/10 active:scale-[0.98]"
                      >
                        <span className="block font-display text-base italic text-sah-charcoal transition-colors duration-150 group-hover:text-sah-gold">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block font-body text-xs text-sah-charcoal/55">
                          {link.hint}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-3 py-2 font-body text-sm font-medium text-sah-charcoal/80 transition-colors duration-200 hover:text-sah-gold active:scale-[0.97]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43l-.47-.01c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
              </svg>
              WhatsApp
            </a>
            <Link href="/contact" className="btn-solid px-5 py-2.5 text-sm">
              Request a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-sah-gold/10 active:scale-[0.94] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-[1.5px] w-6 rounded-full bg-sah-charcoal transition-transform duration-300 ease-out-expo ${
                  mobileOpen ? 'top-[7px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[1.5px] w-6 rounded-full bg-sah-charcoal transition-opacity duration-200 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-6 rounded-full bg-sah-charcoal transition-transform duration-300 ease-out-expo ${
                  mobileOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-sah-earth/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              className="glass absolute inset-x-0 top-0 max-h-[92dvh] overflow-y-auto rounded-b-panel px-6 pb-8 pt-[6.5rem]"
              aria-label="Mobile"
            >
              <div className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.045, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className={`block border-b border-sah-gold/10 py-3.5 font-display text-2xl italic transition-colors duration-200 ${
                        isActive(link.href) ? 'text-sah-gold' : 'text-sah-charcoal'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.4, ease: EASE }}
                  className="eyebrow mb-1 mt-7"
                >
                  Products
                </motion.p>

                {productLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36 + i * 0.045, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-baseline justify-between border-b border-sah-gold/10 py-3 font-body text-base text-sah-charcoal/85 transition-colors duration-200 hover:text-sah-gold"
                    >
                      {link.label}
                      <span className="font-body text-[11px] text-sah-charcoal/45">
                        {link.hint}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.52, duration: 0.4, ease: EASE }}
                  className="mt-8 flex flex-col gap-3"
                >
                  <Link href="/contact" className="btn-solid w-full">
                    Request a Quote
                  </Link>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full border border-sah-gold/40 px-7 py-3 font-body font-medium text-sah-gold transition-colors duration-200 hover:bg-sah-gold/10 active:scale-[0.97]"
                  >
                    WhatsApp us
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
