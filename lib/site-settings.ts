import { prisma } from '@/lib/prisma'

export const HERO_SETTINGS_KEY = 'homepage.hero'

export interface HeroSettings {
  imageUrl: string
  imageAlt: string
  cloudinaryId: string | null
}

/**
 * Shipped default. Used until an admin saves something, and as the fallback if
 * the settings row is missing or malformed — the home page must never fail to
 * render because of a bad settings value.
 */
export const HERO_DEFAULTS: HeroSettings = {
  imageUrl:
    'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg',
  imageAlt: 'Export-grade Pakistani sesame seeds photographed up close',
  cloudinaryId: null,
}

/** Only Cloudinary-hosted images are accepted — next.config allows that host. */
export function isAllowedImageUrl(url: unknown): url is string {
  if (typeof url !== 'string' || url.length === 0) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' && parsed.hostname === 'res.cloudinary.com'
  } catch {
    return false
  }
}

function coerce(value: unknown): HeroSettings {
  if (!value || typeof value !== 'object') return HERO_DEFAULTS

  const record = value as Record<string, unknown>
  if (!isAllowedImageUrl(record.imageUrl)) return HERO_DEFAULTS

  return {
    imageUrl: record.imageUrl,
    imageAlt:
      typeof record.imageAlt === 'string' && record.imageAlt.trim().length > 0
        ? record.imageAlt.trim()
        : HERO_DEFAULTS.imageAlt,
    cloudinaryId:
      typeof record.cloudinaryId === 'string' && record.cloudinaryId.length > 0
        ? record.cloudinaryId
        : null,
  }
}

export async function getHeroSettings(): Promise<HeroSettings> {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { key: HERO_SETTINGS_KEY },
    })
    return coerce(row?.value)
  } catch {
    // Database unreachable during a build or a cold start — serve the default
    // rather than taking the whole page down.
    return HERO_DEFAULTS
  }
}
