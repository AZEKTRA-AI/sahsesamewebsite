'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProductCreateFormProps {
  categories: any[]
}

export default function ProductCreateForm({ categories }: ProductCreateFormProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [origin, setOrigin] = useState('')
  const [status, setStatus] = useState('DRAFT')
  const [specs, setSpecs] = useState('{}')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          categoryId,
          origin,
          status,
          specs,
        }),
      })

      if (res.ok) {
        const product = await res.json()
        router.push(`/admin/products/${product.id}`)
      } else {
        setError('Failed to create product')
      }
    } catch (err) {
      setError('An error occurred')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Product Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., White Sesame Seeds"
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
            placeholder="e.g., white-sesame-seeds"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
          <p className="text-xs text-gray-500 mt-1">Lowercase with hyphens, used in URLs</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Category *
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
            placeholder="e.g., Faisalabad, Pakistan"
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
          <p className="text-xs text-gray-500 mt-1">Valid JSON format required</p>
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
          {saving ? 'Creating...' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}
