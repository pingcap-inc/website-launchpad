import type * as React from 'react'

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

function isHashHref(href?: string) {
  return !!href && href.startsWith('#') && href.length > 1
}

function resolveHashTarget(hash: string) {
  const decoded = decodeURIComponent(hash.slice(1))
  if (!decoded) return null

  const exactTarget =
    document.getElementById(decoded) ??
    document.querySelector<HTMLElement>(`[name="${CSS.escape(decoded)}"]`)

  if (exactTarget) {
    return exactTarget.closest('section[id]') ?? exactTarget
  }

  const looksLikeFormTarget = /(apply|application|form)/i.test(decoded)
  if (!looksLikeFormTarget) return null

  const formTarget = document.querySelector<HTMLElement>(
    'section:has(form), section:has([id^="hs-form-"]), section:has(.hs-form), form'
  )

  return formTarget?.closest('section[id]') ?? formTarget ?? null
}

export function handleInPageScroll(event: React.MouseEvent<HTMLAnchorElement>, href?: string) {
  if (typeof window === 'undefined' || !isHashHref(href) || isModifiedEvent(event)) return
  const hashHref = href as string

  const target = resolveHashTarget(hashHref)
  if (!target) return

  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', hashHref)
}
