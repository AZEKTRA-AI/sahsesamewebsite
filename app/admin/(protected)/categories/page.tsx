import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getCategories() {
  return await prisma.category.findMany({
    include: { products: { select: { id: true } } },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function CategoriesAdmin() {
  const categories = await getCategories()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-sah-charcoal">Categories</h1>
        <Link
          href="/admin/categories/create"
          className="bg-sah-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
        >
          + New Category
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Slug</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Icon</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Products</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">{cat.slug}</code>
                  </td>
                  <td className="px-6 py-4 text-2xl">{cat.icon}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cat.products.length}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      href={`/admin/categories/${cat.id}`}
                      className="text-sah-green hover:underline font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
