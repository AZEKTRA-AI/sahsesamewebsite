import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

async function revalidateProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  })
  if (product) {
    revalidatePath(`/products/${product.category.slug}/${product.slug}`)
    revalidatePath(`/products/${product.category.slug}`)
  }
  revalidatePath('/admin/products')
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { cloudinaryId, url, alt } = await request.json()

    if (!cloudinaryId || !url) {
      return NextResponse.json(
        { error: 'cloudinaryId and url are required' },
        { status: 400 }
      )
    }

    const count = await prisma.productImage.count({ where: { productId: params.id } })

    const image = await prisma.productImage.create({
      data: {
        productId: params.id,
        cloudinaryId,
        url,
        alt: alt || null,
        sortOrder: count,
      },
    })

    await revalidateProduct(params.id)

    return NextResponse.json(image)
  } catch (error) {
    console.error('[product-images] create failed', error)
    return NextResponse.json({ error: 'Failed to attach image' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const imageId = searchParams.get('imageId')

    if (!imageId) {
      return NextResponse.json({ error: 'imageId is required' }, { status: 400 })
    }

    // Scoped to the product so an image can't be deleted via a mismatched id.
    const deleted = await prisma.productImage.deleteMany({
      where: { id: imageId, productId: params.id },
    })

    if (deleted.count === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    await revalidateProduct(params.id)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[product-images] delete failed', error)
    return NextResponse.json({ error: 'Failed to remove image' }, { status: 500 })
  }
}
