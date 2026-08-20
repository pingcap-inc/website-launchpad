# Prism background — Kimi proof section

Ambient light-refraction background for the **Kimi customer-proof section**
(`#proof` on `/tidb-cloud-filesystem`). Reversed-prism concept: multiple
warm-hued beams enter from the left, converge inside a glass prism, and a
single TiDB-red beam exits right.

Deliverable: `PrismBackground.tsx` — a Next.js client component mounted as the
background layer of the existing `#proof` section. Dependencies: `gsap`
(ScrollTrigger ships in the core package) + ~200 lines of inline GLSL. No
three.js, no Rive, no Lottie, no video asset.

> **Supersedes the earlier "Prism hero" handoff.** Two scope changes drove the
> rewrite: (1) this is now a _section background_ behind live content, not a
> pinned hero — so no pin, no owned copy, no scroll hijack; (2) the target look
> moved from graphic/vector to **photographic light** (reference: the
> real-prism laser reel — hot blown-out core, halation, atmospheric haze,
> grain). That look is out of reach for the SVG-gradient approach, which is why
> the rendering layer changed. Concept, palette, and IP guardrails carry over.

---

## Concept

A prism run backwards. The narrative maps onto the section it sits behind:
70,000+ agent workspaces — many heterogeneous inputs — converging on one
filesystem. The animation performs the claim the copy is making.

Visual reference for _composition_ is Hipgnosis's _Dark Side of the Moon_
cover, inverted. Visual reference for _light quality_ is the real-prism laser
footage (Instagram reel CzBikDfOFb4, second half): the beam core overexposes
toward white, color lives in the falloff, the glow overflows the beam's
geometry, and haze in the air catches the light.

> **IP note.** Prismatic dispersion is public-domain physics, but the specific
> Hipgnosis composition (black field, that triangle placement, six bands at
> those proportions) is protected artwork owned by Pink Floyd Music. This
> design deliberately diverges: reversed light direction, warm-band palette
> instead of full spectrum, asymmetric beam fan, off-center placement, motion
> the original never had. Keep it that way — don't drift the composition back
> toward the original during polish.

---

## Rendering approach — why a fragment shader

The realism the reference reel shows is an **HDR phenomenon**: light intensity
far above display white, accumulated additively, then tonemapped so the beam
core rolls off into blown-out white while color survives only in the falloff.
Add atmospheric haze that the beams illuminate, plus film grain, and you have
the entire recipe. None of these exist where the previous plan lived:

| Option                                | Verdict                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SVG gradients** (previous plan)     | Renders _graphic_ light — flat, poster-like. No HDR accumulation, no tonemapping, linear-gradient falloff, banding on near-black. Right choice for the old art direction, wrong for this one.                                                                                                                                                                              |
| **Rive**                              | Same renderer class as SVG/Lottie: vectors + blurs. Built for character/UI/state-machine animation, not additive light transport. Adds a multi-hundred-KB WASM runtime and a design-tool asset pipeline, and still tops out at "glowy vector."                                                                                                                             |
| **Pre-rendered video** (Blender/AE)   | Highest realism ceiling, but: 3–8 MB per loop, visible banding on dark backgrounds unless grain is baked heavy, a fixed composition that can't adapt to responsive text-safe areas, and every color/timing tweak is a re-render. Documented fallback, not the plan — see "Things deliberately not done."                                                                   |
| **WebGL fragment shader** (this plan) | One fullscreen pass computing beams as line-segment SDFs with inverse-power falloff, accumulated in linear HDR, tonemapped, hazed, grained. This is exactly the reel's look, it's resolution-independent, the composition stays parametric (responsive text-safe layout), and every color is a code constant brand can iterate on. Bundle cost ≈ 8 KB of component + GLSL. |

**GSAP's role is unchanged and unthreatened.** GSAP is a tween engine, not a
renderer — the realism ceiling was always set by the surface it drives, never
by GSAP itself. It previously animated SVG clip rects; now it animates shader
uniforms (`uProgress`, `uIntensity`) through the exact same ScrollTrigger API.
Do not add Rive to answer a rendering question GLSL already answers.

### The shader, ingredient by ingredient

Single fragment shader on a fullscreen triangle. No post-processing chain, no
framebuffers, no textures.

1. **Beams as SDFs.** Each beam is `distance(p, segment)` with two falloff
   terms: a tight exponential for the core (`exp(-d·k1)`) and a wide
   inverse-power tail (`1/(1+d²·k2)`) for the halation. The wide term _is_ the
   bloom — analytic, no blur pass.
