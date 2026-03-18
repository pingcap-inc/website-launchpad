'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  PlusSquare,
  MessageSquare,
  Layers,
  PanelRight,
  Lock,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/pages', label: 'Pages', icon: FileText, disabled: true },
  { href: '/admin/create', label: 'Create Page', icon: PlusSquare },
  { href: '/admin/assistant', label: 'AI Assistant', icon: MessageSquare, disabled: true },
  { href: '/admin/builds', label: 'Preview Builds', icon: Layers, disabled: true },
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={[
        'fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-200',
        collapsed ? 'w-14' : 'w-56',
      ].join(' ')}
    >
      {/* Logo + collapse toggle */}
      <div
        className={[
          'flex items-center h-14 border-b border-gray-200 shrink-0 overflow-hidden',
          collapsed ? 'justify-center px-0' : 'gap-2 px-3',
        ].join(' ')}
      >
        {!collapsed && (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red-primary shrink-0 ml-2" />
            <span className="flex-1 text-body-sm font-bold text-gray-900 leading-tight whitespace-nowrap truncate">
              AI Website Platform
            </span>
          </>
        )}
        <button
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors shrink-0"
        >
          {collapsed ? (
            <PanelRight size={20} strokeWidth={1.5} />
          ) : (
            <PanelRight strokeWidth={1.5} size={20} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact, disabled }) => {
            const isActive = !disabled && (exact ? pathname === href : pathname.startsWith(href))
            const baseClass = [
              'flex items-center rounded text-body-sm transition-colors duration-150',
              collapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2',
            ].join(' ')
            return (
              <li key={href}>
                {disabled ? (
                  <span
                    title={collapsed ? `${label} (disabled)` : undefined}
                    className={[baseClass, 'text-gray-300 cursor-not-allowed'].join(' ')}
                  >
                    <Icon size={16} strokeWidth={1.5} className="shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{label}</span>
                        <Lock size={12} strokeWidth={1.5} className="shrink-0" />
                      </>
                    )}
                  </span>
                ) : (
                  <Link
                    href={href}
                    title={collapsed ? label : undefined}
                    className={[
                      baseClass,
                      isActive
                        ? 'bg-gray-900 text-white font-bold'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
                    ].join(' ')}
                  >
                    <Icon size={16} strokeWidth={1.5} className="shrink-0" />
                    {!collapsed && label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-gray-200 shrink-0 px-5 py-4">
          <p className="text-label text-gray-400">Internal tool — PingCAP</p>
        </div>
      )}
    </aside>
  )
}
