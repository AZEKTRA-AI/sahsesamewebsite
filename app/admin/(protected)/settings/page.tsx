'use client'

import ContentEditor from '@/components/admin/ContentEditor'
import AccountSettingsForm from '@/components/admin/AccountSettingsForm'
import { globalContactBlock, globalBrandBlock } from '@/lib/content/blocks'

export default function SettingsAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">Site Settings</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Your company details. These are shared across the whole site — the footer, the
        Contact page, and the quote form — so a change here updates everywhere at once.
      </p>

      <div className="max-w-3xl space-y-4">
        <ContentEditor block={globalContactBlock} defaultOpen />
        <ContentEditor block={globalBrandBlock} />
        <AccountSettingsForm />
      </div>
    </div>
  )
}
