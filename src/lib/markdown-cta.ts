export type CtaFenceProps = {
  title: string
  subtitle?: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
}

export type CtaFenceData = {
  props: CtaFenceProps
  backgroundImageUrl?: string
}

export type MarkdownCtaChunk =
  | { kind: 'richText'; content: string }
  | { kind: 'cta'; data: CtaFenceData }

export const CTA_FENCE_REGEX = /^:::cta([^\n]*)\n([\s\S]*?)^:::\s*$/gm

export function parseCtaFenceParams(rawParams: string): { backgroundImageUrl?: string } {
  const out: { backgroundImageUrl?: string } = {}
  const paramRegex = /(\w+)=("([^"]*)"|'([^']*)'|(\S+))/g
  let m: RegExpExecArray | null
  while ((m = paramRegex.exec(rawParams))) {
    const key = m[1].toLowerCase()
    const value = (m[3] ?? m[4] ?? m[5] ?? '').trim()
    if (!value) continue
    if (key === 'bg' || key === 'background' || key === 'backgroundimage') {
      out.backgroundImageUrl = value
    }
  }
  return out
}

export function parseCtaFenceBody(rawParams: string, inner: string): CtaFenceData | null {
  const trimmed = inner.trim()
  if (!trimmed) return null

  const linkRegex = /\[([^\]]+)\]\(([^)\s]+)\)/g
  const links: { text: string; href: string }[] = []
  let m: RegExpExecArray | null
  while ((m = linkRegex.exec(trimmed))) {
    const text = m[1].replace(/^\*+|\*+$/g, '').trim()
    const href = m[2].trim()
    if (text && href) links.push({ text, href })
  }
  if (!links.length) return null

  const textOnly = trimmed.replace(/\[[^\]]+\]\([^)\s]+\)/g, '').trim()
  const paragraphs = textOnly
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  if (!paragraphs.length) return null

  const subtitle =
    paragraphs
      .map((p) => p.replace(/^\*+|\*+$/g, '').trim())
      .join('\n\n')
      .trim() || undefined
  if (!subtitle) return null

  const { backgroundImageUrl } = parseCtaFenceParams(rawParams)

  return {
    props: {
      title: '',
      subtitle,
      primaryCta: links[0],
      ...(links[1] ? { secondaryCta: links[1] } : {}),
    },
    ...(backgroundImageUrl ? { backgroundImageUrl } : {}),
  }
}

export function splitMarkdownByCtaFences(markdown: string): MarkdownCtaChunk[] {
  const trimmed = markdown.trim()
  if (!trimmed) return []
  const matches = Array.from(trimmed.matchAll(CTA_FENCE_REGEX))
  if (!matches.length) return [{ kind: 'richText', content: trimmed }]

  const chunks: MarkdownCtaChunk[] = []
  let cursor = 0
  for (const match of matches) {
    const start = match.index ?? 0
    const before = trimmed.slice(cursor, start).trim()
    if (before) chunks.push({ kind: 'richText', content: before })
    const data = parseCtaFenceBody(match[1] ?? '', match[2] ?? '')
    if (data) chunks.push({ kind: 'cta', data })
    else chunks.push({ kind: 'richText', content: match[0] })
    cursor = start + match[0].length
  }
  const tail = trimmed.slice(cursor).trim()
  if (tail) chunks.push({ kind: 'richText', content: tail })
  return chunks
}
