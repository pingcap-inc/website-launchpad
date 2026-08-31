// Tailwind config for the design-sync bundle build.
//
// Two differences from the app's config:
//
//   1. The content glob also covers authored previews, so utility classes used
//      only in preview cards survive JIT purging.
//
//   2. A safelist for the design-token families. This is the important one:
//      JIT emits only classes the repo *currently uses*, but the design agent
//      composes new layouts and will reach for valid tokens that no existing
//      page happens to use (max-w-content-sm, border-border-strong, the full
//      brand ramp...). Without the safelist those classes resolve to nothing
//      and the design silently renders unstyled.
import type { Config } from 'tailwindcss'
import base from '../tailwind.config'

const config: Config = {
  ...base,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './.design-sync/previews/**/*.{ts,tsx}'],
  safelist: [
    // Semantic colour roles, across the properties that consume them.
    {
      pattern:
        /^(bg|text|border)-(bg|text|border|accent)-(primary|inverse|subtle|surface|secondary|strong|form)$/,
    },
    { pattern: /^(bg|text|border)-brand-(red|violet|blue|teal)-(primary|bg|dark|medium|light)$/ },
    { pattern: /^(bg|text|border)-brand-mango(-[1-8]00)?$/ },
    { pattern: /^(bg|text|border)-carbon(-[1-9]00)?$/ },
    { pattern: /^bg-gradient-dark-(top|bottom)$/ },
    // Type scale — each role carries its own size, leading and weight.
    {
      pattern:
        /^text-(h1|h1-mb|h2-lg|h2-md|h2-sm|h2-mb|h3-xl|h3-lg|h3-sm|body-2xl|body-xl|body-lg|body-md|body-sm|eyebrow|label)$/,
    },
    { pattern: /^font-(light|regular|medium|bold)$/ },
    // Layout widths.
    { pattern: /^max-w-(container|content-md|content-sm|hero-title|section-title|subtitle)$/ },
    'rounded-pill',
  ],
}

export default config