2. **HDR accumulation.** Beam contributions add in linear space with
   intensities well above 1.0 near the convergence point.
3. **Tonemap.** ACES-ish curve (or Reinhard-Jodie) maps the accumulation to
   display range. This single step produces the signature realism cue: cores
   blow out to warm white, color lives in the falloff. Without it the effect
   reads as vector art again.
4. **Haze.** 3-octave fbm noise, slowly drifting via `uTime`, multiplied into
   the beam falloff so the air visibly carries the light. Plus a faint ambient
   `#2A1410` wash around the convergence zone.
5. **Grain + dither.** Hash-based noise: ±1.5/255 triangular dither plus a
   slightly stronger animated grain layer. Kills banding on the `#000000`
   field _and_ sells the photographic read.
6. **Flicker.** Per-beam intensity wobbles ~±4% on slow sine taps of `uTime`.
   Real light is never perfectly steady.

Uniforms:

| Uniform       | Driven by                                     | Meaning                                                                                          |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `uProgress`   | GSAP ScrollTrigger (scrubbed)                 | Master reveal 0→1; per-beam draw-in windows are `smoothstep` slices of it                        |
| `uExit`       | GSAP ScrollTrigger (scrubbed, second trigger) | Master drain 0→1; per-beam drain windows are `smoothstep` slices of it; also folds into exposure |
| `uIntensity`  | GSAP                                          | Global exposure; also the reduced-luminance lever behind text                                    |
| `uTime`       | rAF (only while section in view)              | Haze drift, flicker, grain                                                                       |
| `uResolution` | ResizeObserver                                | Cover-fit mapping of the design frame                                                            |

---

## Color

### The constraint (unchanged)

A prism run backwards physically recombines the spectrum into **white**.
Additively mixing a full rainbow on black trends toward white, never toward a
saturated red. Resolution: confine the input fan to the magenta→amber wedge.
It still reads unmistakably as dispersion, and the sum genuinely lands in red
territory.

### Input palette (warm band)

| Beam       | Hex       | Mix weight |
| ---------- | --------- | ---------- |
| Magenta    | `#FF2D95` | 0.15       |
| Rose       | `#FF1744` | 0.30       |
| Vermillion | `#FF4E00` | 0.25       |
| Orange     | `#FF8A00` | 0.20       |
| Amber      | `#FFB300` | 0.10       |

Weights drive per-beam intensity and core width. Rose and vermillion dominate;
magenta anchors the cool end so the fan doesn't read as "just orange," amber
anchors the warm end.

### Output — how the brand hex survives tonemapping

Target: `#DC150B` TiDB red.

The old plan asserted this as a literal SVG fill. Tonemapping changes the
deal, and it's worth being upfront about in brand review: **the beam core is
_supposed_ to blow out toward warm white** — that overexposure is the entire
realism cue. The brand red lives in the beam _body_.

Implementation rule: define the output beam's base color in linear space from
`#DC150B` and tune its intensity so that, at `uProgress = 1`, an eyedropper on
the beam body (mid-falloff, ~half a beam-width off the centerline) measures
within a hair of `#DC150B`. Verify once with an actual eyedropper during
polish. Frame it for brand review as "core = highlight, body = brand red" —
the same convention as a photograph of a red neon sign.

> The darkness envelope (below) outranks this rule: under the global 0.5
> exposure the body may measure darker than the brand hex. Keep the _hue_ on
> target and let luminance sit low — don't raise exposure to chase the hex.

### Supporting colors

| Role                                  | Value                                                                                                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section background field              | `#000000` — must exactly match the adjacent sections (`bg-gradient-dark-top` ends at `#000000` above; `bg-gradient-dark-bottom` starts at `#000000` below) |
| Warm bloom core (post-tonemap target) | `#FFE2C0`                                                                                                                                                  |
| Ambient haze                          | `#2A1410`                                                                                                                                                  |
| Internal refraction gradient          | `#FFD9A0` → `#FF6A2B` → `#DC150B`                                                                                                                          |
| Glass edge highlight (SVG overlay)    | `rgba(242, 239, 233, 0.9)`                                                                                                                                 |

Text colors are owned by the section's existing content, not this component.

### Darkness envelope (review, 2026-08-05)

The first build read too bright end-to-end. Two binding rules came out of
review:

