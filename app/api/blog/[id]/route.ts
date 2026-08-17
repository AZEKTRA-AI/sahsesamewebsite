import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { blogPostSchema } from '@/lib/validations/admin'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const parsed = blogPostSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 })
  }
  const { title, slug, excerpt, content, coverImage, coverImageAlt, status } = parsed.data

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const nextStatus = status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT'

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage || null,
        coverImageAlt: coverImageAlt || null,
        status: nextStatus,
        // Stamp publishedAt the first time a post goes live; never move it on
        // later edits, so "published" date reflects when it first appeared.
        publishedAt: nextStatus === 'PUBLISHED' ? existing.publishedAt ?? new Date() : existing.publishedAt,
      },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    revalidatePath(`/blog/${existing.slug}`)
    if (existing.slug !== post.slug) revalidatePath(`/blog/${post.slug}`)

    return NextResponse.json(post)
  } catch (error: any) {
    const message = error?.code === 'P2002' ? 'That slug is already in use by another post.' : 'Failed to update post'
    if (error?.code !== 'P2002') console.error('[blog] update failed', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const existing = await prisma.blogPost.findUnique({ where: { id: params.id } })
  if (!existing) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  await prisma.blogPost.delete({ where: { id: params.id } })

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath(`/blog/${existing.slug}`)

  return NextResponse.json({ ok: true })
}
