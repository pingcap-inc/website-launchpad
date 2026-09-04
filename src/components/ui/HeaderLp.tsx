import Image from 'next/image'

interface HeaderLpProps {
  /** Optional content rendered on the right side (e.g. a CTA button) */
  rightContent?: React.ReactNode
}

export function HeaderLp({ rightContent }: HeaderLpProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary h-20">
      <div className="contain h-full flex items-center justify-between">
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
