import { prisma } from '@/lib/prisma'
import ProductCreateForm from '@/components/admin/forms/ProductCreateForm'

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
}

export default async function CreateProductPage() {
  const categories = await getCategories()

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-8">Create Product</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <ProductCreateForm categories={categories} />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 h-fit">
          <h3 className="font-bold text-blue-900 mb-4">💡 Tips</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Use lowercase slugs with hyphens (e.g., "white-sesame")</li>
            <li>• Specifications can be JSON (purity, moisture, etc.)</li>
            <li>• Products start as drafts and can be published later</li>
            <li>• You can add images after creating the product</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
