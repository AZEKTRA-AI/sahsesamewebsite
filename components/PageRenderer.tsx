import { prisma } from '@/lib/prisma'
import { getContent, getContentMap } from '@/lib/content/store'
import {
  homeHeroBlock,
  homeTradingRootsBlock,
  homeCategoriesIntroBlock,
  homeWhyChooseUsBlock,
  homeQualityProcessBlock,
  homePackagingBlock,
  homeIndustriesBlock,
  homeRfqIntroBlock,
  catalogCategoriesBlock,
  globalContactBlock,
} from '@/lib/content/blocks'
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
  const [page, content] = await Promise.all([
    getPage(slug),
    getContentMap({
      hero: homeHeroBlock,
      tradingRoots: homeTradingRootsBlock,
      categoriesIntro: homeCategoriesIntroBlock,
      whyChooseUs: homeWhyChooseUsBlock,
      qualityProcess: homeQualityProcessBlock,
      packaging: homePackagingBlock,
      industries: homeIndustriesBlock,
      rfqIntro: homeRfqIntroBlock,
      categories: catalogCategoriesBlock,
      contact: globalContactBlock,
    }),
  ])

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
          {section.type === 'hero' && <HeroSection content={content.hero} />}
          {section.type === 'trading-roots' && <TradingRootsSection content={content.tradingRoots} />}
          {section.type === 'categories-showcase' && (
            <CategoriesShowcase intro={content.categoriesIntro} categories={content.categories.items} />
          )}
          {section.type === 'why-choose-us' && <WhyChooseUs content={content.whyChooseUs} />}
          {section.type === 'quality-process' && <QualityProcess content={content.qualityProcess} />}
          {section.type === 'packaging-shipment' && <PackagingShipment content={content.packaging} />}
          {section.type === 'industries-served' && <IndustriesServed content={content.industries} />}
          {section.type === 'rfq-form' && (
            <RFQFormSection intro={content.rfqIntro} contact={content.contact} />
          )}
        </div>
      ))}
    </>
  )
}
