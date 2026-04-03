'use client'

import { useEffect, useMemo, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import { cn } from '@/lib/utils'

export interface RichTextBlockProps {
  content: string
  className?: string
}

/** Convert basic Markdown to HTML. Supports h2-h4, p, bold, italic, links, ul, ol, blockquote, code, hr, table. */
function markdownToHtml(md: string): string {
  // Escape HTML entities first (except for our markdown conversions)
  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const lines = md.split('\n')
  const html: string[] = []
  let inUl = false
  let inOl = false
  let inBlockquote = false
  let inTable = false
  let tableHeaderDone = false
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
  const closeTable = () => {
    if (inTable) {
      html.push('</tbody></table>')
      inTable = false
      tableHeaderDone = false
    }
  }

  const flushCodeBlock = () => {
    if (!inCodeBlock) return
    const code = codeLines.join('\n')
    const escaped = escapeHtml(code)
    const langClass = `language-${codeLang || 'text'}`
    const encoded = encodeURIComponent(code)
    html.push(
      `<div class="rt-code-wrap" data-lang="${escapeHtml(codeLang)}">` +
        `<div class="rt-code-toolbar">` +
        `<span class="rt-code-label">${escapeHtml(codeLang || 'code')}</span>` +
        `<button type="button" class="rt-copy-btn" data-code="${encoded}">Copy</button>` +
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
    const sanitizeUrl = (raw: string) => {
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
      closeTable()
    }

    // Headings
    const headingMatch = line.match(/^(#{2,4})\s+(.+)$/)
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

export function RichTextBlock({ content, className }: RichTextBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const html = useMemo(() => {
    const raw = markdownToHtml(content)
    return raw.replace(
      /<table>[\s\S]*?<\/table>/g,
      (match) => `<div class="rt-table-wrap rt-table-wrap--scroll">${match}</div>`
    )
  }, [content])

  useEffect(() => {
    if (!containerRef.current) return
    Prism.highlightAllUnder(containerRef.current)
    const buttons = Array.from(
      containerRef.current.querySelectorAll<HTMLButtonElement>('button.rt-copy-btn')
    )
    const handlers = buttons.map((btn) => {
      const handler = async () => {
        const encoded = btn.getAttribute('data-code') ?? ''
        const decoded = decodeURIComponent(encoded)
        try {
          await navigator.clipboard.writeText(decoded)
          btn.textContent = 'Copied'
          setTimeout(() => {
            btn.textContent = 'Copy'
          }, 1500)
        } catch {
          btn.textContent = 'Failed'
          setTimeout(() => {
            btn.textContent = 'Copy'
          }, 1500)
        }
      }
      btn.addEventListener('click', handler)
      return () => btn.removeEventListener('click', handler)
    })
    return () => {
      handlers.forEach((off) => off())
    }
  }, [html])

  return (
    <div
      ref={containerRef}
      className={cn('rich-text-block', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
