import { PrismaClient } from '@prisma/client'
const p = new PrismaClient({ log: [] })
p.product.findFirst({ select: { id: true, name: true, slug: true } })
  .then((r) => console.log(r?.id))
  .finally(() => p.$disconnect())
