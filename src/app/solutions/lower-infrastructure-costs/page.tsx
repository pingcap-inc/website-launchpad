import Image from 'next/image'
import {
  Header,
  Footer,
  JsonLd,
  SectionWrapper,
  StatsSection,
  CtaSection,
  PrimaryButton,
  SecondaryButton,
} from '@/components'
import { HeroSection } from '@/components/sections/HeroSection'
import { Intro, ResourcesRow, SeeTidbInAction, type ResourceCard } from '../_components/shared'
import { CostEstimatorWidget } from '../_components/CostEstimatorWidget'
import { CostSavingsCarousel, type CostSlide } from '../_components/CostSavingsCarousel'
import { QuoteCarousel, type QuoteItem } from '../_components/QuoteCarousel'
import { RiveAnimation } from '../_components/RiveAnimation'
import { solutionMetadata, solutionSchema } from '../_components/meta'

const PATH = '/solutions/lower-infrastructure-costs/'
const TITLE = 'Lower Database Costs with TiDB Cloud Essential'
const DESCRIPTION =
  'Lower database costs and ship modern features faster with TiDB Cloud Essential, the adaptive, AI-ready distributed SQL database.'

/** This page's "Book a 30-Minute Meeting" form differs from the other solution pages. */
const MEETING_FORM_ID = '8f78638c-24c5-491d-8c82-d47e08746ad2'

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)
const schema = solutionSchema(PATH, TITLE, DESCRIPTION, 'Lower Infrastructure Costs')

// Copied from the live page's carousel data attributes (prices and bar widths).
const costSlides: CostSlide[] = [
  {
    workload: 'General',
    accent: 'red',
    savePercent: 59,
    tidb: { price: 2726.8, barPercent: 29 },
    mysql: { price: 6650.73, barPercent: 75 },
  },
  {
    workload: 'AI',
    accent: 'violet',
    savePercent: 65,
    tidb: { price: 2512.42, barPercent: 35 },
    mysql: { price: 7178.34, barPercent: 75 },
  },
  {
    workload: 'Web3',
    accent: 'teal',
    savePercent: 67,
    tidb: { price: 2476.13, barPercent: 37 },
    mysql: { price: 7178.34, barPercent: 75 },
  },
  {
    workload: 'SaaS',
    accent: 'blue',
    savePercent: 52,
    tidb: { price: 3507.85, barPercent: 22 },
    mysql: { price: 7308.02, barPercent: 75 },
  },
]

const LOGO_STRIP = 'https://static.pingcap.com/files/2025/12/30020109/logos-new.png'

const whyCards = [
  {
    icon: 'https://static.pingcap.com/files/2025/12/19012706/pay-as-you-go.svg',
    alt: 'pay-as-you-go',
    title: 'Pay Only for What You Use',
    body: 'No wasted spend on idle resources. TiDB Cloud Essential scales compute and storage automatically, so costs match real usage—every minute.',
  },
  {
    icon: 'https://static.pingcap.com/files/2025/12/19012711/accelerate.svg',
    alt: 'accelerate',
    title: 'Accelerate Time to Market',
    body: 'One platform for transactions, analytics, and AI. Eliminate database sprawl and ship data-driven features faster with a unified SQL foundation.',
  },
  {
    icon: 'https://static.pingcap.com/files/2025/12/19012715/future-proof-your-data.svg',
    alt: 'future-proof-your-data',
    title: 'Future-Proof Data Foundation',
    body: 'Start small, scale endlessly. TiDB’s distributed SQL design grows with your business—no sharding, no migrations, no redesigns.',
  },
]

/** Rive animations used by the live cards (same files, same order). */
const RIVE_BASE = 'https://static.pingcap.com/essential'

const features = [
  {
    title: 'Workload-Aware Autoscaling',
    body: 'TiDB X automatically scales compute and storage based on real workload demand — no capacity planning, no manual resizing, and no wasted resources.',
    rive: `${RIVE_BASE}/auto_scaling.riv`,
  },
  {
    title: 'Predictable, Usage-based Pricing',
    body: 'Every query is measured in Request Units (RU), giving you a single, transparent way to map cost directly to usage. Set budgets, alerts, and limits to stay in control and avoid surprise bills.',
    rive: `${RIVE_BASE}/predictable_bills.riv`,
  },
  {
    title: 'Unified for Modern Workloads',
    body: 'Run transactional, analytical, and AI-driven workloads together in one system. TiDB Cloud Essential simplifies your stack and helps you build smarter, data-driven applications faster.',
    rive: `${RIVE_BASE}/mutiple_workloads.riv`,
  },
  {
    title: 'Always Reliable',
    body: 'Enjoy 99.99% uptime, multi-AZ fault tolerance, and continuous backups with point-in-time restore — so your data is always safe and your applications stay online.',
    rive: `${RIVE_BASE}/reliability-dark.riv`,
  },
  {
    title: 'Object-Storage Foundation',
    body: 'Your data is stored in durable, infinitely scalable object storage that cuts storage costs by up to 60% while maintaining enterprise-grade resilience and availability.',
    rive: `${RIVE_BASE}/essential_left_v2.riv`,
  },
  {
    title: 'Autonomous Operations',
    body: 'No more patching, tuning, or managing clusters. TiDB Cloud Essential handles maintenance and optimization automatically so your team can focus on development, not administration.',
    rive: `${RIVE_BASE}/essential_right_v2.riv`,
  },
]

