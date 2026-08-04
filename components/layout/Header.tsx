'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Quality & Process', href: '/quality-process' },
    { label: 'Packaging & Logistics', href: '/packaging-logistics' },
    { label: 'Contact', href: '/contact' },
  ]

  const productLinks = [
    { label: 'Sesame Seeds', href: '/products/sesame' },
    { label: 'Pulses', href: '/products/pulses' },
    { label: 'Rice', href: '/products/rice' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/sahlogo.png"
            alt="SAH Company"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="hidden sm:inline font-bold text-sah-charcoal text-lg">
            SAH Company
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sah-charcoal hover:text-sah-green transition-colors font-medium text-sm"
            >
              {link.label}
            </Link>
          ))}

          {/* Products Dropdown */}
          <div className="relative group">
            <button className="text-sah-charcoal hover:text-sah-green transition-colors font-medium text-sm flex items-center gap-1">
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm text-sah-charcoal hover:bg-sah-cream hover:text-sah-green first:rounded-t-lg last:rounded-b-lg"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/923000959524"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sah-green hover:text-sah-charcoal transition-colors font-medium text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.905 10.23.846 1.668 2.355 2.913 4.568 3.557.987.243 2.468.271 3.617.045l.3-.047c1.013-.188 1.969-.644 2.757-1.289.832-.639 1.432-1.613 1.846-2.613.414-1 .645-2.094.645-3.231 0-2.59-1.039-5.02-2.614-6.76-1.575-1.74-3.716-2.747-5.925-2.747zm10.906-9.142c-3.857-3.6-9.648-4.211-14.143-1.432C.904.757-1.25 4.469.825 8.31c1.054 1.93 2.94 3.398 5.228 4.118 2.287.72 4.882.545 6.931-.52 1.339-.688 2.440-1.553 3.268-2.66 1.27-1.7 1.708-3.887 1.241-5.993-.467-2.106-1.609-3.976-3.27-5.195z" />
            </svg>
            WhatsApp
          </a>
          <Link href="/contact" className="btn-primary text-sm">
            Request a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-sah-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-white border-t border-sah-cream"
        >
          <nav className="container-wide py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sah-charcoal hover:text-sah-green font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-sah-cream pt-4">
              <p className="text-sm font-medium text-sah-green mb-3">Products</p>
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sah-charcoal hover:text-sah-green font-medium pl-4 mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-sah-cream pt-4">
              <a
                href="https://wa.me/923000959524"
                target="_blank"
                rel="noopener noreferrer"
                className="block btn-primary mb-2 text-center"
              >
                WhatsApp
              </a>
              <Link href="/contact" className="block btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                Request a Quote
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
