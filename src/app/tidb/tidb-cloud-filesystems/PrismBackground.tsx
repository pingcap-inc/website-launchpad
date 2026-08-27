'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { disposePrismWebGL } from './PrismBackground.webgl'

// Ambient light-refraction background for the #proof section.
// Reversed prism: five warm beams enter left, converge in the glass, one
// TiDB-red beam exits right. Spec: docs/fs/PRISM-KIMI-BACKGROUND.md
//
// Layers (all owned here, content sits above at z-10):
//   1. <canvas>  — fragment shader: beams, HDR accumulation, tonemap, haze, grain
//   2. SVG       — crisp glass edges + facet shimmer (shaders are bad at thin lines)
//   3. scrim     — black bands under both text columns; only the prism goes unveiled

// ---------------------------------------------------------------------------
// Design frame (1440×900). The prism triangle feeds both layers — mirror any
// change here into the FRAG constants (FACE_T lives only in the shader).
const APEX = { x: 950, y: 320 }
const BASE_L = { x: 838, y: 514 }
const BASE_R = { x: 1062, y: 514 }

// Frozen uTime for the reduced-motion single frame — a haze state that looks
// intentional rather than t=0's un-drifted noise.
const REDUCED_TIME = 7.3

// Broadcast on the #proof section once the reveal is (near) complete. Content
// opts in to end-state styling — e.g. the right-column paragraph morphs
// carbon-400 → white via `[.prism-done_&]:text-white`. Paths that render the
// end state directly (reduced motion, poster fallback) set it immediately.
const DONE_CLASS = 'prism-done'

const VERT = /* glsl */ `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = /* glsl */ `
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform float uProgress;
uniform float uExit;
uniform float uIntensity;

// --- design-frame geometry -------------------------------------------------
const vec2  APEX   = vec2(950.0, 320.0);
const vec2  BASE_L = vec2(838.0, 514.0);
const vec2  BASE_R = vec2(1062.0, 514.0);
const float FACE_T = 0.46;

// --- helpers ---------------------------------------------------------------
vec3 lin(vec3 c255) { return pow(c255 / 255.0, vec3(2.2)); }

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x),
    mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// 3-octave fbm — the atmospheric haze the beams illuminate.
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + 17.7;
    a *= 0.5;
  }
  return v;
}

float sdSegT(vec2 p, vec2 a, vec2 b, out float t) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0.0, 1.0);
  return length(pa - ba * t);
}

float sdTriangle(vec2 p, vec2 p0, vec2 p1, vec2 p2) {
  vec2 e0 = p1 - p0, e1 = p2 - p1, e2 = p0 - p2;
  vec2 v0 = p - p0, v1 = p - p1, v2 = p - p2;
  vec2 pq0 = v0 - e0 * clamp(dot(v0, e0) / dot(e0, e0), 0.0, 1.0);
  vec2 pq1 = v1 - e1 * clamp(dot(v1, e1) / dot(e1, e1), 0.0, 1.0);
  vec2 pq2 = v2 - e2 * clamp(dot(v2, e2) / dot(e2, e2), 0.0, 1.0);
  float s = sign(e0.x * e2.y - e0.y * e2.x);
  vec2 d = min(
    min(
      vec2(dot(pq0, pq0), s * (v0.x * e0.y - v0.y * e0.x)),
      vec2(dot(pq1, pq1), s * (v1.x * e1.y - v1.y * e1.x))
    ),
    vec2(dot(pq2, pq2), s * (v2.x * e2.y - v2.y * e2.x))
  );
  return -sqrt(d.x) * sign(d.y);
}

// A draining beam dissolves over the last stretch of its drain window instead
// of pinching down to a bright dot at the prism face.
float drainAmp(float e) { return 1.0 - smoothstep(0.55, 0.95, e); }

// One beam: tight exponential core (bleeding toward warm white — hot cores
// overexpose) + wide inverse-power tail. The tail IS the bloom; haze
// modulates it so the air visibly carries the light.
vec3 beamGlow(vec2 p, vec2 a, vec2 b, vec3 col, float amp, float coreK, float glowK, float haze) {
  float t;
  float d = sdSegT(p, a, b, t);
  float core = exp(-d * coreK);
  float glow = 1.0 / (1.0 + d * d * glowK);
  vec3 coreCol = mix(col, lin(vec3(255.0, 226.0, 192.0)), 0.35);
  return amp * (coreCol * core * 1.5 + col * glow * 0.5 * (0.55 + 0.45 * haze));
}

