import { PrismaClient } from '@prisma/client'

const p = new PrismaClient({ log: [] })

async function main() {
  const purge = process.argv.includes('--purge-test-data')

  if (purge) {
    const targets = await p.enquiry.findMany({
      where: { email: { endsWith: '@example.com' } },
      select: { id: true, buyerName: true, email: true },
    })
    console.log(`deleting ${targets.length} test enquiries:`)
    targets.forEach((t) => console.log(`  - ${t.buyerName} <${t.email}>`))
    await p.enquiry.deleteMany({ where: { email: { endsWith: '@example.com' } } })
  }

  const rows = await p.enquiry.findMany({ orderBy: { createdAt: 'asc' } })
  console.log('\ntotal enquiries remaining:', rows.length)
  for (const r of rows) {
    console.log(
      `- ${r.buyerName} | ${r.company} | ${r.product} | emailSent=${r.emailSent} | status=${r.status}`
    )
  }
}

main().finally(() => p.$disconnect())
