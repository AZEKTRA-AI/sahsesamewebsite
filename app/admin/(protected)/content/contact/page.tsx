'use client'

import Link from 'next/link'
import ContentEditor from '@/components/admin/ContentEditor'
import { contactHeroBlock, contactCtaBlock } from '@/lib/content/blocks'

export default function ContactContentAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">Contact Page</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        The banner and closing call-to-action on the Contact page. Your phone numbers, email,
        address, and business hours are edited on the{' '}
        <Link href="/admin/settings" className="text-sah-green hover:underline font-medium">
          Site Settings
        </Link>{' '}
        page instead, since they also appear in the footer and the quote form.
      </p>

      <div className="max-w-3xl space-y-4">
        <ContentEditor block={contactHeroBlock} defaultOpen />
        <ContentEditor block={contactCtaBlock} />
      </div>
    </div>
  )
}
