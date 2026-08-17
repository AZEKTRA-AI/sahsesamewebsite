import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { certificationSchema } from '@/lib/validations/admin'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const parsed = certificationSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 })
  }

  try {
    const certification = await prisma.certification.create({
      data: parsed.data,
    })

    revalidatePath('/admin/certifications')

    return NextResponse.json(certification)
  } catch (error) {
    console.error('[certifications] create failed', error)
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
  }
}
