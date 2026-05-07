'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const TOC_EXTRA_OFFSET = 96
const TOC_FALLBACK_OFFSET = 176

function getTocScrollOffset() {
  if (typeof window === 'undefined') return TOC_FALLBACK_OFFSET

  const fixedTopChrome = Array.from(document.querySelectorAll<HTMLElement>('header')).find((el) => {
    const style = window.getComputedStyle(el)
    return style.position === 'fixed' && style.top === '0px'
  })

  const headerHeight = fixedTopChrome?.getBoundingClientRect().height ?? 0
  return Math.round(headerHeight + TOC_EXTRA_OFFSET) || TOC_FALLBACK_OFFSET
}

export interface TocItem {
  id: string
  label: string
  level?: 1 | 2
}

export interface TableOfContentsProps {
  items: TocItem[]
  sticky?: boolean
  tone?: 'light' | 'dark'
  className?: string
}

export function TableOfContents({
  items,
  sticky = true,
  tone = 'dark',
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollOffset, setScrollOffset] = useState(TOC_FALLBACK_OFFSET)
  const isLightTone = tone === 'light'
  const tocLabel = 'Jump to a Section'

  useEffect(() => {
    const updateScrollOffset = () => {
      const nextOffset = getTocScrollOffset()
      setScrollOffset(nextOffset)
      document.documentElement.style.setProperty('--toc-scroll-offset', `${nextOffset}px`)
    }

    updateScrollOffset()
    window.addEventListener('resize', updateScrollOffset)
    return () => {
      window.removeEventListener('resize', updateScrollOffset)
      document.documentElement.style.removeProperty('--toc-scroll-offset')
    }
  }, [])

  // IntersectionObserver to track the current reading position
  useEffect(() => {
    const ids = items.map((item) => item.id)
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    let rafId = 0
    const updateActiveFromScrollPosition = () => {
      const topOffset = scrollOffset
      const passed = elements.filter((element) => element.getBoundingClientRect().top <= topOffset)
      if (passed.length > 0) {
        setActiveId(passed[passed.length - 1].id)
        return
      }
      const nextVisible = elements.find(
        (element) => element.getBoundingClientRect().top > topOffset
      )
      if (nextVisible) setActiveId(nextVisible.id)
    }

    const requestActiveUpdate = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        updateActiveFromScrollPosition()
      })
    }

    const observer = new IntersectionObserver(() => requestActiveUpdate(), {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    })

    for (const el of elements) observer.observe(el)
    updateActiveFromScrollPosition()
    window.addEventListener('scroll', requestActiveUpdate, { passive: true })
    window.addEventListener('resize', requestActiveUpdate)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestActiveUpdate)
      window.removeEventListener('resize', requestActiveUpdate)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [items, scrollOffset])

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

  const activeChildItems = items.filter(
    (item) => item.level === 2 && activeParentId && parentMap.get(item.id) === activeParentId
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (!el) return
        const top = window.scrollY + el.getBoundingClientRect().top - scrollOffset
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
        setActiveId(id)
      }

      const isMobileViewport = window.innerWidth < 1024
      if (isMobileViewport && mobileOpen) {
        setMobileOpen(false)
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(scrollToTarget)
        })
        return
      }

      scrollToTarget()
      setMobileOpen(false)
    },
    [mobileOpen, scrollOffset]
  )

  const tocList = (
    <nav aria-label="Table of contents">
      <ul>
        {items
          .filter((item) => {
            if (item.level !== 2) return true
            if (!activeParentId) return false
            return parentMap.get(item.id) === activeParentId
          })
          .map((item) => {
            const isLevel2 = item.level === 2
            const isInActiveChildGroup =
              isLevel2 && activeParentId && parentMap.get(item.id) === activeParentId
            const isFirstActiveChild = isInActiveChildGroup && activeChildItems[0]?.id === item.id
            const isLastActiveChild =
              isInActiveChildGroup && activeChildItems[activeChildItems.length - 1]?.id === item.id
            const childItems = items.filter(
              (candidate) => candidate.level === 2 && parentMap.get(candidate.id) === item.id
            )
            const hasChild = childItems.length > 0
            const isChildActive = childItems.some((child) => child.id === activeId)
            const isSelfOrChildActive = activeId === item.id || isChildActive

            return (
              <li
                key={item.id}
                className={cn(
                  'relative pt-4',
                  ((hasChild && isSelfOrChildActive) || isInActiveChildGroup) &&
                    'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-border-subtle',
                  hasChild && isSelfOrChildActive && 'before:top-6 before:bottom-[-1rem]',
                  isLastActiveChild && 'before:bottom-2'
                )}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  className={cn(
                    'relative block py-0.5 text-base leading-[1.45] transition-colors duration-150',
                    activeId === item.id ? 'pl-4 font-medium text-brand-violet-medium' : '',
                    activeId !== item.id && item.level === 2
                      ? 'pl-4 font-normal'
                      : activeId !== item.id
                        ? 'pl-4 font-medium'
                        : '',
                    activeId !== item.id && isLightTone
                      ? item.level === 2
                        ? 'text-carbon-600 hover:text-carbon-800'
                        : 'text-text-primary hover:text-carbon-800'
                      : activeId !== item.id
                        ? 'text-text-secondary hover:text-text-inverse'
                        : ''
                  )}
                >
                  {activeId === item.id ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-[60%] w-px -translate-y-1/2 bg-brand-violet-medium"
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            )
          })}
      </ul>
    </nav>
  )

  return (
    <>
      {/* Desktop: sidebar sticky TOC */}
      <div
        className={cn(
          'hidden lg:block w-80 shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto',
          !sticky && 'static max-h-none overflow-visible',
          className
        )}
      >
        <p
          className={cn(
            'text-xl leading-tight font-bold mb-4 tracking-normal pl-4',
            isLightTone ? 'text-text-primary' : 'text-text-secondary'
          )}
        >
          {tocLabel}
        </p>
        {tocList}
      </div>

      {/* Mobile: collapsible dropdown */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={cn(
            'flex items-center gap-2 text-sm font-bold border px-4 py-2 w-full',
            isLightTone
              ? 'bg-white text-text-primary border-border-subtle'
              : 'text-text-inverse border-border-primary'
          )}
        >
          <span>{tocLabel}</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 ml-auto transition-transform duration-200',
              mobileOpen && 'rotate-180'
            )}
            strokeWidth={1.5}
          />
        </button>
        {mobileOpen && (
          <div
            className={cn(
              'mt-2 border p-4',
              isLightTone ? 'border-border-subtle bg-white' : 'border-border-primary bg-bg-surface'
            )}
          >
            {tocList}
          </div>
        )}
      </div>
    </>
  )
}
