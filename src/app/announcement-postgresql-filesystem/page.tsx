import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'New in Public Preview: PostgreSQL Support & TiDB Cloud Filesystem',
  description:
    'Announcing two powerful new features in public preview: native PostgreSQL support for flexible database compatibility and TiDB Cloud Filesystem for seamless cloud storage integration with your TiDB cluster.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/announcement-postgresql-filesystem/' },
  openGraph: {
    title: 'New in Public Preview: PostgreSQL Support & TiDB Cloud Filesystem',
    description:
      'Announcing two powerful new features in public preview: native PostgreSQL support for flexible database compatibility and TiDB Cloud Filesystem for seamless cloud storage integration with your TiDB cluster.',
    url: 'https://www.pingcap.com/announcement-postgresql-filesystem/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png'],
  },
}

const schema = buildPageSchema({
  path: '/announcement-postgresql-filesystem/',
  title: 'New in Public Preview: PostgreSQL Support & TiDB Cloud Filesystem',
  description:
    'Announcing two powerful new features in public preview: native PostgreSQL support for flexible database compatibility and TiDB Cloud Filesystem for seamless cloud storage integration with your TiDB cluster.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: '<span class="text-gradient-violet animate-glow-sweep">PostgreSQL Support & <br>TiDB Cloud Filesystem</span>',
      path: '/announcement-postgresql-filesystem/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'New in Public Preview: PostgreSQL Support & TiDB Cloud Filesystem',
  meta: {
    title: 'New in Public Preview: PostgreSQL Support & TiDB Cloud Filesystem',
    description:
      'Announcing two powerful new features in public preview: native PostgreSQL support for flexible database compatibility and TiDB Cloud Filesystem for seamless cloud storage integration with your TiDB cluster.',
    canonical: '/announcement-postgresql-filesystem/',
    unlisted: true,
    createdBy: 'a.hire@pingcap.com',
    createdAt: '2026-10-15T02:59:44.645Z',
    modifiedBy: 'a.hire@pingcap.com',
    modifiedAt: '2026-10-15T02:59:44.645Z',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'New in Public Preview',
        headline:
          '<span class="text-gradient-violet animate-glow-sweep">PostgreSQL Support & <br>TiDB Cloud Filesystem</span>',
        subheadline:
          'Two groundbreaking features now available in public preview: native PostgreSQL compatibility and seamless cloud storage integration for your TiDB clusters.',
        primaryCta: {
          text: '',
          href: '',
        },
        secondaryCta: {
          text: '',
          href: '',
        },
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg',
          },
          alt: 'hero image',
          width: 500,
          height: 400,
        },
      },
      style: {
        spacing: 'hero',
      },
    },
    {
      id: 'featureHighlights-1792032715656',
      type: 'featureHighlights',
      props: {
        eyebrow: 'Getting Started',
        title: 'Unlock New Possibilities',
        subtitle: 'Both features are available now in public preview for all TiDB Cloud users',
        items: [
          {
            variant: 'violet',
            title: 'PostgreSQL Support',
            description:
              'Enable PostgreSQL protocol support in minutes through your TiDB Cloud console and connect using your preferred PostgreSQL client.\nRun existing queries and applications while monitoring performance and compatibility from the console.',
            cta: {
              text: 'Start Here',
              href: 'https://www.pingcap.com/tidb-cloud-starter/',
            },
            icon: 'Code2',
          },
          {
            variant: 'violet',
            title: ' TiDB Cloud Filesystem',
            description:
              'Connect your S3-compatible storage to TiDB Cloud and query Parquet, CSV, and JSON files using standard SQL.\nSeamlessly join cloud data with database tables and optimize query performance with filesystem-specific options.',
            cta: {
              text: 'Learn More',
              href: 'https://www.pingcap.com/tidb/tidb-cloud-filesystem/',
            },
            icon: 'Layers',
          },
        ],
        columns: 2,
      },
      style: {
        background: 'primary',
        spacing: 'section',
      },
    },
  ],
}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
