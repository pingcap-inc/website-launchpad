import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { HeaderLp } from '@/components/ui/HeaderLp'
import { Footer } from '@/components/ui/Footer'
import { Badge } from '@/components/ui/badge'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { CtaSection } from '@/components/sections/CtaSection'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CountUp } from '@/components/ui/CountUp'
import { SlideIn } from '@/components/ui/SlideIn'
import { Command } from './Command'
import { DataPlaneDiagram } from './DataPlaneDiagram'
import { FitScenarios } from './FitScenarios'
import { HeroShade } from './HeroShade'
import { LoopStrip } from './LoopStrip'
import { PrismBackground } from './PrismBackground'

// Mechanism captions from the "1st cut" design.
// Defaults on for the 2026-08-10 internal review; flip off for launch.
const SHOW_MECHANISMS = true

const TITLE = 'TiDB Cloud Filesystem: The Workspace Your Agents Share'
const DESCRIPTION =
  'TiDB Cloud Filesystem is a durable shared workspace for coding agents — one filesystem held by several runtimes at once. Now in technical preview.'
const PATH = '/tidb-cloud-filesystem/'
const CANONICAL = `https://www.pingcap.com${PATH}`
const OG_IMAGE = 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'TiDB',
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: [OG_IMAGE],
  },
}

