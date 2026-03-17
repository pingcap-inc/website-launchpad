/**
 * Converts a PageDSL object into a complete Next.js page.tsx string.
 * This is used at publish time — never at runtime.
 */
import type {
  PageDSL,
  SectionNode,
  FeatureGridNode,
  FeatureCardNode,
  StatsNode,
  HeroNode,
  CtaNode,
  FaqNode,
  FormNode,
  LogoCloudNode,
  TestimonialsNode,
  FeatureTabsNode,
  IconName,
} from './dsl-schema'

// JSON.stringify all user strings — handles quotes, backslashes, newlines
// Also normalize " (from double-escaped HTML) back to a literal quote.
const normalizeString = (s?: string | null) => (s ?? '').replace(/\\"/g, '"')
const e = (s?: string | null) => JSON.stringify(normalizeString(s))

// Determine which section components are needed
function requiredImports(sections: SectionNode[]): string[] {
  const types = new Set(sections.map((s) => s.type))
  const imports: string[] = []
  if (types.has('hero'))
    imports.push("import { HeroSection } from '@/components/sections/HeroSection'")
  if (types.has('stats'))
    imports.push("import { StatsSection } from '@/components/sections/StatsSection'")
  if (types.has('featureGrid'))
    imports.push("import { FeatureGridSection } from '@/components/sections/FeatureGridSection'")
  if (types.has('featureCard'))
    imports.push("import { FeatureCardSection } from '@/components/sections/FeatureCardSection'")
  if (types.has('featureTabs'))
    imports.push("import { FeatureTabsSection } from '@/components/sections/FeatureTabsSection'")
  if (types.has('logoCloud'))
    imports.push("import { LogoCloudSection } from '@/components/sections/LogoCloudSection'")
  if (types.has('testimonials'))
    imports.push("import { TestimonialsSection } from '@/components/sections/TestimonialsSection'")
  if (types.has('faq'))
    imports.push("import { FaqSection } from '@/components/sections/FaqSection'")
  if (types.has('cta'))
    imports.push("import { CtaSection } from '@/components/sections/CtaSection'")
  if (types.has('form')) {
    imports.push("import { LazyHubSpotForm } from '@/components/ui/LazyHubSpotForm'")
    imports.push("import { SectionHeader } from '@/components/ui/SectionHeader'")
  }
  const hasHeroForm = sections.some((s) => s.type === 'hero' && (s as HeroNode).heroForm)
  if (hasHeroForm) {
    imports.push("import { HubSpotForm } from '@/components/ui/HubSpotForm'")
  }
  return imports
}

// Collect all lucide icon names used in the DSL (image paths are excluded)
function usedIcons(sections: SectionNode[]): IconName[] {
  const names = new Set<IconName>()
  for (const s of sections) {
    if (s.type === 'featureGrid' || s.type === 'featureCard') {
      s.items.forEach((f) => {
        if (f.icon && !f.icon.startsWith('/') && !f.icon.startsWith('http')) {
          names.add(f.icon as IconName)
        }
      })
    }
    if (s.type === 'stats') {
      s.items.forEach((i) => {
        if (i.icon && !i.icon.startsWith('/') && !i.icon.startsWith('http')) {
          names.add(i.icon as IconName)
        }
      })
    }
  }
  return [...names]
}

/** Generates the JSX for a single icon field (lucide or image). */
function iconJsx(icon?: string): string {
  if (!icon) return ''
  if (icon.startsWith('/') || icon.startsWith('http')) {
    // eslint-disable-next-line quotes
    return `/* eslint-disable-next-line @next/next/no-img-element */ <img src=${e(icon)} alt="" className="object-contain" />`
  }
  return `<${icon} className="" strokeWidth={1.5} />`
}

// ─── Section JSX generators ──────────────────────────────────────────────────

function heroJsx(n: HeroNode): string {
  const heroImageProp = n.heroImage
    ? `          heroImage={{ src: ${e(n.heroImage.src)}, alt: ${e(n.heroImage.alt ?? '')}, width: ${n.heroImage.width}, height: ${n.heroImage.height}${n.heroImage.align ? `, align: ${e(n.heroImage.align)}` : ''} }}`
    : null
  const bgImageProp = n.backgroundImage
    ? `          backgroundImage={{ src: ${e(n.backgroundImage.src)}, alt: ${e(n.backgroundImage.alt ?? '')}${n.backgroundImage.opacityClassName ? `, opacityClassName: ${e(n.backgroundImage.opacityClassName)}` : ''} }}`
    : null
  const effectiveLayout = n.heroForm ? 'split' : n.layout
  const rightSlotProp = n.heroForm
    ? `          rightSlot={
            <HubSpotForm
              formId=${e(n.heroForm.formId)}
              portalId=${e(n.heroForm.portalId ?? '4466002')}
              region=${e(n.heroForm.region ?? 'na1')}
            />
          }`
    : null
  const lines = [
    `        <HeroSection`,
    effectiveLayout ? `          layout=${e(effectiveLayout)}` : null,
    n.eyebrow ? `          eyebrow=${e(n.eyebrow)}` : null,
    `          headline={${e(n.headline)}}`,
    n.subheadline ? `          subheadline=${e(n.subheadline)}` : null,
    n.primaryCta
      ? `          primaryCta={{ text: ${e(n.primaryCta.text)}, href: ${e(n.primaryCta.href)} }}`
      : null,
    n.secondaryCta
      ? `          secondaryCta={{ text: ${e(n.secondaryCta.text)}, href: ${e(n.secondaryCta.href)} }}`
      : null,
    heroImageProp,
    bgImageProp,
    rightSlotProp,
    `        />`,
  ]
  return lines.filter(Boolean).join('\n')
}

function statsJsx(n: StatsNode): string {
  const items = n.items
    .map((s) => {
      const icon = s.icon ? `icon: ${iconJsx(s.icon)}, ` : ''
      return `          { ${icon}value: ${e(s.value)}, label: ${e(s.label)}${s.description ? `, description: ${e(s.description)}` : ''} }`
    })
    .join(',\n')
  const cols = n.columns ?? Math.min(n.items.length, 4)
  return `        <StatsSection
${n.title ? `          title=${e(n.title)}\n` : ''}\
${n.subtitle ? `          subtitle=${e(n.subtitle)}\n` : ''}\
          stats={[
${items}
          ]}
          columns={${cols}}
        />`
}

function featureGridJsx(n: FeatureGridNode): string {
  const items = n.items
    .map((f) => {
      const icon = f.icon ? `icon: ${iconJsx(f.icon)}, ` : ''
      const legacyHref = (f as { href?: string }).href
      const cta = f.cta
        ? `, cta: { text: ${e(f.cta.text)}, href: ${e(f.cta.href)} }`
        : legacyHref
          ? `, cta: { text: ${e('Learn More')}, href: ${e(legacyHref)} }`
          : ''
      return `          { ${icon}title: ${e(f.title)}, description: ${e(f.description)}${cta} }`
    })
    .join(',\n')
  const cols = n.columns ?? (n.items.length <= 2 ? 2 : n.items.length <= 4 ? 3 : 4)
  return `        <FeatureGridSection
${n.eyebrow ? `          eyebrow=${e(n.eyebrow)}\n` : ''}\
          title=${e(n.title)}
${n.subtitle ? `          subtitle=${e(n.subtitle)}\n` : ''}\
          features={[
${items}
          ]}
          columns={${cols}}
        />`
}

function featureCardJsx(n: FeatureCardNode): string {
  const items = n.items
    .map((f) => {
      const icon = f.icon ? `icon: ${iconJsx(f.icon)}, ` : ''
      const href = f.href ? `, href: ${e(f.href)}` : ''
      return `          { ${icon}title: ${e(f.title)}, description: ${e(f.description)}${href} }`
    })
    .join(',\n')
  const cols = n.columns ?? 2
  return `        <FeatureCardSection
${n.eyebrow ? `          eyebrow=${e(n.eyebrow)}\n` : ''}\
          title=${e(n.title)}
${n.subtitle ? `          subtitle=${e(n.subtitle)}\n` : ''}\
          items={[
${items}
          ]}
          columns={${cols}}
        />`
}

function featureTabsJsx(n: FeatureTabsNode): string {
  const tabs = n.tabs
    .map((t) => {
      return `          {
            id: ${e(t.id)},
            label: ${e(t.label)},
            ${t.description ? `description: ${e(t.description)},` : ''}
            ${t.bullets ? `bullets: [${t.bullets.map(e).join(', ')}],` : ''}
            ${t.primaryCta ? `primaryCta: { text: ${e(t.primaryCta.text)}, href: ${e(t.primaryCta.href)} },` : ''}
            image: { src: ${e(t.image.src)}, alt: ${e(t.image.alt)}, width: ${t.image.width}, height: ${t.image.height} },
          }`
    })
    .join(',\n')
  return `        <FeatureTabsSection
          title=${e(n.title)}
${n.eyebrow ? `          eyebrow=${e(n.eyebrow)}\n` : ''}\
${n.subtitle ? `          subtitle=${e(n.subtitle)}\n` : ''}\
          tabs={[
${tabs}
          ]}
          autoSwitch={${n.autoSwitch ?? true}}
          autoSwitchInterval={${n.autoSwitchInterval ?? 6000}}
        />`
}

function logoCloudJsx(n: LogoCloudNode): string {
  const logos = n.logos
    .map(
      (l) =>
        `          { name: ${e(l.name)}, src: ${e(l.src)}${l.href ? `, href: ${e(l.href)}` : ''} }`
    )
    .join(',\n')
  return `        <LogoCloudSection
${n.title ? `          title=${e(n.title)}\n` : ''}\
${n.eyebrow ? `          eyebrow=${e(n.eyebrow)}\n` : ''}\
          logos={[
${logos}
          ]}
          variant="${n.variant ?? 'default'}"
          autoScroll={${n.autoScroll ?? true}}
        />`
}

function testimonialsJsx(n: TestimonialsNode): string {
  const items = n.items
    .map((t) => {
      const logo = t.logo
        ? `, logo: { src: ${e(t.logo.src)}, alt: ${e(t.logo.alt)}${t.logo.size ? `, size: ${t.logo.size}` : ''} }`
        : ''
      const href = t.href ? `, href: ${e(t.href)}` : ''
      const cta = t.cta ? `, cta: ${e(t.cta)}` : ''
      return `          { quote: ${e(t.quote)}, author: ${e(t.author)}${href}${cta}${logo} }`
    })
    .join(',\n')
  return `        <TestimonialsSection
${n.eyebrow ? `          eyebrow=${e(n.eyebrow)}\n` : ''}\
          title=${e(n.title)}
          testimonials={[
${items}
          ]}
        />`
}

function faqJsx(n: FaqNode): string {
  const items = n.items.map((f) => `          { q: ${e(f.q)}, a: ${e(f.a)} }`).join(',\n')
  return `        <FaqSection
${n.title ? `          title=${e(n.title)}\n` : ''}\
          items={[
${items}
          ]}
        />`
}

function ctaJsx(n: CtaNode): string {
  const bg = n.background ?? 'red'
  return `        <CtaSection
          title=${e(n.title)}
${n.subtitle ? `          subtitle=${e(n.subtitle)}\n` : ''}\
          background="${bg}"
          primaryCta={{ text: ${e(n.primaryCta.text)}, href: ${e(n.primaryCta.href)} }}
${n.secondaryCta ? `          secondaryCta={{ text: ${e(n.secondaryCta.text)}, href: ${e(n.secondaryCta.href)} }}\n` : ''}\
        />`
}

function formJsx(n: FormNode): string {
  return `        <section className="py-section bg-bg-primary">
          <div className="px-container max-w-container mx-auto max-w-lg">
${n.title ? `            <SectionHeader title=${e(n.title)}${n.subtitle ? ` subtitle=${e(n.subtitle)}` : ''} className="mb-8" />\n` : ''}\
            <LazyHubSpotForm
              portalId=${e(n.portalId)}
              formId=${e(n.formId)}
              region=${e(n.region ?? 'na1')}
            />
          </div>
        </section>`
}

function sectionToJsx(node: SectionNode): string {
  switch (node.type) {
    case 'hero':
      return heroJsx(node)
    case 'stats':
      return statsJsx(node)
    case 'featureGrid':
      return featureGridJsx(node)
    case 'featureCard':
      return featureCardJsx(node)
    case 'featureTabs':
      return featureTabsJsx(node)
    case 'logoCloud':
      return logoCloudJsx(node)
    case 'testimonials':
      return testimonialsJsx(node)
    case 'faq':
      return faqJsx(node)
    case 'cta':
      return ctaJsx(node)
    case 'form':
      return formJsx(node)
    default:
      return ''
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function dslToTsx(dsl: PageDSL, slug: string): string {
  const { meta, sections } = dsl
  const path = meta.canonical.startsWith('/') ? meta.canonical : `/${meta.canonical}`
  const pageTitle = meta.title
  const pageDesc = meta.description

  const sectionImports = requiredImports(sections).join('\n')
  const icons = usedIcons(sections)
  const iconImport = icons.length > 0 ? `import { ${icons.join(', ')} } from 'lucide-react'\n` : ''

  const sectionsJsx = sections.map(sectionToJsx).filter(Boolean).join('\n')

  const heroNode = sections.find((s) => s.type === 'hero') as HeroNode | undefined
  const pageHeadline = heroNode?.headline ?? slug

  return `import type { Metadata } from 'next'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
${sectionImports}
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
${iconImport}
export const metadata: Metadata = {
  title: ${e(pageTitle)},
  description: ${e(pageDesc)},
  robots: { index: ${meta.noindex ? 'false' : 'true'}, follow: true },
  alternates: { canonical: 'https://www.pingcap.com${path}' },
  openGraph: {
    title: ${e(pageTitle)},
    description: ${e(pageDesc)},
    url: 'https://www.pingcap.com${path}',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
}

const schema = buildPageSchema({
  path: ${e(path)},
  title: ${e(pageTitle)},
  description: ${e(pageDesc)},
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: ${e(pageHeadline)}, path: ${e(path)} },
  ],
})

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
${sectionsJsx}
      </main>
      <Footer />
    </>
  )
}
`
}
