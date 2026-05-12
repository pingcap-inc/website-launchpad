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

const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function sanitizeUrl(raw: string) {
  const trimmed = raw.trim()
  if (!trimmed) return null
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed
  try {
    const parsed = new URL(trimmed)
    const protocol = parsed.protocol.toLowerCase()
    if (protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:') {
      return parsed.toString()
    }
  } catch {
    return null
  }
  return null
}

function parseDirectiveAttributes(raw?: string) {
  if (!raw) return {}
  const attrs: Record<string, string> = {}
  const re = /([a-zA-Z][\w-]*)=(?:"([^"]*)"|(\S+))/g
  let match: RegExpExecArray | null
  while ((match = re.exec(raw)) !== null) {
    attrs[match[1]] = (match[2] ?? match[3] ?? '').trim()
  }
  return attrs
}

function extractDirectiveBlock(lines: string[], startIndex: number, name: string) {
  const directiveRe = new RegExp(`^:::${name}(?:\\s+.*)?$`)
  const anyDirectiveRe = /^:::[a-z0-9-]+(?:\s+.*)?$/i
  let depth = 1
  const body: string[] = []

  for (let i = startIndex + 1; i < lines.length; i += 1) {
    const trimmed = lines[i].trim()
    if (directiveRe.test(trimmed) || anyDirectiveRe.test(trimmed)) {
      depth += 1
      body.push(lines[i])
      continue
    }
    if (trimmed === ':::') {
      depth -= 1
      if (depth === 0) {
        return { body: body.join('\n'), endIndex: i }
      }
    }
    if (depth > 0) body.push(lines[i])
  }

  return null
}

function renderCard(content: string, attrs?: Record<string, string>) {
  const lines = content.split('\n')
  const bodyLines = [...lines]
  const tone = attrs?.tone === 'light' ? 'light' : 'brand'

  while (bodyLines.length > 0 && bodyLines[0].trim() === '') bodyLines.shift()
  while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1]?.trim() === '') bodyLines.pop()

  let title = ''
  const firstLine = bodyLines[0]?.trim()
  const headingMatch = firstLine?.match(/^#{2,4}\s+(.+)$/)
  if (headingMatch) {
    title = headingMatch[1].trim()
    bodyLines.shift()
    while (bodyLines.length > 0 && bodyLines[0].trim() === '') bodyLines.shift()
  }

  let ctaHtml = ''
  const lastLine = bodyLines[bodyLines.length - 1]?.trim()
  const ctaMatch = lastLine?.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
  if (ctaMatch) {
    const safeHref = sanitizeUrl(ctaMatch[2])
    if (safeHref) {
      const label = escapeHtml(ctaMatch[1].replace(/\*\*/g, '').trim())
      const buttonClasses = [
        'group relative overflow-hidden',
        'rounded-none h-10 bg-bg-inverse px-4',
        'inline-flex items-center gap-4',
        'border-none outline-none cursor-pointer whitespace-nowrap',
      ].join(' ')
      ctaHtml =
        `<div class="rt-card-cta">` +
        `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="${buttonClasses}">` +
        `<span aria-hidden="true" class="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full w-[30%] aspect-square rounded-full bg-brand-red-primary z-0 transition-transform duration-500 ease-in-out group-hover:translate-y-[10%] group-hover:scale-[6]"></span>` +
        `<span class="relative z-10 text-base font-medium leading-none text-text-primary transition-colors duration-500 ease-in-out group-hover:text-text-inverse">${label}</span>` +
        `<svg viewBox="0 0 1024 1024" width="10" height="10" aria-hidden="true" focusable="false" class="relative z-10 shrink-0 text-text-primary transition-colors duration-500 ease-in-out group-hover:text-text-inverse"><path d="M765.952 102.4H36.2496V0h904.4992v904.4992h-102.4V174.7968l-765.952 765.952L0 868.352 765.952 102.4z" fill="currentColor"></path></svg>` +
        `</a>` +
        `</div>`
    }
    bodyLines.pop()
    while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1]?.trim() === '') bodyLines.pop()
  }

  const titleHtml = title ? `<h3 class="rt-card-title">${escapeHtml(title)}</h3>` : ''
  const bodyHtml = markdownToHtml(bodyLines.join('\n'), { preserveLeadingHeadings: true })

  return (
    `<article class="rt-card" data-tone="${tone}">` +
    titleHtml +
    `<div class="rt-card-body">${bodyHtml}</div>` +
    ctaHtml +
    `</article>`
  )
}

