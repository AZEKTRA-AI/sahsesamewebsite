import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  HERO_DEFAULTS,
  HERO_SETTINGS_KEY,
  getHeroSettings,
  isAllowedImageUrl,
} from '@/lib/site-settings'

const heroSchema = z.object({
  imageUrl: z
    .string()
    .refine(isAllowedImageUrl, 'Image must be an https URL on res.cloudinary.com'),
  imageAlt: z
    .string()
    .trim()
    .min(1, 'Describe the image for screen readers')
    .max(200, 'Keep the description under 200 characters'),
  cloudinaryId: z.string().min(1).max(300).nullable().optional(),
})

export async function GET() {
  return NextResponse.json(await getHeroSettings())
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = heroSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid hero settings' },
      { status: 400 }
    )
  }

  const value = {
    imageUrl: parsed.data.imageUrl,
    imageAlt: parsed.data.imageAlt,
    cloudinaryId: parsed.data.cloudinaryId ?? null,
  }

  await prisma.siteSettings.upsert({
    where: { key: HERO_SETTINGS_KEY },
    create: { key: HERO_SETTINGS_KEY, value },
    update: { value },
  })

  // The home page is cached; without this the change would not show until the
  // next deploy.
  revalidatePath('/')

  return NextResponse.json(value)
}

/** Restores the shipped default image. */
export async function DELETE() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.siteSettings.deleteMany({ where: { key: HERO_SETTINGS_KEY } })
  revalidatePath('/')

  return NextResponse.json(HERO_DEFAULTS)
}
