# TiDB Cloud Filesystem — Landing Page Plan

Status: **hero, IA, §2 copy and all 16 decisions settled. Kimi authorization
(due 2026-08-07) is the one live gate.** Date: 2026-08-03, last revised
2026-08-06.

This file is the current spec and claim gate — the candid working copy.
Settled reasoning and superseded copy live in
[PLAN-HISTORY.md](PLAN-HISTORY.md); the reusable positioning lessons in
[POSITIONING-LESSONS.md](POSITIONING-LESSONS.md); terminology in
[CONTEXT.md](CONTEXT.md).

Team review copy (reframed, softer on the benchmark section):
<https://pingcap.jp.feishu.cn/docx/LWo6dS3J9oXZmnxq16NjXdqbp8e>. That copy is
internal, so it may cite Appendix A and B material; only the public page needs
clearance. Re-sync manually when decisions change.

Primary sources:

- Todd's launch/FAQ doc — <https://pingcap.feishu.cn/docx/U1TCdxubKo6rFKx7RBjcTDKOn5w>
- **Marketing's mockup, `FS Landing Page _ Aug 14`** —
  <https://pingcap.feishu.cn/wiki/Ljq3whoSmiYLgckpohXcqHainYf>. **A mockup, not
  the spec** (Decision 12).
- **`FS Evidence Assets — What, When, and How`** (v2026-08-01) —
  <https://pingcap.feishu.cn/wiki/AY7VwKahLikYjVkFnx4cfViWnvh>. Marketing's
  governing GTM doc: the Aug 16 minimum bar, the docs gates, the demo rules.
  **Where this file and the Growth Plan conflict, the Growth Plan wins** — that
  is the Evidence doc's own rule.
- `tdc` CLI reference — <https://github.com/tidbcloud/tdc>. The source of truth
  for what actually exists.

## Milestones