const stats = [
  {
    icon: 'https://static.pingcap.com/files/2024/10/08030304/Github-stars.svg',
    value: '39.5K',
    label: 'GitHub Stars',
  },
  {
    icon: 'https://static.pingcap.com/files/2025/12/18012237/FUTURO_ICONS-1.svg',
    value: '42.4K',
    label: 'Pull Requests',
  },
  {
    icon: 'https://static.pingcap.com/files/2024/10/08030416/Contributor.svg',
    value: '900+',
    label: 'Contributors',
  },
  {
    icon: 'https://static.pingcap.com/files/2025/12/18011913/FUTURO_ICONS.svg',
    value: '5M+',
    label: 'Downloads',
  },
]

const testimonials: QuoteItem[] = [
  {
    quote:
      'With TiDB, our users can concentrate on building their GenAI apps rather than worrying about setup. Our engineers have automated all database management tasks using TiDB’s API, significantly reducing our time and effort.',
    name: 'Luyu Zhang',
    role: 'Founder & CEO / Dify.AI',
  },
  {
    quote:
      'In the following years, we will definitely migrate more clusters from MySQL to TiDB, use TiCDC to set up multi-region clusters on AWS for failover, and try TiFlash for instant analytical queries.',
    name: '@Boris Savelev',
    role: 'SRE Manager / Bolt',
  },
  {
    quote:
      'TiDB’s architecture, sort of a SQL layer on top of a key value store, was more scalable and more likely to cause fewer problems down the line. With TiDB, we don’t need to worry about cross-charge transactions. That’s huge.',
    name: '@Henry Qin',
    role: 'Software Engineer / Block',
  },
  {
    quote:
      'The NO.1 benefit is simplicity. With TiDB, our applications can retain their SQL data model and the ACID guarantees. We don’t have to implement any kind of sharding logic, and the database management becomes simpler too.',
    name: '@Kaustav Chakravorty',
    role: 'Senior Architect / Flipkart',
  },
  {
    quote:
      'The ease and comfort of getting started are paramount for us, and the fully managed operations of TiDB Cloud allow us to focus more on our core business, ensuring that our development resources are utilized where they matter most.',
    name: '@Sky Dong',
    role: 'Founding Engineer / Chaintool',
  },
  {
    quote:
      'Scale-in and scale-out in a cluster configuration is also easy, and the ecosystem is very rich, with operation monitoring tools such as Grafana being able to be installed immediately with the installation command (TiUP).',
    name: '@Kentaro Kitagawa',
    role: 'Senior DBA / LINE Corporation',
  },
]

const resources: ResourceCard[] = [
  {
    title: 'Blog',
    description: 'Build Fast. Run Lean. Why Mid-Market Teams Choose TiDB Cloud Essential.',
    cta: {
      text: 'Read',
      href: 'https://www.pingcap.com/blog/why-mid-market-teams-choose-tidb-cloud-essential/',
    },
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/07235757/resource-4-1.svg',
      alt: 'Blog',
    },
  },
  {
    title: 'Documentation',
    description:
      'Step-by-step guides, API references, and best practices for TiDB Cloud Essential.',
    cta: { text: 'Read', href: 'https://docs.pingcap.com/tidbcloud/essential/?plan=essential' },
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/07235531/resource-1-1.svg',
      alt: 'Documentation',
    },
  },
  {
    title: 'Hands-on Labs',
    description: 'Dive in and master TiDB’s unique capabilities through hands-on practice.',
    cta: { text: 'Explore', href: 'https://labs.tidb.io/' },
    icon: {
      src: 'https://static.pingcap.com/files/2025/05/20200258/TiDB-Labs.svg',
      alt: 'TiDB Labs',
    },
  },
  {
    title: 'Developer Hub',
    description: 'Tools, SDKs, and community resources to help you build and scale with TiDB.',
    cta: { text: 'Explore', href: '/developers/' },
    icon: {
      src: 'https://static.pingcap.com/files/2024/09/09012838/resource-3-1.svg',
      alt: 'Developer Hub',
    },
  },
]

