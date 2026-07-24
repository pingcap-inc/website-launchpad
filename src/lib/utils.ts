import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge({
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
        'text-body-2xl',
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
  return customTwMerge(clsx(inputs))
}

/** A media URL that points to a video file — rendered as <video> rather than <Image>. */
const VIDEO_URL_RE = /\.(mp4|webm|mov|m4v)(\?|#|$)/i

export function isVideoUrl(url?: string): boolean {
  return Boolean(url && VIDEO_URL_RE.test(url))
}
