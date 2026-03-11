import type { Metadata } from 'next'
import { Header, Footer, JsonLd, HeroSection, ColorCard } from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { GraduationCap, FlaskConical } from 'lucide-react'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'

export const metadata: Metadata = {
  title: 'Learn | PingCAP Developer Hub',
  description:
    'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
  openGraph: {
    title: 'Learn | PingCAP Developer Hub',
    description:
      'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
    url: 'https://www.pingcap.com/developer/learn/',
    siteName: 'PingCAP',
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
    title: 'Learn | PingCAP Developer Hub',
    description:
      'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developer/learn/' },
}

const schema = buildPageSchema({
  path: '/developer/learn/',
  title: 'Learn | PingCAP Developer Hub',
  description:
    'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developer/' },
    { name: 'Learn', path: '/developer/learn/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Learn | PingCAP Developer Hub',
      description:
        'Learn core TiDB architecture, validate assumptions, and evaluate performance through courses and hands-on labs.',
      url: '/developer/learn/',
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
      text: 'Explore courses and guided learning',
      href: 'https://www.pingcap.com/education/',
    },
    variant: 'teal' as const,
    icon: <GraduationCap size={36} className="text-text-inverse" />,
  },
  {
    title: 'Learn by Doing',
    description: 'Hands-on labs that let you explore TiDB behavior in real environments.',
    cta: { text: 'Try interactive labs', href: 'https://www.pingcap.com/education/#labs' },
    variant: 'blue' as const,
    icon: <FlaskConical size={36} className="text-text-inverse" />,
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
            headline="Learn How TiDB Works"
            subheadline="Learn the core architecture concepts, validate compatibility assumptions, and evaluate performance characteristics through guided courses and hands-on labs."
            className="pb-10"
            rightSlot={
              <div className="hidden lg:flex justify-center items-start pt-10">
                <p className="text-brand-red-light text-h3-sm italic">
                  Illustrations to be updated
                </p>
              </div>
            }
          />

          <section className="pb-section-sm lg:pb-section bg-bg-primary">
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