function renderCardGrid(content: string, attrs?: Record<string, string>) {
  const lines = content.split('\n')
  const cards: string[] = []
  const introLines: string[] = []

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim()
    const cardMatch = trimmed.match(/^:::card(?:\s+(.*))?$/)
    if (cardMatch) {
      const block = extractDirectiveBlock(lines, i, 'card')
      if (!block) {
        introLines.push(lines[i])
        continue
      }
      cards.push(renderCard(block.body, { ...attrs, ...parseDirectiveAttributes(cardMatch[1]) }))
      i = block.endIndex
      continue
    }
    introLines.push(lines[i])
  }

  const columns = attrs?.columns === '1' ? '1' : attrs?.columns === '3' ? '3' : '2'
  const intro = introLines.join('\n').trim()
  const introHtml = intro
    ? `<div class="rt-card-grid-intro">${markdownToHtml(intro, { preserveLeadingHeadings: true })}</div>`
    : ''

  return (
    `<section class="rt-card-grid" data-columns="${columns}">` +
    introHtml +
    `<div class="rt-card-grid-items">${cards.join('')}</div>` +
    `</section>`
  )
}

function renderSection(content: string, attrs?: Record<string, string>) {
  const allowedBg = new Set(['light', 'dark', 'brand'])
  const bg = attrs?.bg && allowedBg.has(attrs.bg) ? attrs.bg : 'light'
  const bodyHtml = markdownToHtml(content.trim(), { preserveLeadingHeadings: true })
  return `<section class="rt-section" data-bg="${bg}">${bodyHtml}</section>`
}

function renderColumns(content: string, attrs?: Record<string, string>) {
  const lines = content.split('\n')
  const items: string[] = []

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim()
    const columnMatch = trimmed.match(/^:::column(?:\s+(.*))?$/)
    if (!columnMatch) continue

    const block = extractDirectiveBlock(lines, i, 'column')
    if (!block) continue

    items.push(
      `<div class="rt-columns-item">${markdownToHtml(block.body.trim(), { preserveLeadingHeadings: true })}</div>`
    )
    i = block.endIndex
  }

  if (!items.length) {
    items.push(
      `<div class="rt-columns-item">${markdownToHtml(content.trim(), { preserveLeadingHeadings: true })}</div>`
    )
  }

  const columns = attrs?.columns === '1' ? '1' : attrs?.columns === '3' ? '3' : '2'
  return `<section class="rt-columns" data-columns="${columns}">${items.join('')}</section>`
}

