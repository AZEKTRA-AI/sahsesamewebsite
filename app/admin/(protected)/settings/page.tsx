'use client'

import { useState } from 'react'

export default function SettingsAdmin() {
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState({
    companyName: 'Sain Abdul Hakim and Company',
    address: 'Office No. 170, New Grain Market, Dijkot Road, Faisalabad, Pakistan',
    phone1: '+92 300 0959524',
    phone2: '+92 300 8663396',
    email: 'info@sahcompany.com',
    whatsapp: '+92 300 0959524',
    socialLinkedIn: 'https://linkedin.com/company/sah',
    socialFacebook: 'https://facebook.com/sah',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: Save to database
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-8">Settings</h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-sah-charcoal mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sah-charcoal mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sah-charcoal mb-2">
                Phone 1
              </label>
              <input
                type="tel"
                value={formData.phone1}
                onChange={(e) =>
                  setFormData({ ...formData, phone1: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sah-charcoal mb-2">
                Phone 2
              </label>
              <input
                type="tel"
                value={formData.phone2}
                onChange={(e) =>
                  setFormData({ ...formData, phone2: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sah-charcoal mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sah-charcoal mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sah-charcoal mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.socialLinkedIn}
                onChange={(e) =>
                  setFormData({ ...formData, socialLinkedIn: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sah-charcoal mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.socialFacebook}
                onChange={(e) =>
                  setFormData({ ...formData, socialFacebook: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sah-green"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sah-green text-white py-3 rounded-lg font-medium hover:bg-opacity-90"
          >
            Save Settings
          </button>

          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              ✓ Settings saved successfully
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
