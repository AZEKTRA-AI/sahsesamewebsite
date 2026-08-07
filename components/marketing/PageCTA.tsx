'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import TextReveal from '@/components/ui/TextReveal'
import Magnetic from '@/components/ui/Magnetic'

export default function PageCTA({
  title,
  subtitle,
  primaryLabel = 'Request a quote',
  primaryHref = '/contact',
  secondaryLabel = 'WhatsApp us',
  secondaryHref = 'https://wa.me/923000959524',
}: {
  title: string
  subtitle: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  const secondaryExternal = secondaryHref.startsWith('http')

  return (
    <section className="container-wide">
      <Reveal duration={0.8}>
        <div className="grain relative overflow-hidden rounded-panel bg-sah-earth px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 70% at 50% 0%, rgba(196,163,97,0.22), transparent 62%)',
            }}
          />

          {/* Faint ring motif — gives the panel a centre without adding clutter. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sah-gold/10"
          />

          <div className="relative">
            <TextReveal
              text={title}
              as="h2"
              className="display-lg mx-auto max-w-2xl text-3xl text-white sm:text-4xl md:text-5xl"
            />

            <Reveal delay={0.15}>
              <p className="mx-auto mt-5 max-w-xl font-body text-base text-white/65 sm:text-lg">
                {subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.25} blur={false}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Magnetic strength={0.2} className="w-full sm:w-auto">
                  <Link href={primaryHref} className="btn-solid w-full sm:w-auto">
                    {primaryLabel}
                  </Link>
                </Magnetic>
                <a
                  href={secondaryHref}
                  target={secondaryExternal ? '_blank' : undefined}
                  rel={secondaryExternal ? 'noopener noreferrer' : undefined}
                  className="btn-ghost w-full text-white transition-colors duration-200 hover:bg-white/10 sm:w-auto"
                >
                  {secondaryLabel}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
