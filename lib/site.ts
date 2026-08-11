/**
 * Single source of truth for the site's absolute URL. NEXT_PUBLIC_SITE_URL is
 * routinely set without a scheme ("sainabdulhakim.com"), so this normalizes
 * that and falls back to the real production domain if the env var is unset.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
  const candidate = raw && (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
  return (candidate || 'https://www.sainabdulhakim.com').replace(/\/$/, '')
}
