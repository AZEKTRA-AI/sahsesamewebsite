import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@123456'

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log(`✓ Admin user ${adminEmail} already exists`)
    return
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.adminUser.create({
    data: {
      email: adminEmail,
      passwordHash: hashedPassword,
    },
  })

  console.log(`✓ Created admin user: ${admin.email}`)

  // Create default categories
  const categories = await prisma.category.findMany()
  if (categories.length === 0) {
    await prisma.category.createMany({
      data: [
        { name: 'Sesame Seeds', slug: 'sesame', icon: '🌾' },
        { name: 'Pulses', slug: 'pulses', icon: '🫘' },
        { name: 'Rice', slug: 'rice', icon: '🍚' },
      ],
    })
    console.log('✓ Created default categories')
  }

  // Create home page structure
  const homePage = await prisma.page.findUnique({
    where: { slug: 'home' },
  })

  if (!homePage) {
    const page = await prisma.page.create({
      data: {
        slug: 'home',
        title: 'Home | SAH Company',
        description: 'Sesame Seeds, Pulses & Rice Export from Pakistan',
        status: 'PUBLISHED',
        sections: {
          create: [
            {
              type: 'hero',
              sortOrder: 0,
              content: {
                headline: 'Premium Agricultural Exports from Pakistan',
                subheading: 'Quality sesame seeds, pulses, and rice for global markets',
                ctaText: 'Request Quotation',
              },
            },
            {
              type: 'trust-strip',
              sortOrder: 1,
              content: {
                items: [
                  { label: 'Family Trading Since 1992', value: '30+ Years' },
                  { label: 'Faisalabad-Based', value: 'Direct Access' },
                  { label: 'Export Incoterms', value: 'FOB, CFR, CIF' },
                  { label: 'Product Categories', value: '3' },
                ],
              },
            },
            {
              type: 'why-choose-us',
              sortOrder: 2,
              content: {
                heading: 'Why Choose SAH Company',
                description: 'Our approach combines agricultural heritage with modern B2B supply practices.',
                items: [
                  { icon: '👨‍🌾', title: 'Family Experience', description: 'Decades of commodity-trading experience grounded in the pulses business since 1992.' },
                  { icon: '📍', title: 'Pakistan-Based Sourcing', description: "Direct access to Pakistan's agricultural heartland with established supplier relationships." },
                ],
              },
            },
          ],
        },
      },
      include: { sections: true },
    })
    console.log('✓ Created home page with sections')
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
