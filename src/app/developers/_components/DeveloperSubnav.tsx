'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/developers/' },
  { label: 'Get Started', href: '/developers/get-started/' },
  { label: 'Build Data Applications', href: '/developers/build-data-apps/' },
  { label: 'Build AI Applications', href: '/developers/build-ai-apps/' },
  { label: 'Migration Center', href: '/developers/migration-center/' },
  { label: 'Learn', href: '/developers/learn/' },
]

export function DeveloperSubnav() {
  const pathname = usePathname()

  return (
    <nav
      className="sticky top-[62px] lg:top-20 z-40 bg-bg-primary"
      aria-label="Developer Hub navigation"
    >
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 overflow-x-auto scrollbar-none">
        <ul className="flex -ml-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname === item.href.slice(0, -1)
            return (
              <li key={item.label} className="shrink-0">
                <a
                  href={item.href}
                  className={cn(
                    'block px-4 py-4 text-sm  whitespace-nowrap transition-colors duration-150 ease-in-out',
                    isActive ? 'text-brand-red-primary' : 'text-text-inverse hover:text-carbon-400'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
