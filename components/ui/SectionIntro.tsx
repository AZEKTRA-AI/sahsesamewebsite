'use client'

import Reveal from './Reveal'
import TextReveal from './TextReveal'

/**
 * The shared section opener: eyebrow, display headline, optional lead
 * paragraph. Left-aligned by default — centred headers everywhere is the
 * fastest way to make a page look templated.
 */
export default function SectionIntro({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  className = '',
  size = 'lg',
}: {
  eyebrow: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
  size?: 'md' | 'lg'
}) {
  const dark = tone === 'dark'
  const centered = align === 'center'

  return (
    <div
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} ${className}`}
    >
      <Reveal blur={false} duration={0.5}>
        <div
          className={`mb-5 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
        >
          <span className="h-px w-8 bg-sah-gold/60" />
          <p className="eyebrow">{eyebrow}</p>
        </div>
      </Reveal>

      <TextReveal
        text={title}
        as="h2"
        className={`display-lg ${
          size === 'lg'
            ? 'text-[2.5rem] sm:text-5xl md:text-6xl'
            : 'text-[2rem] sm:text-4xl md:text-5xl'
        } ${dark ? 'text-white' : 'text-sah-charcoal'}`}
      />

      {lead && (
        <Reveal delay={0.15}>
          <p
            className={`mt-6 max-w-2xl font-body text-base leading-relaxed sm:text-lg ${
              centered ? 'mx-auto' : ''
            } ${dark ? 'text-white/70' : 'text-sah-charcoal/70'}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
