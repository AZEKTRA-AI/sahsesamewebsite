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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahcompany.com'
const ogImage =
  'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
