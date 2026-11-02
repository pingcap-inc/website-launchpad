/**
 * Small, dependency-free sanitizers for untrusted page content.
 *
 * DSL strings come from staff, LLM output and imported documents, and they end
 * up both in live renders and in the page.tsx committed to production. Anything
 * that reaches an `href`/`src` or raw HTML must pass through here first.
 *
 * Works identically on the server and in the browser (no DOM APIs), so SSR and
 * hydration produce the same markup.
 */

const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:'])

/**
 * Returns the URL if it is safe to place in an href/src, otherwise null.
 * Allowed: http(s), mailto, tel, and relative URLs (`/…`, `#…`, `?…`, `./…`, `page`).
 * Rejects javascript:, data:, vbscript: and any other scheme, including ones
 * obfuscated with control characters or whitespace that browsers strip.
 */
export function safeUrl(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const url = raw.trim()
  if (!url) return null
  // Browsers drop tabs/newlines inside URLs (`java\nscript:`), and other control
  // characters never appear in a legitimate link.
  if (/[\u0000-\u001F\u007F]/.test(url)) return null
  // `/\evil.com` is treated as protocol-relative by browsers.
  if (url.startsWith('/\\')) return null
  const scheme = url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/)
  if (scheme) {
    return SAFE_SCHEMES.has(`${scheme[1].toLowerCase()}:`) ? url : null
  }
  return url
}

/** safeUrl() with a fallback, for props that must stay a string. */
export function safeHref(raw: unknown, fallback = '#'): string {
  return safeUrl(raw) ?? fallback
}

/** Hosts a section background image may be loaded from (besides site-relative paths). */
const BACKGROUND_IMAGE_HOSTS = new Set(['static.pingcap.com', 'www.pingcap.com'])

/**
 * Returns the URL if it may be placed inside a CSS `url("…")`, otherwise null.
 * Only site-relative paths (`/images/…`) and https URLs on our own asset hosts
 * are allowed, and any character that could close the string or the `url()`
 * (quotes, parens, `;`, backslash, whitespace) is rejected outright rather than
 * escaped.
 */
export function safeBackgroundImageUrl(raw: unknown): string | null {
  const url = safeUrl(raw)
  if (!url || /[\s"'()\\;<>]/.test(url)) return null
  if (url.startsWith('/')) return url.startsWith('//') ? null : url
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) return null
  return BACKGROUND_IMAGE_HOSTS.has(parsed.hostname.toLowerCase()) ? url : null
}

const ATTR_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ATTR_ESCAPES[c])
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  colon: ':',
  tab: '\t',
  newline: '\n',
  sol: '/',
  lpar: '(',
  rpar: ')',
}

/**
 * Decodes the entities an attacker would use to hide a scheme. The result is
 * always re-escaped on output, so an entity we leave undecoded can only ever be
 * shown literally — never reinterpreted by the browser.
 */
function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);?/gi, (match, body: string) => {
    if (body[0] === '#') {
      const code =
        body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1))
      if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return ''
      return String.fromCodePoint(code)
    }
    const named = NAMED_ENTITIES[body.toLowerCase()]
    return named ?? match
  })
}

type AllowList = {
  tags: Set<string>
  /** Attributes allowed on every allowed tag. */
  attrs: Set<string>
  /** Allow `style`, reduced to SAFE_STYLE_PROPS declarations (see sanitizeStyle). */
  allowStyle: boolean
  /** Allow arbitrary `data-*` attributes. */
  allowData: boolean
}

const URL_ATTRS = new Set(['href', 'src', 'poster'])
const VOID_TAGS = new Set(['br', 'hr', 'img', 'source', 'wbr'])
/** Tags whose content is dropped along with the tag itself. */
const DROP_CONTENT_TAGS = new Set([
  'script',
  'style',
  'noscript',
  'template',
  'textarea',
  'title',
  'xmp',
  'iframe',
  'object',
  'embed',
  'frameset',
  'noembed',
  'noframes',
  'plaintext',
  'svg',
  'math',
  'select',
])

