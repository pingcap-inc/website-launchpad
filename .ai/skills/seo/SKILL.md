---
name: website-launchpad-seo
description: >
  Trigger when building or modifying any page that needs SEO optimization,
  including metadata, structured data, semantic HTML, URL structure,
  and Core Web Vitals. Always read this alongside design-system/SKILL.md
  before generating any page code.
---

# SEO Skill

> **Read seo.md for the full specification.**
> This skill must be applied to every page generated in this project.

## When to Apply

- Any new page (`app/**/page.tsx`)
- Any landing page (`app/lp/**/page.tsx`)
- Any product or marketing page (`app/marketing/**/page.tsx`)
- When asked to "optimize SEO", "add metadata", or "improve search ranking"

## Quick Checklist

- [ ] `metadata` export with `title`, `description`, `openGraph`, `twitter`, `robots`, `canonical`
- [ ] Exactly one `<h1>` per page
- [ ] Heading hierarchy: h1 → h2 → h3, no skipped levels
- [ ] All `<Image>` components have descriptive `alt` text
- [ ] `priority` on above-the-fold images
- [ ] `JsonLd` structured data on product pages
- [ ] URL: lowercase, hyphen-separated, trailing slash

## File Index

| File | Contents |
|------|----------|
| `seo.md` | Full SEO specification — metadata, structured data, performance, URL rules |
