import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

/**
 * Issues a short-lived signature so the browser can upload straight to
 * Cloudinary. Keeps the API secret server-side and avoids routing file bytes
 * through a serverless function (which has a hard body-size limit).
 */
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!apiKey || !apiSecret || !cloudName) {
    return NextResponse.json(
      { error: 'Cloudinary is not configured on the server' },
      { status: 500 }
    )
  }

  let paramsToSign: Record<string, string> = {}
  try {
    const body = await request.json()
    paramsToSign = body?.paramsToSign ?? {}
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Cloudinary expects the params sorted by key, joined as k=v pairs, with the
  // API secret appended, then SHA-1 hashed.
  const signature = createHash('sha1')
    .update(
      Object.keys(paramsToSign)
        .sort()
        .map((key) => `${key}=${paramsToSign[key]}`)
        .join('&') + apiSecret
    )
    .digest('hex')

  return NextResponse.json({ signature })
}
