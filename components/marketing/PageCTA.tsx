import Link from 'next/link'

export default function PageCTA({
  title,
  subtitle,
  primaryLabel = 'Request a Quote',
  primaryHref = '/contact',
  secondaryLabel = 'WhatsApp Us',
  secondaryHref = 'https://wa.me/923000959524',
}: {
  title: string
  subtitle: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  return (
    <section className="container-wide">
      <div className="bg-sah-earth rounded-lg px-6 sm:px-12 py-12 sm:py-16 text-center">
        <h2 className="font-display text-3xl sm:text-4xl italic text-white mb-4">{title}</h2>
        <p className="font-body text-white/75 text-base sm:text-lg mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryHref} className="px-6 py-3 bg-sah-gold text-white font-body font-medium rounded-lg hover:bg-white hover:text-sah-earth transition-colors text-center">
            {primaryLabel}
          </Link>
          <a
            href={secondaryHref}
            target={secondaryHref.startsWith('http') ? '_blank' : undefined}
            rel={secondaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="px-6 py-3 border border-white/30 text-white font-body font-medium rounded-lg hover:bg-white/10 transition-colors text-center"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
