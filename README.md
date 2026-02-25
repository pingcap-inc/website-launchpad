# website-launchpad

> Marketing pages and landing pages powered by Next.js + Tailwind CSS.  
> Business teams use AI to generate pages. Tech team maintains the design system.

---

## Stack

- **Next.js 14+** — App Router, SSG/SSR, Image optimization
- **Tailwind CSS v3** — Design Token–based utility classes
- **TypeScript** — Strict mode
- **Vercel** — Deployment & preview URLs

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── marketing/            # Product pages & SEO content pages
│   └── lp/                   # Landing pages (campaign-specific)
├── components/
│   ├── ui/                   # Base components (Button, Card, etc.)
│   └── sections/             # Page sections (Hero, Features, CTA)
├── styles/
│   └── globals.css           # Font loading + Tailwind base
└── lib/
    └── utils.ts              # cn() utility

.ai/
├── skills/
│   ├── design-system/        # Design system specification for AI
│   └── seo/                  # SEO specification for AI
├── prompts/                  # Page generation prompt templates
│   ├── landing-page.md       # ← Business teams start here
│   ├── product-page.md
│   └── seo-page.md
└── context/
    └── brand.md              # Brand voice & naming rules
```

---

## For Business Teams: Creating a New Page

### Step 1 — Choose your page type

| Page Type | Template | Output Path |
|-----------|----------|-------------|
| Campaign landing page | `.ai/prompts/landing-page.md` | `src/app/lp/[slug]/page.tsx` |
| Product introduction | `.ai/prompts/product-page.md` | `src/app/marketing/[slug]/page.tsx` |
| SEO content page | `.ai/prompts/seo-page.md` | `src/app/marketing/[slug]/page.tsx` |

### Step 2 — Fill in the prompt template

Open the relevant file in `.ai/prompts/`, copy the prompt, and fill in the `【】` placeholders.

### Step 3 — Generate with AI

Paste the filled prompt into Claude or Cursor. The AI will output a complete `page.tsx` file.

### Step 4 — Preview & publish

Create the file at the specified path, then:

```bash
# Local preview
npm run dev

# Deploy (push to main branch → Vercel auto-deploys)
git add .
git commit -m "add: [page name]"
git push
```

---

## For Tech Team: Adding New Components

1. Read `.ai/skills/design-system/SKILL.md` before starting
2. Build the component in `src/components/ui/` or `src/components/sections/`
3. Export it from `src/components/index.ts`
4. Update `.ai/skills/design-system/components.md` with usage documentation
5. AI-generated pages will automatically be able to use the new component

---

## Deployment

Connected to Vercel. Every push to `main` triggers a production deploy.  
Pull requests automatically get preview URLs.

```bash
# Production
git push origin main

# Preview (automatic on PR)
git push origin feature/my-page
```
