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
    const { name, description, sortOrder } = await request.json()

    const certification = await prisma.certification.create({
      data: {
        name,
        description,
        sortOrder: sortOrder || 0,
      },
    })

    revalidatePath('/admin/certifications')

    return NextResponse.json(certification)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create certification' },
      { status: 500 }
    )
  }
}
