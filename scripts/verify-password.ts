import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const p = new PrismaClient({ log: [] })

/**
 * Confirms bcryptjs can verify the hash bcrypt originally wrote, so switching
 * libraries does not lock the existing admin out.
 */
async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@123456'

  const admin = await p.adminUser.findUnique({ where: { email } })
  if (!admin) {
    console.log(`no admin user found for ${email}`)
    return
  }

  console.log('hash prefix:', admin.passwordHash.slice(0, 7))
  console.log('correct password verifies:', await bcrypt.compare(password, admin.passwordHash))
  console.log('wrong password rejected:  ', !(await bcrypt.compare('definitely-wrong', admin.passwordHash)))
}

main().finally(() => p.$disconnect())
