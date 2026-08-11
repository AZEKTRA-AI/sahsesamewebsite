import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, slug, excerpt, content, coverImage, coverImageAlt, status } = await request.json()

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400 })
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage || null,
        coverImageAlt: coverImageAlt || null,
        status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')

    return NextResponse.json(post)
  } catch (error: any) {
    const message =
      error?.code === 'P2002' ? 'That slug is already in use by another post.' : error?.message
    return NextResponse.json({ error: message || 'Failed to create post' }, { status: 500 })
  }
}
