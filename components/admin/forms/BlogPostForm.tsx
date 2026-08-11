'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CloudinaryUploadButton, { type UploadedAsset } from '@/components/admin/CloudinaryUploadButton'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export interface BlogPostFormValue {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  coverImageAlt: string
  status: string
}

export default function BlogPostForm({ post }: { post?: BlogPostFormValue }) {
  const router = useRouter()
  const isEdit = Boolean(post?.id)

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? '')
  const [coverImageAlt, setCoverImageAlt] = useState(post?.coverImageAlt ?? '')
  const [status, setStatus] = useState(post?.status ?? 'DRAFT')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const body = { title, slug, excerpt, content, coverImage, coverImageAlt, status }

    try {
      const res = await fetch(isEdit ? `/api/blog/${post!.id}` : '/api/blog', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        router.push('/admin/blog')
        router.refresh()
      } else {
        setError(data.error || 'Failed to save post.')
        setSaving(false)
      }
    } catch {
      setError('Network error while saving.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g., This season's Basmati harvest is in"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">Slug *</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(slugify(e.target.value))
            }}
            placeholder="basmati-harvest-2026"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green font-mono text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            The post's web address: sainabdulhakim.com/blog/{slug || '...'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Excerpt <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="One or two sentences shown on the blog list page."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">Content *</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            placeholder="Write the post here. Leave a blank line between paragraphs."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Plain text — each blank line starts a new paragraph on the published page.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Cover photo <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <div className="flex items-start gap-4">
            <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              {coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverImage} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-300">
                  No photo
                </div>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <CloudinaryUploadButton
                folder="sah-blog"
                multiple={false}
                label={coverImage ? 'Replace photo' : 'Upload photo'}
                className="rounded-lg border-2 border-dashed border-sah-green px-4 py-2 text-sm font-medium text-sah-green hover:bg-sah-cream"
                onUploaded={(asset: UploadedAsset) => setCoverImage(asset.secure_url)}
              />
              <input
                type="text"
                value={coverImageAlt}
                onChange={(e) => setCoverImageAlt(e.target.value)}
                placeholder="Photo description (for accessibility and SEO)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          >
            <option value="DRAFT">Draft — not visible on the blog list</option>
            <option value="PUBLISHED">Published</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Published posts only appear on the site once the Blog section is turned on (from the Blog list page).
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-sah-green text-white py-2 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}
        </button>
      </div>
    </form>
  )
}