// ACES-ish tonemap — maps HDR accumulation to display range. This single step
// is the realism cue: cores blow out warm-white, color lives in the falloff.
vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
  // Cover-fit the 1440×900 design frame (xMidYMid slice), y-down like SVG.
  float scale = max(uResolution.x / 1440.0, uResolution.y / 900.0);
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 p = (frag - 0.5 * uResolution) / scale + vec2(720.0, 450.0);

  vec2 ENTRY = mix(APEX, BASE_L, FACE_T);
  vec2 EXIT  = mix(APEX, BASE_R, FACE_T);
  vec2 BEND  = vec2(950.0, ENTRY.y - 9.0);

  float haze = fbm(p * 0.006 + vec2(uTime * 0.020, -uTime * 0.012));

  vec3 hdr = vec3(0.0);

  // --- input fan: 5 warm beams, staggered draw-in over uProgress 0–0.5 -----
  // Left half stays low-luminance atmosphere behind the numeral: content wins.
  float leftSafety = mix(0.22, 1.0, smoothstep(0.0, 880.0, p.x));

  // beam i: origin (-140, y_i) → ENTRY, weight w_i, stagger 0.07.
  // Two-ended segment: the draw end follows uProgress, the drain end follows
  // uExit through the same slices — the exit is a switch-off, not a rewind:
  // the tail lifts off its origin and the last of the light sweeps into the
  // prism in its direction of travel.
  float r0 = smoothstep(0.03, 0.25, uProgress);
  float r1 = smoothstep(0.10, 0.32, uProgress);
  float r2 = smoothstep(0.17, 0.39, uProgress);
  float r3 = smoothstep(0.24, 0.46, uProgress);
  float r4 = smoothstep(0.31, 0.53, uProgress);

  float e0 = smoothstep(0.03, 0.25, uExit);
  float e1 = smoothstep(0.10, 0.32, uExit);
  float e2 = smoothstep(0.17, 0.39, uExit);
  float e3 = smoothstep(0.24, 0.46, uExit);
  float e4 = smoothstep(0.31, 0.53, uExit);

  // Real light is never perfectly steady — ±4% wobble on slow sine taps.
  float f0 = 1.0 + 0.04 * sin(uTime * 1.31 + 0.7);
  float f1 = 1.0 + 0.04 * sin(uTime * 1.73 + 2.1);
  float f2 = 1.0 + 0.04 * sin(uTime * 1.13 + 4.2);
  float f3 = 1.0 + 0.04 * sin(uTime * 1.51 + 1.4);
  float f4 = 1.0 + 0.04 * sin(uTime * 1.93 + 5.3);

  vec2 o0 = vec2(-140.0,  40.0);
  vec2 o1 = vec2(-140.0, 210.0);
  vec2 o2 = vec2(-140.0, 400.0);
  vec2 o3 = vec2(-140.0, 590.0);
  vec2 o4 = vec2(-140.0, 760.0);

  // Magenta / Rose / Vermillion / Orange / Amber — weights 15/30/25/20/10.
  if (r0 - e0 > 0.001) hdr += leftSafety * beamGlow(p, mix(o0, ENTRY, e0), mix(o0, ENTRY, r0), lin(vec3(255.0,  45.0, 149.0)), 2.6 * 0.15 * f0 * drainAmp(e0), 0.28, 0.0011, haze);
  if (r1 - e1 > 0.001) hdr += leftSafety * beamGlow(p, mix(o1, ENTRY, e1), mix(o1, ENTRY, r1), lin(vec3(255.0,  23.0,  68.0)), 2.6 * 0.30 * f1 * drainAmp(e1), 0.20, 0.0011, haze);
  if (r2 - e2 > 0.001) hdr += leftSafety * beamGlow(p, mix(o2, ENTRY, e2), mix(o2, ENTRY, r2), lin(vec3(255.0,  78.0,   0.0)), 2.6 * 0.25 * f2 * drainAmp(e2), 0.22, 0.0011, haze);
  if (r3 - e3 > 0.001) hdr += leftSafety * beamGlow(p, mix(o3, ENTRY, e3), mix(o3, ENTRY, r3), lin(vec3(255.0, 138.0,   0.0)), 2.6 * 0.20 * f3 * drainAmp(e3), 0.24, 0.0011, haze);
  if (r4 - e4 > 0.001) hdr += leftSafety * beamGlow(p, mix(o4, ENTRY, e4), mix(o4, ENTRY, r4), lin(vec3(255.0, 179.0,   0.0)), 2.6 * 0.10 * f4 * drainAmp(e4), 0.30, 0.0011, haze);

  // --- convergence: entry caustic + glass interior + exit bloom ------------
  // The glass unwinds on exit: caustic, interior gradient and refracted path
  // let go once the last input beam has landed.
  float conv = smoothstep(0.42, 0.68, uProgress) * (1.0 - smoothstep(0.40, 0.68, uExit));

  float dEn = length(p - ENTRY);
  hdr += lin(vec3(255.0, 226.0, 192.0)) * conv * 2.8 / (1.0 + dEn * dEn * 0.004);

  float dTri = sdTriangle(p, APEX, BASE_R, BASE_L);
  float glass = smoothstep(1.5, -1.5, dTri);
  if (glass > 0.0) {
    // Faint internal refraction gradient across the glass body.
    float gy = clamp((p.y - APEX.y) / (BASE_L.y - APEX.y), 0.0, 1.0);
    hdr += glass * mix(lin(vec3(255.0, 217.0, 160.0)), lin(vec3(220.0, 21.0, 11.0)), gy) * (0.05 + 0.20 * conv);

    // Internal refracted path ENTRY → BEND → EXIT. The upward kink through
    // BEND is the primary "glass" cue — don't straighten it.
    // On exit the lit span drains along its own direction of travel.
    float pathRev = smoothstep(0.46, 0.66, uProgress);
    float pathDrn = smoothstep(0.40, 0.68, uExit);
    if (pathRev - pathDrn > 0.001) {
      float pAmp = 1.0 - smoothstep(0.75, 1.0, pathDrn);
      float rev1 = clamp(pathRev * 2.0, 0.0, 1.0);
      float drn1 = clamp(pathDrn * 2.0, 0.0, 1.0);
      if (rev1 - drn1 > 0.001) {
        float t1;
        float d1 = sdSegT(p, mix(ENTRY, BEND, drn1), mix(ENTRY, BEND, rev1), t1);
        vec3 g1 = mix(lin(vec3(255.0, 217.0, 160.0)), lin(vec3(255.0, 106.0, 43.0)), t1);
        hdr += glass * g1 * exp(-d1 * 0.30) * 1.4 * pathRev * pAmp;
      }
      if (pathRev > 0.5) {
        float rev2 = clamp(pathRev * 2.0 - 1.0, 0.0, 1.0);
        float drn2 = clamp(pathDrn * 2.0 - 1.0, 0.0, 1.0);
        if (rev2 - drn2 > 0.001) {
          float t2;
          float d2 = sdSegT(p, mix(BEND, EXIT, drn2), mix(BEND, EXIT, rev2), t2);
          vec3 g2 = mix(lin(vec3(255.0, 106.0, 43.0)), lin(vec3(220.0, 21.0, 11.0)), t2);
          hdr += glass * g2 * exp(-d2 * 0.30) * 1.6 * pathRev * pAmp;
        }
      }
    }
  }

  // --- output: one TiDB-red beam, EXIT → off-frame right, 0.60–1.0 ---------
  // Exit: the near end lifts off EXIT and the beam sweeps right out of frame;
  // the exit bloom follows it out.
  float outRev = smoothstep(0.60, 1.0, uProgress);
  float outDrn = smoothstep(0.55, 0.95, uExit);

  float dEx = length(p - EXIT);
  hdr += lin(vec3(255.0, 226.0, 192.0)) * (conv * 0.8 + outRev * (1.0 - outDrn) * 1.4) * 2.2 / (1.0 + dEx * dEx * 0.0035);

  if (outRev - outDrn > 0.001) {
    float fo = 1.0 + 0.04 * sin(uTime * 1.07 + 3.3);
    float oAmp = drainAmp(outDrn);
    vec2 outStart = mix(EXIT, vec2(1600.0, 470.0), outDrn);
    vec2 outEnd = mix(EXIT, vec2(1600.0, 470.0), outRev);
    // Hot warm-white core over a #DC150B body: "core = highlight, body =
    // brand red" — the neon-sign-photograph convention.
    float tO;
    float dO = sdSegT(p, outStart, outEnd, tO);
    hdr += lin(vec3(255.0, 226.0, 192.0)) * exp(-dO * 0.55) * 2.2 * outRev * fo * oAmp;
    hdr += lin(vec3(220.0, 21.0, 11.0)) *
      (exp(-dO * 0.14) * 2.0 + (0.55 + 0.45 * haze) * 0.5 / (1.0 + dO * dO * 0.0008)) * outRev * fo * oAmp;
  }

  // --- ambient haze wash around the convergence zone -----------------------
  float dPr = length(p - vec2(950.0, 430.0));
  hdr += lin(vec3(42.0, 20.0, 16.0)) * (0.35 + 0.65 * haze) * 0.9 * exp(-dPr * dPr * 2.2e-6);

  // --- exposure → tonemap → grain ------------------------------------------
  // 0.5 global exposure: the band errs dark. The field is pure #000000 so the
  // section enters seamlessly from the neighbors' black — the reveal reads as
  // the previous section's background morphing, not a new surface starting.
  // The exit darkening lives here (uExit 0.55–1.0, mirror of the entry
  // power1.in ramp) — never as a second tween on uIntensity: two scrubbed
  // timelines writing one property fight each other.
  float tD = clamp((uExit - 0.55) / 0.45, 0.0, 1.0);
  hdr *= uIntensity * (1.0 - tD * tD) * 0.5;

  vec3 srgb = pow(aces(hdr), vec3(1.0 / 2.2));

  // Triangular dither + a slightly stronger animated grain layer: kills
  // banding on the near-black field and sells the photographic read.
  float n1 = hash12(gl_FragCoord.xy + fract(uTime * 0.61) * vec2(157.31, 113.70));
  float n2 = hash12(gl_FragCoord.xy * 1.618 + fract(uTime * 0.43) * vec2(291.70, 197.30));
  float dither = (n1 + n2 - 1.0) * (1.5 / 255.0);
  float luma = dot(srgb, vec3(0.299, 0.587, 0.114));
  float grain = (hash12(gl_FragCoord.xy * 0.5 + fract(uTime * 0.77) * vec2(431.10, 379.90)) - 0.5) *
    (3.2 / 255.0) * (0.35 + 0.65 * smoothstep(0.0, 0.35, luma));

  gl_FragColor = vec4(srgb + dither + grain, 1.0);
}
`

// Static stand-in for the shader's end state: no-WebGL / context-lost path.
// TODO(polish): replace with a real PNG export of the shader at uProgress=1.
const POSTER = [
  'radial-gradient(420px 300px at 66% 46%, rgba(255, 226, 192, 0.18), rgba(255, 106, 43, 0.07) 45%, transparent 70%)',
  'radial-gradient(1100px 240px at 88% 51%, rgba(220, 21, 11, 0.20), transparent 65%)',
  'radial-gradient(900px 500px at 32% 45%, rgba(42, 20, 16, 0.38), transparent 70%)',
  'linear-gradient(#000000, #000000)',
].join(', ')

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (!gl.isContextLost()) {
      console.error('PrismBackground shader:', gl.getShaderInfoLog(shader))
    }
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function PrismBackground() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const edgesRef = useRef<SVGSVGElement>(null)
  const facetRef = useRef<SVGLineElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const section = root?.parentElement
    if (!root || !canvas || !section) return

    // The poster is the end state, so fallback paths mark the section done.
    const bail = () => {
      setFallback(true)
      section.classList.add(DONE_CLASS)
      return () => section.classList.remove(DONE_CLASS)
    }

    const gl =
      canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
      }) || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)
    if (!gl) return bail()

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT)
    if (!vert) return bail()
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!frag) {
      gl.deleteShader(vert)
      return bail()
    }
    const program = gl.createProgram()
    if (!program) {
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      return bail()
    }
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (!gl.isContextLost()) {
        console.error('PrismBackground link:', gl.getProgramInfoLog(program))
      }
      disposePrismWebGL(gl, { buffer: null, program, shaders: [vert, frag] })
      return bail()
    }
    gl.useProgram(program)

    // Fullscreen triangle.
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'uResolution')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uProgress = gl.getUniformLocation(program, 'uProgress')
    const uExit = gl.getUniformLocation(program, 'uExit')
    const uIntensity = gl.getUniformLocation(program, 'uIntensity')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // GSAP scrubs this; the shader derives all staggering from progress.
    const u = { progress: 0, intensity: 0, exit: 0 }
    let time = reduced ? REDUCED_TIME : 0
    let raf = 0
    let running = false
    let lastTs = 0
    let dead = false

    const render = () => {
      if (dead) return
      gl.uniform2f(uResolution, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.uniform1f(uTime, time)
      gl.uniform1f(uProgress, u.progress)
      gl.uniform1f(uExit, u.exit)
      gl.uniform1f(uIntensity, u.intensity)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const resize = () => {
      if (dead) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const rect = section.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      render()
    }

    const tick = (ts: number) => {
      time += Math.min(ts - lastTs, 64) / 1000
      lastTs = ts
      render()
      raf = requestAnimationFrame(tick)
    }
    const start = () => {
      if (running || reduced || dead) return
      running = true
      lastTs = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(raf)
    }

    const onLost = (e: Event) => {
      e.preventDefault()
      dead = true
      stop()
      setFallback(true)
      section.classList.add(DONE_CLASS)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    // Resize follows the section, not the window — the band's height depends
    // on content wrap.
    const ro = new ResizeObserver(resize)
    ro.observe(section)
    resize()

    let ctx: gsap.Context | undefined
    if (reduced) {
      // One frame at the end state, time frozen — no rAF, no ScrollTrigger.
      u.progress = 1
      u.intensity = 1
      section.classList.add(DONE_CLASS)
      render()
    } else {
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        // The toggle must live on the timelines, not the ScrollTriggers:
        // the trigger's onUpdate only fires on scroll deltas, but with
        // scrub: 1 the tween keeps catching up after scrolling stops —
        // a toggle there misses any threshold crossed during catch-up.
        // Both timelines apply one combined predicate: the class means "the
        // light is on", so the exit drain takes it back off.
        const applyDone = () => {
          section.classList.toggle(DONE_CLASS, u.progress > 0.9 && u.exit < 0.55)
          if (!running) render()
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            },
            onUpdate: applyDone,
          })
          .to(u, { progress: 1, duration: 1, ease: 'none' }, 0)
          .to(u, { intensity: 1, duration: 1, ease: 'power1.in' }, 0)

        // Exit drain — a switch-off, not a rewind: the sources shut off and
        // the last of the light travels on through the glass, left → right.
        // Starts only once the band itself is being scrolled away ('top top'),
        // so the drain never plays while the section is fully in view.
        // The darkening itself is derived in-shader from uExit; this timeline
        // never writes uIntensity (two scrubbed tweens on one property fight).
        const exitTl = gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom 20%',
              scrub: 1,
            },
            onUpdate: applyDone,
          })
          .to(u, { exit: 1, duration: 1, ease: 'none' }, 0)

        // The glass edges fade with the darkening window — a crisp outline
        // floating on a black field reads as a leftover.
        if (edgesRef.current) {
          exitTl.to(edgesRef.current, { opacity: 0, duration: 0.4, ease: 'none' }, 0.6)
        }

        const shimmer = facetRef.current
          ? gsap.to(facetRef.current, {
              opacity: 0.4,
              duration: 5.5,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              paused: true,
            })
          : null

        // uTime advances only while the section is on screen — saves GPU and
        // battery for a mid-page section.
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (self.isActive) {
              start()
              shimmer?.play()
            } else {
              stop()
              shimmer?.pause()
            }
          },
        })
      }, root)
    }

    return () => {
      dead = true
      ctx?.revert()
      stop()
      ro.disconnect()
      section.classList.remove(DONE_CLASS)
      canvas.removeEventListener('webglcontextlost', onLost)
      disposePrismWebGL(gl, { buffer: buf, program, shaders: [vert, frag] })
    }
  }, [])

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 select-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
      {fallback && <div className="absolute inset-0 z-0" style={{ background: POSTER }} />}

      {/* Glass edges live in SVG: shaders are mediocre at razor-thin crisp
          lines. Same design frame, same cover-fit. */}
      <svg
        ref={edgesRef}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 z-[1] h-full w-full"
      >
        <path
          d={`M ${APEX.x} ${APEX.y} L ${BASE_R.x} ${BASE_R.y} L ${BASE_L.x} ${BASE_L.y} Z`}
          fill="none"
          stroke="rgba(242, 239, 233, 0.9)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.55"
        />
        <line
          ref={facetRef}
          x1={APEX.x}
          y1={APEX.y}
          x2={(BASE_L.x + BASE_R.x) / 2}
          y2={BASE_L.y}
          stroke="rgba(242, 239, 233, 0.9)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.14"
        />
      </svg>

      {/* Readability scrim, pure black to match the field: a strong left band
          under the numeral plus a softer right band under the gray paragraph
          and CTA. Only the mid-frame (the prism itself) goes unveiled. */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: [
            'linear-gradient(90deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.48) 34%, rgba(0, 0, 0, 0) 58%)',
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.30) 80%, rgba(0, 0, 0, 0.38) 100%)',
          ].join(', '),
        }}
      />
    </div>
  )
}
