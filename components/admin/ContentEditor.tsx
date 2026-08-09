'use client'

import { useCallback, useEffect, useState } from 'react'
import CloudinaryUploadButton, { type UploadedAsset } from './CloudinaryUploadButton'
import { emptyListItem, isListField, type AnyFieldDef, type FieldDef, type ListFieldDef } from '@/lib/content/fields'
import type { BlockDef } from '@/lib/content/blocks'

type Status = 'loading' | 'idle' | 'saving' | 'resetting' | 'error'

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green focus:border-transparent text-sm'

/**
 * One editable content block, rendered as a collapsible card. Admin pages
 * stack several of these — collapsed by default so a non-technical owner
 * sees a scannable list of sections rather than one long form.
 */
export default function ContentEditor({
  block,
  defaultOpen = false,
}: {
  block: BlockDef<Record<string, any>>
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [status, setStatus] = useState<Status>('loading')
  const [value, setValue] = useState<Record<string, any> | null>(null)
  const [saved, setSaved] = useState<Record<string, any> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch(`/api/content/${block.key}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('Could not load this section.')
      const data = await res.json()
      setValue(data)
      setSaved(data)
      setStatus('idle')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load this section.')
      setStatus('error')
    }
  }, [block.key])

  useEffect(() => {
    load()
  }, [load])

  const dirty = Boolean(value && saved && JSON.stringify(value) !== JSON.stringify(saved))

  function setField(key: string, v: unknown) {
    setNotice(null)
    setValue((prev) => (prev ? { ...prev, [key]: v } : prev))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!value) return

    setStatus('saving')
    setError(null)
    setNotice(null)

    try {
      const res = await fetch(`/api/content/${block.key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Could not save. Please try again.')
        setStatus('idle')
        return
      }

      setValue(data)
      setSaved(data)
      setNotice('Saved — this is live on the site now.')
      setStatus('idle')
    } catch {
      setError('Connection failed. Check your network and try again.')
      setStatus('idle')
    }
  }

  async function handleReset() {
    if (
      typeof window !== 'undefined' &&
      !window.confirm(`Reset "${block.title}" back to the original text and photos? This cannot be undone.`)
    ) {
      return
    }

    setStatus('resetting')
    setError(null)
    setNotice(null)

    try {
      const res = await fetch(`/api/content/${block.key}`, { method: 'DELETE' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Could not reset. Please try again.')
        setStatus('idle')
        return
      }

      setValue(data)
      setSaved(data)
      setNotice('Reset to the original content.')
      setStatus('idle')
    } catch {
      setError('Connection failed. Check your network and try again.')
      setStatus('idle')
    }
  }

  const busy = status === 'saving' || status === 'resetting'

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50"
        aria-expanded={open}
      >
        <div>
          <h3 className="text-lg font-bold text-sah-charcoal">{block.title}</h3>
          {block.description && <p className="text-sm text-gray-500 mt-1">{block.description}</p>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {dirty && (
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">
              Unsaved
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-6">
          {status === 'loading' ? (
            <div className="space-y-3">
              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
              <div className="h-10 animate-pulse rounded bg-gray-200" />
              <div className="h-24 animate-pulse rounded bg-gray-200" />
            </div>
          ) : !value ? (
            <div className="py-6 text-center">
              <p className="mb-4 text-gray-600">{error ?? 'Nothing loaded.'}</p>
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
              <fieldset disabled={busy} className="space-y-6">
                {block.fields.map((field) => (
                  <FieldEditor
                    key={field.key}
                    field={field}
                    value={value[field.key]}
                    onChange={(v) => setField(field.key, v)}
                  />
                ))}
              </fieldset>

              {error && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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
                  {status === 'resetting' ? 'Resetting…' : 'Reset to original'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: AnyFieldDef
  value: unknown
  onChange: (v: unknown) => void
}) {
  if (isListField(field)) {
    return (
      <ListFieldEditor field={field} value={Array.isArray(value) ? value : []} onChange={onChange} />
    )
  }
  return <ScalarFieldEditor field={field} value={value} onChange={onChange} />
}

function FieldLabel({ field, compact }: { field: FieldDef; compact?: boolean }) {
  return (
    <label className={`block font-medium text-sah-charcoal mb-1.5 ${compact ? 'text-xs' : 'text-sm'}`}>
      {field.label}
      {field.required === false && <span className="ml-1 font-normal text-gray-400">(optional)</span>}
    </label>
  )
}

function ScalarFieldEditor({
  field,
  value,
  onChange,
  compact = false,
}: {
  field: FieldDef
  value: unknown
  onChange: (v: unknown) => void
  compact?: boolean
}) {
  if (field.type === 'stringList') {
    return (
      <StringListEditor
        field={field}
        value={Array.isArray(value) ? (value as string[]) : []}
        onChange={onChange}
      />
    )
  }

  if (field.type === 'image') {
    const url = typeof value === 'string' ? value : ''
    return (
      <div>
        <FieldLabel field={field} compact={compact} />
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            {url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-300">
                No photo
              </div>
            )}
          </div>
          <div className="flex-1">
            <CloudinaryUploadButton
              folder="sah-marketing"
              multiple={false}
              label={url ? 'Replace photo' : 'Upload photo'}
              className="rounded-lg border-2 border-dashed border-sah-green px-4 py-2 text-sm font-medium text-sah-green hover:bg-sah-cream"
              onUploaded={(asset: UploadedAsset) => onChange(asset.secure_url)}
            />
            {field.help && <p className="mt-2 text-xs text-gray-500">{field.help}</p>}
          </div>
        </div>
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <FieldLabel field={field} compact={compact} />
        <textarea
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          maxLength={field.maxLength}
          rows={compact ? 2 : 4}
          placeholder={field.placeholder}
          className={inputClass}
        />
        {field.help && <p className="mt-1 text-xs text-gray-500">{field.help}</p>}
      </div>
    )
  }

  return (
    <div>
      <FieldLabel field={field} compact={compact} />
      <input
        type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
        value={value === undefined || value === null ? '' : String(value)}
        onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
        maxLength={field.maxLength}
        placeholder={field.placeholder}
        className={inputClass}
      />
      {field.help && <p className="mt-1 text-xs text-gray-500">{field.help}</p>}
    </div>
  )
}

/**
 * Free-typing textarea backed by a string[]. Only splits into the array on
 * blur (not every keystroke) so the cursor never jumps mid-line, and resyncs
 * from the parent value on external changes (loading, reset, undo).
 */
function StringListEditor({
  field,
  value,
  onChange,
}: {
  field: FieldDef
  value: string[]
  onChange: (v: string[]) => void
}) {
  const [text, setText] = useState(() => value.join('\n'))

  useEffect(() => {
    setText(value.join('\n'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.join('\n')])

  return (
    <div>
      <FieldLabel field={field} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() =>
          onChange(
            text
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean)
          )
        }
        rows={Math.max(4, text.split('\n').length)}
        className={`${inputClass} font-mono`}
      />
      {field.help && <p className="mt-1 text-xs text-gray-500">{field.help}</p>}
    </div>
  )
}

function ListFieldEditor({
  field,
  value,
  onChange,
}: {
  field: ListFieldDef
  value: Record<string, unknown>[]
  onChange: (v: Record<string, unknown>[]) => void
}) {
  const min = field.minItems ?? 0
  const max = field.maxItems ?? 60

  function updateItem(idx: number, key: string, v: unknown) {
    const next = value.slice()
    next[idx] = { ...next[idx], [key]: v }
    onChange(next)
  }

  function addItem() {
    onChange([...value, emptyListItem(field)])
  }

  function removeItem(idx: number) {
    onChange(value.filter((_, i) => i !== idx))
  }

  function moveItem(idx: number, direction: -1 | 1) {
    const target = idx + direction
    if (target < 0 || target >= value.length) return
    const next = value.slice()
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-sah-charcoal">{field.label}</label>
        <span className="text-xs text-gray-400">
          {value.length} of {max}
        </span>
      </div>
      {field.help && <p className="mb-3 text-xs text-gray-500">{field.help}</p>}

      <div className="space-y-4">
        {value.map((item, idx) => (
          <div key={idx} className="relative rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {field.itemLabel} {idx + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(idx, -1)}
                  disabled={idx === 0}
                  aria-label={`Move ${field.itemLabel} ${idx + 1} up`}
                  className="rounded p-1.5 hover:bg-gray-200 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(idx, 1)}
                  disabled={idx === value.length - 1}
                  aria-label={`Move ${field.itemLabel} ${idx + 1} down`}
                  className="rounded p-1.5 hover:bg-gray-200 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  disabled={value.length <= min}
                  aria-label={`Remove ${field.itemLabel} ${idx + 1}`}
                  className="rounded p-1.5 text-red-600 hover:bg-red-100 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {field.fields.map((sub) => (
                <ScalarFieldEditor
                  key={sub.key}
                  field={sub}
                  value={item[sub.key]}
                  onChange={(v) => updateItem(idx, sub.key, v)}
                  compact
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        disabled={value.length >= max}
        className="mt-3 w-full rounded-lg border-2 border-dashed border-gray-300 py-2.5 text-sm font-medium text-gray-500 hover:border-sah-green hover:text-sah-green disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-gray-500"
      >
        + Add {field.itemLabel}
      </button>
    </div>
  )
}