const faqItems: {
  value: string
  q: React.ReactNode
  /** Plain-text Q/A for the FAQPage schema node */
  plain: { question: string; answer: string }
  answer: React.ReactNode
}[] = [
  {
    value: 'what-is-it',
    q: 'What is TiDB Cloud Filesystem?',
    plain: {
      question: 'What is TiDB Cloud Filesystem?',
      answer:
        "A durable working directory for coding agents. A runtime uses normal file operations, while the workspace stays available beyond that runtime's lifecycle — so the next session, sandbox, agent or reviewer opens the same workspace instead of rebuilding it.",
    },
    answer: (
      <>
        A durable working directory for coding agents. A runtime uses normal file operations, while
        the workspace stays available beyond that runtime&apos;s lifecycle — so the next session,
        sandbox, agent or reviewer opens the same workspace instead of rebuilding it.
      </>
    ),
  },
  {
    value: 'sandbox-persistence',
    q: 'My sandbox already has persistence — do I need another layer?',
    plain: {
      question: 'My sandbox already has persistence — do I need another layer?',
      answer:
        "Native snapshots, pause/resume or volumes cover a workflow that stays inside one platform. A separate workspace layer matters once the active directory has to cross a boundary that platform doesn't cover — another runtime, another agent, a human reviewer, a CI job.",
    },
    answer: (
      <>
        Native snapshots, pause/resume or volumes cover a workflow that stays inside one platform. A
        separate workspace layer matters once the active directory has to cross a boundary that
        platform doesn&apos;t cover — another runtime, another agent, a human reviewer, a CI job.
      </>
    ),
  },
  {
    value: 'consistency',
    q: 'What does a second runtime see while one is writing?',
    plain: {
      question: 'What does a second runtime see while one is writing?',
      answer:
        'You choose, per workspace: writeback favors write speed, write-sync makes every write immediately visible to every reader, and close-sync syncs when a file closes.',
    },
    answer: (
      <>
        You choose, per workspace: writeback favors write speed, write-sync makes every write
        immediately visible to every reader, and close-sync syncs when a file closes.
      </>
    ),
  },
  {
    value: 'regions',
    q: 'Which regions can I create a filesystem in?',
    plain: {
      question: 'Which regions can I create a filesystem in?',
      answer:
        'Region is a required flag when you create a filesystem. See the list of available regions for the current set.',
    },
    answer: (
      <>
        Region is a required flag when you create a filesystem.{' '}
        <a
          href="https://ai.pingcap-docsite-preview.pages.dev/ai/ti-regions-security-and-limitations/"
          className="text-brand-red-light underline underline-offset-4 hover:text-brand-red-primary"
        >
          See the list of available regions
        </a>{' '}
        for the current set.
      </>
    ),
  },
  {
    value: 'laptop-mount',
    q: 'Can I mount it on my laptop?',
    plain: {
      question: 'Can I mount it on my laptop?',
      answer:
        "Supported, but not what we recommend for evaluation. Run it from a cloud VM in the same region as the filesystem. If you only need to read a file from your own machine, ti fs read-file doesn't require a mount at all.",
    },
    answer: (
      <>
        Supported, but not what we recommend for evaluation. Run it from a cloud VM in the same
        region as the filesystem. If you only need to read a file from your own machine,{' '}
        <code>ti fs read-file</code> doesn&apos;t require a mount at all.
      </>
    ),
  },
  {
    value: 'posix-support',
    q: 'Does it support POSIX?',
    plain: {
      question: 'Does it support POSIX?',
      answer:
        'Yes. When mounted, TiDB Cloud Filesystem is POSIX-compatible, so agents can use ordinary paths, shell commands, filesystem APIs, and development tools. It is designed for AI coding agent workloads.',
    },
    answer: (
      <>
        Yes. When mounted, TiDB Cloud Filesystem is POSIX-compatible, so agents can use ordinary
        paths, shell commands, filesystem APIs, and development tools. It is designed for AI coding
        agent workloads.
      </>
    ),
  },
  {
    value: 'sdk',
    q: 'Is there an SDK?',
    plain: {
      question: 'Is there an SDK?',
      answer:
        'Not yet. The CLI is the full surface during the technical preview. TypeScript and Python SDKs are coming soon.',
    },
    answer: (
      <>
        Not yet. The CLI is the full surface during the technical preview. TypeScript and Python
        SDKs are coming soon.
      </>
    ),
  },
  {
    value: 'semantic-search',
    q: 'Does it support semantic or vector search over my files?',
    plain: {
      question: 'Does it support semantic or vector search over my files?',
      answer:
        'Full-text content search and filename matching are what to rely on today — fs search-file-content and fs find-files. Semantic retrieval is in the product design and is not part of what the technical preview guarantees.',
    },
    answer: (
      <>
        Full-text content search and filename matching are what to rely on today —{' '}
        <code>fs search-file-content</code> and <code>fs find-files</code>. Semantic retrieval is in
        the product design and is <strong className="font-medium text-white">not</strong> part of
        what the technical preview guarantees.
      </>
    ),
  },
  {
    value: 'checkpoint',
    q: 'Does the preview include checkpoint and rollback?',
    plain: {
      question: 'Does the preview include checkpoint and rollback?',
      answer:
        "Layer checkpoints and rollback are part of the product design, and the commands are visible in the CLI, but they are not part of what the technical preview guarantees yet. What's ready today is cross-runtime continuity — write from one runtime, read from another.",
    },
    answer: (
      <>
        Layer checkpoints and rollback are part of the product design, and the commands are visible
        in the CLI, but they are not part of what the technical preview guarantees yet. What&apos;s
        ready today is cross-runtime continuity — write from one runtime, read from another.
      </>
    ),
  },
  {
    value: 'sla',
    q: 'Is there an SLA?',
    plain: {
      question: 'Is there an SLA?',
      answer:
        "No. Keep evaluation data recoverable elsewhere, and report anything that doesn't behave as expected.",
    },
    answer: (
      <>
        No. Keep evaluation data recoverable elsewhere, and report anything that doesn&apos;t behave
        as expected.
      </>
    ),
  },
  {
    value: 'retention',
    q: 'What happens to my workspace after the preview ends?',
    plain: {
      question: 'What happens to my workspace after the preview ends?',
      answer:
        "The retention and deletion policy after the technical preview is still an open product decision. Until it's settled, keep an independently recoverable copy of anything you can't afford to lose.",
    },
    answer: (
      <>
        The retention and deletion policy after the technical preview is still an open product
        decision. Until it&apos;s settled, keep an independently recoverable copy of anything you
        can&apos;t afford to lose.
      </>
    ),
  },
  {
    value: 'cost',
    q: 'What does it cost?',
    plain: {
      question: 'What does it cost?',
      answer:
        "There is no published price during the technical preview. Usage limits apply per account, and we'll show the ones that apply to yours before you start.",
    },
    answer: (
      <>
        There is no published price during the technical preview. Usage limits apply per account,
        and we&apos;ll show the ones that apply to yours before you start.
      </>
    ),
  },
]

