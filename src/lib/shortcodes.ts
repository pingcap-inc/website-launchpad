const SHORTCODE_TOKEN_REGEX = /[\[\{]{1,2}\s*([a-z0-9][a-z0-9-_ ]*[a-z0-9])\s*[\]\}]{1,2}/i

export type RegisteredShortcode = 'agent-memory-timeline' | 'tidb-persistent-layer-animation'

const SHORTCODE_ALIASES: Record<string, RegisteredShortcode> = {
  'agent-memory-timeline': 'agent-memory-timeline',
  'agent memory timeline': 'agent-memory-timeline',
  'agent-memory-timeline.html': 'agent-memory-timeline',
  'agent memory timeline.html': 'agent-memory-timeline',
  'tidb-persistent-layer-animation': 'tidb-persistent-layer-animation',
  'tidb persistent layer animation': 'tidb-persistent-layer-animation',
  'tidb-persistent-layer-animation-11s': 'tidb-persistent-layer-animation',
  'tidb-persistent-layer-animation.html': 'tidb-persistent-layer-animation',
  'tidb-persistent-layer-animation-11s.html': 'tidb-persistent-layer-animation',
  'tidb persistent layer animation-11s.html': 'tidb-persistent-layer-animation',
  'persistent-layer-animation': 'tidb-persistent-layer-animation',
}

function normalizeShortcodeKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function resolveRegisteredShortcode(value?: string): RegisteredShortcode | null {
  if (!value) return null

  const trimmed = value.trim()
  const tokenMatch = trimmed.match(SHORTCODE_TOKEN_REGEX)
  const raw = tokenMatch?.[1] ?? trimmed
  const normalized = normalizeShortcodeKey(raw)

  return SHORTCODE_ALIASES[normalized] ?? null
}

export function isHtmlShortcode(value?: string) {
  if (!value) return false
  return /<\/?[a-z][\s\S]*>/i.test(value)
}
