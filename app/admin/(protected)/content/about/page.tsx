'use client'

import ContentEditor from '@/components/admin/ContentEditor'
import {
  aboutHeroBlock,
  aboutHeritageBlock,
  aboutMilestonesBlock,
  aboutFactsBlock,
  aboutBannerBlock,
  aboutCtaBlock,
} from '@/lib/content/blocks'

export default function AboutContentAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">About Page</h1>
      <p className="mb-8 max-w-2xl text-gray-600">Everything shown on the About Us page.</p>

      <div className="max-w-3xl space-y-4">
        <ContentEditor block={aboutHeroBlock} defaultOpen />
        <ContentEditor block={aboutHeritageBlock} />
        <ContentEditor block={aboutMilestonesBlock} />
        <ContentEditor block={aboutFactsBlock} />
        <ContentEditor block={aboutBannerBlock} />
        <ContentEditor block={aboutCtaBlock} />
      </div>
    </div>
  )
}
