import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SAH Company | Pakistani Sesame Seeds & Pulses Exporter',
  description: 'Family-rooted sesame seeds, pulses, and rice exporter from Pakistan. Supplying global buyers with quality agricultural commodities since 1992.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-sah-light text-sah-charcoal">
        {children}
      </body>
    </html>
  )
}
