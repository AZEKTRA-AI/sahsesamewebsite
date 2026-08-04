import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PageEditForm from '@/components/admin/forms/PageEditForm'

async function getPage(id: string) {
  return await prisma.page.findUnique({
    where: { id },
    include: { sections: { orderBy: { sortOrder: 'asc' } } },
  })
}

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const page = await getPage(params.id)

  if (!page) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-sah-charcoal mb-2">{page.title}</h1>
        <p className="text-gray-600">Editing: {page.slug}</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <PageEditForm page={page} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="font-bold text-sah-charcoal mb-4">Page Info</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">Status</p>
              <p className="font-medium">{page.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Slug</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">{page.slug}</code>
            </div>
            <div>
              <p className="text-gray-600">Sections</p>
              <p className="font-medium">{page.sections.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Created</p>
              <p className="text-xs">{new Date(page.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
