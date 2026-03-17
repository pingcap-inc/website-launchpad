'use client'

import { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className={
          collapsed ? 'ml-14 min-h-screen flex flex-col' : 'ml-56 min-h-screen flex flex-col'
        }
      >
        {children}
      </div>
    </div>
  )
}
