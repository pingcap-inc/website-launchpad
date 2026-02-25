# Product Page Prompt Template

> How to use: Copy the prompt below, fill in the `[ ]` placeholders, and paste into Claude or Cursor.

---

## Prompt

```
You are a Next.js developer working on the website-launchpad project.
Read .ai/skills/design-system/SKILL.md and .ai/skills/seo/SKILL.md first, and follow all specifications strictly.

Generate a product introduction page at: app/marketing/[product-slug]/page.tsx

Product Info:
- Product name: [product name]
- One-line positioning: [core value, e.g. The distributed SQL database for real-time analytics]
- Target audience: [who this product is for]
- Core features (3–6, each with a title and description):
  1. [Feature title]: [1–2 sentence description]
  2. [Feature title]: [description]
  3. [Feature title]: [description]
- Key metrics (optional, 2–4):
  - [Metric name]: [value]
- Use cases (optional, 2–3): [scenario description]
- Primary CTA: [button text]
- CTA link: [link]
- Secondary CTA: [button text, e.g. View Docs]
- CTA section background: [red / violet / blue / teal]

SEO:
- Page Title (50–60 chars): [ ]
- Meta Description (120–160 chars): [ ]
- Primary keywords: [keyword1, keyword2, keyword3]
- Canonical URL: [https://example.com/marketing/product-slug/]

Requirements:
- Page structure: Hero → Core features grid → Use cases (optional) → Metrics (optional) → CTA
- Use existing Design System components only
- Include complete metadata export and JSON-LD SoftwareApplication schema
- Pass all checks in rules.md
- Output only the page.tsx file content
```