/** Inline formatting used in hero headlines (`<span class="text-gradient-…">`, `<br>`). */
export const HEADLINE_ALLOWLIST: AllowList = {
  tags: new Set(['span', 'br', 'strong', 'b', 'em', 'i', 'u', 'sup', 'sub', 'small', 'mark']),
  attrs: new Set(['class']),
  allowStyle: false,
  allowData: false,
}

/** Static HTML snippets embedded through a shortcode section. */
export const SNIPPET_ALLOWLIST: AllowList = {
  tags: new Set([
    ...HEADLINE_ALLOWLIST.tags,
    'a',
    'abbr',
    'blockquote',
    'caption',
    'code',
    'dd',
    'del',
    'details',
    'div',
    'dl',
    'dt',
    'figcaption',
    'figure',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'img',
    'ins',
    'kbd',
    'li',
    'ol',
    'p',
    'picture',
    'pre',
    'q',
    's',
    'section',
    'article',
    'aside',
    'header',
    'footer',
    'nav',
    'source',
    'summary',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
    'ul',
    'video',
    'wbr',
  ]),
  attrs: new Set([
    'class',
    'id',
    'href',
    'src',
    'srcset',
    'poster',
    'alt',
    'title',
    'width',
    'height',
    'target',
    'rel',
    'colspan',
    'rowspan',
    'align',
    'loading',
    'decoding',
    'controls',
    'autoplay',
    'muted',
    'loop',
    'playsinline',
    'type',
    'media',
    'sizes',
    'open',
    'role',
    'aria-label',
    'aria-hidden',
    'aria-describedby',
    'aria-labelledby',
  ]),
  allowStyle: true,
  allowData: true,
}

/**
 * Layout/typography properties an HTML snippet may set inline. Anything that can
 * load a resource (background, list-style, border-image, mask, cursor, content,
 * filter, …) is deliberately absent.
 */
const SAFE_STYLE_PROPS = new Set([
  'align-items',
  'background-color',
  'border',
  'border-bottom',
  'border-color',
  'border-left',
  'border-radius',
  'border-right',
  'border-style',
  'border-top',
  'border-width',
  'bottom',
  'color',
  'display',
  'flex',
  'flex-direction',
  'flex-wrap',
  'font-size',
  'font-style',
  'font-weight',
  'gap',
  'height',
  'justify-content',
  'left',
  'line-height',
  'margin',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  'opacity',
  'overflow',
  'padding',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  'position',
  'right',
  'text-align',
  'text-decoration',
  'top',
  'transform',
  'vertical-align',
  'white-space',
  'width',
])

/** CSS functions a value may call; everything else (url, image-set, image, element, expression, …) is rejected. */
const SAFE_STYLE_FUNCS = new Set([
  'calc',
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'translate',
  'translatex',
  'translatey',
  'scale',
  'rotate',
])

/**
 * Reduces an inline style to allowlisted `property: value` declarations.
 * A blocklist (`url(`) is bypassable through image-set(), CSS escapes and the
 * like, so values are restricted to a plain character set plus a small set of
 * known-safe functions. Returns null when nothing survives.
 */
