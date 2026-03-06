import type { Metadata } from 'next'
import { Header, Footer, JsonLd, HeroSection, ColorCard } from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { GraduationCap, FlaskConical } from 'lucide-react'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'
import { IconLearnCourse, IconLearnDoing } from '../_components/icons'

export const metadata: Metadata = {
  title: 'Learn | TiDB Developer Hub',
  description:
    'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
  openGraph: {
    title: 'Learn | TiDB Developer Hub',
    description:
      'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
    url: 'https://www.pingcap.com/developers/learn/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn | TiDB Developer Hub',
    description:
      'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    site: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developers/learn/' },
}

const schema = buildPageSchema({
  path: '/developers/learn/',
  title: 'Learn | TiDB Developer Hub',
  description:
    'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developers/' },
    { name: 'Learn', path: '/developers/learn/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Learn | TiDB Developer Hub',
      description:
        'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
      url: '/developers/learn/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Beginner',
      dateModified: '2026-02-28',
    }),
  ],
})

const learnCards = [
  {
    title: 'Learn with Courses',
    description: 'Structured learning paths that explain how TiDB works from the inside out.',
    cta: {
      text: 'Explore Courses and Guided Learning',
      href: 'https://www.pingcap.com/education/',
    },
    variant: 'teal' as const,
    icon: <IconLearnCourse className="text-text-inverse" />,
  },
  {
    title: 'Learn by Doing',
    description: 'Hands-on labs that let you explore TiDB behavior in real environments.',
    cta: { text: 'Try Interactive Labs', href: 'https://www.pingcap.com/education/#labs' },
    variant: 'blue' as const,
    icon: <IconLearnDoing className="text-text-inverse" />,
  },
]

export default function LearnPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <div className="pt-[62px] lg:pt-20">
        <DeveloperSubnav />

        <main>
          <HeroSection
            layout="image-right"
            headline="Learn How TiDB Works"
            subheadline="Learn the core architecture concepts, validate compatibility assumptions, and evaluate performance characteristics through guided courses and hands-on labs."
            className="pb-10"
            heroImage={{
              src: '/images/developers/learn-banner.svg',
              alt: 'Learn Banner',
              width: 463,
              height: 332,
              align: 'right',
            }}
          />

          <section className="pb-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learnCards.map((card) => (
                  <ColorCard
                    key={card.title}
                    variant={card.variant}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    cta={card.cta}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  )
}
