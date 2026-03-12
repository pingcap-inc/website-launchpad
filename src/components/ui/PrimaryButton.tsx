import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { externalLinkProps } from '@/lib/links'

interface PrimaryButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function PrimaryButton({ children, className, onClick, href }: PrimaryButtonProps) {
  const classes = cn(
    'group relative overflow-hidden',
    'rounded-none h-10 bg-bg-inverse px-4',
    'inline-flex items-center gap-2',
    'border-none outline-none cursor-pointer whitespace-nowrap',
    className
  )

  const content = (
    <>
      {/* Red Flood circle */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full
                   w-[30%] aspect-square rounded-full bg-brand-red-primary z-0
                   transition-transform duration-500 ease-in-out
                   group-hover:translate-y-[10%] group-hover:scale-[6]"
      />
      {/* Text */}
      <span
        className="relative z-10 text-base font-medium leading-none
                       text-text-primary transition-colors duration-500 ease-in-out
                       group-hover:text-text-inverse"
      >
        {children}
      </span>
      {/* Icon */}
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        className="relative z-10 shrink-0 text-text-primary
                   transition-colors duration-500 ease-in-out
                   group-hover:text-text-inverse"
      />
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...externalLinkProps(href)}>
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
