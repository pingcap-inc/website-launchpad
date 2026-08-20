// Generates .design-sync/docs/<Name>.md — the per-component docs the converter
// binds as each component's .prompt.md (the design agent's usage reference).
//
// Two jobs:
//   1. Carry `category` frontmatter, which sets the component's group. Without
//      it every ui/ component lands in a group called "general" (the converter
//      treats "ui" as a generic directory name).
//   2. Carry real prose. This repo already documents its components in
//      .ai/skills/design-system/components.md and docs/sections.md, split into
//      per-component sections — far better than anything synthesized. Sections
//      are extracted by heading and merged; components with no documented
//      section get frontmatter only, and the converter appends the synthesized
//      ## Props from the emitted .d.ts.
//
// Run from the repo root, before the converter. Rerun whenever those docs change.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'

const SOURCES = [
  { file: '.ai/skills/design-system/components.md', label: 'Component spec' },
  { file: 'docs/sections.md', label: 'Section usage' },
]
const OUT_DIR = '.design-sync/docs'

const cfg = JSON.parse(readFileSync('.design-sync/config.json', 'utf8'))
const components = Object.entries(cfg.componentSrcMap).filter(([, p]) => p)
const names = new Set(components.map(([n]) => n))

/** Split a markdown file into { name -> body } by component heading. */
function sectionsOf(file) {
  const lines = readFileSync(file, 'utf8').split('\n')
  const heads = []
  lines.forEach((line, i) => {
    const m = /^(#{1,4})\s+(.*)$/.exec(line)
    if (!m) return
    // Heading text starts with the component name: "## PrimaryButton — …",
    // "### StatsSection _(new)_", "## GhostButton (Header only)".
    const word = /^([A-Za-z][A-Za-z0-9]*)/.exec(m[2].trim())?.[1]
    heads.push({ i, level: m[1].length, name: names.has(word) ? word : null })
  })

  const out = new Map()
  heads.forEach((h, k) => {
    if (!h.name) return
    // Body runs to the next heading at the same or higher level.
    const end = heads.slice(k + 1).find((n) => n.level <= h.level)?.i ?? lines.length
    const body = lines
      .slice(h.i + 1, end)
      .join('\n')
      .trim()
    if (body) out.set(h.name, body)
  })
  return out
}

const merged = new Map()
for (const { file, label } of SOURCES) {
  for (const [name, body] of sectionsOf(file)) {
    if (!merged.has(name)) merged.set(name, [])
    merged.get(name).push(`## ${label}\n\n${body}`)
  }
}

rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })

let documented = 0
for (const [name, srcPath] of components) {
  const category = srcPath.includes('/sections/') ? 'Sections' : 'UI'
  const body = merged.get(name)?.join('\n\n') ?? ''
  if (body) documented++
  writeFileSync(`${OUT_DIR}/${name}.md`, `---\ncategory: ${category}\n---\n\n${body}\n`)
}

console.error(
  `✓ ${OUT_DIR}: ${components.length} docs (${documented} with prose, ` +
    `${components.length - documented} frontmatter-only)`,
)
