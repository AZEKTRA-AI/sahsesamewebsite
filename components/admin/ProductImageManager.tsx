'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { UploadedAsset } from './CloudinaryUploadButton'

// Client-only: the Cloudinary widget breaks server rendering of its subtree.
const CloudinaryUploadButton = dynamic(() => import('./CloudinaryUploadButton'), {
  ssr: false,
  loading: () => (
    <div className="w-full border-2 border-dashed border-gray-300 text-gray-400 rounded-lg py-3 text-center font-medium">
      Loading uploader…
    </div>
  ),
})

interface ProductImage {
  id: string
  url: string
  alt: string | null
  cloudinaryId: string
}

export default function ProductImageManager({
  productId,
  productSlug,
  images,
}: {
  productId: string
  productSlug: string
  images: ProductImage[]
}) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  async function attachImage(info: UploadedAsset) {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/products/${productId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cloudinaryId: info.public_id,
          url: info.secure_url,
          alt: productSlug,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to save the uploaded image')
        return
      }
      router.refresh()
    } catch {
      setError('Network error while saving the image')
    } finally {
      setBusy(false)
    }
  }

  async function removeImage(imageId: string) {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/products/${productId}/images?imageId=${encodeURIComponent(imageId)}`,
        { method: 'DELETE' }
      )
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to remove the image')
        return
      }
      router.refresh()
    } catch {
      setError('Network error while removing the image')
    } finally {
      setBusy(false)
    }
  }

  if (!cloudName) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold text-sah-charcoal mb-2">Product Images</h2>
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-3">
          Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to enable uploads.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sah-charcoal">Product Images</h2>
        <span className="text-xs text-gray-500">{images.length} uploaded</span>
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group border rounded overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt || ''}
                className="w-full h-28 object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                disabled={busy}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <CloudinaryUploadButton
        folder={`sah/products/${productSlug}`}
        disabled={busy}
        onUploaded={attachImage}
      />

      <p className="text-xs text-gray-500">
        PNG, JPG or WebP up to 5&nbsp;MB. The first image is used as the product thumbnail.
      </p>
    </div>
  )
}
