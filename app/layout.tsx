import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
})

/**
 * metadataBase is evaluated while Next collects page data, so anything thrown
 * here fails the whole build. Env vars are routinely entered without a scheme
 * ("sahcompany.com", or Vercel's bare VERCEL_URL), which `new URL` rejects —
 * so add the scheme when it is missing and fall back rather than throw.
 */
function resolveMetadataBase(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
  const candidates = [
    raw && (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`),
    'https://sahcompany.com',
  ].filter(Boolean) as string[]

  for (const candidate of candidates) {
    try {
      return new URL(candidate)
    } catch {
      // Try the next candidate.
    }
  }
  return undefined
}

const ogImage =
  'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg'

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: 'SAH Company | Pakistani Sesame Seeds, Pulses & Rice Exporter',
    template: '%s | SAH Company',
  },
  description:
    'Family-rooted sesame seeds, pulses, and rice exporter from Faisalabad, Pakistan. Supplying global buyers with export-grade agricultural commodities since 1985.',
  keywords: [
    'sesame seeds exporter Pakistan',
    'hulled sesame seeds',
    'pulses exporter',
    'basmati rice exporter',
    'Faisalabad agricultural exporter',
    'FOB Karachi',
  ],
  authors: [{ name: 'Sain Abdul Hakim & Company' }],
  openGraph: {
    type: 'website',
    siteName: 'SAH Company',
    title: 'SAH Company | Pakistani Sesame Seeds, Pulses & Rice Exporter',
    description:
      'Export-grade sesame, pulses, and rice from Faisalabad, Pakistan. Family-run since 1985.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Premium Pakistani sesame seeds' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAH Company | Pakistani Sesame Seeds, Pulses & Rice Exporter',
    description:
      'Export-grade sesame, pulses, and rice from Faisalabad, Pakistan. Family-run since 1985.',
    images: [ogImage],
  },
  icons: {
    icon: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958262/sah-marketing/sahlogo.png',
    apple:
      'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958262/sah-marketing/sahlogo.png',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-sah-light text-sah-charcoal font-body antialiased">
        {children}
      </body>
    </html>
  )
}
