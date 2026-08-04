import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, description, status } = await request.json()

    const page = await prisma.page.update({
      where: { id: params.id },
      data: { title, description, status },
    })

    revalidatePath(`/${page.slug}`)
    revalidatePath('/admin/pages')

    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}