function extractYouTubeId(rawUrl: string): string | null {
  let parsed: URL
  try {
    parsed = new URL(rawUrl.trim())
  } catch {
    return null
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null
  const host = parsed.hostname.replace(/^www\./, '').replace(/^m\./, '')
  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1).split('/')[0] ?? ''
    return YOUTUBE_ID_RE.test(id) ? id : null
  }
  if (host === 'youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v') ?? ''
      return YOUTUBE_ID_RE.test(id) ? id : null
    }
    const match = parsed.pathname.match(/^\/(?:embed|shorts|v|live)\/([^/?#]+)/)
    if (match && YOUTUBE_ID_RE.test(match[1])) return match[1]
  }
  return null
}

/**
 * Return the index of the next italic caption line after `from`, allowing one
 * blank line in between (the typical Google Docs export shape). Returns -1 if
 * no caption is found.
 */
function lookaheadCaptionIndex(lines: string[], from: number): number {
  const captionRe = /^\*(?!\*)(.+?)\*$|^_(?!_)(.+?)_$/
  for (let j = from + 1, blanks = 0; j < lines.length; j += 1) {
    const trimmed = lines[j].trim()
    if (trimmed === '') {
      if (++blanks > 1) return -1
      continue
    }
    return captionRe.test(trimmed) ? j : -1
  }
  return -1
}

function stripDisplayOnlyLeadingHeadings(md: string): string {
  return md.replace(/^\s*#\s+.+\n+/i, '').replace(/^\s*#{2,4}\s+Introduction\s*\n+/i, '')
}

/** Heuristic detection when a fenced code block has no language tag. */
function detectCodeLanguage(code: string): string {
  const sample = code.trim()
  if (!sample) return ''
  if (/^[\[{]/.test(sample) && /[":,\]}]/.test(sample)) {
    try {
      JSON.parse(sample)
      return 'json'
    } catch {
      // fall through
    }
  }
  if (
    /\b(SELECT|FROM|WHERE|INSERT INTO|UPDATE|DELETE FROM|CREATE TABLE|ALTER TABLE|JOIN|GROUP BY|ORDER BY|LIMIT)\b/i.test(
      sample
    )
  ) {
    return 'sql'
  }
  if (
    /^(\$\s|sudo\s|npm\s|pnpm\s|yarn\s|git\s|docker\s|kubectl\s|curl\s|brew\s|apt\s|cd\s|ls\s|mkdir\s|export\s)/m.test(
      sample
    )
  ) {
    return 'bash'
  }
  if (
    /^(import\s|export\s|const\s|let\s|var\s|function\s|class\s|interface\s|type\s)/m.test(
      sample
    ) ||
    /=>/.test(sample)
  ) {
    return /\b(interface|type\s+\w+\s*=|:\s*(string|number|boolean|any|unknown|void|never)\b)/.test(
      sample
    )
      ? 'typescript'
      : 'javascript'
  }
  if (/^---\s*$/m.test(sample) || /^[\w-]+:\s+\S/m.test(sample)) {
    return 'yaml'
  }
  return ''
}

/** Convert basic Markdown to HTML. Supports h1-h4, p, bold, italic, links, images, ul, ol, blockquote, code, hr, table. */
function markdownToHtml(md: string, options?: { preserveLeadingHeadings?: boolean }): string {
  const renderImage = (
    alt: string,
    url: string,
    title?: string,
    mode: 'inline' | 'block' = 'inline',
    captionHtml?: string
  ) => {
    const safeUrl = sanitizeUrl(url)
    if (!safeUrl) return null
    const safeAlt = escapeHtml(alt)
    const safeTitle = title ? escapeHtml(title) : ''
    const titleAttr = safeTitle ? ` title="${safeTitle}"` : ''
    const img = `<img src="${safeUrl}" alt="${safeAlt}"${titleAttr} loading="lazy" class="${mode === 'block' ? 'rt-image' : 'rt-inline-image'}" />`

    if (mode === 'block') {
      const captionEl = captionHtml ? `<figcaption>${captionHtml}</figcaption>` : ''
      return `<figure class="rt-image-wrap">${img}${captionEl}</figure>`
    }

    return img
  }

  const parseImageSyntax = (value: string) =>
    value.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/)

  const renderYouTube = (id: string, title: string, captionHtml?: string) => {
    const safeId = escapeHtml(id)
    const safeTitle = title ? escapeHtml(title) : ''
    const altAttr = safeTitle || 'YouTube video thumbnail'
    const ariaLabel = title ? `Play video: ${safeTitle}` : 'Play YouTube video'
    const playSvg =
      '<svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true" focusable="false">' +
      '<path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,0.13,34,0,34,0S12.21,0.13,6.9,1.55C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74Z" fill="#f00"/>' +
      '<path d="M27,14 L27,34 L45,24 Z" fill="#fff"/>' +
      '</svg>'
    return (
      `<figure class="rt-youtube-wrap">` +
      `<button type="button" class="rt-youtube" data-video-id="${safeId}" data-title="${safeTitle}" aria-label="${ariaLabel}">` +
      `<img src="https://i.ytimg.com/vi/${safeId}/hqdefault.jpg" alt="${altAttr}" loading="lazy" />` +
      `<span class="rt-youtube-play" aria-hidden="true">${playSvg}</span>` +
      `</button>` +
      `</figure>`
    )
  }

  const normalizedMarkdown = options?.preserveLeadingHeadings
    ? md
    : stripDisplayOnlyLeadingHeadings(md)
  const lines = normalizedMarkdown.split('\n')
  const html: string[] = []
  let inUl = false
  let inOl = false
  let inBlockquote = false
  let inTable = false
  let tableHeaderDone = false
  let tableStartHtmlIndex = -1
  let inCodeBlock = false
  let codeLang = ''
  let codeLines: string[] = []

  const closeList = () => {
    if (inUl) {
      html.push('</ul>')
      inUl = false
    }
    if (inOl) {
      html.push('</ol>')
      inOl = false
    }
  }
  const closeBlockquote = () => {
    if (inBlockquote) {
      html.push('</blockquote>')
      inBlockquote = false
    }
  }
  const closeTable = (captionHtml?: string) => {
    if (!inTable) return
    if (captionHtml && tableStartHtmlIndex !== -1) {
      html.splice(tableStartHtmlIndex, 0, '<figure class="rt-table-figure">')
      html.push('</tbody></table>')
      html.push(`<figcaption>${captionHtml}</figcaption>`)
      html.push('</figure>')
    } else {
      html.push('</tbody></table>')
    }
    inTable = false
    tableHeaderDone = false
    tableStartHtmlIndex = -1
  }

  const flushCodeBlock = () => {
    if (!inCodeBlock) return
    const code = codeLines.join('\n')
    const escaped = escapeHtml(code)
    const lang = codeLang || detectCodeLanguage(code)
    const langClass = `language-${lang || 'text'}`
    const encoded = encodeURIComponent(code)
    html.push(
      `<div class="rt-code-wrap" data-lang="${escapeHtml(lang)}">` +
        `<div class="rt-code-toolbar">` +
        `<button type="button" class="rt-copy-btn" data-code="${encoded}" aria-label="Copy code">${COPY_ICON_SVG}</button>` +
        `</div>` +
        `<pre class="rt-code-block"><code class="${langClass}">${escaped}</code></pre>` +
        `</div>`
    )
    inCodeBlock = false
    codeLang = ''
    codeLines = []
  }

  const inlineFormat = (text: string): string => {
    let result = escapeHtml(text)
    // Images: ![alt](url "title")
    result = result.replace(
      /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g,
      (_match, alt, url, title) => {
        return (
          renderImage(String(alt), String(url), typeof title === 'string' ? title : undefined) ??
          alt
        )
      }
    )
    // Links: [text](url)
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
      const safe = sanitizeUrl(String(url))
      if (!safe) return label
      return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${label}</a>`
    })
    // Bold + italic
    result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Bold
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    result = result.replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>')
    return result
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    const cardGridMatch = trimmed.match(/^:::card-grid(?:\s+(.*))?$/)
    if (cardGridMatch) {
      closeList()
      closeBlockquote()
      closeTable()
      const block = extractDirectiveBlock(lines, i, 'card-grid')
      if (!block) {
        html.push(`<p>${inlineFormat(line)}</p>`)
      } else {
        html.push(renderCardGrid(block.body, parseDirectiveAttributes(cardGridMatch[1])))
        i = block.endIndex
      }
      continue
    }

    const columnsMatch = trimmed.match(/^:::columns(?:\s+(.*))?$/)
    if (columnsMatch) {
      closeList()
      closeBlockquote()
      closeTable()
      const block = extractDirectiveBlock(lines, i, 'columns')
      if (!block) {
        html.push(`<p>${inlineFormat(line)}</p>`)
      } else {
        html.push(renderColumns(block.body, parseDirectiveAttributes(columnsMatch[1])))
        i = block.endIndex
      }
      continue
    }

    const sectionMatch = trimmed.match(/^:::section(?:\s+(.*))?$/)
    if (sectionMatch) {
      closeList()
      closeBlockquote()
      closeTable()
      const block = extractDirectiveBlock(lines, i, 'section')
      if (!block) {
        html.push(`<p>${inlineFormat(line)}</p>`)
      } else {
        html.push(renderSection(block.body, parseDirectiveAttributes(sectionMatch[1])))
        i = block.endIndex
      }
      continue
    }

    const cardMatch = trimmed.match(/^:::card(?:\s+(.*))?$/)
    if (cardMatch) {
      closeList()
      closeBlockquote()
      closeTable()
      const block = extractDirectiveBlock(lines, i, 'card')
      if (!block) {
        html.push(`<p>${inlineFormat(line)}</p>`)
      } else {
        html.push(renderCard(block.body, parseDirectiveAttributes(cardMatch[1])))
        i = block.endIndex
      }
      continue
    }

    // Fenced code block
    const fenceMatch = line.match(/^(?:```|~~~)([a-z0-9_+-]+)?\s*$/i)
    if (fenceMatch) {
      if (inCodeBlock) {
        flushCodeBlock()
      } else {
        closeList()
        closeBlockquote()
        closeTable()
        inCodeBlock = true
        codeLang = fenceMatch[1]?.toLowerCase() ?? ''
        codeLines = []
      }
      continue
    }
    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // Table row (pipe-delimited)
    if (/^\|(.+)\|$/.test(line.trim())) {
      closeList()
      closeBlockquote()
      const cells = line
        .trim()
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim())
      // Separator row (e.g. |---|---|)
      if (cells.every((c) => /^[-:]+$/.test(c))) {
        tableHeaderDone = true
        continue
      }
      if (!inTable) {
        tableStartHtmlIndex = html.length
        html.push('<table>')
        html.push(
          '<thead><tr>' + cells.map((c) => `<th>${inlineFormat(c)}</th>`).join('') + '</tr></thead>'
        )
        html.push('<tbody>')
        inTable = true
        continue
      }
      html.push('<tr>' + cells.map((c) => `<td>${inlineFormat(c)}</td>`).join('') + '</tr>')
      continue
    } else {
      if (inTable) {
        // Allow a trailing italic line (with optional blank between) to become
        // the table's <figcaption>, mirroring image figure handling.
        const captionLineIndex = lookaheadCaptionIndex(lines, i - 1)
        if (captionLineIndex !== -1) {
          const captionText = lines[captionLineIndex].trim()
          const captionMatch =
            captionText.match(/^\*(?!\*)(.+?)\*$/) ?? captionText.match(/^_(?!_)(.+?)_$/)
          if (captionMatch) {
            closeTable(inlineFormat(captionMatch[1]))
            i = captionLineIndex
            continue
          }
        }
      }
      closeTable()
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      closeList()
      closeBlockquote()
      const level = headingMatch[1].length
      const id = headingMatch[2]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      html.push(`<h${level} id="${id}">${inlineFormat(headingMatch[2])}</h${level}>`)
      continue
    }

    // Horizontal rule
    if (/^<hr\s*\/?>$/i.test(line.trim())) {
      closeList()
      closeBlockquote()
      html.push('<hr />')
      continue
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      closeList()
      closeBlockquote()
      html.push('<hr />')
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      closeList()
      if (!inBlockquote) {
        html.push('<blockquote>')
        inBlockquote = true
      }
      html.push(`<p>${inlineFormat(line.slice(2))}</p>`)
      continue
    } else {
      closeBlockquote()
    }

    // Standalone image
    const imageMatch = parseImageSyntax(line.trim())
    if (imageMatch) {
      closeList()
      closeBlockquote()
      // Peek ahead for an italic caption line (*...*  or _..._), tolerating
      // a single blank line between the image and the caption.
      let captionHtml: string | undefined
      const captionLineIndex = lookaheadCaptionIndex(lines, i)
      if (captionLineIndex !== -1) {
        const captionMatch =
          lines[captionLineIndex].trim().match(/^\*(?!\*)(.+?)\*$/) ??
          lines[captionLineIndex].trim().match(/^_(?!_)(.+?)_$/)
        if (captionMatch) {
          captionHtml = inlineFormat(captionMatch[1])
          i = captionLineIndex
        }
      }
      html.push(
        renderImage(
          imageMatch[1] ?? '',
          imageMatch[2] ?? '',
          imageMatch[3] ?? undefined,
          'block',
          captionHtml
        ) ?? `<p>${inlineFormat(line)}</p>`
      )
      continue
    }

    // Standalone YouTube video — `[Title](url)` or bare URL on its own line
    {
      const trimmed = line.trim()
      let videoId: string | null = null
      let videoTitle = ''
      const linkOnly = trimmed.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
      if (linkOnly) {
        const id = extractYouTubeId(linkOnly[2])
        if (id) {
          videoId = id
          videoTitle = linkOnly[1]
        }
      } else if (/^https?:\/\//i.test(trimmed) && !/\s/.test(trimmed)) {
        const id = extractYouTubeId(trimmed)
        if (id) videoId = id
      }
      if (videoId) {
        closeList()
        closeBlockquote()
        let captionHtml: string | undefined
        const captionLineIndex = lookaheadCaptionIndex(lines, i)
        if (captionLineIndex !== -1) {
          const captionMatch =
            lines[captionLineIndex].trim().match(/^\*(?!\*)(.+?)\*$/) ??
            lines[captionLineIndex].trim().match(/^_(?!_)(.+?)_$/)
          if (captionMatch) {
            captionHtml = inlineFormat(captionMatch[1])
            i = captionLineIndex
          }
        }
        html.push(renderYouTube(videoId, videoTitle, captionHtml))
        continue
      }
    }

    // Unordered list
    if (/^[-*·]\s+/.test(line)) {
      closeBlockquote()
      if (inOl) {
        html.push('</ol>')
        inOl = false
      }
      if (!inUl) {
        html.push('<ul>')
        inUl = true
      }
      html.push(`<li>${inlineFormat(line.replace(/^[-*·]\s+/, ''))}</li>`)
      continue
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(line)) {
      closeBlockquote()
      if (inUl) {
        html.push('</ul>')
        inUl = false
      }
      if (!inOl) {
        html.push('<ol>')
        inOl = true
      }
      html.push(`<li>${inlineFormat(line.replace(/^\d+[.)]\s+/, ''))}</li>`)
      continue
    }

    // Non-list line → close lists
    closeList()

    // Empty line
    if (line.trim() === '') continue

    // Paragraph
    html.push(`<p>${inlineFormat(line)}</p>`)
  }

  flushCodeBlock()
  closeList()
  closeBlockquote()
  closeTable()

  return html.join('\n')
}

type RenderedChunk = { kind: 'richText'; html: string } | { kind: 'cta'; data: CtaFenceData }

function renderRichTextChunk(content: string, preserveLeadingHeadings: boolean): string {
  const raw = markdownToHtml(content, { preserveLeadingHeadings })
  return raw.replace(
    /<table>[\s\S]*?<\/table>/g,
    (match) => `<div class="rt-table-wrap rt-table-wrap--scroll">${match}</div>`
  )
}

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
