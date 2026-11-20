'use client'

import { useEffect } from 'react'

/** Opens the collapsed <details id={key}> a hash points at, so the jump lands on an expanded section. */
function openSection(key: string) {
  const el = document.getElementById(key)
  if (el instanceof HTMLDetailsElement) el.open = true
}

/** Anchor links to each section of the local entry page. */
export function SectionNav({
  sections,
}: {
  sections: { key: string; label: string; count: number }[]
}) {
  useEffect(() => {
    const onHash = () => openSection(decodeURIComponent(location.hash.slice(1)))
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <nav aria-label="Sections" className="flex flex-wrap gap-2">
      {sections.map((s) => (
        <a
          key={s.key}
          href={`#${s.key}`}
          // Also open on click: re-clicking the current hash fires no hashchange.
          onClick={() => openSection(s.key)}
          className="rounded border border-border-primary px-2.5 py-1 text-sm text-text-inverse transition-colors hover:border-brand-red-primary hover:text-brand-red-primary"
        >
          {s.label} <span className="text-text-secondary">{s.count}</span>
        </a>
      ))}
    </nav>
  )
}
