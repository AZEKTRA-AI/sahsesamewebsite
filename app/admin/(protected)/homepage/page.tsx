'use client'

import { useCallback, useEffect, useState } from 'react'
import CloudinaryUploadButton, {
  type UploadedAsset,
} from '@/components/admin/CloudinaryUploadButton'

interface HeroSettings {
  imageUrl: string
  imageAlt: string
  cloudinaryId: string | null
}

type Status = 'loading' | 'idle' | 'saving' | 'resetting'

export default function HomepageAdmin() {
  const [status, setStatus] = useState<Status>('loading')
  const [hero, setHero] = useState<HeroSettings | null>(null)
  const [saved, setSaved] = useState<HeroSettings | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/site-settings/hero', { cache: 'no-store' })
      if (!res.ok) throw new Error('Could not load the current hero settings.')
      const data: HeroSettings = await res.json()
      setHero(data)
      setSaved(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the current hero settings.')
    } finally {
      setStatus('idle')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const dirty =
    hero && saved && (hero.imageUrl !== saved.imageUrl || hero.imageAlt !== saved.imageAlt)

  function handleUploaded(asset: UploadedAsset) {
    setNotice(null)
    setError(null)
    setHero((prev) =>
      prev
        ? { ...prev, imageUrl: asset.secure_url, cloudinaryId: asset.public_id }
        : prev
    )
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!hero) return

    setStatus('saving')
    setError(null)
    setNotice(null)

    try {
      const res = await fetch('/api/site-settings/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Could not save. Please try again.')
        return
      }

      setHero(data)
      setSaved(data)
      setNotice('Hero image updated. The home page will show it immediately.')
    } catch {
      setError('Connection failed. Check your network and try again.')
    } finally {
      setStatus('idle')
    }
  }

  async function handleReset() {
    setStatus('resetting')
    setError(null)
    setNotice(null)

    try {
      const res = await fetch('/api/site-settings/hero', { method: 'DELETE' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Could not reset. Please try again.')
        return
      }

      setHero(data)
      setSaved(data)
      setNotice('Reverted to the built-in hero image.')
    } catch {
      setError('Connection failed. Check your network and try again.')
    } finally {
      setStatus('idle')
    }
  }

  const busy = status === 'saving' || status === 'resetting'

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">Homepage</h1>
      <p className="text-gray-600 mb-8">
        The photograph shown in the hero section on the home page.
      </p>

      <div className="bg-white rounded-lg shadow p-8 max-w-3xl">
        {status === 'loading' ? (
          <div className="space-y-4">
            <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
          </div>
        ) : !hero ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">{error ?? 'Nothing loaded.'}</p>
            <button
              type="button"
              onClick={load}
              className="bg-sah-green text-white px-5 py-2 rounded-lg font-medium hover:bg-opacity-90"
            >
              Try again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Preview */}
            <div>
              <p className="block text-sm font-medium text-sah-charcoal mb-2">
                Current image
              </p>
              <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hero.imageUrl}
                  alt={hero.imageAlt}
                  className="h-64 w-full object-cover"
                />
                {dirty && (
                  <span className="absolute left-3 top-3 rounded bg-amber-500 px-2.5 py-1 text-xs font-medium text-white">
                    Unsaved
                  </span>
                )}
              </div>
              <p className="mt-2 break-all text-xs text-gray-500">{hero.imageUrl}</p>
            </div>

            <CloudinaryUploadButton
              folder="sah-marketing"
              multiple={false}
              disabled={busy}
              label="Replace hero image"
              onUploaded={handleUploaded}
            />

            <div>
              <label
                htmlFor="hero-alt"
                className="block text-sm font-medium text-sah-charcoal mb-2"
              >
                Image description
              </label>
              <input
                id="hero-alt"
                type="text"
                value={hero.imageAlt}
                maxLength={200}
                onChange={(e) => setHero({ ...hero, imageAlt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
                placeholder="Export-grade Pakistani sesame seeds photographed up close"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Read aloud by screen readers and shown if the image fails to load.
                Describe what is in the photo.
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {notice && (
              <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {notice}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={busy || !dirty}
                className="flex-1 bg-sah-green text-white py-3 rounded-lg font-medium hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'saving' ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={busy}
                className="px-5 py-3 rounded-lg border border-gray-300 font-medium text-sah-charcoal hover:bg-gray-50 disabled:opacity-50"
              >
                {status === 'resetting' ? 'Resetting…' : 'Reset to default'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
