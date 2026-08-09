import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import type { Prisma } from '@prisma/client'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CONTENT_BLOCKS } from '@/lib/content/blocks'
import { schemaToZod } from '@/lib/content/fields'
import { getContent } from '@/lib/content/store'

/**
 * Generic read/write endpoint for every editable content block. The block
 * itself defines its shape, defaults, validation, and which pages to
 * refresh — this route just enforces auth on writes and applies them.
 */

function revalidateBlock(key: string) {
  const block = CONTENT_BLOCKS[key]
  for (const entry of block.revalidate) {
    revalidatePath(entry.path, entry.type)
  }
}

export async function GET(_req: NextRequest, { params }: { params: { key: string } }) {
  const block = CONTENT_BLOCKS[params.key]
  if (!block) {
    return NextResponse.json({ error: 'Unknown content block' }, { status: 404 })
  }
  return NextResponse.json(await getContent(block))
}

export async function PUT(req: NextRequest, { params }: { params: { key: string } }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const block = CONTENT_BLOCKS[params.key]
  if (!block) {
    return NextResponse.json({ error: 'Unknown content block' }, { status: 404 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = schemaToZod(block.fields).safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'That did not save — check the highlighted field.' },
      { status: 400 }
    )
  }

  const jsonValue = parsed.data as Prisma.InputJsonValue

  await prisma.siteSettings.upsert({
    where: { key: block.key },
    create: { key: block.key, value: jsonValue },
    update: { value: jsonValue },
  })

  revalidateBlock(block.key)

  return NextResponse.json(parsed.data)
}

/** Restores a block's shipped default content. */
export async function DELETE(_req: NextRequest, { params }: { params: { key: string } }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const block = CONTENT_BLOCKS[params.key]
  if (!block) {
    return NextResponse.json({ error: 'Unknown content block' }, { status: 404 })
  }

  await prisma.siteSettings.deleteMany({ where: { key: block.key } })
  revalidateBlock(block.key)

  return NextResponse.json(block.defaults)
}