- **Entry is a morph, not a reveal.** At `uProgress = 0` the band must be
  indistinguishable from the sections around it: the field is pure `#000000`
  (both neighbors sit at `#000000` where they meet this band) and `uIntensity`
  eases in from zero — the previous section's background appears to grow the
  light, not hand off to a new surface. An earlier draft used a `#050506`
  field; the 2/255 seam was visible on entry. Don't reintroduce it.
- **The end state errs dark.** Global exposure is 0.5 in linear space before
  the tonemap (second review pushed it down from 0.6 — when in doubt, darker),
  the ambient haze wash runs at half strength, and the left atmosphere floor
  sits at 0.22. Tonemapping keeps the beam cores hot while the field drops, so
  darkness comes from exposure — never from repainting beam colors or retiming
  the animation. The carbon-gray paragraph on the right is the canary: if it
  isn't comfortably readable, darken exposure and scrim further before
  touching anything else. (The completion morph below also flips it to white
  at the end state.)

---

## Geometry & composition

Coordinates live in a `1440 × 900` design frame, mapped into the section with
**cover-fit** (the shader equivalent of `xMidYMid slice`). The proof band is
short (`py-20`, roughly 500–650px rendered), so expect vertical cropping —
tune the composition in its cropped state, not the full frame.

The section's content is left-anchored: Kimi wordmark, H2, and the 70,000+
numeral occupy the left half; paragraph + CTA the right column. So the prism
moves **right of center**, and the input fan crosses the left half only as
low-luminance atmosphere behind the numeral.

Everything derives from four constants:

```
APEX     = { x: 950, y: 320 }
BASE_L   = { x: 838, y: 514 }
BASE_R   = { x: 1062, y: 514 }
FACE_T   = 0.46          // fraction down each face where light strikes
```

Derived:

- `ENTRY` — point on the left face at `FACE_T`. All five input beams converge here.
- `EXIT` — point on the right face at `FACE_T`. The red beam originates here.
- `BEND` — `{ x: 950, y: ENTRY.y - 9 }`. The internal path kinks upward through
  this point. The kink is the primary cue that sells "glass" rather than "flat
  triangle." Don't straighten it.

Input beam origins sit at `x = -140` (off-frame), `y ∈ {40, 210, 400, 590, 760}`.
The output beam runs from `EXIT` toward `{ x: 1600, y: 470 }` — exiting right
through the right column's whitespace.

These numbers are the starting composition, not gospel. The binding rule while
tuning: **content wins.** Effect luminance under the text columns stays low
enough that the existing white/carbon type passes AA against the composite.
Check the numeral, the paragraph, and the CTA at desktop and mobile widths.

### The glass itself — hybrid layer

In the reference imagery the light is photographic but the prism _edge_ is a
razor-thin crisp line. Shaders are mediocre at thin crisp lines; vectors are
perfect at them. So the triangle outline + facet highlight stay as a small
**SVG overlay** above the canvas: thin stroked path, subtle facet polyline,
nothing animated except the facet shimmer opacity. The shader renders the
glass _interior_ (internal refraction gradient, entry caustic, exit bloom);
the SVG renders its _edges_. The same four constants feed both layers.

---

## Animation

GSAP ScrollTrigger, **no pin**. Pinning a mid-page proof band would hijack
scroll between two content sections; the reveal instead scrubs against the
section's natural transit through the viewport.

```
trigger: the #proof section
start:   'top 85%'
end:     'top 30%'
scrub:   1              // the number, not `true` — catch-up lag feels weighty
```

The tween's only job is `uProgress: 0 → 1` (plus an `uIntensity` ease-in).
All staggering lives in the shader as per-beam `smoothstep` windows over
`uProgress`:

| uProgress   | State                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| 0 – 0.50    | Input beams draw in from the left, staggered ~0.07 apart so they land in sequence rather than as a block. |
| 0.42 – 0.68 | Convergence: entry caustic brightens, internal refracted path lights, exit bloom blooms.                  |
| 0.60 – 1.0  | Red output beam extends right to full length.                                                             |

No copy phase — the section's content is server-rendered HTML that is always
visible. The background performs _behind_ it; nothing content-critical waits
on the animation.

### Exit — the drain (review, 2026-08-06)

The reveal has always been one-sided: scroll down into the band and the light
builds, but keep scrolling and the section carries its full end state out of
the viewport. The exit closes the loop — as the band scrolls out the top, the
light drains away and the field returns to pure `#000000` before handing off
to the `bg-gradient-dark-bottom` section below, mirroring the darkness the
band entered from.

