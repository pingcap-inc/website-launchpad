# Landing Page Prompt Template

> How to use: Copy the prompt below, fill in the `[ ]` placeholders, and paste into Claude or Cursor.

---

## Prompt

```
You are a Next.js developer working on the website-launchpad project.
Read .ai/skills/design-system/SKILL.md and .ai/skills/seo/SKILL.md first, and follow all specifications strictly.

Generate a campaign landing page at: app/lp/[url-slug]/page.tsx

Page Info:
- Campaign name: [campaign name]
- Core message: [one-sentence description of the campaign theme]
- Target audience: [who this page is for]
- Key selling points (3–5):
  1. [Point 1]
  2. [Point 2]
  3. [Point 3]
- Primary CTA: [button text, e.g. Get Started / Start for Free / Sign Up]
- CTA link: [/signup or full URL]
- Secondary CTA (optional): [button text]
- Campaign end date (optional): [YYYY-MM-DD]
- CTA section background: [red / violet / blue / teal — pick one]

SEO:
- Page Title (50–60 chars): [ ]
- Meta Description (120–160 chars): [ ]
- Primary keywords: [keyword1, keyword2, keyword3]
- Canonical URL: [https://example.com/lp/url-slug/]

Requirements:
- Use existing Design System components only (HeroSection, SectionHeader, FeatureCard, PrimaryButton, SecondaryButton, CtaSection)
- Page structure: Hero → Key selling points → CTA
- Include complete metadata export
- Pass all checks in rules.md
- Output only the page.tsx file content — no explanation
```

---

## Example

```
- Campaign name: TiDB Cloud Free Trial
- Core message: Launch a distributed database in 5 minutes, free for 7 days
- Target audience: Backend engineers and architects evaluating high-availability database solutions
- Key selling points:
  1. Deploy in 5 minutes — no infrastructure setup required
  2. Elastic auto-scaling — pay only for what you use
  3. MySQL-compatible — zero migration cost
- Primary CTA: Start for Free
- CTA link: /signup
- CTA section background: red
```
