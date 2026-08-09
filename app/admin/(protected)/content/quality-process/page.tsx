'use client'

import ContentEditor from '@/components/admin/ContentEditor'
import {
  qualityHeroBlock,
  qualityStepsBlock,
  qualityBannerBlock,
  qualityCommitmentsBlock,
  qualityCtaBlock,
} from '@/lib/content/blocks'

export default function QualityProcessContentAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">Quality &amp; Process Page</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Everything shown on the Quality &amp; Process page.
      </p>

      <div className="max-w-3xl space-y-4">
        <ContentEditor block={qualityHeroBlock} defaultOpen />
        <ContentEditor block={qualityStepsBlock} />
        <ContentEditor block={qualityBannerBlock} />
        <ContentEditor block={qualityCommitmentsBlock} />
        <ContentEditor block={qualityCtaBlock} />
      </div>
    </div>
  )
}
