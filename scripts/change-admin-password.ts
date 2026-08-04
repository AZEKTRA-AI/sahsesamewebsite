import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as readline from 'node:readline'

const prisma = new PrismaClient({ log: [] })

/**
 * Changes an admin password against whatever database DATABASE_URL points at.
 *
 *   npx tsx scripts/change-admin-password.ts
 *   npx tsx scripts/change-admin-password.ts newadmin@sahcompany.pk
 *
 * Prompts for the password so it never lands in shell history.
 */

function ask(question: string, hidden = false): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  return new Promise((resolve) => {
    if (!hidden) {
      rl.question(question, (answer) => {
        rl.close()
        resolve(answer.trim())
      })
      return
    }

    // Suppress echo so the typed password is not shown on screen.
    const input = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream }
    process.stdout.write(question)
    input._writeToOutput = () => {}

    rl.question('', (answer) => {
      rl.close()
      process.stdout.write('\n')
      resolve(answer.trim())
    })
  })
}

function checkStrength(password: string): string | null {
  if (password.length < 12) return 'Use at least 12 characters.'
  if (!/[a-z]/.test(password)) return 'Include a lowercase letter.'
  if (!/[A-Z]/.test(password)) return 'Include an uppercase letter.'
  if (!/[0-9]/.test(password)) return 'Include a digit.'
  if (/^Admin@123456$/i.test(password)) return 'That is the seeded default.'
  return null
}

async function main() {
  const email = process.argv[2] || process.env.ADMIN_EMAIL || 'admin@example.com'

  const admin = await prisma.adminUser.findUnique({ where: { email } })
  if (!admin) {
    const all = await prisma.adminUser.findMany({ select: { email: true } })
    console.error(`\nNo admin user with email "${email}".`)
    console.error(
      all.length
        ? `Existing admin accounts: ${all.map((a) => a.email).join(', ')}`
        : 'There are no admin accounts in this database.'
    )
    process.exitCode = 1
    return
  }

  console.log(`\nChanging password for: ${admin.email}`)
  console.log('(database: ' + (process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] ?? 'unknown') + ')\n')

  const password = await ask('New password: ', true)
  const problem = checkStrength(password)
  if (problem) {
    console.error(`\nPassword rejected. ${problem}`)
    process.exitCode = 1
    return
  }

  const confirm = await ask('Confirm password: ', true)
  if (password !== confirm) {
    console.error('\nPasswords do not match. Nothing changed.')
    process.exitCode = 1
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash },
  })

  // Prove the stored hash actually validates before declaring success.
  const updated = await prisma.adminUser.findUnique({ where: { id: admin.id } })
  const verified = updated ? await bcrypt.compare(password, updated.passwordHash) : false

  if (!verified) {
    console.error('\nPassword was written but failed verification. Do not log out.')
    process.exitCode = 1
    return
  }

  console.log(`\nPassword updated and verified for ${admin.email}.`)
  console.log('Existing sessions stay valid until their JWT expires.')
}

main()
  .catch((e) => {
    console.error('Failed to change password:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
