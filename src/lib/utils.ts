import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Extend tailwind-merge with custom fontSize classes from tailwind.config.ts,
 * so they are correctly treated as font-size utilities (not merged with text-color).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-eyebrow',
        'text-h1',
        'text-h1-mb',
        'text-h2-lg',
        'text-h2-md',
        'text-h2-sm',
        'text-h2-mb',
        'text-h3-xl',
        'text-h3-lg',
        'text-h3-sm',
        'text-body-xl',
        'text-body-lg',
        'text-body-md',
        'text-body-sm',
        'text-label',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
