import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { externalLinkProps } from '@/lib/links'
import { safeHref } from '@/lib/security/sanitize'

interface InlineLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function InlineLink({ href: rawHref, children, className }: InlineLinkProps) {
  const href = safeHref(rawHref)
  return (
    <a
      href={href}
      className={cn(
        'border-b border-carbon-700 transition-colors hover:border-text-inverse',
        className
      )}
      {...externalLinkProps(href)}
    >
      {children}
    </a>
  )
}
