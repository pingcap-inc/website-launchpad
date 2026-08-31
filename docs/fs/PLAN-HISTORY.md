# FS landing page — plan history

Archive for [PLAN.md](PLAN.md): settled reasoning, superseded copy, and
resolved open items, moved here 2026-08-06 to keep the working copy light.
PLAN.md carries only current rulings; nothing here is live.

The positioning lessons (the two discussion blocks that used to open the plan)
live in [POSITIONING-LESSONS.md](POSITIONING-LESSONS.md).

## Revision trail

- **2026-08-03** — first draft.
- **2026-08-04** — wedge settled on the third attempt: "the workspace your
  agents share." Attempts #1 (small-file latency) and #2 ("one filesystem for
  everything the agent touches") died — see the lessons file for why.
- **2026-08-05** — reframed after reviewing Marketing's mockup: the wedge is a
  category frame, not the differentiator (ADR-0001). Hero snippet reworked and
  settled. IA revised to seven sections. §3 upgraded to the full-strength Kimi
  treatment ahead of the authorization decision. Decision 14 (loop shown, not
  narrated) opened from v1 review and settled the same day via prototype.
- **2026-08-06** — Decision 15 (§2 header rework) and Decision 16 (§2 card 3 is
  the working set) from two grill sessions. §5 rebuilt from the updated fits
  design. The §4→§5 and §5→§6 bridge lines dropped with that redesign.

## Decision histories

Full reasoning behind the one-line rulings in PLAN.md's Decisions table.

**1 — Wedge.** Reframed 2026-08-05. Stays as the headline, but it is the
category frame, not the differentiator — five of six competitors tick the
hosted/concurrent/multi-machine row. Differentiation moves to the subhead and
the value cards. See the lessons file and ADR-0001.

**2 — Benchmark.** Deferred to 2026-09-13. No new benchmark before Aug 16 —
Decision 2 already demoted it, §4.1(b) is satisfied by the walkthrough, and a
rushed number on unfamiliar rigging is what killed wedge attempt #1. Run it
properly on production, in-region, published as a reproducible repo, alongside
the selection-and-boundaries page.

**3 — One page, quickstart primary.** Reaffirmed 2026-08-05 over Evidence doc
§4. Marketing's governing rule says the first screen should be "customer case /
learn more" and that "a bare create-filesystem command is never the primary
experience." Overridden: the audience is sandbox/CI operators, and both
comparators (Archil, Mesa) lead with real code. Mesa ships exactly this
structure — `Quickstart` primary, `Get early access` secondary. §4's real
objection is to an _uncompletable_ command, which Decision 5's rework fixes.

**4 — CTA is quickstart, not free trial.** Waitlist stays rejected.
Marketing's "Technical Preview access is limited" is dropped as a gating
phrase — it sits inside a pricing answer and means _usage_ limits, but on a
"go run it" page it reads as a waitlist.

**5 — Hero snippet.** Reworked and settled 2026-08-05: create → mount → write
→ mountless readback. Marketing's mockup left the old single-agent snippet in
place, so their page argues for a claim its own hero doesn't demonstrate.

**7 — API key never on the page.** Largely resolved 2026-08-05:
`tdc fs create-file-system --query fs_token` returns the filesystem token
directly, so the token has a visible origin _inside the snippet_ and the API
key reduces to a one-line `tdc configure`. No console excursion in the hero.
Mesa's precedent: their snippet just says `process.env.MESA_API_KEY` and never
explains it.

**9 — No testimonials, amended.** 2026-08-05: §3 upgraded to the
customer-story treatment. The core holds: no quote, no outcome metric —
Modal's outcome-shaped furniture stays rejected. What changed: Kimi wordmark,
Kimi Work naming, a story CTA (placeholder link), and the scale-of-use
disclaimer dropped. This presumes decision #8 clears on 2026-08-07 and that
co-branding clears with it; the downgrade — drop wordmark + CTA, restore the
disclaimer — is a text swap, not a layout change, and the in-page REVIEW note
carries those instructions.

**11 — Comparison.** Simplified 2026-08-05 — no competitor comparison on
Aug 16 at all. Marketing's "Where it fits" reframes from _grading competitors_
to _which storage category for which boundary_, which needs no competitive
clearance. §6 was unblocked and the Appendix A clearance item dropped off the
critical path.

**12 — Mockup is a comp; this file is the spec.** Settled 2026-08-05.
Marketing owns IA suggestions and visual comp; Product owns claim approval.
The mockup contains four claims that are wrong or unverifiable —
access-limited, co-branding, code-symbol search, checkpoint — and those are
product-truth calls.

**14 — The 8-step loop is shown, not narrated.** New 2026-08-05 from v1
review; treatment settled same day via prototype. Amends the build-budget rule
("ship as a static sequence"). Eight rows × ~45 words is an essay on a page
the audience skims — the section's job is to make the loop _legible_, and the
static list fails it. Content and claims are unchanged; presentation only.
Marketing's auto-playing 8-tab rig stays rejected — one scoped treatment
applied eight times, not eight bespoke animations. Winner: a full-bleed
auto-advancing expanding-card strip (one card open, seven slivers, 4s
interval, hover pauses, click activates, reduced-motion disables the timer,
compact list below lg) — chosen over a stepper-plus-accumulator and a
scroll-pinned sequence; all four variants preserved on branch
`prototype/fs-loop-section`.

