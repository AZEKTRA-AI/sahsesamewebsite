import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { blogPostSchema } from '@/lib/validations/admin'

export async function POST(request: NextRequest) {
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
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage || null,
        coverImageAlt: coverImageAlt || null,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')

    return NextResponse.json(post)
  } catch (error: any) {
    const message = error?.code === 'P2002' ? 'That slug is already in use by another post.' : 'Failed to create post'
    if (error?.code !== 'P2002') console.error('[blog] create failed', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
