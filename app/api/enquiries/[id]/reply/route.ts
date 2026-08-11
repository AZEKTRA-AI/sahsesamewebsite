import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sendEnquiryReply } from '@/lib/email'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { message } = await request.json()
  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Reply message is required' }, { status: 400 })
  }

  const enquiry = await prisma.enquiry.findUnique({ where: { id: params.id } })
  if (!enquiry) {
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
  }

  try {
    await sendEnquiryReply({
      toEmail: enquiry.email,
      toName: enquiry.buyerName,
      product: enquiry.product,
      message: message.trim(),
      enquiryId: enquiry.id,
    })
  } catch (error) {
    console.error('[enquiries] reply send failed for', enquiry.id, error)
    return NextResponse.json({ error: 'Failed to send the reply email' }, { status: 502 })
  }

  const updated = await prisma.enquiry.update({
    where: { id: params.id },
    data: {
      status: 'RESPONDED',
      replyMessage: message.trim(),
      repliedAt: new Date(),
    },
  })

  revalidatePath('/admin/enquiries')
  revalidatePath(`/admin/enquiries/${params.id}`)

  return NextResponse.json(updated)
}
