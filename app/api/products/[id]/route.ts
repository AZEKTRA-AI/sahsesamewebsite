import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, slug, categoryId, origin, status, specs } = await request.json()

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        categoryId,
        origin,
        status,
        specs,
      },
      include: { category: true },
    })

    // Public product pages live at /products/[category]/[slug].
    revalidatePath(`/products/${product.category.slug}/${product.slug}`)
    revalidatePath(`/products/${product.category.slug}`)
    revalidatePath('/products')
    revalidatePath('/admin/products')

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}
