'use client'

import { useEffect, useState } from 'react'

export default function AccountSettingsForm() {
  const [loading, setLoading] = useState(true)
  const [currentEmail, setCurrentEmail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    fetch('/api/admin/account')
      .then((res) => res.json())
      .then((data) => {
        setCurrentEmail(data.email || '')
        setNewEmail(data.email || '')
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setNotice('')

    if (newPassword && newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/admin/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newEmail: newEmail !== currentEmail ? newEmail : undefined,
          newPassword: newPassword || undefined,
        }),
      })
      const data = await res.json()

      if (res.ok) {
        setNotice('Saved. Sign out and sign back in with your new details.')
        setCurrentEmail(newEmail)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setError(data.error || 'Failed to update account.')
      }
    } catch {
      setError('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-sah-charcoal mb-1">Login email &amp; password</h3>
      <p className="text-sm text-gray-500 mb-6">
        What you use to sign in to this admin panel — separate from your public contact details.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">Login email</label>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            New password <span className="font-normal text-gray-400">(leave blank to keep current)</span>
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        {newPassword && (
          <div>
            <label className="block text-sm font-medium text-sah-charcoal mb-2">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-sah-charcoal mb-2">
            Current password <span className="font-normal text-gray-400">(required to confirm)</span>
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}
        {notice && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-sah-green text-white py-2 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
