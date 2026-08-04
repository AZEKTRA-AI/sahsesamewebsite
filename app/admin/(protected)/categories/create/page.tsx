'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateCategoryPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [icon, setIcon] = useState('📦')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, icon }),
      })

      if (res.ok) {
        router.push('/admin/categories')
      } else {
        setError('Failed to create category')
      }
    } catch (err) {
      setError('An error occurred')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-8">Create Category</h1>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-sah-charcoal mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sesame Seeds"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-sah-charcoal mb-2">
              Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g., sesame"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-sah-charcoal mb-2">
              Icon (Emoji)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={2}
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-16 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green text-2xl text-center"
              />
              <div className="flex-1 p-3 border border-gray-300 rounded-lg flex items-center text-3xl">
                {icon}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-sah-green text-white py-2 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
          >
            {saving ? 'Creating...' : 'Create Category'}
          </button>
        </form>
      </div>
    </div>
  )
}
