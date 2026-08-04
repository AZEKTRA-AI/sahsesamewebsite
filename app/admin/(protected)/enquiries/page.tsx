import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getEnquiries() {
  return await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default async function EnquiriesAdmin() {
  const enquiries = await getEnquiries()

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-8">Enquiries</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">From</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Product</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email Sent</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No enquiries yet.
                </td>
              </tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{enq.buyerName}</p>
                      <p className="text-gray-600">{enq.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{enq.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        enq.status === 'NEW'
                          ? 'bg-blue-100 text-blue-800'
                          : enq.status === 'IN_PROGRESS'
                          ? 'bg-yellow-100 text-yellow-800'
                          : enq.status === 'RESPONDED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {enq.emailSent ? '✓ Sent' : '⊘ Pending'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      href={`/admin/enquiries/${enq.id}`}
                      className="text-sah-green hover:underline font-medium"
                    >
                      View
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
