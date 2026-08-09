'use client'

import ContentEditor from '@/components/admin/ContentEditor'
import {
  packagingHeroBlock,
  packagingOptionsBlock,
  packagingIncotermsBlock,
  packagingBannerBlock,
  packagingProcessBlock,
  packagingDocsBlock,
  packagingCtaBlock,
} from '@/lib/content/blocks'

export default function PackagingLogisticsContentAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">Packaging &amp; Logistics Page</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Everything shown on the Packaging &amp; Logistics page.
      </p>

      <div className="max-w-3xl space-y-4">
        <ContentEditor block={packagingHeroBlock} defaultOpen />
        <ContentEditor block={packagingOptionsBlock} />
        <ContentEditor block={packagingIncotermsBlock} />
        <ContentEditor block={packagingBannerBlock} />
        <ContentEditor block={packagingProcessBlock} />
        <ContentEditor block={packagingDocsBlock} />
        <ContentEditor block={packagingCtaBlock} />
      </div>
    </div>
  )
}
