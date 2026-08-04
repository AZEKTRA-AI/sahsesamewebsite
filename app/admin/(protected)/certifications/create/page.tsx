'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateCertificationPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [sortOrder, setSortOrder] = useState('0')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const res = await fetch('/api/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          sortOrder: parseInt(sortOrder),
        }),
      })

      if (res.ok) {
        router.push('/admin/certifications')
      } else {
        setError('Failed to create certification')
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
      <h1 className="text-4xl font-bold text-sah-charcoal mb-8">Create Certification</h1>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-sah-charcoal mb-2">
              Certification Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., ISO 9001, HACCP, Organic"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-sah-charcoal mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Brief description of this certification"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-sah-charcoal mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
            />
            <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-sah-green text-white py-2 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
          >
            {saving ? 'Creating...' : 'Create Certification'}
          </button>
        </form>
      </div>
    </div>
  )
}
