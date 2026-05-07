import type { Metadata } from 'next'
import { Header, Footer, HeroSection, CtaSection, JsonLd, SectionWrapper } from '@/components'
import { RichTextBlock } from '@/components/sections/RichTextBlock'
import { buildPageSchema } from '@/lib/schema'

const PAGE_PATH = '/tools/markdown-guide/'
const PAGE_TITLE = 'Markdown Syntax Reference for Long-Form Pages | TiDB'
const PAGE_DESCRIPTION =
  'Internal Markdown reference for the long-form page generator — supported syntax, custom card and column directives, and common gotchas.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: 'Markdown Guide for Long-Form Pages',
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: `https://www.pingcap.com${PAGE_PATH}`,
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
  robots: { index: false, follow: false },
  alternates: { canonical: `https://www.pingcap.com${PAGE_PATH}` },
}

const schema = buildPageSchema({
  pageType: 'WebPage',
  path: PAGE_PATH,
  title: 'Markdown Guide for Long-Form Pages',
  description: PAGE_DESCRIPTION,
})

// ─── Example data ─────────────────────────────────────────────────────────────
// Each `code` is the raw Markdown string. The renderer is the *same* one used
// in production long-form pages, so the preview matches what readers will see.

type Example = {
  id: string
  title: string
  description?: string
  code: string
  /** When true, render the code block but skip live preview (e.g. H1 example). */
  noPreview?: boolean
  /** Optional warning shown below the example. */
  note?: string
  /** When true, pass `rich-text-block--raw-source` so the leading H1 is preserved. */
  rawSource?: boolean
  /** Override RichTextBlock preview — used for fences not handled by the rich-text renderer (e.g. `:::cta`). */
  customPreview?: React.ReactNode
}

const lines = (...rows: string[]) => rows.join('\n')

