'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface TocItem {
  id: string
  label: string
  level?: 1 | 2
}

export interface TableOfContentsProps {
  items: TocItem[]
  sticky?: boolean
  className?: string
}

export function TableOfContents({ items, sticky = true, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  // IntersectionObserver to track the current reading position
  useEffect(() => {
    const ids = items.map((item) => item.id)
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [items])

  const { activeParentId, parentMap } = (() => {
    let lastLevel1: string | null = null
    const map = new Map<string, string | null>()
    for (const item of items) {
      if (item.level !== 2) {
        lastLevel1 = item.id
        map.set(item.id, item.id)
      } else {
        map.set(item.id, lastLevel1)
      }
    }
    const activeParent = activeId ? (map.get(activeId) ?? null) : null
    return { activeParentId: activeParent, parentMap: map }
  })()

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
    setMobileOpen(false)
  }, [])

  const tocList = (
    <nav aria-label="Table of contents">
      <ul className="space-y-1">
        {items
          .filter((item) => {
            if (item.level !== 2) return true
            if (!activeParentId) return false
            return parentMap.get(item.id) === activeParentId
          })
          .map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={cn(
                  'block py-1 text-sm transition-colors duration-150',
                  item.level === 2 ? 'pl-4' : 'pl-0',
                  activeId === item.id
                    ? 'text-brand-blue-light font-bold'
                    : 'text-text-secondary hover:text-text-inverse'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  )

  return (
    <>
      {/* Desktop: sidebar sticky TOC */}
      <div
        className={cn(
          'hidden lg:block w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto',
          !sticky && 'static max-h-none overflow-visible',
          className
        )}
      >
        <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
          Contents
        </p>
        {tocList}
      </div>

      {/* Mobile: collapsible dropdown */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-bold text-text-inverse border border-border-primary rounded-lg px-4 py-2 w-full"
        >
          <span>Contents</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 ml-auto transition-transform duration-200',
              mobileOpen && 'rotate-180'
            )}
            strokeWidth={1.5}
          />
        </button>
        {mobileOpen && (
          <div className="mt-2 border border-border-primary rounded-lg p-4 bg-bg-surface">
            {tocList}
          </div>
        )}
      </div>
    </>
  )
}
