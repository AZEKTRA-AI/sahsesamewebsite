/**
 * Single source of truth for the site's absolute URL. NEXT_PUBLIC_SITE_URL is
 * routinely set without a scheme ("sainabdulhakim.com") and dashboard paste
 * flows routinely leave a trailing newline/space on the value, so this
 * normalizes both and falls back to the real production domain if unset.
 */
export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || '').trim()
  const candidate = raw && (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
  return (candidate || 'https://www.sainabdulhakim.com').replace(/\/+$/, '')
}
