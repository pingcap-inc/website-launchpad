import { isValidElement, type ReactNode } from 'react'

/**
 * Flatten a ReactNode to its visible text.
 *
 * Lets a page keep one definition of copy that is authored as JSX (so it can
 * contain <InlineLink>s and other markup) and still derive the plain string that
 * JSON-LD requires, instead of maintaining a hand-written duplicate that drifts
 * from what the page actually renders.
 */
export function reactNodeToPlainText(node: ReactNode): string {
  const parts: string[] = []

  const walk = (value: ReactNode): void => {
    if (value === null || value === undefined || typeof value === 'boolean') return
    if (typeof value === 'string') {
      parts.push(value)
      return
    }
    if (typeof value === 'number') {
      parts.push(String(value))
      return
    }
    if (Array.isArray(value)) {
      value.forEach(walk)
      return
    }
    if (isValidElement(value)) {
      walk((value.props as { children?: ReactNode }).children)
    }
    // Anything else (portals, promises, unresolved server components) has no
    // statically knowable text; skipping it is better than throwing at build time.
  }

  walk(node)

  return parts.join('').replace(/\s+/g, ' ').trim()
}
