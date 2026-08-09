'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/content/home', label: 'Homepage', icon: '🏠' },
  { href: '/admin/content/catalog', label: 'Products & Categories', icon: '🛍️' },
  { href: '/admin/products', label: 'Manage Products', icon: '📦' },
  { href: '/admin/categories', label: 'Manage Categories', icon: '📁' },
  { href: '/admin/content/about', label: 'About Page', icon: '📄' },
  { href: '/admin/content/quality-process', label: 'Quality & Process Page', icon: '✓' },
  { href: '/admin/content/packaging-logistics', label: 'Packaging & Logistics Page', icon: '🚚' },
  { href: '/admin/content/contact', label: 'Contact Page', icon: '✉️' },
  { href: '/admin/certifications', label: 'Certifications', icon: '🏅' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: '💬' },
  { href: '/admin/settings', label: 'Site Settings', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sah-green text-white shadow-lg flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-sah-green/20">
        <h1 className="text-2xl font-bold">SAH Admin</h1>
        <p className="text-sm text-sah-green/80">Management Panel</p>
      </div>

      <nav className="flex-1 p-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm ${
                isActive
                  ? 'bg-white text-sah-green font-medium'
                  : 'text-white hover:bg-sah-green/80'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-sah-green/20">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full bg-white text-sah-green py-2 rounded-lg font-medium hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
