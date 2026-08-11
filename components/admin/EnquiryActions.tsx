'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STATUS_OPTIONS = ['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED']

export default function EnquiryActions({
  enquiryId,
  status,
}: {
  enquiryId: string
  status: string
}) {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState(status)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [savingStatus, setSavingStatus] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleStatusChange(next: string) {
    setCurrentStatus(next)
    setSavingStatus(true)
    setError(null)

    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to update status.')
      } else {
        router.refresh()
      }
    } catch {
      setError('Network error while updating status.')
    } finally {
      setSavingStatus(false)
    }
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSent(false)
    setSending(true)

    try {
      const res = await fetch(`/api/enquiries/${enquiryId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      if (res.ok) {
        setMessage('')
        setSent(true)
        setCurrentStatus('RESPONDED')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to send the reply.')
      }
    } catch {
      setError('Network error while sending the reply.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-medium text-sah-charcoal mb-2">Status</label>
        <select
          value={currentStatus}
          disabled={savingStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleReply} className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-medium text-sah-charcoal mb-2">
          Reply to this enquiry
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={7}
          placeholder="Write your reply — it will be emailed to the buyer from info@sainabdulhakim.com."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green text-sm"
        />

        {error && (
          <div className="mt-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {sent && (
          <div className="mt-4 rounded border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
            Reply sent.
          </div>
        )}

        <button
          type="submit"
          disabled={sending || !message.trim()}
          className="mt-4 w-full bg-sah-green text-white py-2 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
        >
          {sending ? 'Sending…' : 'Send reply'}
        </button>
      </form>
    </div>
  )
}
