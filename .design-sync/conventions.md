## How to build with this design system

This is PingCAP's marketing-site system. It is **dark-first**: the page background
is black and body text is white. Build pages by composing `*Section` blocks, not
by hand-rolling layout.

### Page shell

Every page is `Header` → content → `Footer`, and the content wrapper must clear
the fixed header:

```jsx
<Header />
<main className="pt-[62px] lg:pt-20">
  {/* sections go here */}
</main>
<Footer />
```

`Header` and `Footer` take no props.

### Wrap every section in `SectionWrapper`

`SectionWrapper` supplies the section's background, vertical rhythm, and the
`.section-root` class that declares `--text-secondary`. **This matters:** the
`text-secondary` utility reads that variable with no fallback, so secondary copy
rendered outside a `SectionWrapper` silently inherits white instead of `#A2ADB9`.

```jsx
<SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
  <FeatureGridSection … />
</SectionWrapper>
```

- `background`: `primary` (black — the default) · `inverse` (light) ·
  `gradient-dark-top` · `gradient-dark-bottom` · `brand-red` · `brand-violet` ·
  `brand-blue` · `brand-teal` · `none`
- `spacing`: `none` · `sm` · `md` · `lg` · `section` · `hero`

Alternate backgrounds down the page — a page where every section is `primary`
reads as one undifferentiated black slab. Reserve the `brand-*` backgrounds for
CTA sections. `CtaSection` has **no** `background` prop; its colour comes from
the wrapper.

### Styling idiom: Tailwind utilities, this system's token names

Never invent hex values or ad-hoc scales — every design decision has a token:

| Concern    | Class family                    | Real values                                                                                                  |
| ---------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Surfaces   | `bg-bg-*`                       | `bg-bg-primary` (#000), `bg-bg-subtle`, `bg-bg-inverse`                                                      |
| Gradients  | `bg-gradient-dark-*`            | `bg-gradient-dark-top`, `bg-gradient-dark-bottom`                                                            |
| Brand      | `bg-brand-<hue>-<step>`         | `bg-brand-red-primary`, `bg-brand-violet-bg`, `bg-brand-blue-bg`, `bg-brand-teal-bg`                         |
| Neutrals   | `text-carbon-*` / `bg-carbon-*` | `carbon-100` … `carbon-900`                                                                                  |
| Text       | `text-text-*`, `text-secondary` | `text-text-inverse` (on dark), `text-text-primary` (on light), `text-secondary` (muted)                      |
| Borders    | `border-border-*`               | `border-border-primary`, `border-border-subtle`, `border-border-strong`                                      |
| Type scale | `text-<role>`                   | `text-h1`, `text-h2-lg/md/sm`, `text-h3-xl/lg/sm`, `text-body-2xl/xl/lg/md/sm`, `text-eyebrow`, `text-label` |
| Width      | `max-w-*`, `.contain`           | `max-w-container` (1374px), `max-w-content-md`, `.contain`                                                   |

Two hard rules: **`font-bold`, never `font-semibold`** (the scale has no 600
weight), and all `lucide-react` icons take `strokeWidth={1.5}`.

Type roles already carry their own size, line-height and weight — `text-h2-lg`
is a complete heading style; do not stack `text-4xl font-bold` on top of it.

### Where the truth lives

Read these before styling — they beat any summary here:

- `_ds/<folder>/styles.css` and its `@import` closure (tokens, fonts,
  `_ds_bundle.css`) — the actual compiled CSS.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component spec and examples.
- `components/<group>/<Name>/<Name>.d.ts` — the prop contract.
- `guidelines/` — the team's own written rules; `guidelines/.ai/skills/design-system/tokens.md`
  is the authoritative token table.

### A representative page fragment

```jsx
<SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
  <HeroSection
    layout="image-right"
    eyebrow="TiDB Cloud"
    headline="The Distributed SQL Database Built for AI Workloads"
    subheadline="MySQL-compatible, horizontally scalable, and HTAP-ready."
    primaryCta={{ text: 'Start Free', href: '/tidb-cloud/' }}
    secondaryCta={{ text: 'Read the Docs', href: '/developers/' }}
  />
</SectionWrapper>

<SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
  <FeatureGridSection
    eyebrow="Why TiDB"
    title="One Database for Transactions and Analytics"
    columns={3}
    features={[
      { title: 'Elastic Scale', description: 'Add capacity online.', icon: <Layers strokeWidth={1.5} /> },
    ]}
  />
  {/* Your own layout glue uses the same vocabulary: */}
  <p className="mt-6 max-w-content-sm text-body-md text-secondary">
    Footnote copy sits on the same scale as the components around it.
  </p>
</SectionWrapper>

<SectionWrapper style={{ background: 'brand-violet', spacing: 'md' }}>
  <CtaSection title="Ready to Start?" primaryCta={{ text: 'Start Free', href: '/tidb-cloud/' }} />
</SectionWrapper>
```
