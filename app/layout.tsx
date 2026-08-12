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
 * ("sainabdulhakim.com", or Vercel's bare VERCEL_URL), which `new URL`
 * rejects — so add the scheme when it is missing and fall back rather than
 * throw. Set NEXT_PUBLIC_SITE_URL in Vercel to the real domain; the literal
 * below is only a last-resort fallback if that var is ever unset.
 */
function resolveMetadataBase(): URL | undefined {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || '').trim()
  const candidates = [
    raw && (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`),
    'https://www.sainabdulhakim.com',
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

// Cropped to the 1200x630 OG/Twitter card size Cloudinary-side so social
// previews don't rely on the platform's own (often ugly) auto-crop.
const ogImage =
  'https://res.cloudinary.com/pjhvvbam/image/upload/w_1200,h_630,c_fill,g_auto/v1786433354/sah-marketing/hero-rice.png'

const siteName = 'Sain Abdul Hakim and Company'
const titleDefault =
  'Sain Abdul Hakim and Company | Rice, Sesame Seeds & Pulses Exporter from Pakistan'
const descriptionDefault =
  'Faisalabad-based exporter of Basmati and IRRI rice, hulled and natural sesame seeds, and pulses — export-grade, lab-tested, and shipped worldwide since 1985.'

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: titleDefault,
    template: `%s | ${siteName}`,
  },
  description: descriptionDefault,
  keywords: [
    'rice exporter Pakistan',
    'basmati rice exporter',
    'IRRI rice exporter',
    'sesame seeds exporter Pakistan',
    'hulled sesame seeds',
    'pulses exporter Pakistan',
    'Faisalabad agricultural exporter',
    'FOB Karachi rice',
  ],
  authors: [{ name: siteName }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName,
    title: titleDefault,
    description: descriptionDefault,
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Basmati rice grown in Punjab, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: titleDefault,
    description: descriptionDefault,
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
