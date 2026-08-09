'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PageEditFormProps {
  page: any
}

export default function PageEditForm({ page }: PageEditFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(page.title)
  const [description, setDescription] = useState(page.description)
  const [status, setStatus] = useState(page.status)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status }),
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Page Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Meta Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-sah-green text-white py-2 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-sah-charcoal mb-4">Sections on this page</h3>
        <p className="text-sm text-gray-600 mb-4">
          This is the order sections appear in. To edit the text, photos, and lists inside
          them, use{' '}
          <a href="/admin/content/home" className="text-sah-green hover:underline font-medium">
            Homepage
          </a>{' '}
          in the sidebar.
        </p>
        <div className="space-y-3">
          {page.sections.map((section: any) => (
            <div key={section.id} className="flex items-center justify-between bg-gray-50 p-4 rounded">
              <div>
                <p className="font-medium text-sah-charcoal">{section.type}</p>
                <p className="text-sm text-gray-600">Sort order: {section.sortOrder}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}
