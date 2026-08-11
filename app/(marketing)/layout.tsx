import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ui/ScrollProgress'
import TrustMarquee from '@/components/marketing/TrustMarquee'
import JsonLd from '@/components/seo/JsonLd'
import { getContent } from '@/lib/content/store'
import { globalContactBlock, globalBrandBlock } from '@/lib/content/blocks'
import { getSiteUrl } from '@/lib/site'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [contact, brand] = await Promise.all([
    getContent(globalContactBlock),
    getContent(globalBrandBlock),
  ])

  const siteUrl = getSiteUrl()

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.legalName,
    url: siteUrl,
    logo: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958262/sah-marketing/sahlogo.png',
    description: brand.blurb,
    foundingDate: '1985',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
      addressCountry: 'PK',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contact.phone1,
        email: contact.salesEmail || contact.email,
        contactType: 'sales',
        areaServed: 'Worldwide',
      },
    ],
    sameAs: [contact.linkedinUrl, contact.facebookUrl].filter(Boolean),
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={organizationJsonLd} />
      <SmoothScroll />
      <ScrollProgress />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header whatsapp={contact.whatsapp} legalName={brand.legalName} />

      {/* Clears the fixed header. Height mirrors the header's un-scrolled state. */}
      <div aria-hidden="true" className="h-[5.5rem] lg:h-24" />

      <main id="main">{children}</main>

      <TrustMarquee />
      <Footer contact={contact} brand={brand} />
    </div>
  )
}
