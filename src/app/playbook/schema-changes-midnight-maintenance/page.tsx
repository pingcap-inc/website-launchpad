import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "Playbook: End 2 A.M. Schema Changes with TiDB Online DDL",
  description: "Stop midnight maintenance. TiDB’s online DDL keeps reads/writes live, so schema changes ship at lunch—no toolchain chaos, no lock drama. Try TiDB today.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/playbook/schema-changes-midnight-maintenance/' },
  openGraph: {
    title: "Playbook: End 2 A.M. Schema Changes with TiDB Online DDL",
    description: "Stop midnight maintenance. TiDB’s online DDL keeps reads/writes live, so schema changes ship at lunch—no toolchain chaos, no lock drama. Try TiDB today.",
    url: 'https://www.pingcap.com/playbook/schema-changes-midnight-maintenance/',
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
  path: "/playbook/schema-changes-midnight-maintenance/",
  title: "Playbook: End 2 A.M. Schema Changes with TiDB Online DDL",
  description: "Stop midnight maintenance. TiDB’s online DDL keeps reads/writes live, so schema changes ship at lunch—no toolchain chaos, no lock drama. Try TiDB today.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "MySQL Schema Change at Lunch, Not 2 A.M.", path: "/playbook/schema-changes-midnight-maintenance/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "MySQL Schema Change at Lunch, Not 2 A.M.",
  "meta": {
    "title": "Playbook: End 2 A.M. Schema Changes with TiDB Online DDL",
    "description": "Stop midnight maintenance. TiDB’s online DDL keeps reads/writes live, so schema changes ship at lunch—no toolchain chaos, no lock drama. Try TiDB today.",
    "canonical": "/playbook/schema-changes-midnight-maintenance/"
  },
  "sections": [
    {
      "id": "hero-1",
      "type": "hero",
      "props": {
        "layout": "image-right",
        "headline": "MySQL Schema Change at Lunch, Not 2 A.M.",
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/f54533cc-1000011158.svg"
          },
          "alt": "hero image",
          "width": 500,
          "height": 300
        }
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "tableOfContents-1",
      "type": "tableOfContents",
      "props": {
        "items": [
          {
            "id": "intro",
            "label": "Introduction",
            "level": 1
          },
          {
            "id": "jump-to-a-section",
            "label": "Jump to a Section",
            "level": 1
          },
          {
            "id": "who-this-playbook-is-for-storage-leads-sres",
            "label": "Who This Playbook Is For: Storage Leads & SREs",
            "level": 1
          },
          {
            "id": "what-we-re-solving-today-schema-changes-hurt-at-scale",
            "label": "What We're Solving Today: Schema Changes Hurt at Scale",
            "level": 1
          },
          {
            "id": "why-locks-rewrites-break-slas",
            "label": "Why Locks & Rewrites Break SLAs",
            "level": 2
          },
          {
            "id": "tool-chaining-vs-embedded-capabilities",
            "label": "Tool Chaining vs. Embedded Capabilities",
            "level": 2
          },
          {
            "id": "diy-route-external-change-toolchain-without-tidb",
            "label": "DIY Route: External Change Toolchain (Without TiDB)",
            "level": 1
          },
          {
            "id": "off-hours-windows-throttlers-shadow-tables",
            "label": "Off-Hours Windows, Throttlers, Shadow Tables",
            "level": 2
          },
          {
            "id": "multi-hop-ops-and-consistency-jitter",
            "label": "Multi-Hop Ops and Consistency Jitter",
            "level": 2
          },
          {
            "id": "tidb-route-embedded-in-database-online-ddl",
            "label": "TiDB Route: Embedded, In-Database Online DDL",
            "level": 1
          },
          {
            "id": "three-phase-build-with-live-traffic",
            "label": "Three-Phase Build with Live Traffic",
            "level": 2
          },
          {
            "id": "keep-reads-writes-flowing-no-app-changes",
            "label": "Keep Reads/Writes Flowing—No App Changes",
            "level": 2
          },
          {
            "id": "labor-showdown-external-vs-embedded-approach",
            "label": "Labor Showdown: External vs. Embedded Approach",
            "level": 1
          },
          {
            "id": "implementation-flight-plan",
            "label": "Implementation Flight Plan",
            "level": 1
          },
          {
            "id": "step-1-readiness",
            "label": "Step 1: Readiness",
            "level": 2
          },
          {
            "id": "step-2-dry-run",
            "label": "Step 2: Dry-Run",
            "level": 2
          },
          {
            "id": "step-3-execute",
            "label": "Step 3: Execute",
            "level": 2
          },
          {
            "id": "step-4-validate",
            "label": "Step 4: Validate",
            "level": 2
          },
          {
            "id": "step-5-document",
            "label": "Step 5: Document",
            "level": 2
          },
          {
            "id": "day-2-ops-best-practices",
            "label": "Day-2 Ops Best Practices",
            "level": 1
          },
          {
            "id": "observability-ddl-progress-metrics-top-sql-heatmaps",
            "label": "Observability: DDL Progress Metrics, Top SQL, Heatmaps",
            "level": 2
          },
          {
            "id": "guardrails-change-budgets-canary-ddl-slo-aware-throttling",
            "label": "Guardrails: Change Budgets, Canary DDL, SLO-Aware Throttling",
            "level": 2
          },
          {
            "id": "resilience-backup-verification-rollback-patterns",
            "label": "Resilience: Backup Verification, Rollback Patterns",
            "level": 2
          },
          {
            "id": "proof-in-production",
            "label": "Proof in Production",
            "level": 1
          },
          {
            "id": "plaid-from-six-months-of-upgrade-pain-to-one-week-with-zero-downtime",
            "label": "Plaid: From Six Months of Upgrade Pain to One Week with Zero Downtime",
            "level": 2
          },
          {
            "id": "outcomes",
            "label": "Outcomes",
            "level": 2
          },
          {
            "id": "pinterest-petabyte-scale-operations-without-midnight-incidents",
            "label": "Pinterest: Petabyte-Scale Operations Without Midnight Incidents",
            "level": 2
          },
          {
            "id": "next-steps",
            "label": "Next Steps",
            "level": 1
          },
          {
            "id": "try-tidb-cloud",
            "label": "Try TiDB Cloud",
            "level": 1
          },
          {
            "id": "book-a-schema-change-workshop",
            "label": "Book a Schema Change Workshop",
            "level": 1
          }
        ],
        "sticky": true
      }
    },
    {
      "id": "intro",
      "type": "richTextBlock",
      "props": {
        "content": "You need to add an index to a billion-row orders table. In traditional MySQL, that means scheduling a maintenance window, spinning up external tools like gh-ost or pt-online-schema-change, throttling writes, and praying nothing fails at 2 A.M. Your SRE team loses sleep. Your customers lose access. And if something goes wrong, rollback becomes a choose-your-own-adventure nightmare.\n\nThere's a better way. TiDB's online DDL runs schema changes in three phases while keeping reads and writes flowing. Internally, it progresses through multiple online DDL states during the change, so you can ship database migrations during business hours without toolchain choreography, lock drama, or SLA violations. This playbook shows storage leads and SREs how to execute [MySQL online schema change](https://www.pingcap.com/blog/effective-online-ddl-database-schema-changes-zero-downtime/) operations safely during normal work hours using TiDB's built-in capabilities.\n\n## Jump to a Section\n\n- [Who This Playbook Is For: Storage Leads & SREs](#who-this-playbook-is-for-storage-leads--sres)\n- [What We're Solving Today: Schema Changes Hurt at Scale](#what-were-solving-today-schema-changes-hurt-at-scale)\n- [DIY Route: External Change Toolchain (Without TiDB)](#diy-route-external-change-toolchain-without-tidb)\n- [TiDB Route: Embedded, In-Database Online DDL](#tidb-route-embedded-in-database-online-ddl)\n- [Labor Showdown: External vs. Embedded Approach](#labor-showdown-external-vs-embedded-approach)\n- [Implementation Flight Plan](#implementation-flight-plan)\n- [Day-2 Ops Best Practices](#day-2-ops-best-practices)\n- [Proof in Production](#proof-in-production)\n- [Next Steps](#next-steps)\n\n## Who This Playbook Is For: Storage Leads & SREs\n\nStorage team leads own the database platform and are responsible for schema governance, migration playbooks, and platform safety rails. They must balance velocity with reliability as application teams push schema changes weekly or even daily.\n\nSite Reliability Engineers (SREs) are measured on uptime, incident frequency, and clean rollouts under load. For them, every schema change is a potential incident. Traditional MySQL schema operations create tension between these groups because the tools and processes required are complex, fragile, and interrupt service.\n\nTheir shared pain points include:\n\n- Coordinating midnight maintenance windows across global teams.\n- Babysitting long-running DDL tools that can fail midway.\n- Fielding customer complaints about degraded performance during \"online\" schema changes.\n- Building rollback playbooks for every possible failure mode.\n\n[TiDB](https://www.pingcap.com/tidb/) addresses these challenges with built-in MySQL online DDL that runs in three phases to keep reads and writes flowing, while internally progressing through multiple online DDL states during the change. Schema changes happen during lunch, not midnight, and the entire operation is controlled through standard SQL, with no external tool orchestration required.\n\n## What We're Solving Today: Schema Changes Hurt at Scale\n\nTraditional ALTER TABLE statements lock tables or throttle writes during execution. Even sophisticated online DDL tools introduce jitter, connection retries, and pause-resume logic that affects application performance. On tables with billions of rows, table rewrites can take minutes to hours. Running these operations during business hours risks order failures, slow page loads, and broken reports, which is why teams resort to the dreaded 2 A.M. maintenance window.\n\n### Why Locks & Rewrites Break SLAs\n\nMySQL's traditional DDL implementation uses table copying or in-place algorithms that hold metadata locks, rebuild indexes, or reorganize data. During these operations:\n\n- Metadata locks block concurrent DML (inserts, updates, deletes) until the DDL completes.\n- Table rewrites consume massive amounts of IO and CPU, degrading performance for all queries.\n- Replication lag spikes as replicas struggle to keep up with DDL changes.\n- Connection storms occur when applications retry queries that timeout during locks.\n\nThe result: p95 and p99 latencies spike, error rates climb, and customer-facing services degrade. Even \"online\" DDL operations in MySQL 5.7+ and 8.0+ can cause substantial performance impact on large, busy tables.\n\n### Tool Chaining vs. Embedded Capabilities\n\nTo work around MySQL's DDL limitations, many teams adopt external tools like gh-ost or pt-online-schema-change. These tools work by creating shadow tables, copying data in chunks, and then swapping tables at the end. While this approach avoids full table locks, it introduces new operational complexity:\n\n- Installing, configuring, and maintaining separate toolchains.\n- Writing automation to handle tool failures, retries, and rollbacks.\n- Managing additional load from shadow table writes and data reconciliation.\n- Coordinating cut-over timing to minimize application disruption.\n- Cleaning up triggers, shadow tables, and artifacts after completion.\n\nThis external toolchain approach transforms what should be a simple database operation into a multi-phase engineering project. TiDB eliminates this complexity by embedding online DDL capabilities directly into the database engine.",
        "className": "rich-text-block--raw-source"
      },
      "style": {
        "background": "none",
        "spacing": "section",
        "removePaddingTop": true,
        "removePaddingBottom": true
      }
    },
    {
      "id": "cta-intro-1",
      "type": "cta",
      "props": {
        "title": "",
        "subtitle": "See how online DDL keeps reads and writes flowing on billion-row tables.",
        "primaryCta": {
          "text": "Start Free Trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Request a Workshop",
          "href": "https://www.pingcap.com/contact-us/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "sm",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/files/2025/06/22092103/1000011430.png"
          }
        }
      }
    },
    {
      "id": "pre-1",
      "type": "richTextBlock",
      "props": {
        "content": "## DIY Route: External Change Toolchain (Without TiDB)\n\n### Off-Hours Windows, Throttlers, Shadow Tables\n\nRunning MySQL add index online operations without TiDB requires a multi-tool approach that most teams have battle-tested through painful experience. Here's what the typical workflow looks like:\n\nPlan windows: Coordinate cross-team communications, freeze application deployments, and book low-traffic time slots (typically 2-4 A.M. local time). This requires alignment across engineering, product, and support teams.\n\nChoose & wire tools: Select between gh-ost and pt-online-schema-change based on your MySQL version and workload patterns. Configure CDC streams to monitor replication lag. Set up throttlers to protect p99 latency. Write failover runbooks for every conceivable edge case.\n\nWarm replicas & rehearse: Copy production load to staging. Pre-seed indexes on test tables. Simulate replication lag scenarios. Tune chunk sizes and throttle parameters through trial and error.\n\n```bash\n# Example pt-online-schema-change command: MySQL add index online\npt-online-schema-change \\\n  --alter \"ADD INDEX idx_created_at (created_at)\" \\\n  --execute \\\n  h=prod-db-01,D=orders,t=order_items \\\n  --max-lag=2 \\\n  --chunk-size=1000 \\\n  --max-load=Threads_running=50 \\\n  --critical-load=Threads_running=100 \\\n  --chunk-time=0.5\n```\n\nRun & babysit: Monitor the tool's progress for hours. Throttle aggressively to protect p99 latency. Chase deadlocks and lock wait timeouts. Re-try failed chunks. Handle failover edge cases when replicas fall behind. Stay awake through the entire operation.\n\nAudit & clean up: After the cut-over completes, remove triggers and shadow tables. Reconcile any data drift between the original and new table. Run ANALYZE TABLE to update statistics. File incident postmortems documenting what went wrong and what you'll do differently next time.\n\n### Multi-Hop Ops and Consistency Jitter\n\nThe external toolchain approach introduces consistency challenges that don't exist with native online DDL:\n\n- Trigger overhead: Tools create triggers to capture changes during the copy phase, adding latency to every write.\n- Cut-over coordination: The final table swap requires careful timing to minimize data loss or duplication.\n- Replication drift: Shadow tables and triggers can cause replicas to fall behind, requiring manual intervention.\n- Resource contention: The tool's chunk-based copying competes with application queries for IO and CPU.\n\nEach of these factors increases the risk of incidents, extends maintenance windows, and adds to SRE on-call burden.\n\n## TiDB Route: Embedded, In-Database Online DDL\n\n### Three-Phase Build with Live Traffic\n\nTiDB's online DDL runs schema changes through three phases, without blocking reads or writes, and internally it progresses through multiple online DDL states during the change. The entire operation happens in-database with no external tools required:\n\n**Phase 1 - Prepare**: TiDB validates the DDL statement and creates internal metadata structures. This phase typically completes in seconds.\n\n**Phase 2 - Build**: The database builds new indexes or restructures data in the background while serving live traffic. The TiDB scheduler smooths IO and CPU usage to prevent p99 spikes. Application queries continue uninterrupted.\n\n**Phase 3 - Commit**: After the background work completes, TiDB atomically commits the schema change with minimal coordination overhead.\n\n```sql\n-- MySQL ALTER TABLE without downtime: add index during business hours\nALTER TABLE orders ADD INDEX idx_created_at (created_at);\n\n-- Monitor DDL progress\nSELECT\n    DB_NAME,\n    TABLE_NAME,\n    JOB_TYPE,\n    STATE,\n    ROW_COUNT,\n    START_TIME\nFROM information_schema.DDL_JOBS\nWHERE STATE = 'running';\n\n-- Monitor DDL progress (friendlier view)\nADMIN SHOW DDL JOBS;\n```\n\n### Keep Reads/Writes Flowing—No App Changes\n\nUnlike external schema change tools that require application-level coordination, TiDB's online DDL is completely transparent to applications. There are no connection pool changes, no retry logic to implement, and no special handling for in-flight transactions.\n\nThe benefits extend beyond simplicity:\n\n- Predictable performance: The scheduler prevents DDL operations from degrading query performance.\n- Automatic rollback: If a DDL fails mid-execution, TiDB automatically rolls back without leaving artifacts.\n- Single operational surface: Same RBAC, backups, observability, and autoscaling as the rest of TiDB.\n- Daytime deployment: Ship schema changes during normal business hours with confidence.\n\n```sql\n-- Online index creation: type change and index in a single operation\nALTER TABLE ledger\n    MODIFY COLUMN amount DECIMAL(20,4),\n    ADD INDEX idx_txn_date (transaction_date);\n\n-- Check table structure immediately\nSHOW CREATE TABLE ledger;\n```\n\nThe outcome is predictable, SLO-friendly schema changes that fit normal change windows without special tooling or off-hours coordination.\n\n## Labor Showdown: External vs. Embedded Approach\n\nLet's compare the engineering effort, risk, and time required to add an index to a 1 billion-row table using external tools versus TiDB's embedded online DDL.\n\n| Task Component | Without TiDB (gh-ost/pt-osc) | With TiDB |\n|---|---|---|\n| Planning & Coordination | 4-6 hours (schedule window, freeze deploys, coordinate teams) | 30 minutes (review change, check staging) |\n| Tool Setup & Testing | 3-4 hours (install tools, configure parameters, dry-run) | 0 hours (native capability) |\n| Execution Monitoring | 6-8 hours (babysit overnight, handle retries and failures) | 1 hour (monitor progress, validate completion) |\n| Cleanup & Verification | 2-3 hours (remove triggers, verify data, update statistics) | 15 minutes (run validation queries) |\n| Rollback Complexity | High (manual table swap, data reconciliation, app coordination) | Low (standard DDL rollback via SQL) |\n| Incident Risk | Medium-High (tool failures, replication lag, cut-over issues) | Low (tested, predictable path) |\n| Time to Complete (1B rows) | 12-16 hours (including prep and cleanup) | 4-6 hours (background build, daytime execution) |\n| On-Call Burden | 2-3 engineers overnight | 1 engineer (normal business hours) |\n*Table 1: Engineer-hours, incident risk, and time-to-complete for a 1-billion-row add-index operation.*\n\n> **Bottom line:** External toolchains require multi-tool choreography, off-hours staffing, and complex rollback gymnastics. TiDB delivers one SQL statement, daytime rollout, and standard rollback via DDL control, reducing engineering hours by 70% and eliminating overnight incidents.\n\n## Implementation Flight Plan\n\nFollow this step-by-step plan to execute schema changes safely in TiDB during normal business hours.\n\n### Step 1: Readiness\n\nPick a candidate table for your first online DDL operation. Confirm that backups are current and that you have defined SLO guardrails for acceptable p95 and p99 latency during the change.\n\n```sql\n-- Verify backup status\nSHOW BACKUPS;\n\n-- Check current table statistics\nANALYZE TABLE orders;\nSHOW STATS_META WHERE table_name = 'orders';\n```\n\n### Step 2: Dry-Run\n\nRun a staging load test with production-like cardinality and data skew. Execute the DDL statement in staging and monitor the impact on query performance.\n\n```sql\n-- Staging environment test\nALTER TABLE orders_staging ADD INDEX idx_created_at (created_at);\n\n-- Monitor query performance during DDL (SQL-level view)\n-- Note: statements_summary does not expose p95 latency. Use PD Dashboard/Grafana for p95/p99.\nSELECT\n    digest_text,\n    avg_latency / 1000000 AS avg_ms\nFROM information_schema.statements_summary\nWHERE schema_name = 'staging'\nORDER BY avg_ms DESC\nLIMIT 20;\n```\n\n### Step 3: Execute\n\nRun the DDL in production during normal business hours. Monitor DDL progress using the jobs table and watch p95/p99 latencies to confirm they remain within SLO.\n\n```sql\n-- Execute DDL in production\nALTER TABLE orders ADD INDEX idx_created_at (created_at);\n\n-- Monitor DDL progress (raw view)\nSELECT\n    JOB_TYPE,\n    STATE,\n    ROW_COUNT,\n    START_TIME,\n    TIMESTAMPDIFF(MINUTE, START_TIME, NOW()) AS elapsed_minutes\nFROM information_schema.DDL_JOBS\nWHERE STATE = 'running';\n\n-- Monitor DDL progress (friendlier view)\nADMIN SHOW DDL JOBS;\n\n-- Watch latency percentiles (p95/p99)\n-- Note: statements_summary does not expose p95/p99 latency. Use PD Dashboard/Grafana for p95/p99.\n-- You can still monitor average latency here as a SQL-level signal:\nSELECT\n    digest_text,\n    avg_latency / 1000000 AS avg_ms\nFROM information_schema.statements_summary\nWHERE schema_name = 'production'\nORDER BY avg_ms DESC\nLIMIT 10;\n```\n\n### Step 4: Validate\n\nAfter DDL completes, compare query plans to confirm the new index is being used. Hit key workloads to verify performance improvements. Remove any compensating controls you added before the change.\n\n```sql\n-- Verify index was created\nSHOW CREATE TABLE orders;\n\n-- Compare query plans\nEXPLAIN SELECT * FROM orders WHERE created_at > '2025-01-01';\n\n-- Test key queries\nSELECT COUNT(*) FROM orders WHERE created_at BETWEEN '2025-01-01' AND '2025-02-01';\n```\n\n### Step 5: Document\n\nCodify the runbook and add alerts for future DDL operations. Document timing, performance impact, and any lessons learned. Add this pattern to your team's golden path for database migration zero downtime.\n\n## Day-2 Ops Best Practices\n\nAfter your first successful daytime DDL operation, establish these practices to make online schema changes routine.\n\n### Observability: DDL Progress Metrics, Top SQL, Heatmaps\n\nMonitor DDL progress using [TiDB's built-in observability tools](https://docs.pingcap.com/tidb/stable/tidb-monitoring-framework/). The DDL jobs table shows real-time status, row counts, and elapsed time. Top SQL identifies queries affected by schema changes. Heatmaps reveal IO patterns during background index builds.\n\n```sql\n-- Real-time DDL monitoring query\nSELECT\n    DB_NAME,\n    TABLE_NAME,\n    JOB_TYPE,\n    STATE,\n    ROW_COUNT,\n    START_TIME,\n    TIMESTAMPDIFF(MINUTE, START_TIME, NOW()) AS running_minutes\nFROM information_schema.DDL_JOBS\nWHERE STATE IN ('running', 'queueing')\nORDER BY START_TIME DESC;\n\n-- Identify slow queries during DDL\nSELECT\n    digest_text,\n    exec_count,\n    avg_latency / 1000000 AS avg_ms,\n    max_latency / 1000000 AS max_ms\nFROM information_schema.statements_summary\nWHERE max_latency > 1000000  -- queries slower than 1s\nORDER BY avg_ms DESC\nLIMIT 20;\n```\n\n### Guardrails: Change Budgets, Canary DDL, SLO-Aware Throttling\n\nWhen you run many DDLs at once, they can queue. That means you need to establish change budgets that limit how many large DDLs run at the same time. Use shadow tables for canary testing of complex schema changes. Configure SLO-aware throttling to automatically slow DDL operations if query latency exceeds thresholds.\n\n```sql\n-- Create canary table for testing\nCREATE TABLE orders_canary LIKE orders;\n\n-- Test DDL on canary first\nALTER TABLE orders_canary ADD COLUMN priority INT DEFAULT 0;\n\n-- After validation, apply to production\nALTER TABLE orders ADD COLUMN priority INT DEFAULT 0;\n```\n\n### Resilience: Backup Verification, Rollback Patterns\n\nBefore any significant schema change, verify that backups include the table structure and data. Test restoration procedures to confirm recovery time objectives. Document rollback patterns for different DDL types.\n\n```sql\n-- Verify backup coverage before DDL\nSELECT\n    table_schema,\n    table_name,\n    create_time,\n    update_time\nFROM information_schema.tables\nWHERE table_schema = 'production'\n  AND table_name = 'orders';\n\n-- Rollback pattern for failed DDL\n-- TiDB handles automatic rollback on failure,\n-- but you can also explicitly drop unwanted changes\nALTER TABLE orders DROP INDEX idx_created_at;\n```",
        "className": "rich-text-block--raw-source"
      },
      "style": {
        "background": "none",
        "spacing": "section",
        "removePaddingTop": true,
        "removePaddingBottom": true
      }
    },
    {
      "id": "cta-intro-2",
      "type": "cta",
      "props": {
        "title": "",
        "subtitle": "Map your current DDL process into a low-risk migration sequence with PingCAP engineers.",
        "primaryCta": {
          "text": "Request a Workshop",
          "href": "https://www.pingcap.com/contact-us/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "sm",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/files/2025/06/22184957/1000011432.png"
          }
        }
      }
    },
    {
      "id": "pre-2",
      "type": "richTextBlock",
      "props": {
        "content": "## Proof in Production\n\nReal teams running mission-critical workloads have eliminated 2 A.M. schema changes using TiDB's online DDL capabilities. Here's what that looks like in practice.\n\n### Plaid: From Six Months of Upgrade Pain to One Week with Zero Downtime\n\nPlaid, a financial services technology company processing billions of financial transactions, faced [severe operational pain with Amazon Aurora MySQL](https://www.pingcap.com/blog/accelerating-distributed-sql-adoption-plaid-amazon-aurora-migration/). Online schema changes required heavy-handed workarounds, where teams would add entirely new tables instead of modifying existing ones to avoid service interruptions. On tables ranging from 2-10+ TB, schema modifications were architectural nightmares.\n\nThe numbers told a brutal story: Plaid spent two engineering years annually architecting around Aurora's limitations. Major version upgrades consumed six months of engineering effort and still required tens of minutes of downtime per cluster. For a company committed to 24/7 uptime in financial services, this was unsustainable.\n\n#### Outcomes\n\n- Upgraded **six production clusters in one week with zero downtime**, instead of spending months on each major upgrade cycle.\n- Cut maintenance effort by **96%**, reclaiming engineering time previously spent architecting around Aurora's limits.\n- Ran routine schema modifications during business hours, even on **5+ TB tables** with **tens to hundreds of billions of rows**.\n- Reduced paging and operational anxiety, so teams felt safe making routine DDL changes.\n\n[Why Plaid Migrated from Managed MySQL to TiDB](https://www.youtube.com/watch?v=o6eetnpi-3Q)\n\n### Pinterest: Petabyte-Scale Operations Without Midnight Incidents\n\nPinterest operates one of the world's largest visual discovery platforms, serving over 500 million monthly users with recommendation engines, shopping catalogs, and graph databases. [Their legacy HBase infrastructure spanned more than 50 production clusters](https://www.pingcap.com/blog/why-pinterest-modernized-graph-service-distributed-sql/) hosting 9,000+ virtual machines with 6+ PBs of data on disk. While HBase handled scale, it lacked critical capabilities: no secondary indexes, no transaction support, and schema changes required extensive planning and coordination.\n\nThe operational burden was crushing. Every schema evolution meant coordinating across dozens of clusters. Adding indexes required building entire secondary indexing services. The infrastructure cost was high, the complexity was growing, and the team knew they couldn't serve the next 3-5 years of business needs without fundamental change.\n\n#### Outcomes\n\n- Consolidated **50+ clusters** while adding capabilities the legacy stack could not deliver.\n- Eliminated the need for application-level indexing services by using TiDB's **native secondary indexes** and **ACID transactions**.\n- Used **online DDL** to ship schema changes without coordinating multi-cluster maintenance windows.\n- Reduced infrastructure costs by **80%+**, while improving operational safety and velocity.\n\n[How Pinterest Modernized Its NoSQL Data Infrastructure](https://www.youtube.com/watch?v=mvmw4NhJko4)\n\n## Next Steps\n\nIf you're ready to stop coordinating midnight maintenance windows and start shipping schema changes at lunch, with proof that billion-row tables won't lock or degrade SLAs, these next steps will get you started quickly.\n\n:::card\n## Try TiDB Cloud\n\nIf you want to see the impact fast without committing to a migration plan, start here. Signing up for a free trial of TiDB Cloud turns \"it should work\" into proof as you can run real DDL operations on production-scale tables during peak traffic hours.\n\nHere's what you can test:\n\n- Add indexes to billion-row tables during business hours and watch p95/p99 latency stay flat.\n- Prove you can drop gh-ost and pt-online-schema-change by running native ALTER TABLE without downtime.\n- A before/after comparison of engineering hours and incident risk you can take to leadership.\n\n[Start Free Trial](https://tidbcloud.com/free-trial/)\n:::\n\n:::card\n## Book a Schema Change Workshop\n\nIf you need alignment and a concrete plan before you run tests, start here. This working session maps your current DDL process (tools, windows, runbooks) into a migration sequence with clear validation gates and a clean decommission path for external toolchains.\n\nHere's what you'll get:\n\n- A clear inventory of your largest tables, DDL frequency, and maintenance window costs.\n- A prioritized list of high-impact migrations (tables with the longest DDL times, most frequent changes, or strictest SLAs).\n- A low-risk migration sequence with staging validation, phased production rollout, and rollback procedures.\n\n[Request a Workshop](https://www.pingcap.com/contact-us/)\n:::",
        "className": "rich-text-block--raw-source"
      },
      "style": {
        "background": "none",
        "spacing": "section",
        "removePaddingTop": true,
        "removePaddingBottom": true
      }
    },
    {
      "id": "cta-intro-3",
      "type": "cta",
      "props": {
        "title": "",
        "subtitle": "Stop scheduling 2 A.M. maintenance. Ship schema changes at lunch with TiDB online DDL.",
        "primaryCta": {
          "text": "Start Free Trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Request a Workshop",
          "href": "https://www.pingcap.com/contact-us/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "sm",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/files/2025/06/22211020/1000011435.png"
          }
        }
      }
    }
  ]
}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
