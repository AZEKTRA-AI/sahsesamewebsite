import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Page not found',
}

const routes = [
  { label: 'Sesame seeds', href: '/products/sesame' },
  { label: 'Pulses', href: '/products/pulses' },
  { label: 'Rice', href: '/products/rice' },
  { label: 'About us', href: '/about' },
  { label: 'Quality & process', href: '/quality-process' },
  { label: 'Contact', href: '/contact' },
]

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen items-center overflow-hidden bg-sah-earth">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 20% 0%, rgba(196,163,97,0.18), transparent 62%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="select-none font-display text-[38vw] font-bold leading-none text-white/[0.04]">
          404
        </span>
      </div>

      <div className="container-wide relative py-20">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958262/sah-marketing/sahlogo.png"
            alt=""
            width={56}
            height={56}
            className="h-12 w-auto"
          />
          <span className="font-display text-lg italic text-white">SAH Company</span>
        </Link>

        <div className="mt-14 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-sah-gold/60" />
            <p className="eyebrow">Error 404</p>
          </div>

          <h1 className="display-xl text-4xl text-white sm:text-5xl md:text-6xl">
            This page is not in our catalogue
          </h1>

          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-white/65 sm:text-lg">
            The link may be out of date, or the page has moved. Here is where most
            people are heading.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn-solid text-center">
              Back to the home page
            </Link>
            <Link
              href="/contact"
              className="btn-ghost text-center text-white transition-colors duration-200 hover:bg-white/10"
            >
              Contact the export desk
            </Link>
          </div>

          <nav aria-label="Popular pages" className="mt-12">
            <p className="font-body text-[11px] uppercase tracking-[0.24em] text-white/40">
              Popular pages
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="glass-dark inline-flex rounded-lg px-4 py-2.5 font-body text-sm text-white/75 transition-colors duration-200 hover:text-sah-gold active:scale-[0.97]"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  )
}
