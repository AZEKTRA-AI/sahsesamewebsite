'use client'

import ContentEditor from '@/components/admin/ContentEditor'
import {
  catalogHeroBlock,
  catalogCategoriesBlock,
  catalogStandardsBlock,
  catalogCtaBlock,
  catalogProductCtaBlock,
} from '@/lib/content/blocks'

export default function CatalogContentAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">Products &amp; Categories</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        The photos and descriptions for Sesame, Pulses, and Rice, plus the wording on the
        Products page. To add, edit, or remove individual products, use the{' '}
        <a href="/admin/products" className="text-sah-green hover:underline font-medium">
          Products
        </a>{' '}
        section instead.
      </p>

      <div className="max-w-3xl space-y-4">
        <ContentEditor block={catalogCategoriesBlock} defaultOpen />
        <ContentEditor block={catalogHeroBlock} />
        <ContentEditor block={catalogStandardsBlock} />
        <ContentEditor block={catalogCtaBlock} />
        <ContentEditor block={catalogProductCtaBlock} />
      </div>
    </div>
  )
}