const schema = buildPageSchema({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'TiDB Cloud Filesystem', path: PATH },
  ],
  extraSchemas: [
    softwareApplicationSchema({
      name: 'TiDB Cloud Filesystem',
      description: DESCRIPTION,
      url: CANONICAL,
    }),
    faqSchema(faqItems.map((item) => item.plain)),
  ],
})

const workingSetFiles = [
  'app.tsx',
  'upload.pdf',
  'dataset.csv',
  'junit.xml',
  'build.log',
  'patch.diff',
]

// Salience ramps downward with agent-ness: the baseline stays neutral, the
// agent's own leavings get progressively redder — a second order cue on top
// of the staggered entrance.
const gitBands: { n: string; name: string; caption: string; className: string }[] = [
  {
    n: '01',
    name: 'clean tree',
    caption: 'the committed baseline',
    className: 'ti-band-a border-white/[0.14]',
  },
  {
    n: '02',
    name: 'dirty overlay',
    caption: 'uncommitted modifications',
    className: 'ti-band-b border-brand-red-primary/50 bg-brand-red-primary/[0.05]',
  },
  {
    n: '03',
    name: 'object pack',
    caption: 'objects the agent created',
    className: 'ti-band-c border-brand-red-primary bg-brand-red-primary/[0.10]',
  },
]

const persistedFiles = ['source', 'lock file', 'patches', 'test results', 'failure logs']
const localOnlyFiles = ['node_modules', '.tsbuildinfo', 'dist', '.turbo', 'coverage']

const fitRows: [string, string][] = [
  ['A durable disk attached to one workload', 'Block storage'],
  ['A shared POSIX filesystem for compute clients in one cloud', 'Network file storage'],
  ['Objects, artifacts, datasets, backups or archives', 'Object storage'],
  ['Committed source history, branches and merges', 'Git hosting'],
  ['What an agent remembers across conversations', 'Agent memory'],
  ['Snapshots and forks of work inside one sandbox platform', 'Platform-native persistence'],
]

/** Official Kimi wordmark (kimi.com), currentColor so it takes the page's text color. */
function KimiLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 32"
      fill="currentColor"
      role="img"
      aria-label="Kimi"
      className={className}
    >
      <path d="M35.768 31.329c0 .37.3.671.67.671h4.305c.371 0 .672-.3.672-.671V.67c0-.37-.3-.671-.672-.671H36.44c-.37 0-.671.3-.671.671zm54.584 0c0 .37.3.671.67.671h4.305c.371 0 .672-.3.672-.671V.67c0-.37-.3-.671-.672-.671h-4.304c-.37 0-.671.3-.671.671zM73.256 0a.67.67 0 0 0-.652.512l-6.366 26.1c-.106.428-.607.428-.71 0L59.159.512A.67.67 0 0 0 58.511 0H47.725c-.37 0-.668.3-.668.671V31.33c0 .37.3.671.67.671h4.781c.37 0 .671-.292.671-.662V5.554c0-.515.604-.622.726-.127l6.358 26.06a.67.67 0 0 0 .653.513h9.931c.31 0 .58-.212.653-.512L77.855 5.43c.122-.495.726-.388.726.127v25.772c0 .37.3.671.671.671h4.78c.371 0 .672-.3.672-.671V.67c0-.37-.3-.671-.671-.671zM15.279 14.837 28.264 1.133A.671.671 0 0 0 27.777 0h-6.043a.67.67 0 0 0-.477.199L6.374 15.223c-.231.234-.573.025-.573-.35V.672c0-.37-.3-.671-.671-.671H.67a.67.67 0 0 0-.67.67V31.33c0 .37.3.671.671.671H5.13c.37 0 .671-.3.671-.671v-6.114a.5.5 0 0 1 .13-.35l4.594-4.69a.293.293 0 0 1 .386-.045l12.286 9.305c1.796 1.245 4.083 2.06 6.178 2.401a.645.645 0 0 0 .743-.648v-5.537a.7.7 0 0 0-.562-.677c-1.215-.262-2.565-.758-3.59-1.468L15.332 15.58c-.22-.152-.248-.544-.052-.744" />
    </svg>
  )
}

function HeroCodePanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="flex items-stretch border-b border-white/10">
        <div className="grid justify-items-start gap-[5px] border-b-2 border-brand-red-primary bg-white/5 px-[18px] py-3.5 text-white">
          <span className="font-mono text-xs">bash · ti</span>
          <span className="font-mono text-[9px] tracking-[0.06em] text-brand-red-primary">
            AVAILABLE NOW
          </span>
        </div>
        <div className="grid justify-items-start gap-[5px] border-b-2 border-transparent px-[18px] py-3.5 text-carbon-700">
          <span className="font-mono text-xs">TypeScript · Python</span>
          <span className="font-mono text-[9px] tracking-[0.06em]">SDK — COMING SOON</span>
        </div>
      </div>
      <div className="px-6 py-[22px] font-mono text-[13px] leading-[1.7] text-carbon-200">
        <div className="whitespace-pre-wrap [overflow-wrap:anywhere] text-carbon-700">
          # install TiDB Cloud CLI
        </div>
        <Command
          cmd={
            'curl -fsSL https://tidb.link/ti-cli-install | sh\n\nexport PATH="$HOME/.ti/bin:$PATH"'
          }
        >
          <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
            <span className="text-brand-red-light">curl</span>{' '}
            <span className="text-brand-blue-light">-fsSL</span> https://tidb.link/ti-cli-install{' '}
            <span className="text-carbon-600">|</span>{' '}
            <span className="text-brand-red-light">sh</span>
          </div>
          <div className="h-[15px]" />
          <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
            <span className="text-brand-red-light">export</span> PATH=
            <span className="text-brand-teal-light">&quot;$HOME/.ti/bin:$PATH&quot;</span>
          </div>
        </Command>
        <div className="h-[15px]" />
        <div className="whitespace-pre-wrap [overflow-wrap:anywhere] text-carbon-700">
          # create a workspace — this issues its filesystem token
        </div>
        <Command
          cmd={`TI_FS_TOKEN=$(ti fs create-file-system --display-name agent-workspace --region aws-us-east-1 --wait --query "fs_token" --output text)`}
        >
          <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
            <span className="text-brand-violet-light">TI_FS_TOKEN</span>=
            <span className="text-carbon-600">$(</span>
            <span className="text-brand-red-light">ti</span> fs create-file-system{' '}
            <span className="text-brand-blue-light">--display-name</span> agent-workspace{' '}
            <span className="text-brand-blue-light">--region</span> aws-us-east-1{' '}
            <span className="text-brand-blue-light">--wait</span>{' '}
            <span className="text-brand-blue-light">--query</span>{' '}
            <span className="text-brand-teal-light">&quot;fs_token&quot;</span>{' '}
            <span className="text-brand-blue-light">--output</span> text
            <span className="text-carbon-600">)</span>
          </div>
        </Command>
        <div className="h-[15px]" />
        <div className="whitespace-pre-wrap [overflow-wrap:anywhere] text-carbon-700">
          # in the sandbox: mount it, work in it, let the sandbox end
        </div>
        <Command
          cmd={`export TI_FS_TOKEN

mkdir ~/workspace

ti fs mount --region aws-us-east-1 --mount-path ~/workspace

echo "state that survives the sandbox" >> ~/workspace/notes.md`}
        >
          <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
            <span className="text-brand-red-light">export</span>{' '}
            <span className="text-brand-violet-light">TI_FS_TOKEN</span>
          </div>
          <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
            <span className="text-brand-red-light">mkdir</span> ~/workspace
          </div>
          <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
            <span className="text-brand-red-light">ti</span> fs mount{' '}
            <span className="text-brand-blue-light">--region</span> aws-us-east-1{' '}
            <span className="text-brand-blue-light">--mount-path</span> ~/workspace
          </div>
          <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
            <span className="text-brand-red-light">echo</span>{' '}
            <span className="text-brand-teal-light">
              &quot;state that survives the sandbox&quot;
            </span>{' '}
            <span className="text-carbon-600">&gt;&gt;</span> ~/workspace/notes.md
          </div>
        </Command>
      </div>
    </div>
  )
}

