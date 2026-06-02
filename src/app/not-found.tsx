import Image from 'next/image'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

const HINTS = [
  'If you typed the URL yourself, please make sure that the spelling is correct.',
  'If you clicked on a link to get here, there may be a problem with the link.',
  'Try using your browser’s “Back” button, or use the links below to find what you need.',
]

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary pt-[62px] text-text-primary lg:pt-20">
        {/* Hero band — black */}
        <SectionWrapper style={{ background: 'primary', spacing: 'none' }}>
          <div className="py-section-sm lg:py-section-md">
            <h1 className="text-h2-mb md:text-h2-sm font-bold leading-tight text-text-inverse">
              404 – Not Found
            </h1>
          </div>
        </SectionWrapper>

        {/* Message — white */}
        <SectionWrapper style={{ background: 'inverse', spacing: 'section' }} contentWidth="md">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              {/* title-case-ignore */}
              <h2 className="text-h2-mb font-bold leading-tight text-text-primary">
                We’re sorry, the page you requested cannot be found
              </h2>
              <ul className="mt-8 space-y-4">
                {HINTS.map((hint) => (
                  <li
                    key={hint}
                    className="flex gap-3 text-body-md leading-relaxed text-carbon-700"
                  >
                    <span aria-hidden="true" className="flex h-[1.625em] shrink-0 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-bg-primary" />
                    </span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-h3-sm font-bold text-text-primary">
                We apologize for the inconvenience!
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4 md:gap-8">
                <SecondaryButton dark={false} href="/">
                  Back to homepage
                </SecondaryButton>
                <SecondaryButton href="/what-is-tidb/" dark={false}>
                  Explore TiDB
                </SecondaryButton>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="https://static.pingcap.com/files/2021/11/404-graphic.jpg"
                alt="Person looking at a document with a question mark"
                width={450}
                height={420}
                priority
              />
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
