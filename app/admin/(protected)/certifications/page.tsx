import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getCertifications() {
  return await prisma.certification.findMany({
    orderBy: { sortOrder: 'asc' },
  })
}

export default async function CertificationsAdmin() {
  const certifications = await getCertifications()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-sah-charcoal">Certifications</h1>
        <Link
          href="/admin/certifications/create"
          className="bg-sah-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
        >
          + New Certification
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sort Order</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {certifications.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No certifications yet. Create one to get started.
                </td>
              </tr>
            ) : (
              certifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{cert.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cert.description || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cert.sortOrder}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      href={`/admin/certifications/${cert.id}`}
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
