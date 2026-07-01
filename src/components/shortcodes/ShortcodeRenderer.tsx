'use client'

import { useMemo, useState } from 'react'
import { AgentMemoryTimeline } from './AgentMemoryTimeline'
import { isHtmlShortcode, resolveRegisteredShortcode } from '@/lib/shortcodes'

interface ShortcodeRendererProps {
  shortCode?: string
  className?: string
}

function ShortcodeFallback({ shortCode }: { shortCode?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!shortCode) return
    await navigator.clipboard.writeText(shortCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-slate-950 text-slate-100 shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-200">Unknown shortcode</p>
          <p className="truncate text-[11px] text-slate-400">
            Register it in <code>src/lib/shortcodes.ts</code> to render a live component.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-white/10 px-2 py-1 text-[11px] font-medium text-slate-200 transition hover:bg-white/10"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 whitespace-pre-wrap break-words">
        <code>{shortCode || '请输入短码内容'}</code>
      </pre>
    </div>
  )
}

export function ShortcodeRenderer({ shortCode, className }: ShortcodeRendererProps) {
  const resolvedShortcode = useMemo(() => resolveRegisteredShortcode(shortCode), [shortCode])

  if (resolvedShortcode === 'agent-memory-timeline') {
    return (
      <div className={className}>
        <div className="mx-auto w-full max-w-[560px]">
          <AgentMemoryTimeline />
        </div>
      </div>
    )
  }

  if (isHtmlShortcode(shortCode)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: shortCode ?? '' }} />
  }

  return (
    <div className={className}>
      <ShortcodeFallback shortCode={shortCode} />
    </div>
  )
}
