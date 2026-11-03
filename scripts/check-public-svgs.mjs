#!/usr/bin/env node
// Fails (exit 1) if any SVG under public/ carries active content. The Deploy CDN
// workflow syncs public/ to static.pingcap.com, so an SVG committed here bypasses
// the checks the admin upload route applies (src/app/api/admin/upload-image) —
// this script applies the same pattern before the sync.
//
// Usage: node scripts/check-public-svgs.mjs [dir]   (default: public)

import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

// Keep in sync with SVG_ACTIVE_CONTENT in src/app/api/admin/upload-image/route.ts.
const SVG_ACTIVE_CONTENT =
  /<script|<foreignobject|<iframe|<embed|<object|<handler|[\s/"']on[a-z]+\s*=|javascript:|vbscript:|data:text\/html|<!entity/i

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.svg')) yield full
  }
}

const root = process.argv[2] ?? 'public'
let checked = 0
const bad = []

for (const file of walk(root)) {
  checked++
  const text = readFileSync(file, 'utf-8')
  const m = text.match(SVG_ACTIVE_CONTENT)
  if (m) bad.push({ file: relative(process.cwd(), file), match: m[0].trim() })
}

if (bad.length) {
  for (const { file, match } of bad) {
    // GitHub Actions annotation; plain line elsewhere.
    console.error(`::error file=${file}::SVG contains active content (${JSON.stringify(match)})`)
  }
  console.error(`\n${bad.length} of ${checked} SVG(s) under ${root}/ contain active content.`)
  process.exit(1)
}

console.log(`OK: ${checked} SVG(s) under ${root}/ checked, no active content.`)
