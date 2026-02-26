# SEO Audit Decisions
# Source: PingCAP SEO Audit, February 14–15, 2026

> This file records the strategic decisions from the audit.
> AI tools should read this to understand *why* certain rules exist,
> not just *what* the rules are.

---

## Q1 Decision: Keep WordPress, Add Next.js for New Pages

**Verdict:** Do NOT migrate WordPress to Next.js.

**Why the problems are not WordPress problems:**
The top audit findings — dual GTM containers, missing security headers, no hreflang,
poor alt text, missing schema — all exist regardless of platform.
Moving to Next.js does not fix these. They are configuration problems, not platform problems.

**Why WordPress stays:**
- 17 custom post types (case studies, tutorials, events, champions, press releases,
  session replays, etc.) would take 2–3 months to rebuild
- WordPress 6.x with a custom theme (no page builder) is already better than 90% of WP sites
- All top 10 audit issues can be fixed without a platform change

**What changes:**
New AI-generated pages go to Next.js. Existing content stays on WordPress.

---

## Q2 Decision: Path 2 — AI Generates Next.js Pages, Deploy Separately

**Why not Path 1 (Train AI to write WordPress code):**
AI coding tools (Cursor, Claude, Copilot, v0) are trained predominantly on React/Next.js.
Forcing them to write PHP/WordPress code produces lower quality output and misses
the modern component ecosystem.

**Why not Path 3 (Full Headless):**
Only justified if hiring 2–3 dedicated React developers permanently.
Not viable for a team where tech supports GTM execution via AI.

**Chosen pattern:**
```
www.pingcap.com           → WordPress (existing content)
www.pingcap.com/glossary/ → Next.js (AI-generated)
www.pingcap.com/compare/  → Next.js (AI-generated)
www.pingcap.com/lp/       → Next.js (AI-generated)
www.pingcap.com/marketing/ → Next.js (AI-generated)
```

**First proof of concept:**
Glossary page at /glossary/ — zero migration risk, high SEO value (audit action item #14),
demonstrates the full AI to deploy workflow.

---

## Q3 Decision: 10-Rule SEO Contract for Hybrid Stack

**Core principle:**
Google does not care about tech stack. It cares that every page —
regardless of whether it runs PHP or Node.js — follows the same SEO contract.

**The 10 rules (implementation status):**

| Rule | Description | Status | Reference |
|------|-------------|--------|-----------|
| 1 | Same domain, path-based routing | Infra pending | cross-stack.md |
| 2 | Identical meta tag contract | Done | seo.md + layout.tsx |
| 3 | Matching schema @graph parity | Done | src/lib/schema.ts |
| 4 | Unified sitemap | Infra pending | cross-stack.md + src/app/sitemap.ts |
| 5 | Shared navigation and footer | Todo | Footer component needed |
| 6 | Consistent URL patterns trailing slash | Done | next.config.ts |
| 7 | Security headers on both stacks | Infra pending | cross-stack.md |
| 8 | Analytics and tracking parity | Done | src/lib/gtm.ts + RouteTracker |
| 9 | Internal linking between stacks | Native | Standard a href tags |
| 10 | Validation checklist | Documented | cross-stack.md + SKILL.md |

Rules 1, 4, 7 are infrastructure tasks — they require Nginx/Cloudflare config,
not code changes. Must be completed before any Next.js page goes live on the main domain.

---

## Audit Action Items Relevant to Next.js Pages

| Action Item | Implementation | Status |
|-------------|----------------|--------|
| Create glossary page at /glossary/ | src/app/glossary/page.tsx | Done |
| Fix missing schema markup | buildPageSchema() in src/lib/schema.ts | Done |
| Fix poor alt text | Image SEO rules in seo.md | Done |
| Consolidate to one GTM container | NEXT_PUBLIC_GTM_ID + src/lib/gtm.ts | Done |
| Add security headers | Proxy layer — cross-stack.md | Infra pending |
| Fix missing hreflang | Excluded — English-only for now | N/A |