const EXAMPLES: Example[] = [
  {
    id: 'headings',
    title: 'Headings',
    description:
      'Use `##` through `####` for content headings. The first `#` H1 is automatically stripped from display (the page title is set by the page meta, not the body).',
    code: lines(
      '# Page title (this H1 is stripped from display)',
      '',
      '## Section heading (H2)',
      '',
      '### Subsection heading (H3)',
      '',
      '#### Smaller heading (H4)'
    ),
    note: 'H5 and H6 are not supported. Inside content, start with `##` — never `#`.',
  },
  {
    id: 'text',
    title: 'Text Formatting',
    description: 'Bold, italic, bold + italic, and inline code.',
    code: lines(
      'This is a paragraph with **bold text**, *italic text*, and ***bold italic*** combined.',
      '',
      'Use `inline code` for short snippets, file names like `package.json`, or commands like `pnpm install`.'
    ),
    note: 'Strikethrough (`~~text~~`) is NOT supported.',
  },
  {
    id: 'links',
    title: 'Links',
    description:
      'Standard Markdown link syntax. All links open in a new tab with `rel="noopener noreferrer"` automatically.',
    code: lines(
      'Read the [TiDB documentation](https://docs.pingcap.com/) for full reference.',
      '',
      'You can also link to other [PingCAP pages](https://www.pingcap.com/tidb/) inline.'
    ),
    note: 'Only http(s) and mailto links are allowed. Other protocols are silently dropped.',
  },
  {
    id: 'images',
    title: 'Images & Captions',
    description:
      'Standard image syntax. An italic line directly below an image becomes a `<figcaption>`.',
    code: lines(
      '![TiDB architecture diagram](https://static.pingcap.com/files/2026/01/29013437/Hybrid-search-flow.jpg)',
      '',
      '*Figure 1: TiDB cluster topology — the italic line above this becomes the caption.*'
    ),
    note: 'A blank line between the image and the caption is allowed. The caption must be a single italic line wrapped in `*…*` or `_…_`.',
  },
  {
    id: 'youtube',
    title: 'YouTube Embeds',
    description:
      'Drop a YouTube link on its own line — either as `[Title](url)` or a bare URL — and it becomes a click-to-play thumbnail with a lightbox player.',
    code: lines(
      '[Watch: TiDB explained in 5 minutes](https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      '',
      '*Optional caption line works here too.*'
    ),
    note: 'Supported URL forms: `youtube.com/watch?v=…`, `youtu.be/…`, `youtube.com/embed/…`, `youtube.com/shorts/…`.',
  },
  {
    id: 'lists',
    title: 'Lists',
    description: 'Unordered (`-` `*` `·`) and ordered (`1.` `1)`).',
    code: lines(
      '- HTAP workloads',
      '- MySQL compatibility',
      '- Horizontal scaling',
      '',
      '1. Spin up a cluster',
      '2. Connect via the MySQL protocol',
      '3. Run analytical queries'
    ),
    note: 'Nested lists are NOT supported by this renderer — keep lists flat. Task lists (`- [ ]`) are also not supported.',
  },
  {
    id: 'blockquotes',
    title: 'Blockquotes',
    description: 'Prefix lines with `> `. Useful for pull quotes and customer testimonials.',
    code: lines(
      '> TiDB has eliminated the operational toil of running sharded MySQL at our scale.',
      '> — Engineering lead, mid-stage fintech'
    ),
  },
  {
    id: 'code',
    title: 'Code Blocks',
    description:
      'Fenced code blocks with optional language tag. Get a copy button and Prism syntax highlighting automatically.',
    code: lines(
      '```sql',
      'SELECT region, COUNT(*) AS orders',
      'FROM orders',
      'WHERE created_at >= NOW() - INTERVAL 7 DAY',
      'GROUP BY region',
      'ORDER BY orders DESC;',
      '```',
      '',
      '```bash',
      'pnpm install',
      'pnpm dev',
      '```'
    ),
    note: 'Supported languages: bash, sql, json, yaml, javascript, typescript. If you omit the tag, the renderer auto-detects from content.',
  },
  {
    id: 'tables',
    title: 'Tables',
    description:
      'GFM-style pipe tables. The header separator (`|---|---|`) is required. An italic line directly below the table becomes a caption.',
    code: lines(
      '| Feature        | TiDB | Sharded MySQL |',
      '| -------------- | ---- | ------------- |',
      '| Online DDL     | Yes  | Limited       |',
      '| Elastic scale  | Yes  | Manual        |',
      '| HTAP queries   | Yes  | No            |',
      '',
      '*Table 1: capability comparison (caption goes here, italics required).*'
    ),
  },
  {
    id: 'rules',
    title: 'Horizontal Rules',
    description: 'Three or more `-`, `*`, or `_` on a line by themselves.',
    code: lines(
      'Section A content above the rule.',
      '',
      '---',
      '',
      'Section B content below the rule.'
    ),
  },
  {
    id: 'card-grid',
    title: 'Card Grid (Custom Directive)',
    description:
      'Layout block for highlighting 2–3 grouped points. Uses the `:::card-grid` container with `:::card` children. Each card may include an H2–H4 title at the top and a `[CTA](url)` link at the bottom.',
    code: lines(
      ':::card-grid',
      '',
      ':::card',
      '## Distributed SQL',
      'Horizontally scale reads and writes across nodes without manual sharding.',
      '[Read more](https://docs.pingcap.com/tidb/stable/overview)',
      ':::',
      '',
      ':::card',
      '## MySQL compatibility',
      'Drop-in replacement for the MySQL protocol — keep your application code unchanged.',
      '[Read more](https://docs.pingcap.com/tidb/stable/mysql-compatibility)',
      ':::',
      '',
      ':::'
    ),
    note: 'Attributes: `columns=1|2|3` on `:::card-grid`; `tone=brand|light` on each `:::card` (default is `brand` — dark red background).',
  },
  {
    id: 'columns',
    title: 'Columns (Custom Directive)',
    description:
      'Side-by-side text columns. Useful for "Before / After" comparisons or paired explanations.',
    code: lines(
      ':::columns columns=2',
      '',
      ':::column',
      '### Before',
      'Sharding logic lived in the application layer and required manual rebalancing on every capacity change.',
      ':::',
      '',
      ':::column',
      '### After',
      'TiDB handles distribution transparently. The application sees a single logical database and engineers reclaim weeks per quarter.',
      ':::',
      '',
      ':::'
    ),
    note: 'Attributes: `columns=1|2|3` on `:::columns`.',
  },
  {
    id: 'cta',
    title: 'Inline CTA Banner (Custom Directive)',
    description:
      '`:::cta` is parsed at the document level — every fenced block becomes a standalone CTA banner section between richTextBlock chunks. The first `[link](url)` is the primary button; the second is the optional secondary button. All other text becomes the subtitle. There is no title.',
    code: lines(
      ':::cta bg="https://static.pingcap.com/files/2025/06/22092103/1000011430.png"',
      '',
      'Ready to see TiDB in action? Spin up a free cluster in under two minutes — no credit card required.',
      '',
      '[Start for Free](https://tidbcloud.com/free-trial/)',
      '[Read the Docs](https://docs.pingcap.com/)',
      ':::'
    ),
    customPreview: (
      <div className="rounded border border-border-subtle overflow-hidden">
        <SectionWrapper
          style={{
            background: 'brand-violet',
            backgroundImage: {
              image: { url: 'https://static.pingcap.com/files/2025/06/22092103/1000011430.png' },
            },
            spacing: 'sm',
          }}
        >
          <CtaSection
            title=""
            subtitle="Ready to see TiDB in action? Spin up a free cluster in under two minutes — no credit card required."
            primaryCta={{ text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' }}
            secondaryCta={{ text: 'Read the Docs', href: 'https://docs.pingcap.com/' }}
          />
        </SectionWrapper>
      </div>
    ),
    note: 'Attributes: `bg="URL"` (also accepts `background=` / `backgroundimage=`) sets a background image. Default background is `brand-violet`. The `:::cta` fence MUST be on its own line at the top level — do NOT nest it inside `:::card` or `:::columns`.',
  },
]

const GOTCHAS = [
  {
    label: 'No nested lists',
    body: 'Indented sub-bullets render as plain paragraphs, not nested `<ul>`. Restructure as flat lists or use headings.',
  },
  {
    label: 'No task lists',
    body: '`- [ ] task` renders as a literal bullet with the brackets visible. There is no checkbox UI.',
  },
  {
    label: 'No strikethrough',
    body: '`~~text~~` is rendered as literal tildes. Use italics or rephrase.',
  },
  {
    label: 'No raw HTML (except `<hr/>`)',
    body: 'HTML tags are escaped and shown as text. The one exception is `<hr/>` which behaves like a horizontal rule.',
  },
  {
    label: 'No H5 / H6',
    body: 'Heading parser stops at H4. Anything deeper renders as a paragraph.',
  },
  {
    label: 'First H1 is stripped from display',
    body: 'The opening `# Title` line is removed from `richTextBlock` rendering by default. Page titles come from page metadata, not body content.',
  },
  {
    label: 'Captions must be a single italic line',
    body: 'For images, tables, and YouTube embeds: the caption is the next non-blank italic-only line. Anything else is treated as the next paragraph.',
  },
  {
    label: 'Card and Column directives need blank lines',
    body: 'Always leave a blank line before `:::card-grid`, between sibling `:::card` blocks, and after the closing `:::`. Otherwise the parser may swallow surrounding content.',
  },
  {
    label: '`:::cta` must be top-level',
    body: '`:::cta` is parsed before the rich-text renderer runs and splits the document into separate sections. Do not nest it inside `:::card`, `:::columns`, or any other directive — the inner `:::cta` will be ignored.',
  },
  {
    label: '`:::cta` needs at least one link',
    body: 'A `:::cta` block with no `[text](url)` link is silently dropped (rendered back as plain markdown). Always include a primary CTA link.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarkdownGuidePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20 bg-bg-primary">
        {/* Hero */}
        <section className="bg-bg-primary">
          <HeroSection
            // eyebrow="INTERNAL TOOL"
            headline="Markdown Guide for Long-Form Pages"
            // subheadline="Reference for the Markdown syntax supported by the long-form page generator. Every example below renders through the same engine used in production — what you see is what readers will see."
            layout="centered"
          />
        </section>

        {/* Table of contents */}
        <section className="bg-bg-primary pb-section-sm lg:pb-section">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <p className="font-mono text-eyebrow text-carbon-400 mb-6">ON THIS PAGE</p>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
              {EXAMPLES.map((ex) => (
                <li key={ex.id}>
                  <a
                    href={`#${ex.id}`}
                    className="text-body-sm text-carbon-300 hover:text-brand-red-primary transition-colors duration-150 ease-in-out"
                  >
                    → {ex.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#gotchas"
                  className="text-body-sm text-carbon-300 hover:text-brand-red-primary transition-colors duration-150 ease-in-out"
                >
                  → Gotchas & not supported
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Examples — light section so RichTextBlock renders against white */}
        <section className="bg-bg-inverse py-section-sm lg:py-section">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 space-y-16 lg:space-y-20">
            {EXAMPLES.map((ex) => (
              <article
                key={ex.id}
                id={ex.id}
                className="scroll-mt-32 border-t border-border-subtle pt-10 first:border-t-0 first:pt-0"
              >
                <h2 className="text-h2-mb md:text-h2-sm font-bold text-text-primary mb-3">
                  {ex.title}
                </h2>
                {ex.description && (
                  <p className="text-body-md text-carbon-700 mb-8 max-w-subtitle">
                    {ex.description}
                  </p>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Source */}
                  <div>
                    <p className="font-mono text-label uppercase tracking-wider text-carbon-500 mb-2">
                      Source
                    </p>
                    <pre className="rounded bg-bg-surface text-text-inverse p-4 text-body-sm overflow-x-auto whitespace-pre leading-relaxed">
                      <code>{ex.code}</code>
                    </pre>
                  </div>

                  {/* Rendered preview */}
                  <div>
                    <p className="font-mono text-label uppercase tracking-wider text-carbon-500 mb-2">
                      Renders as
                    </p>
                    {ex.customPreview ? (
                      ex.customPreview
                    ) : ex.noPreview ? (
                      <div className="rounded border border-border-subtle bg-bg-subtle p-4 text-body-sm text-carbon-700 italic">
                        Preview suppressed — see note below.
                      </div>
                    ) : (
                      <div className="rounded border border-border-subtle bg-white p-6">
                        <RichTextBlock
                          content={ex.code}
                          className={ex.rawSource ? 'rich-text-block--raw-source' : undefined}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {ex.note && (
                  <p className="mt-4 text-body-sm text-carbon-700">
                    <span className="font-bold">⚠️ Heads up: </span>
                    {ex.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Gotchas */}
        <section id="gotchas" className="scroll-mt-32 bg-bg-inverse pb-section-sm lg:pb-section">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-h2-mb md:text-h2-sm font-bold text-text-primary mb-3">
              Gotchas & Not Supported
            </h2>
            <p className="text-body-md text-carbon-700 mb-8 max-w-subtitle">
              Common patterns that look like they should work but don&apos;t. Check this list before
              filing a bug.
            </p>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {GOTCHAS.map((g) => (
                <li key={g.label} className="border-l-2 border-brand-red-primary pl-4">
                  <p className="text-body-md font-bold text-text-primary mb-1">{g.label}</p>
                  <p className="text-body-sm text-carbon-700 leading-relaxed">{g.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
