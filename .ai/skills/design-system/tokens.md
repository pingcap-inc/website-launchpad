# Design Tokens

## Colors

### Brand Colors

| Tailwind Class | Value | Usage |
|----------------|-------|-------|
| `bg/text-brand-red-primary` | `#DC150B` | **Primary accent · PrimaryButton flood** |
| `bg-brand-red-dark` | `#87120C` | PrimaryButton hover fallback |
| `bg-brand-red-light` | `#F35048` | Highlights / icons |
| `bg-brand-red-bg` | `#630D09` | CTA section dark background (red) |
| `bg-brand-violet-bg/dark/medium/light` | `#3C174C / #5D137D / #9E4EC4 / #C76FF2` | AI / analytics scenarios |
| `bg-brand-blue-bg/dark/medium/light` | `#0D3152 / #10487B / #2C80CE / #509DEA` | Cloud-native scenarios |
| `bg-brand-teal-bg/dark/medium/light` | `#093434 / #0F5353 / #1AA8A8 / #50DBD9` | Data / success scenarios |

### Carbon (Neutral Scale)

| Class | Value | Class | Value |
|-------|-------|-------|-------|
| `carbon-default` | `#051B2C` | `carbon-500` | `#8B96A2` |
| `carbon-100` | `#E5E8EB` | `carbon-600` | `#74808B` |
| `carbon-200` | `#CBD1D7` | `carbon-700` | `#5D6974` |
| `carbon-300` | `#B9C2CA` | `carbon-800` | `#424D57` |
| `carbon-400` | `#A2ADB9` | | |

### Semantic Colors

| Tailwind Class | Value | Usage |
|----------------|-------|-------|
| `bg-bg-primary` | `#000000` | Default page background |
| `bg-bg-inverse` | `#000000` | Hero · dark sections |
| `bg-bg-subtle` | `#E5E8EB` | Secondary light sections |
| `text-text-primary` | `#000000` | Text on light backgrounds |
| `text-text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `border-border-subtle` | `#CBD1D7` | Default border |
| `border-border-strong` | `#A2ADB9` | Emphasis border |
| `text/bg-accent-primary` | `#DC150B` | Global accent color |

### Background Usage Rules

| Context | Class |
|---------|-------|
| **Default page background** | `bg-bg-primary` (`#000000`) |
| **Hero / dark sections** | `bg-bg-inverse` (`#000000`), **no gradients** |
| **CTA Section** | One of: `bg-brand-red-bg` / `bg-brand-violet-bg` / `bg-brand-blue-bg` / `bg-brand-teal-bg` |
| Other dark content sections | `bg-gradient-dark-top` or `bg-gradient-dark-bottom` |
| Light sections | `bg-white` or `bg-bg-subtle` (`#E5E8EB`) |
| Secondary sections | `bg-bg-subtle` (`#E5E8EB`) |

Gradients (only for dark sections that are **not** Hero or CTA):
- `gradient-dark-top`: `linear-gradient(180deg, #06111A 0%, #000000 100%)`
- `gradient-dark-bottom`: `linear-gradient(180deg, #000000 0%, #06111A 100%)`

> `#06111A` is only valid as a gradient endpoint. Never use it as a solid background.

---

## Typography

**CDN Loading (local files and Google Fonts are forbidden):**

| Weight | URL |
|--------|-----|
| 300 | `https://static.pingcap.com/dist/fonts/moderat/Moderat-Light.woff2` |
| 400 | `https://static.pingcap.com/dist/fonts/moderat/Moderat-Regular.woff2` |
| 500 | `https://static.pingcap.com/dist/fonts/moderat/Moderat-Medium.woff2` |
| 700 | `https://static.pingcap.com/dist/fonts/moderat/Moderat-Bold.woff2` |
| Mono 400 | `https://static.pingcap.com/dist/fonts/moderat-mono/Moderat-Mono-Regular.woff2` |

> `600` (semibold) is forbidden — no CDN file exists, causing browser font synthesis and rendering artifacts.

**Mono usage**: Eyebrow · Labels · Stats · Technical specs · Code. Never use Mono for body text.

**Type Scale:**

| Role | Desktop | Mobile | Weight | Line Height | Font |
|------|---------|--------|--------|-------------|------|
| Eyebrow | 15px | 15px | 400 | 1.3 | **Mono** |
| H1 | 68px | 48px | 700 | 1.1 | Sans |
| H2-lg | 64px | 40px | 700 | 1.1 | Sans |
| H2-md | 56px | 40px | 700 | 1.1 | Sans |
| H2-sm | 50px | 40px | 700 | 1.1 | Sans |
| H3 | 24px / 20px | same | 700 | 1.3 | Sans |
| Body-xl | 22px | 22px | 400 | 1.4 | Sans |
| Body-lg | 18px | 18px | 400 | 1.4 | Sans |
| Body-md | 16px | 16px | 400 | 1.4 | Sans |
| Body-sm / Code | 14px | 14px | 400 | 1.4 | Sans / Mono |
| Label / Badge | 12px | 12px | 500 | 1.3 | **Mono** |

