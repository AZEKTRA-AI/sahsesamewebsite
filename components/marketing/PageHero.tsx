'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import TextReveal from '@/components/ui/TextReveal'
import ParallaxImage from '@/components/ui/ParallaxImage'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  breadcrumbs,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  image: string
  imageAlt: string
  breadcrumbs?: { label: string; href?: string }[]
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-sah-earth">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ParallaxImage
          src={image}
          alt={imageAlt}
          sizes="100vw"
          className="h-full w-full"
          imageClassName="opacity-45"
          distance={40}
          priority
        >
          <div className="absolute inset-0 bg-gradient-to-b from-sah-earth/80 via-sah-earth/75 to-sah-earth" />
        </ParallaxImage>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(80% 60% at 15% 10%, rgba(196,163,97,0.18), transparent 60%)',
        }}
      />

      <div className="container-wide relative py-16 sm:py-20 lg:py-24">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Reveal blur={false} duration={0.5}>
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-xs text-white/50">
                {breadcrumbs.map((crumb, idx) => (
                  <li key={`${crumb.label}-${idx}`} className="flex items-center gap-2.5">
                    {idx > 0 && (
                      <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-sah-gold/60" />
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors duration-200 hover:text-sah-gold"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-sah-gold">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <Reveal blur={false} duration={0.5}>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-sah-gold/60" />
            <p className="eyebrow">{eyebrow}</p>
          </div>
        </Reveal>

        <TextReveal
          text={title}
          as="h1"
          trigger="mount"
          className="display-xl max-w-4xl text-4xl text-white sm:text-5xl md:text-6xl lg:text-[4rem]"
        />

        {subtitle && (
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/65 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
