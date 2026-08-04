'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/pages', label: 'Pages', icon: '📄' },
  { href: '/admin/products', label: 'Products', icon: '🛍️' },
  { href: '/admin/categories', label: 'Categories', icon: '📁' },
  { href: '/admin/certifications', label: 'Certifications', icon: '✓' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: '💬' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sah-green text-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-sah-green/20">
        <h1 className="text-2xl font-bold">SAH Admin</h1>
        <p className="text-sm text-sah-green/80">Management Panel</p>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-white text-sah-green font-medium'
                  : 'text-white hover:bg-sah-green/80'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
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
