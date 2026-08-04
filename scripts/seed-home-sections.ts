import { PrismaClient, Prisma } from '@prisma/client'

const p = new PrismaClient({ log: [] })

/**
 * Canonical home page section order, matching the components wired up in
 * components/PageRenderer.tsx. The seed only created the first three, so the
 * remaining sections never rendered on the live site.
 */
const SECTIONS: { type: string; content: Prisma.InputJsonObject }[] = [
  { type: 'hero', content: {} },
  { type: 'trust-strip', content: {} },
  { type: 'trading-roots', content: {} },
  { type: 'categories-showcase', content: {} },
  { type: 'why-choose-us', content: {} },
  { type: 'quality-process', content: {} },
  { type: 'packaging-shipment', content: {} },
  { type: 'industries-served', content: {} },
  { type: 'rfq-form', content: {} },
]

async function main() {
  const page = await p.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true },
  })

  if (!page) throw new Error('Home page not found — run the seed first')

  console.log('existing sections:', page.sections.map((s) => s.type).join(', ') || '(none)')

  for (const [index, def] of SECTIONS.entries()) {
    const existing = page.sections.find((s) => s.type === def.type)

    if (existing) {
      if (existing.sortOrder !== index) {
        await p.pageSection.update({
          where: { id: existing.id },
          data: { sortOrder: index },
        })
        console.log(`  reordered ${def.type} -> ${index}`)
      }
      continue
    }

    await p.pageSection.create({
      data: {
        pageId: page.id,
        type: def.type,
        // Components render hardcoded copy today; content is the hook for the
        // admin section editor once per-section fields land.
        content: def.content,
        sortOrder: index,
      },
    })
    console.log(`  + added ${def.type} at ${index}`)
  }

  const final = await p.pageSection.findMany({
    where: { pageId: page.id },
    orderBy: { sortOrder: 'asc' },
  })
  console.log('\nfinal order:')
  final.forEach((s) => console.log(`  ${s.sortOrder}. ${s.type}`))
}

main().finally(() => p.$disconnect())