The choreography is a **switch-off, not a rewind**. Scrubbing backwards
already plays the reveal in reverse (beams retract left, away from the
prism). The exit is a different, forward-moving event: the sources shut off
and the last of the light travels on through the glass in its direction of
travel. Everything drains **left → right**:

| uExit       | State                                                                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 – 0.53    | The input fan (the five left-hand beams) drains: each beam's tail lifts off its off-frame origin and sweeps right toward the prism. Same stagger slices and order as entry — first lit, first to leave.     |
| 0.40 – 0.68 | The glass unwinds: the entry caustic dims as the last input lands, the internal ENTRY → BEND → EXIT path drains along its own direction, and the interior gradient eases back to its idle 0.05.             |
| 0.55 – 0.95 | The red output beam drains: its near end lifts off EXIT and sweeps right until the beam has left the frame at its off-frame tip. The exit bloom follows it out.                                             |
| 0.55 – 1.0  | The page goes dark: global exposure eases to zero on the mirror of the entry ramp, and the SVG glass edges fade with it — an outline floating on a black field would read as a leftover. Back to `#000000`. |

**Trigger.** A second scrubbed timeline on the same section, driving a new
`uExit` uniform 0 → 1:

```
trigger: the #proof section (same element)
start:   'top top'      // the drain begins the moment the band starts leaving
end:     'bottom 20%'
scrub:   1              // same catch-up weight as the entry
```

The first cut started at `'bottom 78%'` and read as switching off too early —
the drain played while the whole band was still comfortably on screen (review,
2026-08-06). Anchoring the start at `'top top'` ties the exit to the band
itself being scrolled away: the light only starts leaving once the section
does. Two binding rules: the drain never plays while the section is fully in
view, and it completes (field fully black) before the band's bottom edge
leaves the viewport.

**Mechanics.**

