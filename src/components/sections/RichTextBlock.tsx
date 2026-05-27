'use client'

import { createElement, useEffect, useMemo, useRef, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import { Check, Copy, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  splitMarkdownByCtaFences,
  type MarkdownCtaChunk,
  type CtaFenceData,
} from '@/lib/markdown-cta'
import { renderRichTextChunk } from '@/lib/rich-text-render'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaSection } from '@/components/sections/CtaSection'

if (typeof window !== 'undefined') {
  ;(window as unknown as { Prism: typeof Prism }).Prism = Prism
}

const ICON_PROPS = { width: 16, height: 16, strokeWidth: 1.5, 'aria-hidden': true } as const

const COPY_ICON_SVG = renderToStaticMarkup(createElement(Copy, ICON_PROPS))

const CHECK_ICON_SVG = renderToStaticMarkup(createElement(Check, ICON_PROPS))

const WRAP_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M3 6h18"/><path d="M3 12h15a3 3 0 1 1 0 6h-4"/><polyline points="16 16 14 18 16 20"/><path d="M3 18h7"/></svg>'

export interface RichTextBlockProps {
  content: string
  className?: string
}

type ActiveVideo = { id: string; title: string; nonce: number }

type RenderedChunk = { kind: 'richText'; html: string } | { kind: 'cta'; data: CtaFenceData }

function buildChunks(content: string, isRawSource: boolean): RenderedChunk[] {
  const parsed: MarkdownCtaChunk[] = splitMarkdownByCtaFences(content)
  let firstRichTextSeen = false
  return parsed.map((chunk) => {
    if (chunk.kind === 'cta') return chunk
    // Strip leading display-only H1 only on the very first richText chunk
    // (and only when the caller hasn't asked for raw-source).
    const preserveLeadingHeadings = isRawSource || firstRichTextSeen
    firstRichTextSeen = true
    return { kind: 'richText', html: renderRichTextChunk(chunk.content, preserveLeadingHeadings) }
  })
}

export function RichTextBlock({ content, className }: RichTextBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null)
  const videoOpenNonceRef = useRef(0)
  const chunks = useMemo(() => {
    const isRawSource = className?.includes('rich-text-block--raw-source') ?? false
    return buildChunks(content, isRawSource)
  }, [className, content])

  useEffect(() => {
    if (!containerRef.current) return
    const codeEls = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        'pre.rt-code-block code[class*="language-"]'
      )
    )
    codeEls.forEach((el) => {
      const langClass = Array.from(el.classList).find((c) => c.startsWith('language-'))
      const lang = langClass ? langClass.slice('language-'.length) : ''
      if (lang && Prism.languages[lang]) {
        Prism.highlightElement(el)
      }
    })
    const cleanups: Array<() => void> = []
    const copyButtons = Array.from(
      containerRef.current.querySelectorAll<HTMLButtonElement>('button.rt-copy-btn')
    )
    copyButtons.forEach((btn) => {
      let resetTimer: number | null = null
      const showCopied = () => {
        btn.innerHTML = CHECK_ICON_SVG
        btn.classList.add('rt-copy-btn--copied')
        if (resetTimer !== null) window.clearTimeout(resetTimer)
        resetTimer = window.setTimeout(() => {
          btn.innerHTML = COPY_ICON_SVG
          btn.classList.remove('rt-copy-btn--copied')
          resetTimer = null
        }, 1500)
      }
      const fallbackCopy = (text: string) => {
        try {
          const ta = document.createElement('textarea')
          ta.value = text
          ta.setAttribute('readonly', '')
          ta.style.position = 'fixed'
          ta.style.top = '0'
          ta.style.left = '0'
          ta.style.opacity = '0'
          ta.style.pointerEvents = 'none'
          document.body.appendChild(ta)
          ta.focus()
          ta.select()
          ta.setSelectionRange(0, text.length)
          const ok = document.execCommand('copy')
          document.body.removeChild(ta)
          return ok
        } catch {
          return false
        }
      }
      const handler = async () => {
        const encoded = btn.getAttribute('data-code') ?? ''
        const decoded = decodeURIComponent(encoded)
        let copied = false
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(decoded)
            copied = true
          }
        } catch {
          copied = false
        }
        if (!copied) copied = fallbackCopy(decoded)
        if (copied) showCopied()
      }
      btn.addEventListener('click', handler)
      cleanups.push(() => {
        if (resetTimer !== null) window.clearTimeout(resetTimer)
        btn.removeEventListener('click', handler)
      })
    })
    const wrapButtons = Array.from(
      containerRef.current.querySelectorAll<HTMLButtonElement>('button.rt-wrap-btn')
    )
    wrapButtons.forEach((btn) => {
      const handler = () => {
        const wrap = btn.closest('.rt-code-wrap')
        const pre = wrap?.querySelector<HTMLElement>('pre.rt-code-block')
        if (!pre) return
        const enabled = pre.classList.toggle('rt-code-block--wrap')
        btn.setAttribute('aria-pressed', enabled ? 'true' : 'false')
        btn.classList.toggle('rt-wrap-btn--active', enabled)
      }
      btn.addEventListener('click', handler)
      cleanups.push(() => btn.removeEventListener('click', handler))
    })
    const youtubeHandler = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const button = target.closest<HTMLButtonElement>('button.rt-youtube')
      if (!button || !containerRef.current?.contains(button)) return
      event.preventDefault()
      const id = button.getAttribute('data-video-id') ?? ''
      const title = button.getAttribute('data-title') ?? ''
      if (!id) return
      videoOpenNonceRef.current += 1
      setActiveVideo({ id, title, nonce: videoOpenNonceRef.current })
    }
    containerRef.current.addEventListener('click', youtubeHandler)
    cleanups.push(() => containerRef.current?.removeEventListener('click', youtubeHandler))
    return () => {
      cleanups.forEach((off) => off())
    }
  }, [chunks])

  return (
    <>
      <div ref={containerRef} className={cn('rich-text-block', className)}>
        {chunks.map((chunk, idx) =>
          chunk.kind === 'cta' ? (
            <SectionWrapper
              key={idx}
              style={{
                background: 'brand-violet',
                spacing: 'sm',
                ...(chunk.data.backgroundImageUrl
                  ? { backgroundImage: { image: { url: chunk.data.backgroundImageUrl } } }
                  : {}),
              }}
            >
              <CtaSection {...chunk.data.props} />
            </SectionWrapper>
          ) : (
            <div key={idx} dangerouslySetInnerHTML={{ __html: chunk.html }} />
          )
        )}
      </div>
      {activeVideo && (
        <YouTubeLightbox
          key={activeVideo.nonce}
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  )
}

function YouTubeLightbox({ video, onClose }: { video: ActiveVideo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title || 'YouTube video'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-in fade-in-0 duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-black"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-6 w-6" />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>
  )
}
