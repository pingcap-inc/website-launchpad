# Page Quality Review Criteria

> This file defines the scoring criteria Claude uses during the automated pre-push review.
> No manual action required — when you say "Submit to GitHub", Claude automatically reviews and fixes any failing dimensions before pushing.

---

## 5 Review Dimensions (10 points each)

### 1. Code Quality (Code)

- No hardcoded hex colors (e.g. `bg-[#DC150B]`) — use Tailwind tokens (e.g. `bg-brand-red-primary`)
- No `font-semibold` — use `font-bold`
- All images use `next/image` `<Image>` component
- `<Link>` only for internal Next.js routes — external links use `<a href="...">`
- No `window.dataLayer.push()` — use `@/lib/gtm` helpers
- Structured data uses `buildPageSchema()` — no raw `<script>` JSON-LD

### 2. Design & Visual (Design)

- Design system tokens used correctly (colors, weights, spacing) — no inline styles
- Existing components from `@/components` used before building new ones
- Clear visual hierarchy — not just wall-of-text
- Icons, images, or visual elements support the content

### 3. User Experience (UX)

- Page has exactly one `<h1>`, heading hierarchy is correct (H1 → H2 → H3)
- Hero area clearly communicates the page's core value
- CTA is visible above the fold with clear, action-oriented copy
- Layout is responsive (mobile-friendly)
- All images have descriptive `alt` text

### 4. SEO Compliance (SEO)

- `metadata` export is complete: `title` (50–60 chars), `description` (120–160 chars), `openGraph`, `twitter`, `robots`, `canonical`
- `siteName` must be `'TiDB'`
- `twitter.site` must be `'@PingCAP'`
- `openGraph.images` and `twitter.images` must be present — default: `https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png`
- `canonical` points to `www.pingcap.com` (not `vercel.app`)
- New page URL added to `src/app/sitemap.ts`

### 5. AI Engine Optimization (AEO)

- Structured data is complete and high quality
- Content is AI-citable (clear paragraphs, explicit claims)
- Entity relationships are marked up
- FAQ content (if present) uses `faqSchema`

---

## Passing Thresholds

| Dimension | Minimum |
| --------- | ------- |
| Code      | 7 / 10  |
| Design    | 7 / 10  |
| UX        | 7 / 10  |
| SEO       | 7 / 10  |
| AEO       | 7 / 10  |

**All dimensions must pass before `git push` runs.**

---

## Review Report Format

```
[Pre-push Review Report]
Code:   X/10 🟢/🟡/🔴
Design: X/10 🟢/🟡/🔴
UX:     X/10 🟢/🟡/🔴
SEO:    X/10 🟢/🟡/🔴
AEO:    X/10 🟢/🟡/🔴
Overall: X/10 — ✅ Pass / ❌ Fail (fix required before push)

[Issues Found]
- [specific issue]

[Auto-fixed]
- [issue that was fixed automatically]
```

🟢 ≥8 · 🟡 7 · 🔴 <7 (anything below 7 is auto-fixed and re-scored)
