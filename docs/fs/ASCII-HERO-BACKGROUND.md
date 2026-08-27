# ASCII flow-field shade — hero section

Ambient background for the **hero** (`/tidb-cloud-filesystem`, section 01).
Curved light strands — several alive at once — cross a faint field of mono
glyphs; the field **remembers where they passed** after each strand dies. The
transient layer is abstract; the persistent layer is written in the page's own
leavings vocabulary (`M` `+` `✓` `▪`).

Deliverable: `HeroShade.tsx` — a client component mounted as the background
layer of the existing hero section. Dependencies: `gsap` (already in
`package.json` for the prism) + Canvas 2D. No new packages, no WebGL, no font
atlas.

Status: **plan for review — nothing built.**

> **Supersedes the killed `fs-hero-ambient` attempt (2026-08-05).** That build
> drew literal labeled sandbox boxes dropping glyphs into a bordered band —
> a diagram pretending to be atmosphere, and it read as UI debris floating
> around the headline. The binding lesson: **the hero background must be a
> _texture with a claim_, not a picture of the claim.** No boxes, no labels,
> no borders, nothing that looks like it could be clicked. The concept mapping
> below survives; the literalism does not.

---

## Concept

The hero sentence, mapped one-to-one onto field behavior:

| Hero copy                                         | Field behavior                                                                                                                                                                                                                                                         |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "held by several runtimes at once"                | 3 curved strands with **overlapping lifespans** — there is never exactly one alive, and never a queue. Each enters, flows, and dies on its own clock. **On pointer devices, the cursor is a fourth runtime — yours** (see Interaction)                                 |
| "one filesystem"                                  | All strands cross **one shared channel** low in the frame; their trails accumulate in one place. The strands are many; the memory is one                                                                                                                               |
| "knows what an agent leaves behind"               | The **persistence layer**: cells a strand energized stay faintly lit after the strand is gone, decaying over ~45s to a floor — never to zero while the hero is on screen. Motion is ephemeral; the marks persist. This is the one behavior the whole design exists for |
| "dirty tree, new objects, test output, artifacts" | Persistent cells render in the leavings glyphs `M` `+` `✓` `▪` (and rarely `×`). The transient field uses only an abstract ramp — **meaning is reserved for what survives**                                                                                            |

### The two proposed primitives, and the call

Both review ideas are in the design — merged rather than picked between:

| Option                                                           | Verdict                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Curved lines alone** (Mintlify-class ribbons)                  | Right geometry, wrong medium. Smooth vector ribbons on this page would be a second light-rendering competing with the prism's moment, in a weaker dialect — and the association with Mintlify's hero is strongest in exactly this form. Rejected as the _visible surface_; kept as the _underlying geometry_                    |
| **ASCII field alone** (Ghostty / Kimi Work class)                | Right medium, no narrative. A drifting glyph-density field is handsome texture but says nothing — it fails the "reflects the hero text" requirement and invites pure-decoration drift. Rejected as the whole; kept as the _display medium_                                                                                      |
| **Curved strands rendered _through_ the ASCII grid** (this plan) | The strand luminance field is computed in continuous space (idea 1's geometry) but displayed only as glyph-brightness on a mono grid (idea 2's medium) — the classic ASCII-shading move. Distinct from both references, native to a page whose hero is literally a terminal, and it gives the page a two-act arc with the prism |

### Consistency with the prism (`PRISM-KIMI-BACKGROUND.md`)

The two backgrounds share one lighting world, displayed in two media — and
that difference is the point, not a drift:

- **Same field:** pure `#000000`, same darkness-envelope discipline (err dark;
  content is the canary).
- **Different palettes, deliberately.** The hero speaks the page's own design
  tokens — carbon grays, white, TiDB red — while the prism keeps its spectral
  warm wedge as §3's unique cinematic moment. What carries over is the
  _discipline_, not the hues: one saturated accent per frame, color at the
  point of energy, gray for everything at rest.
- **Same driver:** GSAP animates values; a renderer consumes them. Same
  cleanup, fallback, and reduced-motion conventions.
- **The arc:** the hero shows the light _quantized as text_ — files, glyphs,
  the raw representation. The proof section resolves the same warm light as
  _pure photographic light_. Text first, light later; the page develops the
  material instead of repeating it.

---

## Rendering approach — why Canvas 2D, not a shader

