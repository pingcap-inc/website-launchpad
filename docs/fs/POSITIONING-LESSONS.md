# Positioning lessons — FS landing page, 2026-08

Two lessons pulled out of the TiDB Cloud Filesystem landing-page work
([PLAN.md](PLAN.md)), kept standalone so they can be taken to the team without
the candid working copy around them. They are the most reusable output of the
whole exercise.

## 1. Enumerative differentiation is a liability disguised as a strategy

**We derived a wedge three times. The first two died, and the second one died
for a reason worth internalising.**

1. **Small-file latency** — died because the number turned out to be
   unpublishable. The inline threshold is a backend parameter still being
   tuned, not customer-visible.
2. **"One filesystem for everything the agent touches"** — died because it was
   derived by **elimination against an incomplete competitor set**. The
   argument was: Cloudflare is repo-shaped, Mesa version-shaped, Archil
   mount-shaped, S3 object-shaped, _therefore_ only we are working-set-shaped.
   That only held because Turso AgentFS was missing from the list.
3. **"The workspace your agents share"** — survives, but see lesson 2. It is
   the frame, not the moat.

**The lesson: a claim of the form "nobody else does X" is only ever as strong
as your competitor list.** Ours was missing two of the four most relevant
players — Cloudflare Artifacts and Turso AgentFS — and both were public,
shipping, and findable.

**Prefer structural differentiation: "we are the only ones who _can_ do X."**
The test to apply is _what would a competitor have to build to match this?_ If
the answer is a sprint, it is not a wedge. If the answer is "a distributed
database underneath their filesystem," it is.

**Process fix:** the competitive matrix should track everyone **the audience**
knows, not everyone we have historically tracked, and it should be maintained
continuously rather than refreshed when a launch forces it.

## 2. The wedge is a frame; the moat is in the cards

Marketing decomposed "the workspace your agents share" into three value cards:
**hosted, concurrent, multi-machine**. Check that against our own matrix:
**five of six competitors tick that row.** Only Turso fails it. Archil's live
headline is _"One file system, mounted everywhere"_ — which is cards 1 and 3,
in six words, from a GA product.

The row that actually discriminates is **consistency modes**, which nobody
else has, and Marketing demoted it to a subordinate clause. The original
analysis said to read the two bolded rows _together_; the decomposition kept
the common half and buried the rare half.

**So: "the workspace your agents share" is a category description, not a
differentiator.** It stays as the headline because it is the fastest way to
make the product legible to someone arriving cold — but the _hero subhead and
the value cards_ have to carry the differentiation, because the headline does
not. (ADR-0001: wedge is a frame, not a differentiator.)

**The reusable test:** before making a property a value card, look up its row
in the matrix and count the ticks. If more than one competitor ticks it, it is
context, not proof.
