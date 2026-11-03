import { cn } from '@/lib/utils'
import { externalLinkProps } from '@/lib/links'
import { safeHref } from '@/lib/security/sanitize'

interface GhostButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function GhostButton({ children, className, onClick, href: rawHref }: GhostButtonProps) {
  const href = rawHref ? safeHref(rawHref) : rawHref
  const classes = cn(
    'inline-flex items-center gap-2 font-medium rounded-pill',
    'bg-transparent text-text-inverse hover:text-carbon-400',
    'border-0 cursor-pointer px-4 py-3 text-base',
    'transition-colors duration-200 whitespace-nowrap',
    className
  )

  if (href) {
    return (
      <a href={href} className={classes} {...externalLinkProps(href)}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
