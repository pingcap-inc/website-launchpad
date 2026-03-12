import { cn } from '@/lib/utils'
import { externalLinkProps } from '@/lib/links'

interface PrimaryButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function ArrowUpRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7913"
      width="10"
      height="10"
      {...props}
    >
      <path
        d="M765.952 102.4H36.2496V0h904.4992v904.4992h-102.4V174.7968l-765.952 765.952L0 868.352 765.952 102.4z"
        fill="currentColor"
        p-id="7914"
      ></path>
    </svg>
  )
}

export function PrimaryButton({ children, className, onClick, href }: PrimaryButtonProps) {
  const classes = cn(
    'group relative overflow-hidden',
    'rounded-none h-10 bg-bg-inverse px-4',
    'inline-flex items-center gap-4',
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
      <ArrowUpRightIcon
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
