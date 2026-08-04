import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductEditForm from '@/components/admin/forms/ProductEditForm'
import ProductImageManager from '@/components/admin/ProductImageManager'

async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true, images: true },
  })
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const categories = await getCategories()

  if (!product) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-sah-charcoal mb-2">{product.name}</h1>
        <p className="text-gray-600">Category: {product.category.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <ProductEditForm product={product} categories={categories} />
          <ProductImageManager
            productId={product.id}
            productSlug={product.slug}
            images={product.images}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="font-bold text-sah-charcoal mb-4">Product Info</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">Status</p>
              <p className="font-medium">{product.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Slug</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">{product.slug}</code>
            </div>
            <div>
              <p className="text-gray-600">Images</p>
              <p className="font-medium">{product.images.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Origin</p>
              <p className="text-xs">{product.origin || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