The prism needed HDR accumulation and tonemapping — a fragment-shader problem.
This surface is the opposite: **discrete glyphs at discrete cells with crisp
real-font rendering**, which is exactly what Canvas 2D `fillText` does natively
and shaders do only via a baked glyph atlas.

| Option                               | Verdict                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DOM grid** (`<span>` per cell)     | ~4,500 nodes with per-frame class churn — layout/paint pressure, and React reconciliation has no business in a 30fps loop. Rejected                                                                                                                                                                                           |
| **WebGL + glyph atlas**              | One draw call, cheapest GPU path — but adds a font-baking pipeline for Moderat Mono, and blurs glyph edges at fractional DPR. Escalation path if Canvas 2D profiling fails, not the start                                                                                                                                     |
| **Canvas 2D glyph grid** (this plan) | ~96×44 cells at a 15px cell (desktop 1440×~660 hero). Per frame, repaint **only cells whose glyph-bucket or color-bucket changed** — in ambient state that is a few hundred cells, not 4,500. 30fps cap for ambient; DPR capped at 1.5; `font` set once per frame batch. Well inside budget with real font rendering for free |

Renderer internals — three scalar fields composited per cell, then bucketed:

1. **Base drift** — 2-octave value noise, very slow (`uTime × 0.02`),
   luminance whisper-level. Gives the field life between strand passes.
2. **Strand energy** — each live strand is a quadratic bezier; cell energy =
   falloff from curve distance × a traveling pulse envelope along its arc
   length (head bright, tail fading). Same two-term falloff shape as the
   prism beams, just cheaper math.
3. **Memory** — a persistent per-cell buffer. Each frame:
   `memory = max(memory × decay, energy × writeGain)` — where energy comes
   from strands **or the cursor** (one write rule, two sources). Decay tuned
   to a ~45s half-life with a floor of ~0.08 — **the floor is the product
   claim; don't let polish zero it.** On first paint the buffer is pre-seeded
   with a few faint marks so the story is present before the first strand
   completes.
4. **Ambient churn** — every frame a small handful of random cells (~4 at
   30fps) re-roll their glyph within their current bucket. Background
   processes touching files; barely perceptible, but the field never reads
   as a frozen texture.

Bucketing: composite luminance → glyph ramp index; memory-dominant cells draw
from the leavings set, transient-dominant cells from the neutral ramp:

```
neutral ramp (transient):   ·  :  ~  /  +        (low → high)
leavings set (memory):      M  +  ▪  ✓   (× rare, ~1 in 12)
brand glimpse (churn only): t  i  d  b   (lowercase, ~1 in 8 re-rolls)
```

`✓`/`×` stay rare — test output is one leaving among four, and a field of
check marks reads as a status page. If review finds even rare `✓`/`×` too
cute, the fallback set is `M + ▪` only.

**The brand glimpse** (added 2026-08-06): when a cell re-rolls — ambient
churn or cursor churn, the only two sources — it has a ~1-in-8 chance of
briefly showing a lowercase `t` `i` `d` or `b` before its next re-roll
returns it to the ramp. The letters appear only in moments of _activity_ and
never persist: what's inside the files of a TiDB filesystem is, of course,
tidb. Three guards keep it subliminal rather than forced: **lowercase only**
(uppercase reads as branding), **never written to memory** (the leavings set
stays semantically clean), and **never in horizontally adjacent cells** (the
field must not accidentally spell the wordmark). If the live build reads as
noise-with-typos instead of a glimpse, cut the set without ceremony — the
design owes this idea nothing.

---

## Color

| Role              | Value                                                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Field             | `#000000` — matches the section (`bg-bg-primary`) exactly                                                                                                                                                                                  |
| Base drift glyphs | `#28333E` → `#424D57` (carbon-900 → carbon-800 range)                                                                                                                                                                                      |
| Memory glyphs     | `#5D6974` at write, decaying toward `#28333E`; briefly red-tinted (`#DC150B` at low alpha) just after write                                                                                                                                |
| Strand head       | The page's red, not the prism's wedge: pulse envelope blends carbon-400 → `#F35048` (brand-red-light) at the tip, `#DC150B` (brand-red-primary) in the head body — alpha-capped so composite luminance stays ≤ the equivalent of `#74808B` |
| Strand tail       | Returns to carbon grays within ~20% of arc length behind the head                                                                                                                                                                          |

Binding rules, inherited from the prism review:

- **Err dark.** The field at rest should be _missable_ — a texture you notice
  second, not first. If in doubt, lower.
