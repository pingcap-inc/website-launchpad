'use client'

import type { ShortcodeProps } from '@/lib/dsl-schema'
import { cn } from '@/lib/utils'
import { ShortcodeRenderer } from '@/components/shortcodes/ShortcodeRenderer'

interface ShortcodeSectionProps extends ShortcodeProps {
  className?: string
}

export function ShortcodeSection({ shortCode, className }: ShortcodeSectionProps) {
  return <ShortcodeRenderer shortCode={shortCode} className={cn('mx-auto w-full', className)} />
}