H2 size selection: `64px` for the single most prominent section per page · `56px` for primary feature modules (default) · `50px` for dense information sections.  
H3: `24px` for visually prominent cards · `20px` for 3-column+ dense grids.

---

## Spacing

Allowed values (Tailwind `0/1/2/3/4/5/6/8/10/12/16/20`): `0 4 8 12 16 20 24 32 40 48 64 80px`

Section padding: desktop `py-section` (80px) · mobile `md:py-section-sm` (48px)

---

## tailwind.config.ts

```ts
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red:    { bg:'#630D09', dark:'#87120C', primary:'#DC150B', light:'#F35048' },
          violet: { bg:'#3C174C', dark:'#5D137D', medium:'#9E4EC4', light:'#C76FF2' },
          blue:   { bg:'#0D3152', dark:'#10487B', medium:'#2C80CE', light:'#509DEA' },
          teal:   { bg:'#093434', dark:'#0F5353', medium:'#1AA8A8', light:'#50DBD9' },
        },
        carbon: { default:'#051B2C', 100:'#E5E8EB',200:'#CBD1D7',300:'#B9C2CA',400:'#A2ADB9',500:'#8B96A2',600:'#74808B',700:'#5D6974',800:'#424D57' },
        bg:     { primary:'#000000', inverse:'#000000', subtle:'#E5E8EB' },
        text:   { primary:'#000000', inverse:'#FFFFFF' },
        border: { subtle:'#CBD1D7', strong:'#A2ADB9' },
        accent: { primary:'#DC150B' },
      },
      backgroundImage: {
        'gradient-dark-top':    'linear-gradient(180deg, #06111A 0%, #000000 100%)',
        'gradient-dark-bottom': 'linear-gradient(180deg, #000000 0%, #06111A 100%)',
      },
      fontFamily: {
        sans: ['var(--font-moderat)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-moderat-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'eyebrow': ['15px', { lineHeight:'1.3', fontWeight:'400' }],
        'h1':      ['68px', { lineHeight:'1.1', fontWeight:'700' }],
        'h1-mb':   ['48px', { lineHeight:'1.1', fontWeight:'700' }],
        'h2-lg':   ['64px', { lineHeight:'1.1', fontWeight:'700' }],
        'h2-md':   ['56px', { lineHeight:'1.1', fontWeight:'700' }],
        'h2-sm':   ['50px', { lineHeight:'1.1', fontWeight:'700' }],
        'h2-mb':   ['40px', { lineHeight:'1.1', fontWeight:'700' }],
        'h3-lg':   ['24px', { lineHeight:'1.3', fontWeight:'700' }],
        'h3-sm':   ['20px', { lineHeight:'1.3', fontWeight:'700' }],
        'body-xl': ['22px', { lineHeight:'1.4', fontWeight:'400' }],
        'body-lg': ['18px', { lineHeight:'1.4', fontWeight:'400' }],
        'body-md': ['16px', { lineHeight:'1.4', fontWeight:'400' }],
        'body-sm': ['14px', { lineHeight:'1.4', fontWeight:'400' }],
        'label':   ['12px', { lineHeight:'1.3', fontWeight:'500' }],
      },
      fontWeight: { light:'300', regular:'400', medium:'500', bold:'700' },
      lineHeight: { tight:'1.1', normal:'1.3', relaxed:'1.4' },
      spacing: {
        '0':'0px','1':'4px','2':'8px','3':'12px','4':'16px','5':'20px',
        '6':'24px','8':'32px','10':'40px','12':'48px','16':'64px','20':'80px',
        'section':'80px','section-sm':'48px','container':'40px',
      },
      maxWidth: { 'container':'1502px', 'hero-title':'860px', 'subtitle':'640px' },
      borderRadius: { 'pill':'9999px' },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.08)',
        'cta':        '0 4px 16px rgba(220,21,11,0.30)',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face { font-family:'Moderat'; src:url('https://static.pingcap.com/dist/fonts/moderat/Moderat-Light.woff2') format('woff2'); font-weight:300; font-display:swap; }
@font-face { font-family:'Moderat'; src:url('https://static.pingcap.com/dist/fonts/moderat/Moderat-Regular.woff2') format('woff2'); font-weight:400; font-display:swap; }
@font-face { font-family:'Moderat'; src:url('https://static.pingcap.com/dist/fonts/moderat/Moderat-Medium.woff2') format('woff2'); font-weight:500; font-display:swap; }
@font-face { font-family:'Moderat'; src:url('https://static.pingcap.com/dist/fonts/moderat/Moderat-Bold.woff2') format('woff2'); font-weight:700; font-display:swap; }
@font-face { font-family:'Moderat Mono'; src:url('https://static.pingcap.com/dist/fonts/moderat-mono/Moderat-Mono-Regular.woff2') format('woff2'); font-weight:400; font-display:swap; }

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply font-sans antialiased; }
}
```

## layout.tsx

```tsx
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="preconnect" href="https://static.pingcap.com" /></head>
      <body className="font-sans bg-bg-primary text-text-inverse antialiased">
        {children}
      </body>
    </html>
  )
}
```

## lib/utils.ts

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```
