'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import {
  DEFAULT_LANGUAGE,
  SITE_LANGUAGES,
  findLanguage,
  type LanguageControl,
} from '@/lib/languages'
import { externalLinkProps } from '@/lib/links'
import { cn } from '@/lib/utils'

/**
 * Desktop header language selector, matching the one the WordPress theme
 * renders on the rest of www.pingcap.com: the button shows the current
 * language's short form, the list holds every language with the current one
 * in bold. A mouse opens it by hovering; touch and keyboard use the button.
 */
export function HeaderLanguageSwitcher({ language }: { language?: LanguageControl }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  // A mouse that opened the menu by hovering is already over it, so its click
  // on the button should not shut the menu in its face.
  const openedByHoverRef = useRef(false)

  const current = findLanguage(language?.current ?? DEFAULT_LANGUAGE)

  const close = () => {
    openedByHoverRef.current = false
    setOpen(false)
  }

  // Close on a click outside. Bound only while open.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        openedByHoverRef.current = false
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse' && !open) {
          openedByHoverRef.current = true
          setOpen(true)
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') close()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          close()
          buttonRef.current?.focus()
        }
      }}
      onBlur={(event) => {
        // relatedTarget is null when focus moves because of a click, which the
        // outside-click listener handles; closing here too would hide a link
        // before Safari registers the click on it.
        const next = event.relatedTarget as Node | null
        if (next && !event.currentTarget.contains(next)) close()
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="header-language-options"
        aria-label={`Language: ${current.label}`}
        onClick={() => {
          if (openedByHoverRef.current) {
            openedByHoverRef.current = false
            return
          }
          setOpen((wasOpen) => !wasOpen)
        }}
        // Closes up with the nav items below 1150px (see Header).
        className="flex items-center gap-1 px-3 py-2 text-base font-normal text-text-inverse cursor-pointer max-[1149px]:px-2 max-[1099px]:px-1"
      >
        <Globe size={20} strokeWidth={1.25} className="shrink-0" aria-hidden="true" />
        <span aria-hidden="true">{current.shortLabel}</span>
        <ChevronDown size={15} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
      </button>

      <ul
        id="header-language-options"
        className={cn(
          'absolute left-0 top-[calc(100%+20px)] z-50 flex w-[100px] flex-col gap-2.5 border border-carbon-700 bg-bg-primary px-4 py-2.5',
          // Bridges the 20px gap up to the button so a pointer moving down to
          // the list stays over the selector. It is anchored inside the 1px
          // border, so it spans that too, plus 2px of overlap so sub-pixel
          // rounding never leaves a strip between it and the button.
          "before:absolute before:-left-px before:-right-px before:bottom-full before:h-[23px] before:content-['']",
          // visibility keeps the closed list's links out of the tab order.
          open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        )}
      >
        {SITE_LANGUAGES.map((item) => {
          const isCurrent = item.code === current.code
          return (
            <li key={item.code}>
              <a
                href={item.href}
                lang={item.code}
                hrefLang={item.code}
                aria-current={isCurrent ? 'true' : undefined}
                {...externalLinkProps(item.href)}
                onClick={(event) => {
                  if (language?.onSelect?.(item.code)) {
                    event.preventDefault()
                    close()
                  }
                }}
                className={cn(
                  'block whitespace-nowrap text-body-sm text-text-inverse transition-colors duration-150 hover:text-carbon-400 focus-visible:text-carbon-400',
                  isCurrent && 'font-semibold'
                )}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
