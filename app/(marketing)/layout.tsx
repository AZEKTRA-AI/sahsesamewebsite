import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ui/ScrollProgress'
import TrustMarquee from '@/components/marketing/TrustMarquee'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <SmoothScroll />
      <ScrollProgress />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />

      {/* Clears the fixed header. Height mirrors the header's un-scrolled state. */}
      <div aria-hidden="true" className="h-[5.5rem] lg:h-24" />

      <main id="main">{children}</main>

      <TrustMarquee />
      <Footer />
    </div>
  )
}
