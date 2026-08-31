// Preview canvas for the design system's dark-first surface.
//
// globals.css styles the page itself — `body { @apply bg-bg-primary
// text-text-inverse }` — so components assume a black background with white
// text. Preview cards hard-code `body{background:#fff}` in their own template,
// which wins over that @layer base rule and leaves white-on-white text.
//
// Wired via cfg.provider so every preview card renders on the real surface.
// It affects preview cards only: designs built in Claude Design pick up the
// dark body straight from styles.css.
import * as React from 'react'

export function DsCanvas({ children }: { children?: React.ReactNode }) {
  return (
    <div
      // `section-root` is what declares --text-secondary (globals.css) — the
      // `.text-secondary` utility reads it with no fallback, so an atom
      // rendered outside a section container silently inherits white instead
      // of #A2ADB9. Real pages always supply this context via SectionWrapper.
      className="section-root bg-bg-primary text-text-inverse font-sans"
      // Bleed past the card template's 24px body padding so the dark surface
      // reaches the card edges instead of floating on a white border.
      style={{ margin: -24, padding: 24, minHeight: '100vh', boxSizing: 'border-box' }}
    >
      {children}
    </div>
  )
}
