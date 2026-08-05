import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/marketing/HeroSection'
import TradingRootsSection from '@/components/marketing/TradingRootsSection'
import CategoriesShowcase from '@/components/marketing/CategoriesShowcase'
import WhyChooseUs from '@/components/marketing/WhyChooseUs'
import QualityProcess from '@/components/marketing/QualityProcess'
import PackagingShipment from '@/components/marketing/PackagingShipment'
import IndustriesServed from '@/components/marketing/IndustriesServed'
import RFQFormSection from '@/components/marketing/RFQFormSection'

async function getPage(slug: string) {
  return await prisma.page.findUnique({
    where: { slug },
    include: { sections: { orderBy: { sortOrder: 'asc' } } },
  })
}

export default async function PageRenderer({ slug }: { slug: string }) {
  const page = await getPage(slug)

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-500">Page not found</p>
      </div>
    )
  }

  return (
    <>
      {page.sections.map((section) => (
        <div key={section.id}>
          {section.type === 'hero' && <HeroSection />}
          {section.type === 'trading-roots' && <TradingRootsSection />}
          {section.type === 'categories-showcase' && <CategoriesShowcase />}
          {section.type === 'why-choose-us' && <WhyChooseUs />}
          {section.type === 'quality-process' && <QualityProcess />}
          {section.type === 'packaging-shipment' && <PackagingShipment />}
          {section.type === 'industries-served' && <IndustriesServed />}
          {section.type === 'rfq-form' && <RFQFormSection />}
        </div>
      ))}
    </>
  )
}
