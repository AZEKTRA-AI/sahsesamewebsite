import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { categorySchema } from '@/lib/validations/admin'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const parsed = categorySchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 })
  }

  try {
    const category = await prisma.category.create({
      data: parsed.data,
    })

    revalidatePath('/admin/categories')

    return NextResponse.json(category)
  } catch (error: any) {
    const message = error?.code === 'P2002' ? 'That name or slug is already in use.' : 'Failed to create category'
    if (error?.code !== 'P2002') console.error('[categories] create failed', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
