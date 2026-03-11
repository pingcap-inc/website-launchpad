# CLAUDE.md — website-launchpad

> Auto-loaded by Claude Code on every session.
> This is the master reference for anyone (technical or non-technical) working with this project.

---

## Project Overview

**Next.js App Router · Tailwind CSS v3 · TypeScript · pnpm**

This Next.js app coexists with the main PingCAP WordPress site. Nginx proxies specific paths to this app. The homepage (`/`) is managed by WordPress — do NOT create `src/app/page.tsx`.

---

## 📄 Generating Pages from Raw Material

When the user pastes a Google Doc, Feishu doc, PRD, campaign brief, product spec, or any other material and asks to turn it into a page:

### Step 0 — Check Branch & Sync with Main

**① Check you are NOT on `main`:**

```bash
git branch --show-current
```

If on `main`, **stop and tell the user**:

> "You are currently on the main branch. You need to create a new branch before creating the page. Please run: `git checkout -b feat/page_name` (for example, `feat/tidb-cloud-trial`), or tell me the page name and I will generate the command for you."

**② Sync branch with `main` (prevents "Can't automatically merge" on GitHub):**

```bash
git fetch origin
git rebase origin/main
```

- If rebase is **clean** → continue to Step 1.
- If rebase has **conflicts** → stop, resolve conflicts, then `git rebase --continue` before proceeding.

> **Why:** A branch that has diverged from `main` will show "Can't automatically merge" on GitHub. Rebasing now keeps the PR clean and mergeable.

### Step 1 — Classify the Page Type

Read the material and determine the type. State your reasoning in the reply:

| Material signals                                                       | Page type                   |
| ---------------------------------------------------------------------- | --------------------------- |
| Campaign / activity brief, event, paid promotion, program enrollment   | **Landing Page**            |
| Product intro, feature explanation, product comparison, solution brief | **Product Page**            |
| Term definition, "What is X?", technical glossary                      | **Glossary Page**           |
| Anything else (About, community, partners)                             | **General Page** (fallback) |

### Step 2 — Confirm with User

Tell the user:

1. Which page type you've classified it as (and why)
2. The proposed URL path
3. Ask for confirmation or corrections

Wait for the user's reply before generating code.

### Step 3 — Read the Specs

Once confirmed, read **all four** in parallel:

```
.ai/page-types/[type].md                       ← page structure, schema, GTM, sitemap rules
.ai/skills/design-system/SKILL.md              ← components, tokens, layout rules
.ai/skills/seo/SKILL.md                        ← metadata, schema, canonical rules
.ai/skills/design-system/visual-design.md      ← icons, illustrations, animations, interactions
```

Also read if relevant:

```
.ai/context/brand.md              ← product names, tone, forbidden words
```

### Step 4 — Generate `page.tsx`

Generate the full file at `src/app/[path]/page.tsx`, then run the post-generation checklist.

---

## ⚡ Quick Rules (Always Active — No File Read Needed)

```
❌ Hardcoded colors   bg-[#DC150B]         → bg-brand-red-primary
❌ Wrong font weight  font-semibold         → font-bold
❌ Wrong font import  next/font/google      → globals.css @font-face already set
❌ Missing metadata   every page needs full metadata export
❌ Wrong schema       raw JSON-LD           → always use buildPageSchema()
❌ Missing sitemap    new page not in sitemap.ts (unless noindex)
❌ Wrong image tag    <img src="...">       → <Image> from next/image
❌ Raw dataLayer      window.dataLayer.push() → import from '@/lib/gtm'
❌ External link      <Link href="https://..."> → <a href="...">

Visual & Interaction (see visual-design.md for full guide)
❌ FeatureCard without icon    → every FeatureCard MUST have icon={<LucideIcon strokeWidth={1.5} />}
❌ ColorCard without icon      → every ColorCard MUST have icon or image prop
❌ Hero split without visual   → rightSlot or heroImage required (auto-seeds if omitted)
❌ All-black page              → at least one section must use non-bg-bg-primary background
❌ Interactive card no hover   → clickable cards must have hover:-translate-y-2 transition-transform duration-200 ease-in-out
❌ 3+ metrics without CountUp  → use <CountUp> for scroll-triggered stat display
❌ Tabs without autoSwitch     → add autoSwitch={true} autoSwitchInterval={6000}
❌ Stats section built inline  → use <StatsSection> component

✅ siteName must be exactly:   'TiDB'
✅ twitter.site must be:       '@PingCAP'
✅ og:image default:           https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png
✅ twitter:image default:      https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png
✅ canonical format:            https://www.pingcap.com/[path]/
✅ All paths: lowercase · hyphen-separated · trailing slash
✅ Icon stroke width:           strokeWidth={1.5} on all lucide-react icons
✅ Icon in card container:      className="w-full h-full" (fills the w-12 h-12 wrapper)
```

---

## 🧩 Component Quick Reference

**Section Components** (import from `@/components/sections/[Name]` or barrel `@/components`)