- **Red is an accent, not a fill.** The warm head is the only saturated thing
  in the frame, it is small, and it is moving. No red washes, no red glow
  pools. The page's next red moment belongs to the prism.
- **Content wins.** The white H1 and the code panel outrank every parameter
  in this document.

---

## Geometry & composition

Design frame `1440 × 660`, cover-fit. Below `lg` the field goes **static**
(decided 2026-08-06): the reduced-motion rendering path reused — base drift
plus pre-seeded memory marks, painted once at mount and on resize, no
strands, no cursor, no rAF. On the stacked mobile layout the text-safe masks
derive from measured element boxes (the code panel's rect above all) rather
than the desktop design frame.

Text-safe masking, learned the hard way from the killed attempt:

- **Code panel zone (right ~48%）:** field luminance multiplied to ~0 under
  the panel's bounding box. The panel is the hero's functional content;
  nothing moves beneath it.
- **Type zone (headline / subhead / CTAs):** field capped at base-drift
  level; strand heads are _routed_ around it, not just dimmed — a bright head
  sliding under the H1 is exactly the debris effect being avoided.
- Usable strand space: the top gap above/right of the headline, the left
  margin column, and the wide strip below the CTA row. The **shared channel**
  runs through that bottom strip (roughly y 78–92% of the frame, x 4–50%) —
  no border, no box: the channel exists only as the place trails accumulate.

Strand routes (start composition, three concurrent, loop period ~16s each,
phase-offset by a third):

```
S1  enters top-right gap        → curves down-left  → exits through channel
S2  enters left margin, mid     → shallow arc right → exits through channel
S3  enters bottom-left corner   → runs the channel nearly flat → dies in it
```

Curvature stays gentle (single bend per strand) — this is drift, not spaghetti.

---

## Animation

**No scroll scrub.** The hero is at the top; there is no runway to scrub
against and the sentence should be performing before the first scroll. GSAP's
jobs here:

1. **Entrance** — one timeline, fired ~800ms after hydration (idle callback):
   field fades 0→1 over 1.6s (`power2.out`), first strand starts at +0.4s.
   Never competes with LCP; the H1 is long since painted.
2. **Strand lifecycles** — one repeating timeline per strand driving
   `{ progress, intensity }` objects the renderer reads. GSAP owns timing and
   easing (`sine.inOut` pulse travel); the canvas owns pixels. Same division
   of labor as the prism's uniform-driving.
3. **Exit governance** — a ScrollTrigger on the hero (no pin, no scrub) with
   `onToggle`: leaving the viewport pauses the rAF loop and all timelines;
   re-entering resumes them. The memory buffer survives pause — scrolling
   back up finds the field as you left it, which is itself on-message.
4. **Tab visibility** — `document.visibilitychange` pauses the same way.

Frame budget: ambient 30fps cap, target ≤ 3ms CPU per painted frame, painted
cells per frame expected ≤ ~600 in steady state.

## Interaction — the cursor is a runtime

Added after review of the motiondesk character-field reference
(threads.com/@motiondeskapp, DXP7WhhiatG): proximity highlight + glyph churn
under the pointer. Both takeaways adopted — with the mapping that earns them
a place here: **the cursor is treated as a fourth runtime doing I/O**, so the
interaction performs the hero sentence instead of decorating it.

| Behavior           | Spec                                                                                                                                                                                                                                                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Proximity glow** | Radial falloff, radius ~110px, centered on the pointer. Luminance lift capped at the same ceiling as strand heads (≤ `#74808B` equivalent). Over type zones it degrades to a brightness-only lift at base-cap; over the code panel it is zero — the pointer there is for copying commands, not for the shade                                       |
| **Glyph churn**    | Cells inside the radius stochastically re-roll their glyph every 80–140ms (hash-jittered per cell), churn probability scaling with proximity. Files under active modification — the motiondesk effect, in our vocabulary                                                                                                                           |
| **Writes**         | Cursor energy feeds the **same memory rule as strands** (same writeGain, same decay, same leavings-glyph rendering). A cell being written tints briefly toward `#DC150B` — same hue logic as strand heads — then settles to gray memory. Move your pointer across the field, come back later: your path is still faintly there. That's the product |
| **Idle**           | A stationary cursor eases to ~40% glow and stops churning within ~1.5s — an idle runtime does no I/O, and a throbbing hotspot next to someone reading the H1 would be noise                                                                                                                                                                        |
| **Gating**         | `@media (hover: hover) and (pointer: fine)` only. No touch emulation, no synthetic hovers                                                                                                                                                                                                                                                          |

Performance: the affected set is ~50–60 cells around the pointer — inside the
existing dirty-cell budget. Pointer position sampled once per frame, never
per event.

### Reduced motion

One static frame: base field + pre-seeded memory marks, no strands, no rAF,
no timelines. The persistence layer _is_ the story, so the still frame still
tells it. Cursor behavior degrades to the proximity glow only — brightness,
no churn, no writes (gentler, not zero).

### Fallbacks

- **No canvas / init failure:** render nothing. Unlike the prism (a set
  piece), a missing shade is invisible by design — no poster needed.
- **Profiling failure on mid-tier hardware:** first lever is cell size 15→18px
  (−30% cells); second is 24fps; the escalation path is the WebGL glyph atlas.

---

## Layer order

The hero section gains `relative isolate overflow-hidden` (mirroring
`#proof`):

1. `<canvas>` — the field — `absolute inset-0 z-0`
2. Existing hero container — gains `relative z-10`

No scrim layer: the field's own masking keeps luminance below scrim-needing
levels. If review disagrees, the prism's dual-band scrim pattern is the
ready-made fix.

---

## Integration notes and known risks

- **`gsap.context()`** wraps everything, reverted on unmount; rAF and
  ResizeObserver torn down in the same cleanup (strict-mode safe) — same
  pattern as `PrismBackground`.
- **Client boundary:** `HeroShade` is `'use client'` and self-contained; the
  page stays a server component. First child of the hero section.
- **Resize:** ResizeObserver on the section; rebuild the cell grid and
  re-map the memory buffer by nearest cell (don't wipe it — a resize that
  amnesias the field contradicts the claim).
- **The taste risk is glyph choice, not motion.** Motion here is slow and
  sparse; what can go wrong is the field reading as noise (`ramp too dense`),
  a status page (`too many ✓`), or a screensaver (`too bright`). All three
  have named levers above; review against them at 1× speed, not in a sped-up
  preview.
- **Two backgrounds, one page:** hero shade is ambient-quiet and gray-led;
  prism is the crescendo. If, after both are live, the page feels like it has
  two competing moments, the hero yields first (lower its rest luminance) —
  the prism's role in §3 is settled, the shade's job is atmosphere.

---

## Things deliberately not done

- **No boxes, labels, borders, or bands** — the killed attempt's failure
  mode. The channel is a place, not a drawn container.
- **No wordmark/logo ASCII art.** Ghostty renders its own logo in glyphs; we
  render no marks at all (and the Kimi wordmark belongs to §3's story, with
  its own governance).
- **No copying Mintlify's ribbon composition or Ghostty's morph choreography.**
  Primitives inspired; compositions original — same posture as the prism's
  Hipgnosis note.
- **No second HDR/tonemap pass.** The hero quantizes light into text; making
  it photographic would spend the prism's trick twice and halve its §3 impact.
- **No typewriter, no marquee, no scroll-driven reveal.** The field is a
  state, not a sequence; the only sequences are the strand lifecycles.
- **No interaction beyond the cursor-as-runtime spec.** No click behaviors,
  no magnetic pull on content, no parallax, no cursor trails crossing type
  zones, nothing on touch. The hero's _functional_ interactive object remains
  the code panel; the field only responds, never competes. (An earlier
  revision of this plan banned cursor response outright — superseded by the
  Interaction section, which exists precisely because the response argues the
  claim rather than decorating it.)

---

## Open questions for review

1. ~~Glyph vocabulary~~ — **resolved 2026-08-06:** `t i d b` join as a
   churn-only brand glimpse (see the glyph vocabulary section and its three
   guards + the cut-without-ceremony gate). `✓`/`×` stay in the memory set at
   their rarities pending the live build.
2. **Memory floor:** ~0.08 luminance floor means trails never fully vanish
   while the hero is on screen. Right claim, or too much accumulated texture
   after a long dwell? (Alternative: floor decays after 3+ minutes idle.)
3. **Strand count:** 3 concurrent is the "several, not busy" bet. Reviewable
   against the live build at 2 or 4.
4. ~~Mobile~~ — **resolved 2026-08-06: static below `lg`** — the
   reduced-motion still, painted once (see Geometry & composition).
5. **Cursor writes — red or gray?** The spec red-tints cells at the write
   moment (same hue logic as strand heads). The conservative alternative
   keeps all cursor effects gray so red stays exclusively the strands'
   signature. Judge on the live build with a real mouse, not the static mock.
