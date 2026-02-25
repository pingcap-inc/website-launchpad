import { GhostButton } from './GhostButton'
import { PrimaryButton } from './PrimaryButton'
import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-inverse h-20 px-12 flex items-center justify-between">
      {/* Logo: fixed 120×50px */}
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

      {/* Menu */}
      <ul className="flex items-center gap-8 text-base font-normal text-text-inverse/80">
        <li className="hover:text-carbon-400 cursor-pointer transition-colors duration-200">
          <a href="/tidb/">Product</a>
        </li>
        <li className="hover:text-carbon-400 cursor-pointer transition-colors duration-200">
          <a href="/tidb/">Solutions</a>
        </li>
        <li className="hover:text-carbon-400 cursor-pointer transition-colors duration-200">
          <a href="/tidb/">Resources</a>
        </li>
        <li className="hover:text-carbon-400 cursor-pointer transition-colors duration-200">
          <a href="/tidb/">Company</a>
        </li>
      </ul>

      <div className="flex items-center gap-4 shrink-0">
        <GhostButton href="/signin/">Sign In</GhostButton>
        <PrimaryButton href="/signup/">Start for Free</PrimaryButton>
      </div>
    </nav>
  )
}
