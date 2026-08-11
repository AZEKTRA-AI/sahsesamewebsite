'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogPostRowActions({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (typeof window !== 'undefined' && !window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      return
    }

    setDeleting(true)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        alert(data.error || 'Failed to delete post.')
        setDeleting(false)
      }
    } catch {
      alert('Network error while deleting.')
      setDeleting(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Link href={`/admin/blog/${id}`} className="text-sah-green hover:underline font-medium">
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-red-600 hover:underline font-medium disabled:opacity-50"
      >
        {deleting ? 'Deleting…' : 'Delete'}
      </button>
    </div>
  )
}