export default function TidbCloudFilesystemPage() {
  return (
    <>
      <JsonLd data={schema} />
      <HeaderLp />

      <main className="bg-bg-primary pt-20">
        {/* 01 Hero */}
        <section className="relative isolate overflow-hidden bg-bg-primary pb-24 pt-[72px]">
          <HeroShade />
          <div className="relative z-10 mx-auto grid max-w-container grid-cols-1 items-start gap-14 px-4 md:px-8 lg:grid-cols-2 lg:px-16">
            <div data-shade-dim>
              <div className="mb-7 flex items-center gap-3">
                <span className="font-mono text-[13px] text-carbon-400">TiDB Cloud Filesystem</span>
                <Badge variant="secondary">Technical Preview</Badge>
              </div>
              {/* title-case-ignore */}
              <h1 className="mb-6 max-w-[640px] text-pretty text-h1-mb font-bold leading-tight tracking-[-0.025em] md:text-h1">
                The workspace your agents share.
              </h1>
              <p className="mb-9 max-w-[580px] text-pretty text-body-2xl text-carbon-400">
                One filesystem, held by several runtimes at once, that knows what an agent leaves
                behind — dirty tree, new objects, test output, artifacts.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <PrimaryButton href="https://ai.pingcap-docsite-preview.pages.dev/ai/ti-agent-sandbox-example/">
                  Quickstart
                </PrimaryButton>
                <SecondaryButton href="https://www.pingcap.com/contact-us/">
                  Talk to us
                </SecondaryButton>
              </div>
            </div>
            <div data-shade-block>
              <HeroCodePanel />
              <a
                href="https://ai.pingcap-docsite-preview.pages.dev/ai/ti-overview/"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[13px] text-carbon-400 transition-colors duration-150 hover:text-carbon-200"
              >
                Read the TiDB Cloud CLI overview
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 02 What makes it different */}
        <section id="different" className="bg-gradient-dark-top py-20">
          <div className="mx-auto max-w-container px-4 md:px-8 lg:px-16">
            <p className="mb-8 font-mono text-[15px] text-carbon-400">What makes it different</p>
            {/* title-case-ignore */}
            <h2 className="mb-5 max-w-[880px] text-pretty text-h2-mb font-bold leading-tight tracking-[-0.02em] md:text-h2-sm">
              Three things the disk in your sandbox can&apos;t do.
            </h2>
            <p className="mb-14 max-w-[660px] text-body-lg text-carbon-400">
              All three exist for one reason: a distributed database sits under this filesystem, so
              it can promise things a disk can&apos;t.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Git-aware workspace */}
              <SlideIn direction="up">
                <div className="flex h-full flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.04] px-[26px] pb-[26px] pt-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-brand-red-primary">
                    Git-aware workspace
                  </p>
                  {/* title-case-ignore */}
                  <h3 className="text-h3-lg font-bold">
                    A resumed workspace still has its git state.
                  </h3>
                  <p className="flex-1 text-body-md text-carbon-400">
                    The branch, the uncommitted changes, the objects the agent created — all of it
                    comes back on resume. Not a fresh clone; the actual working state.
                  </p>
                  <div className="flex min-h-[320px] flex-col gap-2.5 border-t border-white/10 pt-[22px]">
                    <p className="mb-1 font-mono text-[11px] tracking-[0.05em] text-carbon-700">
                      WHAT COMES BACK, IN ORDER
                    </p>
                    {gitBands.map((band, index) => (
                      <div
                        key={band.name}
                        className={`rounded-md border px-3.5 py-3 ${band.className}`}
                      >
                        <p className="font-mono text-[11px] text-white">
                          <span className="mr-2 text-carbon-700">{band.n}</span>
                          {band.name}
                        </p>
                        <p
                          className={`mt-1 font-mono text-[11px] ${
                            index === 0 ? 'text-carbon-700' : 'text-carbon-400'
                          }`}
                        >
                          {band.caption}
                        </p>
                      </div>
                    ))}
                    <p className="mt-auto pt-2 font-mono text-xs leading-[1.6] text-carbon-700">
                      <code>ti fs-git clone-git-workspace</code> ·{' '}
                      <code>hydrate-git-workspace</code> · <code>add-git-worktree</code>
                    </p>
                  </div>
                </div>
              </SlideIn>

              {/* Rebuildable vs persistent */}
              <SlideIn direction="up" delay={70}>
                <div className="flex h-full flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.04] px-[26px] pb-[26px] pt-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-brand-red-primary">
                    Rebuildable vs persistent
                  </p>
                  {/* title-case-ignore */}
                  <h3 className="text-h3-lg font-bold">Keep the outcome. Drop the noise.</h3>
                  <p className="flex-1 text-body-md text-carbon-400 [&_code]:font-mono">
                    <code>node_modules</code> and <code>dist</code> can be rebuilt anywhere, so they
                    stay local. What can&apos;t be rebuilt — test results, failure logs, patches —
                    is what persists.
                  </p>
                  <div className="flex min-h-[320px] flex-col gap-2.5 border-t border-white/10 pt-[22px]">
                    <p className="mb-1 font-mono text-[11px] tracking-[0.05em] text-carbon-700">
                      THE SPLIT, FILE BY FILE
                    </p>
                    <div className="grid grid-cols-2 gap-[18px]">
                      <div className="grid content-start gap-2">
                        <p className="mb-0.5 font-mono text-[11px] tracking-[0.05em] text-brand-red-primary">
                          PERSISTED
                        </p>
                        {persistedFiles.map((file, i) => (
                          <span
                            key={file}
                            className="ti-keep border-l-2 border-brand-red-primary pl-[9px] font-mono text-[11px] text-white"
                            style={{ animationDelay: `${i * 0.12}s` }}
                          >
                            {file}
                          </span>
                        ))}
                      </div>
                      <div className="grid content-start gap-2">
                        <p className="mb-0.5 font-mono text-[11px] tracking-[0.05em] text-carbon-700">
                          LOCAL-ONLY
                        </p>
                        {localOnlyFiles.map((file, i) => (
                          <span
                            key={file}
                            className="ti-drop border-l-2 border-carbon-800 pl-[9px] font-mono text-[11px] text-carbon-400"
                            style={{ animationDelay: `${i * 0.12}s` }}
                          >
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-auto pt-2 font-mono text-xs leading-[1.6] text-carbon-700">
                      The split follows the project&apos;s own shape, not a config file you
                      maintain.
                    </p>
                  </div>
                </div>
              </SlideIn>

              {/* Any file, any format */}
              <SlideIn direction="up" delay={140}>
                <div className="flex h-full flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.04] px-[26px] pb-[26px] pt-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-brand-red-primary">
                    Any file, any format
                  </p>
                  {/* title-case-ignore */}
                  <h3 className="text-h3-lg font-bold">
                    One place for everything the agent touches.
                  </h3>
                  <p className="flex-1 text-body-md text-carbon-400">
                    An agent&apos;s working set is never just code — it&apos;s source, uploads,
                    datasets, test output, artifacts. One durable workspace holds all of it, instead
                    of a repo plus a bucket plus a log shipper.
                  </p>
                  <div className="flex min-h-[320px] flex-col gap-2.5 border-t border-white/10 pt-[22px]">
                    <p className="mb-1 font-mono text-[11px] tracking-[0.05em] text-carbon-700">
                      THE WORKING SET, IN ONE PLACE
                    </p>
                    <div className="rounded-md border border-brand-red-primary/40 bg-brand-red-primary/[0.04] px-3.5 py-3">
                      <div className="flex flex-wrap gap-2">
                        {workingSetFiles.map((file, index) => (
                          <span
                            key={file}
                            className={`ti-gather-${index + 1} rounded border border-white/[0.14] px-2 py-1 font-mono text-[11px] text-carbon-200`}
                          >
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-auto pt-2 font-mono text-xs leading-[1.6] text-carbon-700">
                      The same path from CLI, IDE, agent and CI — one namespace.
                    </p>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* 03 Proof */}
        <section id="proof" className="relative isolate overflow-hidden bg-bg-primary py-20">
          <PrismBackground />
          <div className="relative z-10 mx-auto max-w-container px-4 md:px-8 lg:px-16">
            <p className="mb-8 font-mono text-[15px] text-carbon-400">Proof at scale</p>
            <KimiLogo className="mb-6 h-7 w-auto text-white" />
            {/* title-case-ignore */}
            <h2 className="mb-12 max-w-[820px] text-pretty text-h2-mb font-bold leading-tight tracking-[-0.02em] text-carbon-400 md:text-h2-sm">
              Workspace continuity, running in production.
            </h2>
            <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
              <div>
                <p className="text-[64px] font-bold leading-[0.92] tracking-[-0.04em] text-white md:text-[96px]">
                  <CountUp value="100,000+" />
                </p>
                <p className="mt-[14px] font-mono text-[13px] text-carbon-400">
                  file systems in production behind Kimi Work (Moonshot AI)
                </p>
              </div>
              <div>
                {/* .prism-done lands on the section when the prism reveal
                    completes (see PrismBackground) — the gray morphs to white. */}
                <p className="max-w-[560px] text-pretty text-body-lg text-carbon-400 transition-colors duration-700 ease-out [.prism-done_&]:text-white">
                  TiDB Cloud Filesystem holds the agent workspaces behind Kimi Work, Moonshot
                  AI&apos;s desktop AI agent for knowledge workers — which is why the runtimes that
                  execute those agents stay disposable.
                </p>
                <div className="mt-5">
                  <SecondaryButton href="#">Read the Kimi Work story</SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 How it works */}
        <section id="how" className="bg-gradient-dark-bottom py-20">
          <div className="mx-auto max-w-container px-4 md:px-8 lg:px-16">
            <p className="mb-8 font-mono text-[15px] text-carbon-400">How it works</p>
            {/* title-case-ignore */}
            <h2 className="mb-5 max-w-[880px] text-pretty text-h2-mb font-bold leading-tight tracking-[-0.02em] md:text-h2-sm">
              Execution is disposable. State is not.
            </h2>
            <p className="mb-12 max-w-[680px] text-body-lg text-carbon-400">
              Two planes, one namespace. Runtimes come and go above; the workspace below is
              addressed as a service and outlives all of them.
            </p>

            <DataPlaneDiagram />

            {/* title-case-ignore */}
            <h3 className="mb-3 text-h3-lg font-bold">
              One task, eight steps — each one leaves state the next one needs.
            </h3>
            <p className="mb-8 max-w-[660px] text-body-md text-carbon-400">
              A coding agent doesn&apos;t touch a filesystem once. It touches it at every step, and
              the loop ends where a sandbox volume can&apos;t follow.
            </p>

            <LoopStrip showMechanisms={SHOW_MECHANISMS} />
          </div>
        </section>

        {/* 05 Where it fits */}
        <section id="fit" className="bg-bg-primary py-20">
          <div className="mx-auto max-w-container px-4 md:px-8 lg:px-16">
            <p className="mb-8 font-mono text-[15px] text-carbon-400">Where it fits</p>
            {/* title-case-ignore */}
            <h2 className="mb-12 max-w-[820px] text-pretty text-h2-mb font-bold leading-tight tracking-[-0.02em] md:text-h2-sm">
              Start with the boundary your state has to cross.
            </h2>
            <div className="mb-9 border-l-2 border-brand-red-primary pl-[18px]">
              <p className="text-h3-sm font-bold">You&apos;re in the right place if —</p>
            </div>
            <FitScenarios />
            <div className="mt-[72px] border-t border-border-primary pt-11">
              <p className="mx-auto mb-7 max-w-[660px] text-center text-body-md text-carbon-400">
                Several kinds of storage persist real work.
                <br />
                Which one is right depends on what has to survive, and what it has to cross.
              </p>
              <div className="mx-auto grid max-w-[1000px] grid-cols-[1.4fr_1fr]">
                <p className="border-b border-border-primary px-6 py-3 font-mono text-[10px] tracking-[0.05em] text-carbon-700">
                  WHAT YOU NEED TO KEEP
                </p>
                <p className="border-b border-border-primary px-6 py-3 font-mono text-[10px] tracking-[0.05em] text-carbon-700">
                  USE
                </p>
                {fitRows.map(([need, use], index) => {
                  const divider = index < fitRows.length - 1 ? 'border-b border-border-primary' : ''
                  return (
                    <div key={use} className="contents">
                      <p className={`px-6 py-4 text-[15px] font-light text-carbon-400 ${divider}`}>
                        {need}
                      </p>
                      <p className={`px-6 py-4 text-[15px] font-regular text-white ${divider}`}>
                        {use}
                      </p>
                    </div>
                  )
                })}
                <p className="border-y border-brand-red-primary bg-brand-red-primary/[0.09] px-6 py-[26px] text-[19px] font-regular leading-[1.35] text-pretty text-white">
                  One active working directory crossing runtime, session, agent or reviewer
                  boundaries
                </p>
                <p className="border-y border-brand-red-primary bg-brand-red-primary/[0.09] px-6 py-[26px] font-mono text-[17px] leading-[1.35] text-brand-red-primary">
                  TiDB Cloud Filesystem
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 Hands-on lab */}
        <section id="hands-on-lab" className="bg-bg-primary pb-20">
          <div className="mx-auto max-w-container px-4 md:px-8 lg:px-16">
            <div className="relative grid gap-7 overflow-hidden border-y border-white/10 py-8 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute right-8 top-1/2 hidden h-36 w-36 -translate-y-1/2 text-white/[0.06] lg:block"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.9994 2V4H14.9994V7.24291C14.9994 8.40051 15.2506 9.54432 15.7357 10.5954L20.017 19.8714C20.3641 20.6236 20.0358 21.5148 19.2836 21.8619C19.0865 21.9529 18.8721 22 18.655 22H5.34375C4.51532 22 3.84375 21.3284 3.84375 20.5C3.84375 20.2829 3.89085 20.0685 3.98181 19.8714L8.26306 10.5954C8.74816 9.54432 8.99939 8.40051 8.99939 7.24291V4H7.99939V2H15.9994ZM13.3873 10.0012H10.6115C10.5072 10.3644 10.3823 10.7221 10.2371 11.0724L10.079 11.4335L6.12439 20H17.8734L13.9198 11.4335C13.7054 10.9691 13.5276 10.4902 13.3873 10.0012ZM10.9994 7.24291C10.9994 7.49626 10.9898 7.7491 10.9706 8.00087H13.0282C13.0189 7.87982 13.0119 7.75852 13.0072 7.63704L12.9994 7.24291V4H10.9994V7.24291Z" />
              </svg>
              <div className="relative z-10">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.06em] text-brand-red-primary">
                  Hands-on lab
                </p>
                {/* title-case-ignore */}
                <h2 className="mb-3 text-h3-lg font-bold">Try it in a real sandbox.</h2>
                <p className="max-w-[560px] text-body-md text-carbon-400">
                  A guided, 120-minute lab using a virtual machine.
                </p>
              </div>
              <div className="relative z-10">
                <SecondaryButton href="https://labs.tidb.io/labs/demo_901">
                  Start the TiDB Cloud Filesystem lab
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>

        {/* 07 FAQ */}
        <section id="faq" className="bg-gradient-dark-top py-20">
          <div className="mx-auto max-w-container px-4 md:px-8 lg:px-16">
            <p className="mb-8 font-mono text-[15px] text-carbon-400">Straight answers</p>
            {/* title-case-ignore */}
            <h2 className="mb-12 max-w-[820px] text-pretty text-h2-mb font-bold leading-tight tracking-[-0.02em] md:text-h2-sm">
              What it is, and what it isn&apos;t yet.
            </h2>
            <div className="mx-auto max-w-[860px]">
              <Accordion type="single" defaultValue="what-is-it" collapsible>
                {faqItems.map((item) => (
                  <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger className="py-5 text-lg text-white hover:text-white">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[760px] text-carbon-400 [&_code]:font-mono">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 08 Closing CTA */}
        <section className="bg-brand-red-bg py-16 text-white">
          <div className="mx-auto max-w-container px-4 md:px-8 lg:px-16">
            <p className="mb-4 text-center font-mono text-[15px] text-white/70">Get started</p>
            <CtaSection
              title="Nothing to rebuild. Everything to build on."
              subtitle="Write from one runtime. Let it end. Reopen the workspace from another and check that the second run continues from the first. That's the whole test."
              primaryCta={{
                text: 'Read the quickstart',
                href: 'https://ai.pingcap-docsite-preview.pages.dev/ai/ti-agent-sandbox-example/',
              }}
              secondaryCta={{
                text: 'Open the E2B demo repo',
                href: 'https://github.com/likidu/tidbcloud-fs-e2b-example',
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
