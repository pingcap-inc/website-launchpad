import * as React from 'react'
import { Gauge, ShieldCheck, Workflow } from 'lucide-react'
import { IconFeatureItem } from '@/components/ui/IconFeatureItem'

/** Default horizontal layout — icon beside the copy. */
export const Horizontal = () => (
  <IconFeatureItem
    icon={<Gauge strokeWidth={1.5} className="w-8 h-8" />}
    title="Sub-Second Provisioning"
    description="New isolated databases come online in under a second, so agent workloads never queue behind infrastructure."
  />
)

/** Vertical layout — icon stacked above the copy. */
export const Vertical = () => (
  <IconFeatureItem
    layout="vertical"
    icon={<Workflow strokeWidth={1.5} className="w-8 h-8" />}
    title="One Engine, Both Workloads"
    description="Transactional and analytical queries run side by side without an ETL hop between them."
  />
)

/** How the item reads in a multi-column set, its usual context. */
export const InAColumnSet = () => (
  <div className="grid gap-10 md:grid-cols-2">
    <IconFeatureItem
      icon={<ShieldCheck strokeWidth={1.5} className="w-8 h-8" />}
      title="Audit-Ready by Default"
      description="Encryption in flight and at rest, with IAM integration and exportable audit logs."
    />
    <IconFeatureItem
      icon={<Gauge strokeWidth={1.5} className="w-8 h-8" />}
      title="Elastic Under Load"
      description="Capacity follows real-time workload signals instead of a provisioned ceiling."
    />
  </div>
)
