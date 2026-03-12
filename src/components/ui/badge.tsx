import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-red-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Primary: brand red — "New", "Hot", highlighted feature tags
        default: 'border-transparent bg-brand-red-primary text-white hover:bg-brand-red-dark',
        // Secondary: dark carbon — "Beta", "Preview", status tags
        secondary: 'border-transparent bg-carbon-800 text-carbon-100 hover:bg-carbon-700',
        // Outline: subtle — category labels, eyebrow tags (default)
        outline:
          'border-carbon-700 text-carbon-300 bg-transparent hover:border-carbon-500 hover:text-carbon-100',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
