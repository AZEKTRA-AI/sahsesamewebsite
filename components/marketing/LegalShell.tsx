import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Shell for the policy pages: a slim dark header band, then a single readable
 * column. No photography — legal text should not compete with imagery.
 */
export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <section className="grain relative overflow-hidden bg-sah-earth">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 70% at 15% 0%, rgba(196,163,97,0.16), transparent 62%)',
          }}
        />

        <div className="container-wide relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2.5 font-body text-xs text-white/50">
              <li>
                <Link href="/" className="transition-colors duration-200 hover:text-sah-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="h-1 w-1 rotate-45 bg-sah-gold/60" />
              <li className="text-sah-gold">{title}</li>
            </ol>
          </nav>

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-sah-gold/60" />
            <p className="eyebrow">Legal</p>
          </div>

          <h1 className="display-lg text-4xl text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 font-body text-sm text-white/50">Last updated {updated}</p>
        </div>
      </section>

      <div className="bg-white py-16 sm:py-24">
        <div className="container-wide">
          <article className="legal-body mx-auto max-w-2xl">{children}</article>
        </div>
      </div>
    </>
  )
}
