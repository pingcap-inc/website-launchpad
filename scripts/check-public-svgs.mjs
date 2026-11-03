#!/usr/bin/env node
// Fails (exit 1) if any SVG under public/ carries active content, or if public/
// contains a symlink. The Deploy CDN workflow syncs public/ to static.pingcap.com,
// so an SVG committed here bypasses the checks the admin upload route applies
// (src/app/api/admin/upload-image) — this script gates it before the sync.
//
// Checks, in order (dependency-free; deliberately strict):
//   1. No symlinks anywhere under the directory (`aws s3 sync` follows them, so a
//      link could publish files from outside public/ or dodge the .svg check).
//   2. Denylist (kept in sync with SVG_ACTIVE_CONTENT in the upload route), run on
//      the raw text AND on an entity-decoded copy (`&#106;avascript:`).
//   3. Element ALLOWLIST: only static SVG drawing elements. Animation elements
//      (<set>, <animate> — can rewrite href), <a>, <script>, <foreignObject>, … fail.
//   4. Every href / xlink:href must be a local fragment (`#id`) or a raster
//      `data:image/(png|jpeg|gif|webp);base64,` URI — no external, javascript:,
//      or data:image/svg+xml references.
//   5. CSS (<style> blocks and style="" attributes): no @import, expression(),
//      -moz-binding / behavior:, and url(...) only to `#id` or raster data URIs.
//
// Usage: node scripts/check-public-svgs.mjs [dir]   (default: public)

import { lstatSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

// Keep in sync with SVG_ACTIVE_CONTENT in src/app/api/admin/upload-image/route.ts.
const SVG_ACTIVE_CONTENT =
  /<script|<foreignobject|<iframe|<embed|<object|<handler|[\s/"']on[a-z]+\s*=|javascript:|vbscript:|data:text\/html|<!entity/i

// Static SVG elements only (compared lower-cased). Everything else fails.
const ALLOWED_ELEMENTS = new Set(
  [
    'svg',
    'g',
    'defs',
    'symbol',
    'use',
    'title',
    'desc',
    'metadata',
    'style',
    'path',
    'rect',
    'circle',
    'ellipse',
    'line',
    'polyline',
    'polygon',
    'text',
    'tspan',
    'textPath',
    'image',
    'clipPath',
    'mask',
    'pattern',
    'marker',
    'linearGradient',
    'radialGradient',
    'stop',
    'filter',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
  ].map((n) => n.toLowerCase())
)
// Editor metadata namespaces (Inkscape / Sodipodi / RDF / Dublin Core / CC) — inert.
const ALLOWED_NS_PREFIXES = new Set(['inkscape', 'sodipodi', 'rdf', 'dc', 'cc'])

const SAFE_DATA_IMAGE = /^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]*$/i
const BAD_CSS = /@import|expression\s*\(|-moz-binding|behavior\s*:/i

const NAMED_ENTITIES = { colon: ':', tab: '\t', newline: '\n', sol: '/', lpar: '(', rpar: ')' }
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);?/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);?/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED_ENTITIES[n.toLowerCase()] ?? m)
}

/** href-like value is safe only as a local fragment or a raster data URI. */
function isSafeRef(raw) {
  // Browsers ignore embedded whitespace/control chars in URL schemes.
  // eslint-disable-next-line no-control-regex
  const v = decodeEntities(raw).replace(/[\u0000- ]/g, '')
  return v.startsWith('#') || SAFE_DATA_IMAGE.test(v)
}

/** Returns a reason string if the CSS text is unsafe, else null. */
function cssProblem(cssRaw) {
  const css = decodeEntities(cssRaw).replace(/\/\*[\s\S]*?\*\//g, '')
  const bad = css.match(BAD_CSS)
  if (bad) return `CSS ${bad[0]}`
  for (const m of css.matchAll(/url\(\s*(['"]?)([\s\S]*?)\1\s*\)/gi)) {
    if (!isSafeRef(m[2])) return `CSS url(${m[2].slice(0, 40)})`
  }
  // Escaped CSS (e.g. \75 rl( ) is never needed in a static asset.
  if (/\\[0-9a-f]{1,6}/i.test(css)) return 'CSS escape sequence'
  return null
}

// Tag with quote-aware attribute section, so a ">" inside a quoted value can't
// end the tag early and hide later attributes.
const TAG = /<([a-zA-Z][\w:.-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g
const ATTR = /([^\s=/>"']+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g

/** Returns a reason string for the first problem in an SVG document, else null. */
function svgProblem(text) {
  const m = text.match(SVG_ACTIVE_CONTENT) ?? decodeEntities(text).match(SVG_ACTIVE_CONTENT)
  if (m) return `active content ${JSON.stringify(m[0].trim())}`

  const body = text.replace(/<!--[\s\S]*?-->/g, '')

  for (const style of body.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) {
    const p = cssProblem(style[1].replace(/<!\[CDATA\[|\]\]>/g, ''))
    if (p) return `<style> ${p}`
  }

  for (const tag of body.matchAll(TAG)) {
    const name = tag[1]
    const lower = name.toLowerCase()
    const prefix = lower.includes(':') ? lower.split(':')[0] : null
    const local = prefix ? lower.slice(prefix.length + 1) : lower
    const allowed = prefix
      ? ALLOWED_NS_PREFIXES.has(prefix) || (prefix === 'svg' && ALLOWED_ELEMENTS.has(local))
      : ALLOWED_ELEMENTS.has(lower)
    if (!allowed) return `disallowed element <${name}>`

    for (const a of tag[2].matchAll(ATTR)) {
      const attr = a[1].toLowerCase()
      const value = a[2] ?? a[3] ?? a[4] ?? ''
      if (attr === 'href' || attr.endsWith(':href')) {
        if (!isSafeRef(value)) return `<${name} ${a[1]}="${value.slice(0, 40)}">`
      } else if (attr === 'style') {
        const p = cssProblem(value)
        if (p) return `<${name} style> ${p}`
      } else if (/url\(/i.test(value) && cssProblem(value)) {
        // Presentation attributes such as fill="url(#g)" / filter="url(#f)".
        return `<${name} ${a[1]}="${value.slice(0, 40)}">`
      }
    }
  }
  return null
}

const root = process.argv[2] ?? 'public'
const bad = []
let checked = 0

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isSymbolicLink() || lstatSync(full).isSymbolicLink()) {
      bad.push({
        file: relative(process.cwd(), full),
        reason: 'symlink (not allowed under public/)',
      })
    } else if (entry.isDirectory()) {
      walk(full)
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.svg')) {
      checked++
      const reason = svgProblem(readFileSync(full, 'utf-8'))
      if (reason) bad.push({ file: relative(process.cwd(), full), reason })
    }
  }
}

walk(root)

if (bad.length) {
  for (const { file, reason } of bad) {
    // GitHub Actions annotation; plain line elsewhere.
    console.error(`::error file=${file}::${reason}`)
  }
  console.error(`\n${bad.length} problem(s) under ${root}/ (${checked} SVG(s) checked).`)
  process.exit(1)
}

console.log(`OK: ${checked} SVG(s) under ${root}/ checked, no active content, no symlinks.`)