| Date           | Event                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| **2026-08-07** | **Kimi authorization — Growth Plan open decision #8. Gates the Aug 16 moment. Not our decision**                 |
| 2026-08-10     | 1st version of landing page design out for internal review                                                       |
| **2026-08-16** | **Landing page target (Heidi's plan). Todd has 5 days for dev and test**                                         |
| 2026-08-20     | API for listing all filesystems under an account (today `tdc` only sees filesystems created on the same machine) |
| **2026-08-31** | **List price finalised. Demo 1 non-author replay — hard gate. Private preview opens**                            |
| 2026-09-10     | Billing effective (per Product; see open items — two internal figures unreconciled)                              |
| **2026-09-13** | **Selection-and-boundaries page. Production evaluation checklist. Benchmark lands here**                         |
| **2026-09-15** | **Filesystem UI on the TiDB Cloud web console**                                                                  |
| 2026-09-30     | Public preview. GA timing set by public-preview feedback                                                         |

**Scope: this page is the technical-preview page**, targeting 2026-08-16. It is
not the private- or public-preview page; those get their own refresh later.

**Aug 16 minimum bar (from Evidence doc §4.1 — adopted).** Ship the dated
announcement only if at least one of these clears:

- (a) an approved proof form, no weaker than an approved anonymized
  description; or
- (b) a viewable, access-controlled CLI walkthrough, even if open self-serve
  isn't live.

**Neither → pull the dated announcement and keep the page as product
education.** (b) is satisfied by demo 1, which is being built anyway — its
_replay_ gate is Aug 31, but §4.1 only requires _viewable_ by Aug 16.

**Claims discipline (from Evidence doc §5.1 — adopted verbatim).** Every claim
on the page must be one of three things: **a runnable flow, a public
interface, or an explicitly labeled limitation.** Nothing else ships.

## Decisions

Current rulings only — full reasoning in [PLAN-HISTORY.md](PLAN-HISTORY.md).

| #   | Decision                                                         | Status                                                                                                                                                                                                                                                             |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Wedge is **"the workspace your agents share"**                   | Headline only — **category frame, not differentiator**; subhead and value cards carry the differentiation (ADR-0001, lessons file)                                                                                                                                 |
| 2   | Proof is a real benchmark                                        | **Deferred to 2026-09-13** — production, in-region, reproducible repo, concurrency-shaped                                                                                                                                                                          |
| 3   | One page. Quickstart primary CTA, low-key "talk to us" secondary | Holds — overrides Evidence doc §4; Mesa precedent                                                                                                                                                                                                                  |
| 4   | CTA is quickstart, not free trial                                | Holds. No waitlist; "access is limited" phrasing stays dropped                                                                                                                                                                                                     |
| 5   | Hero is the token-mount snippet                                  | Settled: create → mount → write → **mountless readback**. See "Hero code sample"                                                                                                                                                                                   |
| 6   | "Filesystem token" and "API key"; never a bare "token"           | Holds                                                                                                                                                                                                                                                              |
| 7   | The API key never appears on the page                            | Resolved — `--query fs_token` gives the token a visible origin in the snippet                                                                                                                                                                                      |
| 8   | IA: seven sections, claim → evidence → mechanism → application   | Settled — see Information architecture                                                                                                                                                                                                                             |
| 9   | No testimonials                                                  | Amended: §3 runs the **full-strength Kimi treatment** (wordmark, Kimi Work naming, story CTA) presuming decision #8 + co-branding clear 2026-08-07; downgrade is a text swap carried by the in-page REVIEW note. Still no quote, no outcome metric                 |
| 10  | Standalone static build at `pingcap.com/tidb-cloud-filesystem/`  | Holds — Evidence doc §2.1 requires a stable public URL                                                                                                                                                                                                             |
| 11  | Big matrix internally, narrow comparison publicly                | Simplified: **no competitor comparison on Aug 16 at all** — §5 routes storage categories by boundary, no clearance needed                                                                                                                                          |
| 12  | Marketing's mockup is a comp; this file is the spec              | Settled. Product owns claim approval — four mockup claims flagged: access-limited, co-branding, code-symbol search, checkpoint                                                                                                                                     |
| 13  | Value cards are built on discriminating capabilities             | Settled — see IA §2                                                                                                                                                                                                                                                |
| 14  | The 8-step loop is **shown, not narrated**                       | Settled via prototype: full-bleed auto-advancing expanding-card strip (4s interval, hover pauses, reduced-motion static, compact list below lg). Losing variants on `prototype/fs-loop-section`                                                                    |
| 15  | §2 header reworked; three cards stand; **no search card**        | Settled 2026-08-06: foil is the reader's ephemeral sandbox disk; moat in plain speech in the subhead; **checkpoints never appear in §2**; search folds into the reassurance strip clause — card candidacy revisits in September only if index-backed and exclusive |
| 16  | §2 card 3 is **the working set**, not consistency modes          | Settled 2026-08-06. Card criterion: **3-second legibility + true under claims discipline + felt**. Consistency modes → FAQ 11 + the 2026-09-13 page                                                                                                                |

## What actually differentiates us

**Internal only** — none of this reaches the page on Aug 16; it keeps the
value cards honest.

| Dimension                         | S3 Files            | Archil               | Mesa                   | Cloudflare Artifacts      | Turso AgentFS                     | TiDB Cloud Filesystem                    |
| --------------------------------- | ------------------- | -------------------- | ---------------------- | ------------------------- | --------------------------------- | ---------------------------------------- |
| Core shape                        | object / NFS        | mount                | version                | git repo                  | agent runtime                     | **shared workspace**                     |
| Hosted, concurrent, multi-machine | ✅                  | ✅                   | ✅                     | ✅                        | ❌ local-first single file        | ✅                                       |
| **Consistency modes**             | NFS semantics       | ❌                   | ❌                     | ❌                        | ❌                                | ✅ writeback / close-sync / write-sync   |
| Non-git files                     | ✅                  | ✅                   | ✅                     | ❌ git-specific by design | ✅                                | ✅                                       |
| **Git-aware workspace**           | ❌                  | ❌                   | ⚠️ versioning, not git | ✅ strongest in class     | ❌                                | ✅ `fs-git`                              |
| Layers / checkpoint / rollback    | ❌                  | ⚠️ disk-level        | ✅ fork, checkpoint    | ⚠️ git-shaped forking     | ✅ instant COW branching          | ✅ fs- and directory-level               |
| Audit trail                       | CloudTrail          | ❌                   | ⚠️ approval queues     | ❌                        | ✅ SQL-queryable, incl. toolcalls | ✅ `fs-journal`                          |
| Secrets / vault                   | ❌ separate service | ❌                   | ❌                     | ❌                        | ❌                                | ✅ `fs-vault`                            |
| Semantic search                   | ❌                  | ❌                   | ❌                     | ❌                        | ❌                                | ⚠️ built, **not live in tech preview**   |
| Built-in sandbox                  | ❌                  | ✅                   | ❌                     | ❌                        | ✅ CLI wraps a program            | ❌ BYO — E2B, Modal, Daytona             |
| SDK languages                     | AWS SDKs            | —                    | ✅ TypeScript          | git + APIs                | ✅ TS, Python, Rust               | ❌ **Go CLI only**                       |
| Open source                       | ❌                  | ❌                   | ❌                     | ✅ ArtifactFS, Apache-2.0 | ✅                                | ⚠️ CLI only                              |
| Platform                          | AWS                 | AWS, GCP, Cloudflare | BYOC AWS/GCP/Azure     | Cloudflare only           | anywhere, incl. browser WASM      | AWS; GCP planned; Alibaba, Tencent ready |
| Maturity                          | GA                  | GA                   | early access           | beta                      | beta                              | tech preview                             |

**Consistency modes and git-aware workspace are the two rows that carry
weight.** Hosted/concurrent/multi-machine is ticked by five of six — table
stakes.

Against **Cloudflare Artifacts**: it wins git-aware outright, but it is
git-_only_ by design, so it cannot hold `node_modules`, test output, or
artifacts — a clean structural contrast that needs no naming on the page.
Their published limits: `git status` ~7 s on a 5,800-entry repo, `git reset`
~6.5 s.

**The wedge has a shelf life.** Turso's CTO
[describes](https://penberg.org/blog/disaggregated-agentfs.html) disaggregating
onto object storage as "a direction, not a finished system." If they execute,
the shared-service axis narrows further.

## Verified against the shipped CLI — 2026-08-05

Checked <https://github.com/tidbcloud/tdc>. Under the claims discipline, "a
public interface" is a valid basis for a claim, so this settles most of what
the page may assert.

**Real, public, safe to build copy on:**

- `tdc fs create-file-system … --query fs_token` — **returns the filesystem
  token directly.** This is what unblocks Decision 7.
- `fs-git clone-git-workspace`, `hydrate-git-workspace`, `add-git-worktree` —
  git-aware workspace has a public interface. Value card 1 is supportable.
- `fs-journal create-journal / append / read / search / verify-journal`
- `fs-vault create-secret / create-grant / list-audit-events / run-with-secret / mount-vault`
- `fs create-layer / create-layer-checkpoint / rollback-layer / commit-layer /
diff-layer` — commands exist; the _guarantee_ does not. Marketing's FAQ
  wording on this is precisely right and should be kept verbatim.
- `fs search-file-content` (alias `grep`), `fs find-files` (alias `find`)
- `fs read-file` (alias `cat`) — **reads without mounting.** The hero's last
  line.

**Two discrepancies to settle with Todd before copy:**

1. **Regions.** The CLI documents **six** codes — `aws-us-east-1`,
   `aws-us-west-2`, `aws-eu-central-1`, `aws-ap-northeast-1`,
   `aws-ap-southeast-1`, `ali-ap-southeast-1`. This file has said "two regions
   only." Evidence doc §2.2 separately flags _"`ap-southeast-1` has no public
   evidence; source internally."_ Somebody is wrong, and it is a FAQ answer
   either way.
2. **"Code-symbol matching."** Marketing claims it as a mode to rely on today.
   The CLI has content grep and filename find; no symbol-aware command is
   documented. Treat as an invented capability until Todd says otherwise.

## Information architecture

Adopted from Marketing: **every floor's headline answers the previous floor's
closing line.**

1. **Hero** — headline, subhead carrying the differentiation, code panel
   showing create → mount → write → mountless readback. `Quickstart` primary,
   `Talk to us` secondary. **Two CTAs, nothing else.**

   > # The workspace your agents share.
   >
   > One filesystem, held by several runtimes at once, that knows what an
   > agent leaves behind — dirty tree, new objects, test output, artifacts.

   Those four nouns are the exact things that survive here and die in a
   sandbox volume, and none of them is a retracted claim.

2. **What makes it different** — three cards, easiest → deepest. Header
   (Decision 15):

   > ## Three things the disk in your sandbox can't do.
   >
   > All three exist for one reason: a distributed database sits under this
   > filesystem, so it can promise things a disk can't.

   Card copy — approved 2026-08-06. Titles state the reader's gain;
   descriptions lead with value, technical payload second beat; the moat
   argument lives once in the subhead, not per card:

   > **Git-aware workspace — "A resumed workspace still has its git state."**
   > The branch, the uncommitted changes, the objects the agent created — all
   > of it comes back on resume. Not a fresh clone; the actual working state.
   >
   > **Rebuildable vs persistent — "Keep the outcome. Drop the noise."**
   > node*modules and dist can be rebuilt anywhere, so they stay local. What
   > can't be rebuilt — test results, failure logs, patches — is what
   > persists. *(The register benchmark. Animation budget lives here.)\_
   >
   > **Any file, any format — "One place for everything the agent touches."**
   > An agent's working set is never just code — it's source, uploads,
   > datasets, test output, artifacts. One durable workspace holds all of it,
   > instead of a repo plus a bucket plus a log shipper.
   > _Card footer: "The same path from CLI, IDE, agent and CI — one
   > namespace."_

   Plus one quiet mono strip under the cards (behavior, never "POSIX," never
   checkpoints):

   > The ordinary parts are assumed — mount it and your tools just see files.
   > Or don't mount at all: read, grep and find run against the workspace
   > directly.

   Accuracy guard: no "agents always agree" phrasing — under writeback they
   can briefly disagree; that tradeoff is the product.

3. **Proof — Kimi** — one row: Kimi wordmark, one number, one line, story CTA
   (placeholder link). Named as **Kimi Work** — "desktop AI agent for
   knowledge workers," their positioning. No quote, no outcome metric
   (Decision 9). If authorization slips: drop wordmark + CTA, restore the
   scale-of-use line — a text swap, instructions in the in-page REVIEW note.
4. **How it works** — dual data plane and the **8-step loop**: Enter the
   repository → Search → Read context → Edit files → Build and test → Save Git
   state → Checkpoint → **Hand off**. The loop ends on the wedge. Presentation
   per Decision 14 — roughly one line of copy per step, the rest carried
   visually.
5. **Where it fits** — rebuilt 2026-08-06 from the updated fits design: a
   red-bar lead ("You're in the right place if —") over four numbered scenario
   diagrams (time, setup, concurrency, portability), then a centered
   storage-category table routing each need — block storage, network file
   storage, object storage, Git hosting, agent memory, platform-native
   persistence — ending on the highlighted TiDB row. **No competitor names, no
   outbound link.**
6. **FAQ** — see below.
7. **Closing CTA** — _"Nothing to rebuild. Everything to build on."_ Plus the
   two-runtime test: write from one runtime, let it end, reopen from another.

**Navigation:** collapse it — match Mesa (five destination links, two hero
CTAs), not the mockup's six anchors + ~10 CTAs.

### FAQ

Evidence doc §2.1 makes a public known-limitations list a **required
minimum-tier gate item** (Product + Growth, "fold into the page and
quickstart"). Provenance in the history file.

1. **Regions** — pending the fact-check above; deliberately no count until
   settled.
2. **No China region** — capacity there is dedicated to Kimi. Others by
   request.
3. **Laptop mounting** — supported but not recommended; the recommended path
   is a cloud VM in-region.
4. **`tdc` currently only lists filesystems created on the same machine** —
   account-wide listing lands 2026-08-20.
5. **No SDK — Go CLI only.** Turso ships TS/Python/Rust, Mesa ships TS. Real
   gap, say so.
6. **Semantic / vector search** — full-text and filename matching today;
   semantic retrieval is not part of what the technical preview guarantees. No
   "code-symbol matching" pending the fact-check.
7. **Checkpoint and rollback** — commands visible in the CLI, not part of what
   the technical preview guarantees. What's ready is cross-runtime continuity.
   Keep Marketing's wording verbatim.
8. **No SLA** — _"Keep evaluation data recoverable elsewhere."_ Keep verbatim.
9. **Retention after the preview ends** — an open Product decision. Say so.
10. **Cost and access** — technical preview; no published price yet; **list
    pricing publishes Aug 31 and billing begins Sep 10**; usage limits apply
    per account. Not "don't assume it's free"; not "access is limited."
11. **Consistency** — "What does a second runtime see while one is writing?"
    You choose, per workspace: writeback for speed, write-sync for certainty —
    every write immediately visible everywhere — close-sync in between.
    (Decision 16 — inherits §2's retired card; no defaults invented.)

> ⚠️ Verify before this ships: **(i)** is Sep 10 billing still live — Growth
> Plan open decision #9 flags two unreconciled internal pricing figures;
> **(ii)** is technical-preview usage actually _unbilled_ before Sep 10, or
> merely _unpriced_? Only the first is safe to write down. Evidence doc §4.2
> says Aug 16 ships **no pricing content** — stating _when_ pricing arrives is
> not a pricing surface, but the distinction matters.

Deliberately absent: pricing figures, a security/compliance section,
testimonials.

### Try it — one entry point

Two entry points only — Marketing's _"Kimi-style clone lab"_ stays dropped (not
one of the two locked launch-critical demos; Evidence doc §3.1 says those
cannot be displaced).

- **Primary:** Quickstart.
- **Secondary:** the E2B coding-agent demo repo.

## Hero code sample — settled 2026-08-05

Shows spin-up ease _and_ proves the wedge. Nine lines — Mesa's is twelve.

```shell
curl -fsSL https://tidb.link/tdc | sh

# create a workspace — this issues its filesystem token
export TDC_FS_TOKEN="$(tdc fs create-file-system \
  --file-system-name agent-workspace --region aws-us-east-1 \
  --wait --query fs_token --output text)"

# in the sandbox: mount it, work in it, let the sandbox end
tdc fs mount-file-system --file-system-name agent-workspace --mount-path /workspace
echo "state that survives the sandbox" >> /workspace/notes.md

# anywhere else, same token, no mount required
tdc fs read-file --file-system-name agent-workspace --path /notes.md
```

Why this one:

- **Spin-up is one command** (the Mesa move); the proof costs two more lines.
- **The last line is the wedge in one command** — same token, different
  machine, no mount. Hero, closing CTA and launch-critical demo 1 all prove
  the identical claim (_"write → continue → mountless readback"_, Evidence doc
  §3.2).
- **Kills the laptop-mount risk** — the readback line isn't a mount, so the
  snippet no longer depicts a configuration the FAQ discourages.
- `--region` shown explicitly: required flag; hiding it makes the snippet
  non-runnable, and it forces the regions question to get settled.

## Open items

| Item                                                                                                                                                                                                                                                                                                    | Owner                                    | Due                               | Blocks                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Kimi authorization — Growth Plan open decision #8.** Ask at **brand level** (`Kimi (Moonshot AI)`) so it isn't blocked on their product-naming review. Confirm the 70,000+ figure and that it belongs to Kimi Work. §3 runs full-strength ahead of this — wordmark and story CTA come out if it slips | CS / Partner / Regional Mkt — **not us** | **2026-08-07**                    | §3, and the Aug 16 dated announcement                                                                               |
| **Kimi Work story link** — §3's story CTA ships with a placeholder (`#`); needs a real destination or the CTA comes out                                                                                                                                                                                 | Liya / Marketing                         | before 2026-08-16                 | §3 story CTA                                                                                                        |
| **Move the E2B demo repo off the personal account** to the TiDB org, with a license — `likidu/tidbcloud-fs-e2b-example`                                                                                                                                                                                 | Liya                                     | **before 2026-08-16**             | **Hard gate.** Evidence doc §2.1 item 3 and §3.2. Blocks the Try-it secondary link and demo 1's external reference  |
| **Settle the regions count with Todd** — six CLI codes vs "two regions"                                                                                                                                                                                                                                 | Liya / Todd                              | before copy                       | FAQ 1, hero snippet's `--region`                                                                                    |
| **Confirm "code-symbol matching"** exists at all                                                                                                                                                                                                                                                        | Liya / Todd                              | before copy                       | FAQ 6                                                                                                               |
| **Confirm billing start (Sep 10) and unbilled-vs-unpriced**                                                                                                                                                                                                                                             | Liya / Todd                              | before copy                       | FAQ 10                                                                                                              |
| Confirm `fs-vault` / `fs-journal` are usable in technical preview, not just present in the CLI                                                                                                                                                                                                          | Todd                                     | before copy                       | Value card scope                                                                                                    |
| **Ask Todd: is `fs search-file-content` index-backed (database FTS) or a server-side scan?** Then add a server-side-search row to the matrix — Turso first                                                                                                                                              | Liya / Todd                              | before the 2026-09-13 page        | Search's September card candidacy (Decision 15.iv). Not an Aug 16 blocker — the page claims commands, not mechanism |
| **Take the positioning lessons to the team** — [POSITIONING-LESSONS.md](POSITIONING-LESSONS.md)                                                                                                                                                                                                         | Liya                                     | —                                 | Nothing, but it is the most reusable output here                                                                    |
| Give Todd the expanded matrix for Appendix A — Turso and Cloudflare                                                                                                                                                                                                                                     | Liya                                     | this week                         | Cheap, useful                                                                                                       |
| Short vanity install URL                                                                                                                                                                                                                                                                                | —                                        | before launch                     | Hero polish                                                                                                         |
| Settle token prefix — `drive9_…` vs `tdc_fs_v1_…`                                                                                                                                                                                                                                                       | Eng                                      | before launch                     | Hero displays a token                                                                                               |
| nginx rewrite for `/tidb-cloud-filesystem/` + 301 from `/tidb-cloud-fs/`                                                                                                                                                                                                                                | Web                                      | before launch                     | Deploy target                                                                                                       |
| Visual design + animation — **in progress**: hero ASCII flow-field shade, §3 prism background (entry + exit drain), §4 loop strip, §5 fit diagrams all built. Section specs: [ASCII-HERO-BACKGROUND.md](ASCII-HERO-BACKGROUND.md), [PRISM-KIMI-BACKGROUND.md](PRISM-KIMI-BACKGROUND.md)                 | Liya                                     | 2026-08-10 internal review        | —                                                                                                                   |
| Benchmark on real repos (spec below)                                                                                                                                                                                                                                                                    | PM                                       | **2026-09-13**, not before Aug 16 | Nothing on Aug 16                                                                                                   |

Resolved and dropped items: see [PLAN-HISTORY.md](PLAN-HISTORY.md).

## Benchmark specification

**Lands 2026-09-13** with the selection-and-boundaries page. Not on the Aug 16
critical path.

What the existing report gives us, and what it doesn't:

- Large-file throughput at parity or slightly ahead of `aws s3 cp` — 1.14×
  upload, 1.21× download as of 2026/04/16. Real, publishable, ours.
- `juicefs bench` at a fixed 128 KiB: 197 ms/file read, 46 ms/file `stat` at
  one thread. Not a small-file measurement under any threshold, and not a
  number to invite scrutiny of. Rig was `drive9-server-local` against a
  Starter cluster, not production.
- Chasing sub-threshold file size is pointless: the inline threshold is a
  backend parameter still being tuned, not customer-visible.

What to measure instead — **concurrency, because that is what we own**:

- Two or more runtimes on one workspace: write-visibility latency across
  machines under each consistency mode. Nobody else can even run this test.
- `git clone` and resume of a real repository, against s3fs and EFS.
- Agent-loop operations: batch `stat` across a tree, metadata-first directory
  listing, checkpoint and rollback via layers.
- On the **production** service, from **cloud VMs in-region** — the
  configuration the FAQ recommends, not a laptop.
- Published as a reproducible repo.

Appendix B has qualitative evidence from Kimi — metadata-first loading, batch
`stat`, local-first FUSE writes, layer separation of `node_modules` from
source, git state that survives handoff. Internal-only: it shapes what we
measure, not what we publish.

## Risks

- **Kimi authorization is due 2026-08-07 and we don't own it.** It gates the
  Aug 16 moment (Evidence doc §0.2). A logo lockup is a separate, slower
  approval from a number — decision #8 clearing does not automatically clear
  co-branding. §3 ships the full-strength face presuming both; the reversal is
  a text swap, instructions in the in-page REVIEW note.
- **The E2B repo is on a personal GitHub account and that is a hard launch
  gate.** The cheapest blocker on the list and the easiest to forget.
- **The wedge has a shelf life.** Turso is explicitly building toward
  disaggregated object storage; five of six competitors already tick
  hosted/concurrent/multi-machine.
- **Everything on the page has to be true on 2026-08-16, in technical
  preview.** Don't describe the 2026-09-15 console, not-yet-live semantic
  search, or unguaranteed checkpoint as though they exist today.
- **Marketing's mockup and this spec will drift.** Their HTML is their source
  of truth; re-check the comp against this file before build, specifically the
  four claims flagged in Decision 12.
- **Build budget.** Todd has 5 days. The animation budget covers the three
  value cards and one scoped loop treatment — one rig applied eight times, not
  per-step bespoke motion. v1's one-time reveal on the data-plane diagram is
  the cost reference: scoped motion is cheap; eight timelines are not.
- **No SDK.** Go CLI only against Turso's TS/Python/Rust and Mesa's TS. Real
  gap; the page should not pretend otherwise.

## Results / review

_To be completed once the page ships._
