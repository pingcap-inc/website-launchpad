# SEO Content Page Prompt Template

> How to use: Copy the prompt below, fill in the `[ ]` placeholders, and paste into Claude or Cursor.

---

## Prompt

```
You are a Next.js developer working on the website-launchpad project.
Read .ai/skills/design-system/SKILL.md and .ai/skills/seo/SKILL.md first, and follow all specifications strictly.

Generate an SEO content page at: app/marketing/[url-slug]/page.tsx

Page Info:
- Topic: [e.g. What is an HTAP Database]
- Primary keyword: [e.g. HTAP database]
- Long-tail keywords (2–3): [e.g. HTAP vs OLTP, real-time analytics database]
- Search intent: [Informational / Comparison / Solution-seeking]
- Content outline (H2 level, 3–5 sections):
  1. [H2 heading]
  2. [H2 heading]
  3. [H2 heading]
- Target word count: [800–1500 words]
- Related product to reference naturally in body: [product name and link]
- CTA intent: [where to send the reader, e.g. product page / sign-up page]
- CTA section background: [red / violet / blue / teal]

SEO:
- Page Title (50–60 chars): [ ]
- Meta Description (120–160 chars): [ ]
- Canonical URL: [https://example.com/marketing/url-slug/]

Requirements:
- Page structure: Hero (include primary keyword) → Body content (follow outline) → Related product reference → CTA
- Use prose layout for body content — avoid over-componentizing
- Use SectionHeader to separate content sections where appropriate
- Include complete metadata export and Article JSON-LD schema
- Add internal links to related product pages and other content pages naturally in the body
- Pass all checks in rules.md
- Output only the page.tsx file content
```
