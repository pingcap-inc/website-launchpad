import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SecondaryButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  dark?: boolean
}

export function SecondaryButton({ children, className, onClick, href, dark = true }: SecondaryButtonProps) {
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
      <span className={cn(
        'relative flex items-center justify-center',
        'w-6 h-6 rounded-full aspect-square shrink-0',
        'transition-colors duration-300 ease-in-out',
        dark
          ? 'group-hover:bg-text-inverse'
          : 'group-hover:bg-text-primary'
      )}>
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

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
