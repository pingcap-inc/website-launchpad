import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'Persistent Context for AI Agents | TiDB',
  description:
    'TiDB Cloud gives long-running agents a durable state layer for checkpoints, memory records, operational data, and vectors.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/solutions/ai-agent-context/' },
  openGraph: {
    title: 'Persistent Context for AI Agents | TiDB',
    description:
      'TiDB Cloud gives long-running agents a durable state layer for checkpoints, memory records, operational data, and vectors.',
    url: 'https://www.pingcap.com/solutions/ai-agent-context/',
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
  path: '/solutions/ai-agent-context/',
  title: 'Persistent Context for AI Agents | TiDB',
  description:
    'TiDB Cloud gives long-running agents a durable state layer for checkpoints, memory records, operational data, and vectors.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: "Agents are Ephemeral. Their State Shouldn't Be.",
      path: '/solutions/ai-agent-context/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'Persistent Context for AI Agents | TiDB',
  meta: {
    title: 'Persistent Context for AI Agents | TiDB',
    description:
      'TiDB Cloud gives long-running agents a durable state layer for checkpoints, memory records, operational data, and vectors.',
    canonical: '/solutions/ai-agent-context/',
  },
  sections: [
    {
      id: 'hero-01',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'Persistent Context for AI Agents',
        headline: "Agents are Ephemeral. Their State Shouldn't Be.",
        subheadline:
          'TiDB Cloud gives long-running agents a durable state layer for checkpoints, memory records, operational data, and vectors. Agents can resume work across sessions and runtime restarts',
        primaryCta: {
          text: 'Start Free on TiDB Cloud',
          href: 'https://tidbcloud.com/free-trial/',
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
        backgroundEffect: 'agent-memory',
      },
    },
    {
      id: 'columns-1782897376614',
      type: 'columns',
      props: {
        eyebrow: 'The Context Problem',
        title: 'Why Agents Need Memory That Lasts',
        subtitle:
          'Context is everything an agent needs to do its work. Memory is the part that carries useful information forward from earlier interactions. Short-term memory supports the current task or conversation. Persistent memory preserves preferences, prior decisions, task history, and tool results across sessions and workflows. Without a durable data layer underneath it, agents repeat work, lose progress, and struggle to resume tasks they already started.',
        titleFullWidth: true,
        layout: 'split',
        mediaType: 'shortcode',
        shortCode: '[agent-memory-timeline]',
      },
      style: {
        background: 'primary',
        spacing: 'section',
      },
    },
    {
      id: 'problem-01',
      type: 'featureMedia',
      props: {
        eyebrow: 'From Prototype to Production',
        title: 'Agent Context Gets Harder in Production',
        subtitle:
          'Using a different tool for each job can work at first. The pressure shows up in production, when state has to stay in sync across systems, task outlive runtimes, and agents or tenants need their own data boundaries. ',
        items: [
          {
            title: 'Agent State Gets Split Across Systems',
            description:
              'Many agent stacks use one system for semantic search, another for session state, and another for long-lived context. This adds latency, creates more failure points, and makes it harder to debug what the agent saw and did.',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/624ba90e-fragment-reveal.mp4',
                alt: 'fragment reveal',
                width: 1326,
                height: 772,
              },
              alt: 'fragment reveal',
              width: 1326,
              height: 772,
            },
          },
          {
            title: 'The Runtime Ends Before the Work Does',
            description:
              "Sandboxes, sessions, and processes can end while a task is still in progress. If the agent's plan, tool results, and checkpoint are not stored durably, it may repeat work, waste model spend, or fail to resume safely.",
            image: {
              image: {
                url: 'https://static.pingcap.com/images/9d28be2a-execution-reset.mp4',
                alt: 'execution reset',
                width: 1324,
                height: 624,
              },
              alt: 'execution reset',
              width: 1324,
              height: 624,
            },
          },
          {
            title: 'Isolation Gets Expensive at Agent Scale',
            description:
              'Each agent, tenant, or workspace may need its own data boundary. Running dedicated infrastructure for every environment becomes expensive as they multiply, especially when many are short-lived or mostly idle.',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/5c5c71d9-isolation-cost.mp4',
                alt: 'isolation cost',
                width: 1324,
                height: 526,
              },
              alt: 'isolation cost',
              width: 1324,
              height: 526,
            },
          },
        ],
        startPosition: 'left',
        spacing: 'xl',
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'columns-1782897431316',
      type: 'columns',
      props: {
        eyebrow: 'Unified Infrastructure',
        title: 'A Persistent State Layer for the Agent Stack You Already Use',
        subtitle:
          'Keep your model, framework, standbox, and memory systems. TiDB Cloud gives your stack one durable place to store and query checkpoints, memory records, operational data, and vectors. ',
        titleFullWidth: true,
        layout: 'single',
        mediaType: 'shortcode',
        image: {
          image: {
            url: 'https://static.pingcap.com/images/6eab39b0-one-engine-e.mp4',
            alt: 'one engine e',
            width: 1920,
            height: 1720,
          },
          alt: 'one engine e',
          width: 1000,
          height: 1720,
        },
        shortCode: '[tidb-persistent-layer-animation]',
      },
      style: {
        background: 'primary',
        spacing: 'section',
        removePaddingBottom: true,
      },
    },
    {
      id: 'solution-01',
      type: 'featureGrid',
      props: {
        eyebrow: '',
        title: '',
        subtitle: '',
        items: [
          {
            icon: 'Database',
            title: 'Persistent, Queryable Memory',
            description:
              'Agents write conversation turns, preferences, facts, and decisions to TiDB Cloud. That memory persists across sessions, stays queryable, and can be accessed by other agents in the same workflow. TiDB keeps checkpoints consistent with the application data the agent changed, so the agent can resume from reliable state.',
            cta: {
              text: 'Explore TiDB Cloud',
              href: 'https://www.pingcap.com/tidb/cloud/',
            },
          },
          {
            icon: 'Shield',
            title: 'Agent and Tenant Isolation ',
            description:
              "TiDB Cloud's distributed architecture separates logical isolation from physical infrastructure. Each agent gets its own database with hard data boundaries, while the underlying compute and storage are shared across the cluster.",
            cta: {
              text: 'View Architecture',
              href: 'https://docs.pingcap.com/',
            },
          },
          {
            icon: 'Search',
            title: 'Unified Query Layer for Memory and Analytics',
            description:
              "On TiDB Cloud, a support agent can query a customer's account tier, open tickets, and semantically similar past conversations in one SQL statement. TiFlash handles analytical queries on live data without needing a separate pipeline.",
            cta: {
              text: 'See Vector Search',
              href: 'https://www.pingcap.com/tidb/cloud/',
            },
          },
        ],
        columns: 3,
      },
      style: {
        background: 'primary',
        spacing: 'lg',
        removePaddingTop: true,
      },
    },
    {
      id: 'caseStudyCards-1782472692660',
      type: 'caseStudyCards',
      props: {
        title: 'Leading AI companies Rely on TiDB',
        items: [
          {
            badge: 'Provisioning at Scale',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/68b65a2a-20260525-230213.png',
                alt: '20260525 230213',
                width: 1511,
                height: 512,
              },
              alt: '20260525 230213',
              width: 1511,
              height: 512,
            },
            title: 'Millions of Agent-Created Databases, Provisioned in Under a Second',
            description:
              "Kimi's K2.6 agent builds and hosts full-stack web applications for millions of users, provisioning an isolated database per site instantly, powered by TiDB Cloud's multi-tenant architecture.",
            stats: [
              {
                value: '<1s',
                label: 'Database provisioning per site',
              },
              {
                value: '10M+',
                label: 'Tenants supported',
              },
            ],
            href: 'https://www.pingcap.com/case-study/kimi-2-6-agent-hosting-platform-tidb-cloud/',
            cta: 'Read the story',
          },
          {
            badge: 'Tenant Isolation at Scale',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/0fc78057-manus.svg',
                alt: 'manus',
                width: 165,
                height: 48,
              },
              alt: 'manus',
              width: 165,
              height: 48,
            },
            title: 'From Viral Launch to 1M+ Database Tenants',
            description:
              "Migrated to TiDB Cloud in two weeks to support explosive growth. TiDB now powers context persistence behind Manus's agent swarms and full-stack app generation.",
            stats: [
              {
                value: '2 wks',
                label: 'Migration time',
              },
              {
                value: '1M+',
                label: 'DB tenants',
              },
            ],
            href: 'https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/',
            cta: 'Read the story',
          },
          {
            badge: 'Data Consolidation',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/a9c1110c-logo-plaud.png',
                alt: 'logo plaud',
                width: 362,
                height: 100,
              },
              alt: 'logo plaud',
              width: 362,
              height: 100,
            },
            title: 'From Two Data Stores to One Unified Database',
            description:
              'Plaud migrated from MySQL + Amazon S3 to TiDB Cloud, eliminating S3 retrieval latency and unlocking online DDL for 2M+ users across 170 countries.',
            stats: [
              {
                value: '10x',
                label: 'OPS improvement under peak load',
              },
              {
                value: '13',
                label: 'TiDB Cloud clusters in production',
              },
            ],
            href: 'https://www.pingcap.com/case-study/how-plaud-eliminated-s3-latency-limitless-scale/',
            cta: 'Read the story',
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'use-cases-01',
      type: 'featureCard',
      props: {
        eyebrow: 'Real-World Applications',
        title: 'When Agents Need Persistent Context',
        subtitle: 'From support bots to coding assistants, unified state powers reliable agents.',
        items: [
          {
            icon: 'MessageSquare',
            title: 'Customer Support Agents With Conversation History',
            description:
              'Support agents need persistent memory for previous interactions, account preferences, open issues, and resolution patterns. With an agent memory database, support workflows carry context across conversations instead of asking users to repeat themselves.\n\nIn multi-agent support workflows, a triage agent and a resolution agent can share context through TiDB Cloud while keeping their data boundaries intact.',
            borderColor: 'border-blue-500',
          },
          {
            icon: 'Code2',
            title: 'Code Generation Agents With Project Context',
            description:
              'Coding agents need memory for repository structure, dependencies, and prior decisions. Persistent project context lets agents continue earlier work instead of starting from a blank prompt. In multi-agent coding workflows, a planning agent and an implementation agent can share repository context without sharing write access.',
            borderColor: 'border-violet-500',
          },
          {
            icon: 'Building',
            title: 'Enterprise AI Platforms With Tenant Isolation',
            description:
              'Enterprise AI products need context persistence, security boundaries, and predictable scaling. TiDB Cloud supports per-agent isolation and agent memory scaling for platforms serving many customers, teams, and workloads from a shared foundation.',
            borderColor: 'border-teal-500',
          },
        ],
        columns: 3,
        borderStyle: 'color',
      },
      style: {
        background: 'gradient-dark-top',
        spacing: 'section',
      },
    },
    {
      id: 'cta-01',
      type: 'cta',
      props: {
        title: 'Get Started With TiDB for AI Agent Memory',
        subtitle: 'From prototypes to production, build agents that remember.',
        image: {
          image: {
            url: 'https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg',
          },
          alt: '',
          width: 278,
          height: 256,
        },
        primaryCta: {
          text: 'Start Free on TiDB Cloud',
          href: 'https://tidbcloud.com/free-trial/',
        },
        secondaryCta: {
          text: 'Contact Sales',
          href: 'https://www.pingcap.com/contact-us/',
        },
      },
      style: {
        background: 'brand-violet',
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
