// Prepares the two inputs the design-sync converter needs but this repo,
// being a Next.js app rather than a published library, never produces:
//
//   1. dist/types/  — .d.ts declarations. The app builds with noEmit, so no
//      declarations exist anywhere. The converter reads component prop
//      contracts from a .d.ts tree; without this every <Name>Props degrades to
//      `[key: string]: unknown` and the design agent gets no API to code
//      against. findTypesRoot() discovers dist/types automatically.
//
//   2. .design-sync/.cache/globals.compiled.css — static CSS. globals.css is
//      raw Tailwind source (@tailwind / @apply) that a browser cannot use.
//      Compiled here, with the remote static.pingcap.com font urls rewritten to
//      the woff2 files the bundle ships itself (.design-sync/fonts/), so
//      designs never depend on a network fetch for the brand face.
//
// Run from the repo root. This is cfg.buildCmd — re-run before the converter.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'

const CSS_OUT = '.design-sync/.cache/globals.compiled.css'
const CDN = /https:\/\/static\.pingcap\.com\/dist\/fonts\/[^/]+\/([^'")]+\.woff2)/g

// ── 1. declarations ──────────────────────────────────────────────────────────
// tsc exits non-zero on any type error but still emits; treat "did it write
// declarations" as the real success signal rather than the exit code.
try {
  execFileSync('npx', ['tsc', '-p', '.design-sync/tsconfig.dts.json'], { stdio: 'inherit' })
} catch {
  console.error('! tsc reported errors — checking whether declarations still emitted')
}
if (!existsSync('dist/types/components') || !readdirSync('dist/types/components').length) {
  console.error('✗ no declarations emitted to dist/types/components')
  process.exit(1)
}

// The converter resolves each component's props by name (<Name>Props) and, when
// that misses, falls back to the component's own call signature — but only for
// symbols reachable from the types entry. Several components here name their
// interface differently from the component (FeatureGridSection takes
// FeaturesGridProps), so without this barrel those degrade to
// `[key: string]: unknown`. package.json "types" points at this file.
writeFileSync('dist/types/index.d.ts', "export * from './components/index'\n")

// ── 2. stylesheet ────────────────────────────────────────────────────────────
mkdirSync('.design-sync/.cache', { recursive: true })
execFileSync(
  'npx',
  ['tailwindcss', '-c', '.design-sync/tailwind.ds.config.ts', '-i', 'src/styles/globals.css', '-o', CSS_OUT],
  { stdio: 'inherit' },
)

const css = readFileSync(CSS_OUT, 'utf8')
const missing = new Set()
const rewritten = css.replace(CDN, (_m, file) => {
  if (!existsSync(`.design-sync/fonts/${file}`)) missing.add(file)
  return `../fonts/${file}`
})

if (missing.size) {
  console.error(`✗ font files absent from .design-sync/fonts/: ${[...missing].join(', ')}`)
  process.exit(1)
}

writeFileSync(CSS_OUT, rewritten)
console.error(
  `✓ dist/types + ${CSS_OUT} (${(rewritten.length / 1024) | 0} KB, ` +
    `${(css.match(CDN) || []).length} font url(s) → local)`,
)
