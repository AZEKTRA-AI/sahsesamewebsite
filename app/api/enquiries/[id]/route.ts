import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const VALID_STATUSES = ['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED']

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { status } = await request.json()
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const enquiry = await prisma.enquiry.update({
    where: { id: params.id },
    data: { status },
  })

  revalidatePath('/admin/enquiries')
  revalidatePath(`/admin/enquiries/${params.id}`)

  return NextResponse.json(enquiry)
}