| Component                    | Import from                                      | Key Props                                                                                        |
| ---------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `<HeroSection>`              | `@/components/sections/HeroSection`              | `eyebrow` `headline` `subheadline` `primaryCta` `secondaryCta` `rightSlot` `heroImage` `layout`  |
| `<FeatureGridSection>`       | `@/components/sections/FeatureGridSection`       | `title` `features={[{icon?,title,description,cta?}]}` `columns={2\|3\|4}` `viewMore?`            |
| `<FeatureCardSection>`       | `@/components/sections/FeatureCardSection`       | `title` `items={[{icon?,title,description,href?,borderColor?}]}` `columns?` `borderStyle?`       |
| `<FeatureHighlightsSection>` | `@/components/sections/FeatureHighlightsSection` | `title` `items={[{variant,title,description,cta,icon}]}` `columns?`                              |
| `<FeatureTabsSection>`       | `@/components/sections/FeatureTabsSection`       | `title` `tabs={[{id,label,description?,image}]}` `autoSwitch={true}` `autoSwitchInterval={6000}` |
| `<StatsSection>`             | `@/components/sections/StatsSection`             | `stats={[{icon?,value,label,description?}]}` `columns={2\|3\|4}` — uses CountUp, `'use client'`  |
| `<LogoCloudSection>`         | `@/components/sections/LogoCloudSection`         | `logos={[{name,src,href?}]}` `variant="default\|minimal"` `autoScroll?`                          |
| `<TestimonialsSection>`      | `@/components/sections/TestimonialsSection`      | `title` `testimonials={[{quote,author,logo?,href?,cta?}]}`                                       |
| `<FaqSection>`               | `@/components/sections/FaqSection`               | `items={[{q,a}]}` `title?="FAQ"` — always before CtaSection                                      |
| `<CtaSection>`               | `@/components/sections/CtaSection`               | `background="red\|violet\|blue\|teal"` `title` `subtitle?` `primaryCta` `secondaryCta?`          |

**UI Components**

| Component           | Import from                       | Key Props                                                                             |
| ------------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| `<FeatureCard>`     | `@/components/ui/FeatureCard`     | `icon={<LucideIcon strokeWidth={1.5}/>}` `title` `description` `href?` `borderColor?` |
| `<ColorCard>`       | `@/components/ui/ColorCard`       | `variant="red\|violet\|blue\|teal"` `title` `description` `cta` `icon` (required)     |
| `<SectionHeader>`   | `@/components/ui/SectionHeader`   | `label?` `title` `subtitle?` `h2Size="lg\|md\|sm"` `align="center\|left"`             |
| `<Tabs>`            | `@/components/ui/Tabs`            | `tabs` `autoSwitch={true}` `autoSwitchInterval={6000}` `defaultActiveTab?`            |
| `<CountUp>`         | `@/components/ui/CountUp`         | `value="$2,000+"` `className?` — triggers on scroll (use for ≥3 stats)                |
| `<Badge>`           | `@/components/ui/badge`           | `variant="default\|secondary\|outline"` — feature tags, "New"/"Beta" labels           |
| `<Accordion>`       | `@/components/ui/accordion`       | `type="single"` `collapsible` — FAQ sections (import Item/Trigger/Content too)        |
| `<Dialog>`          | `@/components/ui/dialog`          | `<DialogTrigger>` `<DialogContent>` — CTA modals, video lightbox                      |
| `<Tooltip>`         | `@/components/ui/tooltip`         | `<TooltipTrigger>` `<TooltipContent>` — technical term hints                          |
| `<PrimaryButton>`   | `@/components/ui/PrimaryButton`   | `href?` `onClick?`                                                                    |
| `<SecondaryButton>` | `@/components/ui/SecondaryButton` | `href?` `dark={true}` `onClick?`                                                      |
| `<Navbar>`          | `@/components/ui/Header`          | no props — always include                                                             |
| `<Footer>`          | `@/components/ui/Footer`          | no props — always include                                                             |

Full specs: `.ai/skills/design-system/components.md`

---

## ✅ Post-Generation Checklist

Run this after every page generation:

```
Metadata
- [ ] title: 50–60 chars, includes primary keyword
- [ ] description: 120–150 chars, full sentence
- [ ] openGraph: title, description, url, siteName, images (default https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png), locale present
- [ ] twitter: card='summary_large_image', site='@PingCAP', images=[page-specific or default URL]
- [ ] robots: { index: true, follow: true } (or noindex if paid-ads page)
- [ ] canonical: https://www.pingcap.com/[path]/

Schema
- [ ] buildPageSchema() used
- [ ] Page-specific schema node present (definedTermSchema / softwareApplicationSchema / etc.)

Structure
- [ ] <Header /> included
- [ ] <Footer /> included
- [ ] pt-[62px] lg:pt-20 on content wrapper

Sitemap
- [ ] URL added to src/app/sitemap.ts (unless noindex)

Code Quality
- [ ] No hardcoded hex colors
- [ ] No font-semibold (use font-bold)
- [ ] All <Link> used only for internal Next.js navigation; external = <a>
- [ ] Images use next/image <Image> component

Visual Quality
- [ ] Every FeatureCard item has icon prop (Lucide component, strokeWidth={1.5})
- [ ] Every ColorCard item has icon or image prop
- [ ] HeroSection split layout has rightSlot or heroImage (or rightSlot omitted → auto-seeds)
- [ ] Page uses ≥2 distinct section backgrounds (not all bg-bg-primary)
- [ ] Clickable cards have hover:-translate-y-2 transition-transform duration-200 ease-in-out
- [ ] Metric sections with ≥3 stats use <CountUp> for scroll-triggered animation
- [ ] Tabs component (if used) has autoSwitch={true} autoSwitchInterval={6000}
- [ ] FAQ section (if present) uses <Accordion> component
```

---

## 🗺️ Key File Locations

| What               | Where                                       |
| ------------------ | ------------------------------------------- |
| Page files         | `src/app/[path]/page.tsx`                   |
| UI components      | `src/components/ui/`                        |
| Section components | `src/components/sections/`                  |
| Component barrel   | `src/components/index.ts`                   |
| Tailwind config    | `tailwind.config.ts`                        |
| Global CSS         | `src/styles/globals.css`                    |
| Schema builders    | `src/lib/schema.ts`                         |
| GTM helpers        | `src/lib/gtm.tsx`                           |
| Sitemap            | `src/app/sitemap.ts`                        |
| Design tokens      | `.ai/skills/design-system/tokens.md`        |
| Design rules       | `.ai/skills/design-system/SKILL.md`         |
| Visual design      | `.ai/skills/design-system/visual-design.md` |
| SEO rules          | `.ai/skills/seo/SKILL.md`                   |
| Page type specs    | `.ai/page-types/`                           |
| Brand guidelines   | `.ai/context/brand.md`                      |
| Ops user guide     | `.ai/HOW-TO-CREATE-PAGES.md`                |

---

## 🔧 Development Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm lint         # ESLint check
pnpm type-check   # TypeScript check
```

---

## 🚦 Pre-push Gate (Always Run Before `git push`)

When the user asks to submit, commit, or push code to GitHub, **always run this gate first** before executing any `git push` command:

1. **Identify changed page files** — find all new or modified `.tsx` files under `src/app/` compared to the base branch (`git diff --name-only origin/main...HEAD -- 'src/app/**/*.tsx'`).

2. **Evaluate each file** across 5 dimensions (score 0–10 each):
   - **Code** — No hardcoded hex colors (use Tailwind tokens), no `font-semibold` (use `font-bold`), `<Image>` from `next/image` used for all images, `<Link>` only for internal Next.js routes (external = `<a>`), no `window.dataLayer.push()` (use `@/lib/gtm`), `buildPageSchema()` used (no raw `<script>` JSON-LD)
   - **Design** — Design tokens used correctly, proper component reuse from `@/components`, correct spacing utilities, visual hierarchy present, no inline styles
   - **UX** — Single unique `<h1>`, logical heading hierarchy (H1→H2→H3), CTA visible above fold, responsive layout, all images have descriptive `alt` text
   - **SEO** — Complete `metadata` export (title 50–60 chars, description 120–160 chars, openGraph, twitter, robots, canonical), `siteName='TiDB'`, `twitter.site='@PingCAP'`, canonical points to `www.pingcap.com` (not `vercel.app`), URL added to `src/app/sitemap.ts`
   - **AEO** — Structured data quality and completeness, content is AI-citable, entity relationships marked up, `faqSchema` used where a FAQ section is present

3. **Auto-fix any dimension scoring < 7/10** — fix the issues and re-score before proceeding.

4. **Show the score report** to the user in this format:

   ```
   【Pre-push 评审报告】
   Code:   X/10 [🟢/🟡/🔴]
   Design: X/10 [🟢/🟡/🔴]
   UX:     X/10 [🟢/🟡/🔴]
   SEO:    X/10 [🟢/🟡/🔴]
   AEO:    X/10 [🟢/🟡/🔴]
   综合:   X/10 — ✅ 通过 / ❌ 未通过
   ```

5. **Only execute `git push`** after all dimensions ≥ 7/10.

6. **Override** — if the user explicitly says "跳过评审直接提交", note the override, then push.

> 🟢 ≥8 · 🟡 7 · 🔴 <7

---

## ⚠️ Do NOT

- Create `src/app/page.tsx` — homepage is WordPress
- Add security headers in `next.config.ts` — applied at proxy layer
- Use `window.dataLayer.push()` directly — use `@/lib/gtm` helpers
- Use `vercel.app` in canonical or OG URLs — always `www.pingcap.com`
- Add `siteName` other than `'TiDB'`
- Add `twitter.site` other than `'@PingCAP'`