- Each beam becomes a **two-ended segment**: the draw end keeps following
  `uProgress` (untouched), the drain end follows `uExit` — visible span
  `mix(origin, ENTRY, e_i) → mix(origin, ENTRY, r_i)`, and the beam is
  skipped once `e_i ≥ r_i`. Same construction for the output beam along
  EXIT → tip. Because the two ends are independent, an entry/exit overlap
  would degrade gracefully — and with the exit anchored at `'top top'`
  (strictly after the entry's `'top 30%'` end), overlap can't occur on any
  viewport; the robustness comes free.
- Per-beam amplitude fades over the last stretch of each drain window so a
  draining beam dissolves instead of pinching down to a bright dot at the
  prism face.
- **The exit darkening lives in the shader, not in a second tween on
  `uIntensity`.** Exposure becomes `uIntensity · (1 − ease(uExit)) · 0.5`.
  Two scrubbed timelines writing one property fight each other (last write
  wins per refresh, and the second tween captures a stale start value), so
  the entry timeline stays the sole owner of `uIntensity`.
- The SVG edge fade is an opacity tween on the overlay, placed in the exit
  timeline over the darkening window (uExit 0.6 → 1.0).
- rAF / `uTime` lifecycle is untouched — the existing visibility trigger
  (`top bottom` → `bottom top`) already spans the whole exit.
- Everything is scrubbed, so scrolling back up re-lights the band in reverse
  drain order — symmetric with how the entry has always behaved.

### Ambient motion

`uTime` advances only while the section is on screen (ScrollTrigger
`onToggle` starts/stops the rAF loop — saves GPU and battery for a mid-page
section). It drives haze drift, per-beam flicker, grain, and the SVG facet
shimmer (5.5s `sine.inOut` yoyo). That's the full list — don't add more.

### Completion morph (review, 2026-08-05)

When the reveal is effectively complete, the component broadcasts a state
class — `prism-done` — on the `#proof` section, toggled at `uProgress > 0.9`
from the **timeline's** `onUpdate` — never the ScrollTrigger's. The trigger's
callback only fires on scroll deltas, while the scrubbed tween keeps catching
up for up to a second after scrolling stops, so a trigger-side toggle misses
thresholds crossed during catch-up (shipped as exactly that glitch once:
fast scrolls left the paragraph stuck in the wrong color).
Content opts in to end-state styling via Tailwind's ancestor variant: the
right-column paragraph carries
`text-carbon-400 transition-colors duration-700 [.prism-done_&]:text-white`,
so the gray morphs to white as the red beam lands — and back to gray if the
user scrubs the animation away. The component still owns no text; it only
reports state, and content styles itself.

Paths that render the end state directly set the class immediately: reduced
motion, the no-WebGL poster, and context loss.

The exit drain (review, 2026-08-06) drives the same class the other way:
`prism-done` comes off as the drain reaches the output beam, so the white
paragraph relaxes back to carbon gray while the light around it leaves. Both
timelines' `onUpdate` apply one combined predicate —
`progress > 0.9 && exit < 0.55` — and the toggle stays on the timelines,
never the triggers, for the catch-up reason above.

### Reduced motion

`prefers-reduced-motion: reduce` renders **one frame** at `uProgress = 1`,
`uExit = 0`, with `uTime` frozen — no rAF loop, no ScrollTrigger. Full
end-state, zero motion (`prism-done` set immediately). No exit drain either:
the still frame simply scrolls away lit.

### Fallbacks

- **No WebGL / context lost:** swap in a static poster — a PNG export of the
  shader's end state, `absolute inset-0`, `object-fit: cover`. The same image
  serves as the pre-hydration placeholder so the canvas doesn't pop in. The
  poster has no exit drain — it's a static end state and scrolls away lit,
  which is acceptable for a fallback path.
- **Low-end mobile (below `md`):** if profiling shows problems, drop haze to
  1 octave first; the nuclear option is serving the poster only. Content is
  unaffected either way.

---

## Layer order

Inside the `#proof` section (which gains `relative isolate overflow-hidden`):

1. `<canvas>` — the shader — `absolute inset-0 z-0`
2. SVG glass-edge overlay — `absolute inset-0 z-[1]`, `pointer-events: none`
3. Readability scrim — `z-[2]`, `pointer-events: none`; pure-black dual band:
   a strong left band under the numeral (~62% opacity → 0 by 58%) and a softer
   right band under the paragraph and CTA (0 at 58% → ~38% at the right edge).
   Only the mid-frame — the prism itself — goes unveiled.
4. Existing section content — `relative z-10` (the current container div)

---

## Integration notes and known risks

- **`gsap.context()`** wraps all animations and is reverted on unmount; the
  WebGL context and rAF loop are torn down in the same cleanup. Required for
  React strict-mode double-invocation.
- **Client component boundary.** `PrismBackground` is `'use client'` and
  self-contained; the page stays a server component. Mount it as the first
  child of `#proof`.
- **No pin → no ancestor-transform trap.** The old plan's biggest integration
  risk (ancestor transforms breaking pinning's `position: fixed`) disappears
  with pinning. `overflow-hidden` + `isolate` on the section is all the
  containment needed.
- **Canvas sizing.** Cap DPR at 1.5. Resize via `ResizeObserver` on the
  section, not `window` — the band's height depends on content wrap.
- **Banding.** If any banding survives on the dark field, raise grain
  amplitude before reaching for anything else — that's the intended fix.
- **Kimi brand governance.** The background is brand-neutral (no Kimi marks in
  it), so the pending Kimi authorization (due 2026-08-07) doesn't gate this
  work. If authorization slips and the section content reverts per the
  existing review note, the background stays as-is.

---

## Copy

None. This component owns no text — eyebrow, wordmark, H2, stat, paragraph,
and CTA already exist in `page.tsx` and their content remains untouched. The
only content-side change is styling: the right-column paragraph opts in to the
completion morph (gray → white via `prism-done`, see Animation). The old hero
copy ("Every workload. / One database.") is retired with the hero scope.

---

## Things deliberately not done

- **No Rive, no Lottie.** Both are vector-renderer runtimes — the same class
  as the SVG approach being replaced. They can't do HDR accumulation +
  tonemapping, which is where the photographic look actually comes from, and
  Rive would add a WASM runtime plus a design-tool pipeline for a worse
  result.
- **No three.js / postprocessing chain.** One analytic fullscreen pass covers
  the whole recipe; a scene graph plus UnrealBloomPass would be ~150 KB of
  dependency doing less controllably what two falloff terms do for free.
- **No pre-rendered video.** Asset weight, dark-gradient banding, fixed
  composition vs. responsive text-safe areas, and a re-render per tweak.
  Revisit only if shader iteration genuinely stalls on look quality.
- **No pinned scroll scene.** This is a background for a proof band between
  two content sections, not a set piece that earns 2.2 viewports of runway.
- **No full rainbow.** Rejected on physics, brand, and IP grounds; green in
  particular reads as a competitor's brand more than as spectrum.
- **No numbered scroll markers or progress indicators.** The beams _are_ the
  progress indicator.
