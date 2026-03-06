// import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SecondaryButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  dark?: boolean
}

export function ArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1018_6281)">
        <mask id="path-1-inside-1_1018_6281" fill="currentColor">
          <path d="M18.3197 5.77543L18.3197 15.7666L17.4031 15.7666L17.403 7.34033L6.19416 18.5492L5.54598 17.901L16.7549 6.69209L8.32854 6.69207L8.32853 5.77541L18.3197 5.77543Z" />
        </mask>
        <path
          d="M18.3197 5.77543L18.3197 15.7666L17.4031 15.7666L17.403 7.34033L6.19416 18.5492L5.54598 17.901L16.7549 6.69209L8.32854 6.69207L8.32853 5.77541L18.3197 5.77543Z"
          fill="currentColor"
        />
        <path
          d="M18.3197 5.77543L20.3197 5.77543V3.77543L18.3198 3.77543L18.3197 5.77543ZM18.3197 15.7666L18.3197 17.7666L20.3197 17.7666L20.3197 15.7666L18.3197 15.7666ZM17.4031 15.7666L15.4031 15.7666L15.4031 17.7666L17.4031 17.7666V15.7666ZM17.403 7.34033L19.403 7.34032L19.403 2.51194L15.9888 5.92612L17.403 7.34033ZM6.19416 18.5492L4.77994 19.9634L6.19416 21.3776L7.60837 19.9634L6.19416 18.5492ZM5.54598 17.901L4.13176 16.4868L2.71755 17.901L4.13176 19.3152L5.54598 17.901ZM16.7549 6.69209L18.1691 8.1063L21.5833 4.69209L16.7549 4.69209L16.7549 6.69209ZM8.32854 6.69207L6.32854 6.69209L6.32856 8.69207L8.32854 8.69207L8.32854 6.69207ZM8.32853 5.77541L8.32854 3.77541L6.32852 3.7754L6.32853 5.77542L8.32853 5.77541ZM16.3197 5.77543V15.7666H20.3197L20.3197 5.77543L16.3197 5.77543ZM18.3197 13.7666L17.4031 13.7666V17.7666H18.3197L18.3197 13.7666ZM19.4031 15.7666L19.403 7.34032L15.403 7.34035L15.4031 15.7666L19.4031 15.7666ZM15.9888 5.92612L4.77994 17.135L7.60837 19.9634L18.8172 8.75454L15.9888 5.92612ZM7.60837 17.135L6.96019 16.4868L4.13176 19.3152L4.77994 19.9634L7.60837 17.135ZM6.96019 19.3152L18.1691 8.1063L15.3407 5.27787L4.13176 16.4868L6.96019 19.3152ZM16.7549 4.69209L8.32854 4.69207L8.32854 8.69207L16.7549 8.69209L16.7549 4.69209ZM10.3285 6.69206L10.3285 5.77539L6.32853 5.77542L6.32854 6.69209L10.3285 6.69206ZM8.32853 7.77541L18.3197 7.77543L18.3198 3.77543L8.32854 3.77541L8.32853 7.77541Z"
          fill="currentColor"
          mask="url(#path-1-inside-1_1018_6281)"
        />
      </g>
      <defs>
        <clipPath id="clip0_1018_6281">
          <rect width="22" height="22" fill="currentColor" transform="translate(1 1)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function SecondaryButton({
  children,
  className,
  onClick,
  href,
  dark = true,
}: SecondaryButtonProps) {
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
    const isExternal = href.startsWith('http') && !href.includes('www.pingcap.com')

    return (
      <a
        href={href}
        className={classes}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      >
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
