import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EnquiryActions from '@/components/admin/EnquiryActions'

async function getEnquiry(id: string) {
  return await prisma.enquiry.findUnique({ where: { id } })
}

function field(label: string, value?: string | null) {
  if (!value) return null
  return (
    <div>
      <p className="text-gray-600">{label}</p>
      <p className="font-medium text-sah-charcoal">{value}</p>
    </div>
  )
}

export default async function EnquiryDetailPage({ params }: { params: { id: string } }) {
  const enquiry = await getEnquiry(params.id)
  if (!enquiry) notFound()

  return (
    <div className="p-8">
      <Link href="/admin/enquiries" className="text-sm text-sah-green hover:underline">
        ← Back to enquiries
      </Link>

      <div className="mt-4 mb-8">
        <h1 className="text-4xl font-bold text-sah-charcoal mb-2">{enquiry.buyerName}</h1>
        <p className="text-gray-600">
          {enquiry.company} · {enquiry.country} · Submitted{' '}
          {new Date(enquiry.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-sah-charcoal mb-4">Enquiry details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {field('Email', enquiry.email)}
              {field('Phone', enquiry.phone)}
              {field('Product', enquiry.product)}
              {field('Quantity', enquiry.quantity)}
              {field('Packaging', enquiry.packaging)}
              {field('Incoterm', enquiry.incoterm)}
              {field('Sample requested', enquiry.sampleRequest ? 'Yes' : 'No')}
              {field('Attachment', enquiry.attachmentUrl)}
            </div>
            {enquiry.comments && (
              <div className="mt-4 pt-4 border-t text-sm">
                <p className="text-gray-600 mb-1">Comments</p>
                <p className="whitespace-pre-line text-sah-charcoal">{enquiry.comments}</p>
              </div>
            )}
          </div>

          {enquiry.replyMessage && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-sah-charcoal mb-2">
                Last reply sent{enquiry.repliedAt ? ` — ${new Date(enquiry.repliedAt).toLocaleString()}` : ''}
              </h3>
              <p className="whitespace-pre-line text-sm text-gray-700">{enquiry.replyMessage}</p>
            </div>
          )}

          <EnquiryActions enquiryId={enquiry.id} status={enquiry.status} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="font-bold text-sah-charcoal mb-4">Meta</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">Enquiry ID</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">{enquiry.id}</code>
            </div>
            <div>
              <p className="text-gray-600">Internal notification</p>
              <p className="font-medium">{enquiry.emailSent ? '✓ Sent' : '⊘ Pending'}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <p className="font-medium">{enquiry.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
