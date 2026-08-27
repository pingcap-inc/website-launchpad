'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface CommandProps {
  /** Plain-text command written to the clipboard */
  cmd: string
  /** Syntax-highlighted command markup */
  children: React.ReactNode
}

/** One command in the hero code panel, with a hover-revealed copy button. */
export function Command({ cmd, children }: CommandProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const copy = () => {
    if (!navigator.clipboard?.writeText) return
    navigator.clipboard.writeText(cmd).then(
      () => {
        setCopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), 1400)
      },
      () => {}
    )
  }

  return (
    <div className="group relative -mx-2 rounded-[5px] py-px pl-2 pr-10 hover:bg-white/[0.06]">
      {children}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : `Copy command: ${cmd}`}
        className={cn(
          'absolute right-2 top-0.5 rounded border bg-black/40 p-0.5',
          'text-carbon-400',
          'cursor-pointer opacity-0 transition-[opacity,background-color,border-color,color,transform] duration-150',
          'active:scale-[0.97] group-hover:opacity-100 focus-visible:opacity-100',
          'hover:border-white/[0.24] hover:bg-white/[0.06] hover:text-carbon-200',
          copied ? 'border-brand-teal-light/50 text-brand-teal-light' : 'border-white/[0.16]'
        )}
      >
        <svg
          aria-hidden="true"
          className="size-3"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={
              copied
                ? 'M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z'
                : 'M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z'
            }
          />
        </svg>
      </button>
    </div>
  )
}
