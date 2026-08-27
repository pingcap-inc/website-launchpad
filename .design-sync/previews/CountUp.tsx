import * as React from 'react'
import { CountUp } from '@/components/ui/CountUp'

/** A single hero metric — the largest treatment, counting up on scroll-in. */
export const SingleStat = () => (
  <div>
    <CountUp value="$2,000+" className="text-h2-mb md:text-h2-lg font-bold text-text-inverse" />
    <p className="text-body-sm text-carbon-400 mt-2">in TiDB Cloud credits for every hero</p>
  </div>
)

/** The canonical stats row — three metrics, each parsed for prefix and suffix. */
export const StatRow = () => (
  <div className="grid grid-cols-3 gap-8">
    {[
      { value: '99.99%', label: 'uptime SLA' },
      { value: '10x', label: 'faster analytics' },
      { value: '500+', label: 'production clusters' },
    ].map((stat) => (
      <div key={stat.label}>
        <CountUp
          value={stat.value}
          className="text-h2-mb font-bold text-text-inverse leading-none"
        />
        <p className="text-body-sm text-carbon-400 mt-2">{stat.label}</p>
      </div>
    ))}
  </div>
)

/** Brand-accent treatment — the counter inherits whatever color class it is given. */
export const AccentColor = () => (
  <div>
    <CountUp value="1,200+" className="text-h2-mb font-bold text-brand-red-primary leading-none" />
    <p className="text-body-sm text-carbon-400 mt-2">
      contributors to the TiDB open-source project
    </p>
  </div>
)
