import * as React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { externalLinkProps } from '@/lib/links'

interface SecondaryButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  dark?: boolean
  as?: 'a' | 'button' | 'span'
}

type SecondaryButtonRef = HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement

export const SecondaryButton = React.forwardRef<SecondaryButtonRef, SecondaryButtonProps>(
  ({ children, className, onClick, href, dark = true, as }, ref) => {
    const classes = cn(
      'group inline-flex items-center gap-2',
      'text-base font-medium',
      dark ? 'text-text-inverse' : 'text-text-primary',
      'bg-transparent border-none outline-none cursor-pointer whitespace-nowrap',
      className
    )

    const content = (
      <>
        <span>{children}</span>
        <span
          className={cn(
            'relative flex items-center justify-center',
            'w-6 h-6 rounded-full aspect-square shrink-0',
            'transition-colors duration-300 ease-in-out',
            dark ? 'group-hover:bg-text-inverse' : 'group-hover:bg-text-primary'
          )}
        >
          <ArrowUpRight
            size={16}
            className={cn(
              'transition-all duration-300 ease-in-out rotate-0',
              dark
                ? 'text-text-inverse group-hover:rotate-45 group-hover:text-text-primary'
                : 'text-text-primary group-hover:rotate-45 group-hover:text-text-inverse'
            )}
          />
        </span>
      </>
    )

    if (as === 'span') {
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className={classes}>
          {content}
        </span>
      )
    }

    if (as === 'a' || href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...externalLinkProps(href)}
        >
          {content}
        </a>
      )
    }

  if (href) {
    const isExternal = href.startsWith('http') && !href.includes('www.pingcap.com')

    return (
      <a
        href={href}
        className={classes}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {content}
      </button>
    )
  }
)

SecondaryButton.displayName = 'SecondaryButton'
