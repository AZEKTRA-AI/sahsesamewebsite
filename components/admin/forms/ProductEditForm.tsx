'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProductEditFormProps {
  product: any
  categories: any[]
}

export default function ProductEditForm({ product, categories }: ProductEditFormProps) {
  const router = useRouter()
  const [name, setName] = useState(product.name)
  const [slug, setSlug] = useState(product.slug)
  const [categoryId, setCategoryId] = useState(product.categoryId)
  const [origin, setOrigin] = useState(product.origin || '')
  const [status, setStatus] = useState(product.status)
  // specs is a Json column, so it arrives as an object — render it as formatted
  // text and parse it back on save.
  const [specs, setSpecs] = useState(() =>
    JSON.stringify(product.specs ?? {}, null, 2)
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    let parsedSpecs: unknown
    try {
      parsedSpecs = specs.trim() ? JSON.parse(specs) : {}
    } catch {
      setError('Specifications must be valid JSON.')
      return
    }

    setSaving(true)

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          categoryId,
          origin,
          status,
          specs: parsedSpecs,
        }),
      })

      if (res.ok) {
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to save changes.')
      }
    } catch {
      setError('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Product Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Slug
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Category
          </label>
          <select
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Origin
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g., Pakistan, India, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Specifications (JSON)
          </label>
          <textarea
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green font-mono text-sm"
            placeholder='{"purity": "98%", "moisture": "12%"}'
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

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-sah-green text-white py-2 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
