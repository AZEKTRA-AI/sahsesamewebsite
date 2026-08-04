import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rfqSchema } from '@/lib/validations/rfq'
import { sendRfqEmail } from '@/lib/email'

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function hashIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
  // Salted so the stored value can't be reversed into a raw IP.
  const salt = process.env.NEXTAUTH_SECRET || 'sah-rfq'
  return createHash('sha256').update(`${ip}:${salt}`).digest('hex')
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = rfqSchema.safeParse(body)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return NextResponse.json(
      { error: 'Please correct the highlighted fields', fieldErrors },
      { status: 400 }
    )
  }

  const data = parsed.data

  // Honeypot tripped — respond as success so bots don't learn they were caught.
  if (data.website) {
    return NextResponse.json({ ok: true })
  }

  const ipHash = hashIp(request)

  try {
    const recentCount = await prisma.enquiry.count({
      where: {
        ipHash,
        createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
      },
    })

    if (recentCount >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: 'Too many enquiries from this address. Please try again later or email us directly.' },
        { status: 429 }
      )
    }

    // The database row is the record of truth — write it before attempting email.
    const enquiry = await prisma.enquiry.create({
      data: {
        buyerName: data.buyerName,
        company: data.company,
        country: data.country,
        email: data.email,
        phone: data.phone,
        product: data.product,
        quantity: data.quantity || 'Not specified',
        packaging: data.packaging || null,
        incoterm: data.incoterm || null,
        sampleRequest: data.sampleRequest,
        comments: data.comments || null,
        attachmentUrl: data.attachmentUrl || null,
        ipHash,
        status: 'NEW',
        emailSent: false,
      },
    })

    // Email is best-effort: a delivery failure must not lose the enquiry.
    try {
      await sendRfqEmail(data, enquiry.id)
      await prisma.enquiry.update({
        where: { id: enquiry.id },
        data: { emailSent: true },
      })
    } catch (emailError) {
      console.error('[rfq] email delivery failed for enquiry', enquiry.id, emailError)
    }

    return NextResponse.json({ ok: true, id: enquiry.id })
  } catch (error) {
    console.error('[rfq] failed to record enquiry', error)
    return NextResponse.json(
      { error: 'We could not submit your enquiry. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}