**15 — §2 header reworked; three cards stand; no search card.** Settled
2026-08-06 (grill session). (i) §2's job is differentiation against _the
reader's current storage_ — the disk that dies with the sandbox — not
filesystem taxonomy; the title's foil changes from "a local one" to the
ephemeral sandbox disk. (ii) The subhead keeps the structural moat
(distributed database underneath) translated to plain speech;
"category"/"mechanisms" analyst-speak dies. (iii) Table stakes: checkpoints
never appear in §2 — FAQ 7 retracts the guarantee and Decision 12 flags the
claim; the reassurance need is met by a quiet mono strip under the cards
phrased as behavior, not "POSIX." (iv) No fourth card — inline small-file
storage re-failed for the wedge-#1 reasons (no figure, not customer-visible,
no interface), and full-text-search-as-card failed the ADR-0001 tick-count
(no matrix row; Turso plausibly matches via SQLite FTS — a sprint, not a
database) plus it headlines the semantic-search-retraction zone. The
capability is real (`search-file-content` / `find-files` are shipped
commands), so it folds into the reassurance strip's "or don't mount" clause;
step 02 stays the mechanism home. Card candidacy revisits in September only if
Todd confirms index-backed search and the matrix row shows exclusivity.

**16 — §2 card 3 is the working set, not consistency modes.** Settled
2026-08-06 (second grill round). The section's card criterion is now formal:
**legible in 3 seconds + true under claims discipline + felt by the
audience** — exclusivity is retired as a requirement, since 15.i already moved
the foil to the reader's own storage. Consistency modes failed the legibility
bar through two rewrites; it relocates to a new FAQ entry and headlines the
2026-09-13 selection-and-boundaries page, whose benchmark spec is already
concurrency-shaped. Mountless search was proposed and dropped — defensible,
not felt; it keeps its homes (strip clause, loop step 02). Checkpoint stays
barred by FAQ 7 regardless of Mesa's precedent (they ship the guarantee; we
retract it). The working-set card is backed by the Drive9 deck p.33 core
values (four regular-file scenarios, unified namespace), matches Mesa's most
legible card, and inherits the clean Cloudflare contrast (git-only by design).
It says **working set** deliberately — active state — so it does not
contradict §5's routing of archives and backups to object storage.

## Superseded copy

### §2 header — replaced 2026-08-06 (Decision 15)

> ## Three questions a shared filesystem has to answer, and a local one never does.
>
> Hosted, concurrent and multi-machine is the category. These three are the
> mechanisms — and each of them exists because a distributed database sits
> underneath.

Why replaced: the foil "a local one" was an anti-Turso jab only the matrix
could appreciate, and readers can hear "local" as the place git already works.
The subhead's "…is the category / these three are the mechanisms" was ADR
language leaking onto the page. The moat sentence survives in plain speech;
the strip's second clause carries the mountless family
(`read-file` / `search-file-content` / `find-files`), which is full-text
search's home on this page (Decision 15.iv).

### §2 card 3 — consistency modes, retired 2026-08-06 (Decision 16)

> **Consistency modes** — writeback / close-sync / write-sync. Passes the
> structural test: nobody builds consistency modes for a local single-file
> store. Archil cannot answer "what does a concurrent reader see."

Failed the 3-second legibility bar through two rewrites. Relocated to FAQ 11
and headlines the 2026-09-13 selection-and-boundaries page.

### Hero — rejected lines (2026-08-05)

- Marketing's _"Nothing to rebuild. Everything to build on."_ as the
  headline — it would fit a CI cache, a package registry or a build system
  unchanged. Moved to §7 where it works.
- Their subhead _"mountable, searchable, recoverable, handoff-ready"_ — an
  adjective list, and two of the four adjectives are claims the page's own FAQ
  retracts (semantic search, checkpoint/rollback).

### §5 — before the fits redesign (2026-08-06)

Original shape: a red-bordered "you're in the right place if —" checklist card
(four arrow items) beside a two-column storage-category table with a prose
intro. Replaced by the updated fits design: a red-bar lead line over four
numbered scenario diagrams (time, setup, concurrency, portability), then a
centered category table ending on the TiDB row. The section's closing bridge
line ("If that's you, what's left is the limits. Here they are.") and §4's
("That's the loop. The question left is whether your state has a boundary to
cross.") were dropped with it.

### FAQ provenance (2026-08-05)

Marketing's mockup deleted five FAQ items this plan requires (regions, China
region, laptop mounting, same-machine listing, no SDK) — all five restored;
Evidence doc §2.1 makes the known-limitations list a required minimum-tier
gate item, owned by Product + Growth. Items 6–9 (semantic search, checkpoint,
no SLA, retention) were Marketing's — genuinely good, kept. Item 10 (cost and
access) rewritten: not "don't assume it's free" (defensive where a factual
line was available), not "access is limited" (contradicts Decision 4).

## Resolved / dropped open items

- _Framework: Next.js static export vs Astro_ — settled by the build; the page
  ships from this Next.js repo.
- _Redesign §4's 8-step loop as a visual/animated sequence_ — settled
  2026-08-05, the same day it opened, by prototyping three treatments behind a
  live picker on the real page. The expanding strip won and is built into v1;
  see Decision 14 for the shape and the branch holding the losing variants.
- _Clearance for the Appendix A comparison_ — off the critical path;
  Decision 11 no longer puts a comparison on the page.
- _How the page handles the API-key step_ — resolved by
  `create-file-system --query fs_token`.
- _Rework the hero snippet_ and _Hero headline copy_ — both settled 2026-08-05.
- _"Console filesystem-token minting lands ~2026-08-10"_ — that was never true.
