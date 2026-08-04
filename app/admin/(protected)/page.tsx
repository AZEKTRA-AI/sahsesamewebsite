import { prisma } from '@/lib/prisma'

async function getDashboardStats() {
  const [productCount, enquiryCount, pageCount] = await Promise.all([
    prisma.product.count(),
    prisma.enquiry.count(),
    prisma.page.count(),
  ])

  return { productCount, enquiryCount, pageCount }
}

export default async function AdminDashboard() {
  const { productCount, enquiryCount, pageCount } = await getDashboardStats()

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-sah-green">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Products</h3>
          <p className="text-4xl font-bold text-sah-green">{productCount}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-sah-gold">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Enquiries</h3>
          <p className="text-4xl font-bold text-sah-gold">{enquiryCount}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-sah-charcoal">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Pages</h3>
          <p className="text-4xl font-bold text-sah-charcoal">{pageCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-sah-charcoal mb-6">Quick Start</h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            📄 <strong>Manage Pages:</strong> Edit homepage sections, create new pages, and manage SEO metadata in the{' '}
            <a href="/admin/pages" className="text-sah-green hover:underline">
              Pages
            </a>{' '}
            section.
          </li>
          <li>
            🛍️ <strong>Add Products:</strong> Create, edit, and publish products in the{' '}
            <a href="/admin/products" className="text-sah-green hover:underline">
              Products
            </a>{' '}
            section.
          </li>
          <li>
            💬 <strong>View Enquiries:</strong> Manage RFQ submissions and track their status in{' '}
            <a href="/admin/enquiries" className="text-sah-green hover:underline">
              Enquiries
            </a>
            .
          </li>
          <li>
            ✓ <strong>Manage Certifications:</strong> Add certifications in the{' '}
            <a href="/admin/certifications" className="text-sah-green hover:underline">
              Certifications
            </a>{' '}
            section.
          </li>
        </ul>
      </div>
    </div>
  )
}