function sanitizeStyle(value: string): string | null {
  // CSS escapes and comments can disguise any token; no legitimate inline style needs them.
  if (/[\\<>]|\/\*/.test(value)) return null
  const out: string[] = []
  for (const decl of value.split(';')) {
    const colon = decl.indexOf(':')
    if (colon === -1) continue
    const prop = decl.slice(0, colon).trim().toLowerCase()
    const val = decl.slice(colon + 1).trim()
    if (!SAFE_STYLE_PROPS.has(prop) || !val) continue
    if (!/^[a-zA-Z0-9#%.,\s+\-*/()!]+$/.test(val)) continue
    const funcs = val.match(/[a-zA-Z-]+(?=\s*\()/g) ?? []
    const parens = (val.match(/\(/g) ?? []).length
    if (funcs.length !== parens || !funcs.every((f) => SAFE_STYLE_FUNCS.has(f.toLowerCase()))) {
      continue
    }
    out.push(`${prop}:${val}`)
  }
  return out.length ? out.join(';') : null
}

function sanitizeAttr(name: string, rawValue: string, allow: AllowList): string | null {
  const value = decodeEntities(rawValue)
  if (name === 'style') return allow.allowStyle ? sanitizeStyle(value) : null
  if (name.startsWith('data-')) return allow.allowData ? value : null
  if (!allow.attrs.has(name)) return null
  if (URL_ATTRS.has(name)) return safeUrl(value)
  if (name === 'srcset') {
    const ok = value
      .split(',')
      .every((part) => !part.trim() || safeUrl(part.trim().split(/\s+/)[0]) !== null)
    return ok ? value : null
  }
  return value
}

const TAG_NAME_RE = /^[a-zA-Z][a-zA-Z0-9-]*/

/**
 * Anti-tabnabbing: any link that can open a new browsing context always gets
 * `rel="noopener noreferrer"`. Author-supplied rel tokens are kept, except
 * `opener`, which would re-enable window.opener.
 */
function forceNoopener(attrs: Array<[string, string | null]>): void {
  const target = attrs.find(([k]) => k === 'target')
  if (!target) return
  const t = (target[1] ?? '').trim().toLowerCase()
  if (t === '' || t === '_self' || t === '_top' || t === '_parent') return
  const relIdx = attrs.findIndex(([k]) => k === 'rel')
  const tokens = (relIdx === -1 ? '' : (attrs[relIdx][1] ?? ''))
    .toLowerCase()
    .split(/\s+/)
    .filter((tok) => tok && tok !== 'opener' && tok !== 'noopener' && tok !== 'noreferrer')
  const rel = ['noopener', 'noreferrer', ...tokens].join(' ')
  if (relIdx === -1) attrs.push(['rel', rel])
  else attrs[relIdx] = ['rel', rel]
}

/**
 * Allowlist HTML sanitizer. Keeps allowed tags and attributes, drops every
 * event handler, unsafe URL and disallowed tag (keeping its text, except for
 * script-like tags whose content is removed), and re-escapes all attribute
 * values and stray `<`/`>` so nothing can be reinterpreted as markup.
 */
export function sanitizeHtml(input: unknown, allow: AllowList = SNIPPET_ALLOWLIST): string {
  if (typeof input !== 'string' || !input) return ''
  const html = input
  let out = ''
  let i = 0
  const n = html.length

  while (i < n) {
    const lt = html.indexOf('<', i)
    if (lt === -1) {
      out += html.slice(i).replace(/>/g, '&gt;')
      break
    }
    out += html.slice(i, lt).replace(/>/g, '&gt;')
    i = lt

    // Comments, doctype, CDATA, processing instructions: drop entirely.
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4)
      i = end === -1 ? n : end + 3
      continue
    }
    if (html[i + 1] === '!' || html[i + 1] === '?') {
      const end = html.indexOf('>', i)
      i = end === -1 ? n : end + 1
      continue
    }

    const closing = html[i + 1] === '/'
    const nameMatch = html.slice(i + (closing ? 2 : 1)).match(TAG_NAME_RE)
    if (!nameMatch) {
      // Not a tag (`a < b`): emit the bracket as text.
      out += '&lt;'
      i += 1
      continue
    }
    const tag = nameMatch[0].toLowerCase()
    let j = i + (closing ? 2 : 1) + nameMatch[0].length

    // Parse attributes up to the closing `>`, honouring quotes.
    const attrs: Array<[name: string, value: string | null]> = []
    while (j < n && html[j] !== '>') {
      const ch = html[j]
      if (/\s/.test(ch) || ch === '/') {
        j += 1
        continue
      }
      const attrMatch = html.slice(j).match(/^[^\s"'>/=]+/)
      if (!attrMatch) {
        j += 1
        continue
      }
      const attrName = attrMatch[0].toLowerCase()
      j += attrMatch[0].length
      while (j < n && /\s/.test(html[j])) j += 1
      let value: string | null = null
      if (html[j] === '=') {
        j += 1
        while (j < n && /\s/.test(html[j])) j += 1
        const quote = html[j]
        if (quote === '"' || quote === "'") {
          const end = html.indexOf(quote, j + 1)
          value = html.slice(j + 1, end === -1 ? n : end)
          j = end === -1 ? n : end + 1
        } else {
          const unquoted = html.slice(j).match(/^[^\s>]*/)
          value = unquoted ? unquoted[0] : ''
          j += value.length
        }
      }
      if (closing) continue
      const safe = sanitizeAttr(attrName, value ?? '', allow)
      if (safe === null) continue
      if (attrs.some(([existing]) => existing === attrName)) continue
      attrs.push([attrName, value === null ? null : safe])
    }
    i = j < n ? j + 1 : n

    if (!closing && DROP_CONTENT_TAGS.has(tag)) {
      const endRe = new RegExp(`</${tag}\\s*>`, 'i')
      const rest = html.slice(i)
      const m = endRe.exec(rest)
      i = m ? i + m.index + m[0].length : n
      continue
    }
    if (!allow.tags.has(tag)) continue

    if (closing) {
      if (!VOID_TAGS.has(tag)) out += `</${tag}>`
      continue
    }
    if (tag === 'a') forceNoopener(attrs)
    const serialized = attrs.map(([k, v]) => (v === null ? k : `${k}="${escapeHtml(v)}"`))
    out += `<${tag}${serialized.length ? ` ${serialized.join(' ')}` : ''}>`
  }

  return out
}

/** Sanitizer for hero headlines that may carry inline highlight markup. */
export function sanitizeHeadlineHtml(input: unknown): string {
  return sanitizeHtml(input, HEADLINE_ALLOWLIST)
}

const DSL_URL_KEYS = new Set(['href', 'url', 'src', 'backgroundImageUrl'])

/**
 * Deep, in-place pass over an untrusted (LLM- or user-authored) DSL tree:
 * drops any unsafe URL string on an href/url/src field and reduces raw-HTML
 * fields (hero `headline`, `shortCode`) to their allowlists. Shared by every
 * AI route that returns DSL so none of them hands back unsanitized output.
 */
export function sanitizeUntrustedDsl(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(sanitizeUntrustedDsl)
    return
  }
  if (!value || typeof value !== 'object') return
  const rec = value as Record<string, unknown>
  for (const [key, v] of Object.entries(rec)) {
    if (typeof v === 'string') {
      if (DSL_URL_KEYS.has(key) && v.trim() && safeUrl(v) === null) {
        console.warn(`[DSL] Unsafe URL on "${key}" removed: ${v.slice(0, 80)}`)
        delete rec[key]
      } else if (key === 'headline' && /<[a-z]/i.test(v)) {
        rec[key] = sanitizeHeadlineHtml(v)
      } else if (key === 'shortCode' && /<[a-z]/i.test(v)) {
        rec[key] = sanitizeHtml(v)
      }
    } else {
      sanitizeUntrustedDsl(v)
    }
  }
}

/** Strips anything tag-like from plain imported text so it can never be read as HTML. */
export function toPlainText(input: string): string {
  return input.replace(/<[^>]*>/g, '').replace(/[<>]/g, '')
}

/**
 * Normalises a DSL canonical to a site-relative path (`/foo/bar/`) or throws.
 * The path is baked into production page.tsx and joined onto
 * https://www.pingcap.com, so it may only contain URL-path-safe characters.
 */
export function safeCanonicalPath(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('meta.canonical must be a string')
  let value = raw.trim()
  const origin = 'https://www.pingcap.com'
  if (value.toLowerCase().startsWith(origin)) value = value.slice(origin.length)
  if (!value.startsWith('/')) value = `/${value}`
  if (
    !/^\/(?:[A-Za-z0-9._~-]+\/)*[A-Za-z0-9._~-]*$/.test(value) ||
    /(^|\/)\.\.?(\/|$)/.test(value)
  ) {
    throw new Error(`Invalid meta.canonical "${raw}": must be a path like /my-page/`)
  }
  return value
}
