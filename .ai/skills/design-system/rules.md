# Quality Rules

## Pre-output Checklist

**Colors / Backgrounds**

- [ ] All colors use Token class names — no hardcoded values (`bg-[#xxx]` etc.)
- [ ] Default page background is `bg-bg-primary` (`#000000`) — **`bg-white` as page base is forbidden**
- [ ] Hero uses `bg-bg-primary` as base — **no gradients**
- [ ] Hero default layout is image-right: left copy/buttons + right heroImage (defaults to Graphic-1-Dk.png)
- [ ] Centered Hero defaults to no eyebrow
- [ ] Split Hero rightSlot is required — right column is empty if omitted
- [ ] Hero background image has no overlay layer by default; keep content wrapper `relative z-10`
- [ ] CTA Section uses one of the four brand dark backgrounds (`bg-brand-*-bg`)
- [ ] Gradients (`bg-gradient-dark-*`) only used in dark content sections other than Hero / CTA

**Typography**

- [ ] Fonts loaded via `globals.css @font-face` + CDN — no local files, no Google Fonts
- [ ] Font weights restricted to 300 / 400 / 500 / 700 — **600 (`font-semibold`) is forbidden**
- [ ] `font-mono` only for Eyebrow · Label · Stats · Code — forbidden in body text

**Components**

- [ ] `<PrimaryButton>`: `rounded-none h-10`, parent has `relative overflow-hidden`, text/icon have `relative z-10`
- [ ] `<SecondaryButton>`: hover black circle + 45° arrow — no shadow / blur / glow
- [ ] Navbar Logo uses the specified CDN SVG, fixed at `120×50px`
- [ ] Header keeps lightweight shell in `Header.tsx`; mega-menu/mobile menu logic lives in dynamically loaded `HeaderMenus.tsx`
- [ ] Footer newsletter form uses deferred mount (`DeferredHubSpotForm`) rather than eager third-party script load

**Layout / Spacing**

- [ ] Spacing uses Token values only (`p-1` through `p-20` — no arbitrary pixel values)
- [ ] Container: `max-w-container mx-auto px-4 md:px-8 lg:px-16` (max 1502px outer / 1374px content, padding 16/32/64px)
- [ ] Section padding: `py-section md:py-section-sm`
- [ ] Responsive grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

**Icons**

- [ ] Header dropdown/menu icons use `header-icons`
- [ ] Non-header page/section/content icons use `lucide-react`

**Links**

- [ ] **Within website-launchpad project**: internal hrefs use relative paths (e.g. `/tidb/`, `/blog/`)
- [ ] **Outside website-launchpad project** (standalone pages, other repos): all internal hrefs must use full domain `https://www.pingcap.com/...`
- [ ] Sign In → `https://tidbcloud.com/signin`
- [ ] Start for Free → `https://tidbcloud.com/free-trial/`
- [ ] External links (ossinsight.io, docs.pingcap.com, discord.gg, etc.) keep their own domains

**Code Quality**

- [ ] Section headings rendered via `<SectionHeader>` (Eyebrow + H2 + subtitle)
- [ ] Images use `<Image>` (next/image) with `width/height` or `fill` specified
- [ ] classNames merged with `cn()` — no template string concatenation

---

## Forbidden Patterns

```tsx
// ─── Colors ─────────────────────────────────────────────
bg-[#E63012]              // deprecated brand red → bg-brand-red-primary
bg-[#DC150B]              // raw value → bg-brand-red-primary
bg-[#0D0D0D]              // → bg-bg-primary
bg-red-500                // Tailwind default palette → bg-brand-red-primary
text-blue-600             // → text-brand-blue-medium

// ─── Backgrounds ────────────────────────────────────────
<section className="bg-gradient-dark-top">    // Hero → bg-bg-primary
<section className="bg-bg-primary">           // CTA → bg-brand-*-bg (one of four)
<section className="bg-[#06111A]">            // gradient endpoint only, never solid bg
<div className="absolute inset-0 bg-bg-primary/65" /> // Hero overlay layer → remove (hero has no overlay)
<HeroSection layout="centered" eyebrow="..." />  // centered hero default should be no eyebrow
<HeroSection layout="split" />                 // split hero: rightSlot required — right column renders empty

// ─── PrimaryButton layer structure ──────────────────────
<button>                  // missing relative + overflow-hidden
  <span>text</span>        // missing relative z-10 (will be covered by red circle)

// ─── Typography ─────────────────────────────────────────
font-semibold                              // no CDN file for 600 → font-bold
import { DM_Sans } from 'next/font/google' // → globals.css @font-face + CDN
import localFont from 'next/font/local'    // → CDN only
<p className="font-mono">body text</p>     // Mono restricted to specific contexts

// ─── Spacing ────────────────────────────────────────────
py-[96px]                 // → py-section (80px)
gap-[18px]                // → gap-4 (16px) or gap-6 (24px)
max-w-[1440px]            // → max-w-container (1502px)

// ─── Icons ────────────────────────────────────────────────
import { NewspaperIcon } from './header-icons' // non-header usage should not use header-icons
import { BriefcaseIcon } from './header-icons' // non-header usage should use lucide-react instead

// ─── Links (non-website-launchpad projects only) ──────────
href="/tidb/"                               // relative → href="https://www.pingcap.com/tidb/"
href="/signin/"                             // → href="https://tidbcloud.com/signin"
href="/signup/"                             // → href="https://tidbcloud.com/free-trial/"

// ─── Code ───────────────────────────────────────────────
`${isDark ? 'text-white' : 'text-black'}`  // → cn()
<img src="...">                             // → <Image> (next/image)
```
