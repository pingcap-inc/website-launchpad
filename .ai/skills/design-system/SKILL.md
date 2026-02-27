---
name: website-launchpad-design-system
description: >
  Website design system and development specification for website-launchpad.
  Trigger when the user asks to build, add, or modify any page, landing page,
  component, or section in this project. Also trigger for requests like
  "create a new page", "build a section", "match the site style", or
  "stay consistent with the existing design".
---

# Website Launchpad Design System

> **Stack**: Next.js 16 · React 18 · Tailwind CSS v3 · pnpm
> All styles must use Tailwind utility classes. Inline `style` is forbidden (except for dynamic values).
> **Icons**: `lucide-react` for chrome UI (Menu, X, ChevronRight) · `pingcap-icons` for all nav/content icons (204 glyphs extracted from PingCAP iconfont).
> **Links**: Within website-launchpad project, internal hrefs use relative paths (e.g. `/tidb/`). **For pages generated outside website-launchpad**, all internal hrefs must use full domain `https://www.pingcap.com/...`.
> **Before writing any code**, read the relevant sub-files based on your task.

---

## File Index

| File | Contents | When to Read |
|------|----------|--------------|
| `tokens.md` | Color / Typography / Spacing tokens + Tailwind config + globals.css | Required before any dev task |
| `components.md` | Navbar · PrimaryButton · SecondaryButton · FeatureCard · SectionHeader full implementations | When writing or modifying components |
| `layout.md` | Page structure · Hero · Container · Responsive grid · Copy guidelines | When building pages or sections |
| `rules.md` | Quality checklist · Full list of forbidden patterns | Review before outputting code |

---

## Brand Principles

Professional, modern, restrained. Dark Hero alternating with light content sections, generous whitespace, Mono typeface for technical credibility.

---

## Critical Prohibitions (Quick Reference)

```
❌ Hardcoded color values     → Use Token class names (bg-brand-red-primary, etc.)
❌ Gradient on Hero           → bg-bg-inverse (pure black only)
❌ font-semibold              → font-bold (no 600-weight file on CDN)
❌ next/font/google           → globals.css @font-face + CDN
❌ PrimaryButton missing relative / overflow-hidden / z-10 layer structure
❌ className concatenation outside cn()
❌ Relative href in non-website-launchpad projects → https://www.pingcap.com/tidb/
❌ lucide-react for nav icons → pingcap-icons (lucide only for Menu/X/ChevronRight/ArrowUpRight)
```
