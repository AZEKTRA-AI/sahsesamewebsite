'use client'

import ContentEditor from '@/components/admin/ContentEditor'
import {
  homeHeroBlock,
  homeTradingRootsBlock,
  homeCategoriesIntroBlock,
  homeWhyChooseUsBlock,
  homeQualityProcessBlock,
  homePackagingBlock,
  homeIndustriesBlock,
  homeRfqIntroBlock,
} from '@/lib/content/blocks'

export default function HomepageContentAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">Homepage</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Every section of the homepage, top to bottom. Click a section to open it, make your
        changes, then press Save. Nothing goes live until you save it.
      </p>

      <div className="max-w-3xl space-y-4">
        <ContentEditor block={homeHeroBlock} defaultOpen />
        <ContentEditor block={homeTradingRootsBlock} />
        <ContentEditor block={homeCategoriesIntroBlock} />
        <ContentEditor block={homeWhyChooseUsBlock} />
        <ContentEditor block={homeQualityProcessBlock} />
        <ContentEditor block={homePackagingBlock} />
        <ContentEditor block={homeIndustriesBlock} />
        <ContentEditor block={homeRfqIntroBlock} />
      </div>
    </div>
  )
}
