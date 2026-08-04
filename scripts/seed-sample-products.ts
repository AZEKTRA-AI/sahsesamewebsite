import { PrismaClient, Prisma } from '@prisma/client'

const p = new PrismaClient({ log: [] })

/**
 * Demo catalogue. Spec values deliberately use "to confirm" wording — the
 * client has not signed off on hard numbers yet, so nothing here should read as
 * a guaranteed specification.
 */
const PRODUCTS: {
  categorySlug: string
  name: string
  slug: string
  origin: string
  specs: Prisma.InputJsonObject
}[] = [
  {
    categorySlug: 'sesame',
    name: 'Natural White Sesame Seeds',
    slug: 'natural-white-sesame-seeds',
    origin: 'Faisalabad, Pakistan',
    specs: {
      purity: 'To confirm (typically 98%+)',
      moisture: 'To confirm',
      oilContent: 'To confirm',
      colour: 'Natural white',
      packaging: 'Buyer-specific, subject to confirmation',
      moq: 'To confirm',
    },
  },
  {
    categorySlug: 'sesame',
    name: 'Hulled Sesame Seeds',
    slug: 'hulled-sesame-seeds',
    origin: 'Faisalabad, Pakistan',
    specs: {
      purity: 'To confirm (typically 99%+)',
      moisture: 'To confirm',
      process: 'Mechanically hulled',
      colour: 'Bright white',
      packaging: 'Buyer-specific, subject to confirmation',
      moq: 'To confirm',
    },
  },
  {
    categorySlug: 'sesame',
    name: 'Black Sesame Seeds',
    slug: 'black-sesame-seeds',
    origin: 'Faisalabad, Pakistan',
    specs: {
      purity: 'To confirm',
      moisture: 'To confirm',
      colour: 'Uniform black',
      applications: 'Bakery, confectionery, oil extraction',
      packaging: 'Buyer-specific, subject to confirmation',
    },
  },
  {
    categorySlug: 'pulses',
    name: 'Chickpeas (Kabuli)',
    slug: 'chickpeas-kabuli',
    origin: 'Punjab, Pakistan',
    specs: {
      calibre: 'To confirm (mm sizing on request)',
      purity: 'To confirm',
      moisture: 'To confirm',
      packaging: 'Buyer-specific, subject to confirmation',
      moq: 'To confirm',
    },
  },
  {
    categorySlug: 'pulses',
    name: 'Green Mung Beans',
    slug: 'green-mung-beans',
    origin: 'Punjab, Pakistan',
    specs: {
      purity: 'To confirm',
      moisture: 'To confirm',
      colour: 'Bright green',
      packaging: 'Buyer-specific, subject to confirmation',
    },
  },
  {
    categorySlug: 'pulses',
    name: 'Red Lentils (Split)',
    slug: 'red-lentils-split',
    origin: 'Punjab, Pakistan',
    specs: {
      type: 'Split, football/whole on request',
      purity: 'To confirm',
      moisture: 'To confirm',
      packaging: 'Buyer-specific, subject to confirmation',
    },
  },
  {
    categorySlug: 'rice',
    name: 'Basmati Rice',
    slug: 'basmati-rice',
    origin: 'Punjab, Pakistan',
    specs: {
      grainLength: 'To confirm',
      brokenPercentage: 'To confirm',
      moisture: 'To confirm',
      packaging: 'Buyer-specific, subject to confirmation',
      moq: 'To confirm',
    },
  },
  {
    categorySlug: 'rice',
    name: 'IRRI-6 Long Grain Rice',
    slug: 'irri-6-long-grain-rice',
    origin: 'Punjab, Pakistan',
    specs: {
      grainLength: 'To confirm',
      brokenPercentage: 'To confirm',
      moisture: 'To confirm',
      packaging: 'Buyer-specific, subject to confirmation',
    },
  },
]

async function main() {
  const categories = await p.category.findMany()
  const bySlug = new Map(categories.map((c) => [c.slug, c.id]))

  let created = 0
  let skipped = 0

  for (const [index, def] of PRODUCTS.entries()) {
    const categoryId = bySlug.get(def.categorySlug)
    if (!categoryId) {
      console.warn(`  ! no category "${def.categorySlug}" — skipping ${def.name}`)
      continue
    }

    const existing = await p.product.findUnique({ where: { slug: def.slug } })
    if (existing) {
      skipped++
      continue
    }

    await p.product.create({
      data: {
        categoryId,
        name: def.name,
        slug: def.slug,
        origin: def.origin,
        specs: def.specs,
        status: 'PUBLISHED',
        sortOrder: index,
      },
    })
    console.log(`  + ${def.name}`)
    created++
  }

  console.log(`\ncreated ${created}, already present ${skipped}`)

  const counts = await p.category.findMany({
    include: { _count: { select: { products: true } } },
  })
  counts.forEach((c) => console.log(`  ${c.name}: ${c._count.products} products`))
}

main().finally(() => p.$disconnect())
