import Image from 'next/image'

interface NavbarLpProps {
  /** Optional content rendered on the right side (e.g. a CTA button) */
  rightContent?: React.ReactNode
}

export function NavbarLp({ rightContent }: NavbarLpProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-inverse h-20">
      <div className="max-w-container mx-auto h-full px-4 md:px-8 lg:px-16 flex items-center justify-between">
        <a href="/tidb/" className="shrink-0">
          <Image
            src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
            alt="TiDB"
            width={120}
            height={50}
            className="block"
            priority
          />
        </a>

        {rightContent && <div className="shrink-0">{rightContent}</div>}
      </div>
    </header>
  )
}
