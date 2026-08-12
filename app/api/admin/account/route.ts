import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminUser = await prisma.adminUser.findUnique({
    where: { id: session.user.id },
    select: { email: true },
  })

  return NextResponse.json({ email: adminUser?.email ?? '' })
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { currentPassword, newEmail, newPassword } = await request.json()

  if (!currentPassword) {
    return NextResponse.json({ error: 'Enter your current password to confirm this change.' }, { status: 400 })
  }

  const adminUser = await prisma.adminUser.findUnique({ where: { id: session.user.id } })
  if (!adminUser) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }

  const passwordMatch = await bcrypt.compare(currentPassword, adminUser.passwordHash)
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 })
  }

  const data: { email?: string; passwordHash?: string } = {}

  if (newEmail && newEmail !== adminUser.email) {
    data.email = newEmail
  }

  if (newPassword) {
    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 })
    }
    data.passwordHash = await bcrypt.hash(newPassword, 10)
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Nothing to update.' }, { status: 400 })
  }

  try {
    await prisma.adminUser.update({ where: { id: adminUser.id }, data })
  } catch (error: any) {
    const message = error?.code === 'P2002' ? 'That email is already in use.' : 'Failed to update account.'
    return NextResponse.json({ error: message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