export default function LowerInfrastructureCostsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        {/* Live hero: left-aligned copy, price-comparison carousel on the right. */}
        <SectionWrapper style={{ spacing: 'hero' }}>
          <HeroSection
            layout="split"
            headline="Lower Database Costs, Not Your Velocity"
            subheadline="TiDB Cloud Essential is an adaptive cloud database that removes hidden infrastructure and ops costs, so your team can ship features faster while paying only for what you actually use."
            primaryCta={{ text: 'Estimate Your Cost', href: '#estimate' }}
            // Live "Contact Sales" jumps to the meeting form at the bottom of the page.
            secondaryCta={{ text: 'Contact Sales', href: '#demo' }}
            rightSlot={<CostSavingsCarousel slides={costSlides} />}
          />
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-8">
            <h2 className="m-0 text-h3-lg font-bold">Trusted by Customers Worldwide</h2>
            {/* One wide logo strip, duplicated and scrolled (same marquee as LogoCloudSection). */}
            <div className="max-w-[1000px] overflow-hidden">
              <div className="flex w-max animate-logo-marquee">
                {[0, 1].map((i) => (
                  <Image
                    key={i}
                    src={LOGO_STRIP}
                    alt={i === 0 ? 'Customer logos' : ''}
                    aria-hidden={i === 1}
                    width={1236}
                    height={32}
                    className="h-8 w-auto max-w-none pr-10"
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              title="Why Growing Companies Choose TiDB Cloud Essential"
              paragraphs={[
                'Most databases force you to overpay, over-engineer, and over-plan. TiDB Cloud Essential, powered by TiDB X, is built differently. It offers predictable pricing, removes operational overhead, and helps your team ship features faster.',
              ]}
            />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {whyCards.map((card) => (
                <div key={card.title} className="flex flex-col items-center gap-4 text-center">
                  <Image
                    src={card.icon}
                    alt={card.alt}
                    width={192}
                    height={192}
                    className="h-48 w-48"
                  />
                  <h3 className="m-0 mt-4 text-h3-lg font-bold">{card.title}</h3>
                  <p className="m-0 text-body-md leading-relaxed text-text-secondary">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <PrimaryButton href="https://tidbcloud.com/free-trial/">
                Get Started Instantly
              </PrimaryButton>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            <Intro title="Everything You Need to Build Fast and Stay Lean" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-4 bg-carbon-900/50 px-5 pb-10 pt-5">
                  <h3 className="m-0 text-h3-lg font-bold">{f.title}</h3>
                  <p className="m-0 text-body-md leading-relaxed text-text-secondary">{f.body}</p>
                  {/* 2:1 like the live canvas (1200×600); space is reserved before it loads. */}
                  <RiveAnimation
                    src={f.rive}
                    label={`${f.title} animation`}
                    className="mt-auto aspect-[2/1] w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="estimate">
          <div className="space-y-12">
            <Intro title="See What Your Workload Costs on TiDB Cloud Essential" size="md" />
            <CostEstimatorWidget />
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-bottom' }}>
          <div className="space-y-12">
            <StatsSection
              title="From Open Source Roots to Modern Greatness"
              columns={4}
              centered
              iconClassName="h-[93px] w-[93px]"
              labelClassName="text-body-2xl text-text-secondary"
              stats={stats.map((s) => ({
                value: s.value,
                label: s.label,
                valueClassName: 'md:text-h2-lg',
                icon: (
                  <Image
                    src={s.icon}
                    alt={s.label}
                    width={93}
                    height={93}
                    className="h-full w-full"
                  />
                ),
              }))}
            />
            <div className="flex justify-center">
              <SecondaryButton href="https://github.com/pingcap/tidb">
                Visit TiDB GitHub Repo
              </SecondaryButton>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-12">
            <Intro
              title="We Build with TiDB"
              paragraphs={[
                'Tens of thousands of developers and startups are building applications with TiDB.',
              ]}
            />
            <QuoteCarousel items={testimonials} />
          </div>
        </SectionWrapper>

        <ResourcesRow
          title="Resources to Fuel Your TiDB Journey"
          items={resources}
          titleSize="md"
          titleAlign="left"
        />

        <SectionWrapper style={{ background: 'brand-violet' }}>
          <CtaSection
            title="Try TiDB Cloud Essential Today"
            subtitle="Experience predictable performance, lower costs, and effortless scalability in one managed database."
            image={{
              image: { url: 'https://static.pingcap.com/files/2024/10/07235318/cta-1-1.svg' },
              alt: 'CTA',
              width: 278,
              height: 256,
            }}
            primaryCta={{ text: 'Get Started', href: 'https://tidbcloud.com/free-trial/' }}
          />
        </SectionWrapper>

        <SeeTidbInAction formId={MEETING_FORM_ID} headerAlign="left" />
      </main>
      <Footer />
    </>
  )
}
