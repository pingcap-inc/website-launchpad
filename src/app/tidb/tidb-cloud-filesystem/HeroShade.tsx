'use client'

// ASCII flow-field shade for the hero — spec: docs/fs/ASCII-HERO-BACKGROUND.md.
// Curved light strands (several alive at once) cross a faint mono-glyph field;
// a persistent memory buffer keeps faint marks where energy passed — strands
// and the cursor write through the same rule, and trails decay to a floor,
// never to zero. Canvas 2D glyph grid with changed-cell repaints; GSAP drives
// strand lifecycles and the entrance; ScrollTrigger and visibilitychange gate
// the rAF loop. Static single frame below lg and under prefers-reduced-motion.
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CELL = 15
const FRAME_W = 1440
const FRAME_H = 660
const FPS_INTERVAL = 1000 / 30
const MEMORY_HALF_LIFE_S = 45
const MEMORY_FLOOR = 0.08
const WRITE_GAIN = 0.6
const CURSOR_RADIUS = 110
const CURSOR_SIGMA = 62
const IDLE_AFTER_MS = 1500

const RAMP = ['·', ':', '~', '/', '+']
const LEAVINGS = ['M', '+', '▪', 'M', '✓', '+', '▪', 'M', '+', '▪', '×', '▪']
const BRAND = ['t', 'i', 'd', 'b']

// Strand routes in the 1440×660 design frame (cover-fit into the section).
const STRANDS = [
  { p0: [1010, 30], p1: [700, 230], p2: [400, 562], dur: 15, delay: 0.4, gap: 3.2, gain: 1.0 },
  { p0: [-30, 300], p1: [280, 410], p2: [640, 556], dur: 17, delay: 6.0, gap: 4.1, gain: 0.85 },
  { p0: [60, 548], p1: [360, 538], p2: [715, 552], dur: 13, delay: 11.0, gap: 5.0, gain: 0.55 },
] as const

// Pre-seeded memory marks so the story is present before the first strand dies.
const SEED_ARCS = [
  [
    [880, 480],
    [760, 510],
    [640, 535],
  ],
  [
    [180, 560],
    [300, 552],
    [430, 548],
  ],
] as const

function hash(x: number, y: number) {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return h - Math.floor(h)
}

function smoothNoise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const fx = x - xi
  const fy = y - yi
  const u = fx * fx * (3 - 2 * fx)
  const v = fy * fy * (3 - 2 * fy)
  return (
    hash(xi, yi) * (1 - u) * (1 - v) +
    hash(xi + 1, yi) * u * (1 - v) +
    hash(xi, yi + 1) * (1 - u) * v +
    hash(xi + 1, yi + 1) * u * v
  )
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

interface StrandState {
  p: number
  on: number
}

export function HeroShade() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = sectionRef.current?.parentElement
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animated = isDesktop && !reducedMotion

    // ── Grid state ────────────────────────────────────────────────────────────
    let cols = 0
    let rows = 0
    let width = 0
    let height = 0
    let dpr = 1
    let scale = 1 // cover-fit design-frame → section
    let offX = 0
    let offY = 0
    let memory = new Float32Array(0)
    let lastWrite = new Float32Array(0) // seconds timestamp of last write, -1 = never
    let memGlyph = new Int16Array(0)
    let churnGlyph = new Int16Array(0) // -1 none, 0..4 ramp override, 10..13 brand
    let churnNext = new Float32Array(0)
    let lastKey: string[] = []
    let dimRects: DOMRect[] = []
    let blockRects: DOMRect[] = []

    const strands: StrandState[] = STRANDS.map(() => ({ p: 0, on: 0 }))
    const strandPts = STRANDS.map((s) => {
      const pts: [number, number][] = []
      for (let i = 0; i <= 72; i++) {
        const t = i / 72
        const u = 1 - t
        pts.push([
          u * u * s.p0[0] + 2 * u * t * s.p1[0] + t * t * s.p2[0],
          u * u * s.p0[1] + 2 * u * t * s.p1[1] + t * t * s.p2[1],
        ])
      }
      return pts
    })

    let energy = new Float32Array(0)
    let warm = new Float32Array(0)

    const cursor = { x: -1e4, y: -1e4, lastMove: -1e4, idle: 1 }
    let now = 0 // seconds, advanced by the loop

    const idx = (c: number, r: number) => r * cols + c

    function measureMasks() {
      const hostRect = host!.getBoundingClientRect()
      dimRects = []
      blockRects = []
      host!.querySelectorAll('[data-shade-dim]').forEach((el) => {
        const r = el.getBoundingClientRect()
        dimRects.push(new DOMRect(r.x - hostRect.x, r.y - hostRect.y, r.width, r.height))
      })
      host!.querySelectorAll('[data-shade-block]').forEach((el) => {
        const r = el.getBoundingClientRect()
        blockRects.push(new DOMRect(r.x - hostRect.x, r.y - hostRect.y, r.width, r.height))
      })
    }

    function maskAt(px: number, py: number) {
      for (const r of blockRects) {
        if (px > r.x - 8 && px < r.x + r.width + 8 && py > r.y - 8 && py < r.y + r.height + 8)
          return 0
      }
      for (const r of dimRects) {
        if (px > r.x && px < r.x + r.width && py > r.y && py < r.y + r.height) return 0.12
      }
      return 1
    }

    function resize() {
      const rect = host!.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      scale = Math.max(width / FRAME_W, height / FRAME_H)
      offX = (width - FRAME_W * scale) / 2
      offY = (height - FRAME_H * scale) / 2

      const newCols = Math.ceil(width / CELL)
      const newRows = Math.ceil(height / CELL)
      const newMemory = new Float32Array(newCols * newRows)
      const newLastWrite = new Float32Array(newCols * newRows).fill(-1e4)
      const newMemGlyph = new Int16Array(newCols * newRows)
      // nearest-cell remap — a resize must not amnesia the field
      if (cols > 0 && rows > 0) {
        for (let r = 0; r < newRows; r++) {
          for (let c = 0; c < newCols; c++) {
            const oc = Math.min(cols - 1, Math.round((c / newCols) * cols))
            const or = Math.min(rows - 1, Math.round((r / newRows) * rows))
            newMemory[r * newCols + c] = memory[or * cols + oc]
            newLastWrite[r * newCols + c] = lastWrite[or * cols + oc]
            newMemGlyph[r * newCols + c] = memGlyph[or * cols + oc]
          }
        }
      }
      cols = newCols
      rows = newRows
      memory = newMemory
      lastWrite = newLastWrite
      memGlyph = newMemGlyph
      churnGlyph = new Int16Array(cols * rows).fill(-1)
      churnNext = new Float32Array(cols * rows)
      energy = new Float32Array(cols * rows)
      warm = new Float32Array(cols * rows)
      lastKey = new Array(cols * rows).fill('')
      ctx!.clearRect(0, 0, width, height)
      ctx!.font = '11px "Moderat Mono", ui-monospace, monospace'
      ctx!.textAlign = 'center'
      ctx!.textBaseline = 'middle'
      measureMasks()
    }

    function writeMemory(i: number, value: number) {
      if (value <= 0.05) return
      if (value > memory[i]) {
        memory[i] = Math.min(1, value)
        lastWrite[i] = now
        memGlyph[i] = Math.floor(hash(i * 3.7, lastWrite[i]) * LEAVINGS.length)
      }
    }

    function seedMemory() {
      for (const arc of SEED_ARCS) {
        for (const [fx, fy] of arc) {
          const px = fx * scale + offX
          const py = fy * scale + offY
          const c0 = Math.round(px / CELL)
          const r0 = Math.round(py / CELL)
          for (let dr = -2; dr <= 2; dr++) {
            for (let dc = -3; dc <= 3; dc++) {
              const c = c0 + dc
              const r = r0 + dr
              if (c < 0 || r < 0 || c >= cols || r >= rows) continue
              if (hash(c * 7, r * 13) < 0.5) continue
              const d = Math.hypot(dc * CELL, dr * CELL)
              writeMemory(idx(c, r), Math.exp(-(d * d) / (2 * 20 * 20)) * 0.4)
            }
          }
        }
      }
      // seeds are old news, not fresh writes
      lastWrite.fill(-1e4)
    }

    function splat(px: number, py: number, e: number, w: number) {
      const c0 = Math.round(px / CELL)
      const r0 = Math.round(py / CELL)
      for (let dr = -3; dr <= 3; dr++) {
        for (let dc = -3; dc <= 3; dc++) {
          const c = c0 + dc
          const r = r0 + dr
          if (c < 0 || r < 0 || c >= cols || r >= rows) continue
          const cx = c * CELL + CELL / 2
          const cy = r * CELL + CELL / 2
          const d2 = (cx - px) ** 2 + (cy - py) ** 2
          const fall = Math.exp(-d2 / (2 * 16 * 16)) + 0.25 / (1 + d2 / 900)
          const i = idx(c, r)
          energy[i] = Math.min(1, energy[i] + e * fall)
          if (w > 0) warm[i] = Math.max(warm[i], w * Math.exp(-d2 / (2 * 14 * 14)))
        }
      }
    }

    function rollGlyph(i: number, c: number, r: number) {
      // brand glimpse: ~1 in 8 re-rolls, lowercase, never horizontally adjacent
      if (hash(c * 17 + now, r * 23) < 0.125) {
        const left = c > 0 ? churnGlyph[i - 1] : -1
        const right = c < cols - 1 ? churnGlyph[i + 1] : -1
        if (left < 10 && right < 10) {
          churnGlyph[i] = 10 + Math.floor(hash(c * 31, r * 37 + now) * BRAND.length)
          return
        }
      }
      churnGlyph[i] = Math.floor(hash(c * 13 + now * 7, r * 19) * RAMP.length)
    }

    function paintCell(i: number, c: number, r: number) {
      const px = c * CELL + CELL / 2
      const py = r * CELL + CELL / 2
      const mk = maskAt(px, py)
      let key = ''
      let glyph = ''
      let color = ''

      if (mk > 0) {
        const drift =
          hash(c * 11, r * 5) > 0.45
            ? (smoothNoise(c * 0.09 + now * 0.03, r * 0.09) * 0.65 +
                smoothNoise(c * 0.23 + 7 - now * 0.02, r * 0.23 + 3) * 0.35) *
              0.3
            : 0
        const e = energy[i] * mk
        const m = memory[i] * Math.max(mk, 0.35)
        const glow = cursorGlow(px, py) * mk
        const total = drift * 0.5 + e + m * 0.8 + glow * 0.5

        if (total >= 0.055) {
          const fresh = Math.max(0, 1 - (now - lastWrite[i]) / 0.6)
          if (m > e && m > drift * 0.6) {
            glyph = LEAVINGS[memGlyph[i] % LEAVINGS.length]
            const v = Math.min(1, m)
            if (fresh > 0) {
              color = rgb(
                lerp(lerp(40, 93, v), 220, fresh),
                lerp(lerp(51, 105, v), 21, fresh),
                lerp(lerp(62, 116, v), 11, fresh)
              )
            } else {
              color = rgb(lerp(40, 93, v), lerp(51, 105, v), lerp(62, 116, v))
            }
          } else if (e > drift * 0.6) {
            const over = churnGlyph[i]
            glyph =
              over >= 10
                ? BRAND[over - 10]
                : RAMP[Math.min(RAMP.length - 1, Math.floor(e * RAMP.length * 1.4))]
            const w = warm[i]
            if (w > 0.25) {
              color = rgb(lerp(162, 243, w), lerp(173, 80, w), lerp(185, 72, w))
            } else {
              const v = Math.min(1, e)
              color = rgb(lerp(40, 116, v), lerp(51, 128, v), lerp(62, 139, v))
            }
          } else if (glow > 0.06) {
            const over = churnGlyph[i]
            glyph =
              over >= 10 ? BRAND[over - 10] : RAMP[over >= 0 ? over : Math.floor(drift * 9) % 2]
            const v = Math.min(1, drift * 1.6 + glow * 1.1)
            color = rgb(lerp(48, 118, v), lerp(60, 132, v), lerp(72, 146, v))
          } else if (drift > 0.02) {
            glyph = RAMP[Math.floor(drift * 9) % 2]
            const v = drift * 2.2 * (mk < 1 ? 0.6 : 1)
            color = rgb(lerp(30, 54, v), lerp(41, 63, v), lerp(50, 74, v))
          }
        }
      }

      key = glyph ? `${glyph}${color}` : ''
      if (key === lastKey[i]) return
      lastKey[i] = key
      ctx!.clearRect(c * CELL, r * CELL, CELL, CELL)
      if (glyph) {
        ctx!.fillStyle = color
        ctx!.fillText(glyph, px, py)
      }
    }

    function rgb(r: number, g: number, b: number) {
      // quantize so repaint keys stay stable
      return `rgb(${Math.round(r / 6) * 6},${Math.round(g / 6) * 6},${Math.round(b / 6) * 6})`
    }

    function cursorGlow(px: number, py: number) {
      // glow survives reduced motion (brightness only); churn/writes do not
      if (!isFinePointer || !isDesktop) return 0
      const d2 = (px - cursor.x) ** 2 + (py - cursor.y) ** 2
      if (d2 > CURSOR_RADIUS * CURSOR_RADIUS * 4) return 0
      return Math.exp(-d2 / (2 * CURSOR_SIGMA * CURSOR_SIGMA)) * cursor.idle
    }

    function frame(dtSeconds: number) {
      now += dtSeconds
      energy.fill(0)
      warm.fill(0)

      // strand energy — splat along each active envelope
      for (let s = 0; s < STRANDS.length; s++) {
        const st = strands[s]
        if (st.on <= 0.01) continue
        const head = st.p
        for (let k = 0; k < 36; k++) {
          const t = head - 0.42 + (k / 35) * 0.45
          if (t < 0 || t > 1) continue
          const dt = t - head
          const headG = Math.exp(-(dt * dt) / (2 * 0.055 * 0.055))
          const tail = dt < 0 ? Math.max(0, 1 + dt / 0.38) * 0.35 : 0
          const env = Math.max(headG, tail) * st.on * STRANDS[s].gain
          if (env < 0.03) continue
          const pt = strandPts[s][Math.round(t * 72)]
          const px = pt[0] * scale + offX
          const py = pt[1] * scale + offY
          splat(px, py, env * 0.55, headG * st.on)
        }
      }

      // cursor as a runtime: energy + churn + writes
      if (isFinePointer) {
        const idleFor = now * 1000 - cursor.lastMove
        const target = idleFor > IDLE_AFTER_MS ? 0.4 : 1
        cursor.idle += (target - cursor.idle) * 0.08
        if (cursor.x > -1e3 && cursor.idle > 0.45) {
          splat(cursor.x, cursor.y, 0.4 * cursor.idle, cursor.idle > 0.7 ? 0.5 : 0)
          if (cursor.idle > 0.7) {
            const c0 = Math.round(cursor.x / CELL)
            const r0 = Math.round(cursor.y / CELL)
            const rad = Math.ceil(CURSOR_RADIUS / CELL)
            for (let dr = -rad; dr <= rad; dr++) {
              for (let dc = -rad; dc <= rad; dc++) {
                const c = c0 + dc
                const r = r0 + dr
                if (c < 0 || r < 0 || c >= cols || r >= rows) continue
                if (dc * dc + dr * dr > rad * rad) continue
                const i = idx(c, r)
                if (now >= churnNext[i]) {
                  churnNext[i] = now + 0.08 + hash(c, r + now) * 0.06
                  if (hash(c * 3, r * 5 + now) < 0.6) rollGlyph(i, c, r)
                }
              }
            }
          }
        }
      }

      // ambient churn — background processes touching files
      for (let k = 0; k < 4; k++) {
        const c = Math.floor(hash(now * 61 + k, k * 17) * cols)
        const r = Math.floor(hash(k * 29, now * 47 + k) * rows)
        rollGlyph(idx(c, r), c, r)
      }

      // one write rule, two sources
      const decay = Math.pow(0.5, dtSeconds / MEMORY_HALF_LIFE_S)
      for (let i = 0; i < memory.length; i++) {
        if (memory[i] > 0) {
          memory[i] = Math.max(memory[i] * decay, lastWrite[i] > -1e3 ? MEMORY_FLOOR : 0)
        }
        if (energy[i] * WRITE_GAIN > memory[i]) writeMemory(i, energy[i] * WRITE_GAIN)
      }

      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) paintCell(idx(c, r), c, r)
    }

    function staticFrame() {
      energy.fill(0)
      warm.fill(0)
      lastKey.fill('')
      ctx!.clearRect(0, 0, width, height)
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) paintCell(idx(c, r), c, r)
    }

    // ── Boot ─────────────────────────────────────────────────────────────────
    resize()
    seedMemory()

    let raf = 0
    let running = false
    let lastTs = 0
    let acc = 0

    const loop = (ts: number) => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      const dt = lastTs ? ts - lastTs : FPS_INTERVAL
      lastTs = ts
      acc += dt
      if (acc >= FPS_INTERVAL) {
        frame(Math.min(acc, 100) / 1000)
        acc = 0
      }
    }
    const start = () => {
      if (running || !animated) return
      running = true
      lastTs = 0
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const ctxGsap = gsap.context(() => {
      if (!animated) {
        staticFrame()
        return
      }
      canvas.style.opacity = '0'
      gsap.to(canvas, { opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.8 })
      STRANDS.forEach((s, i) => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: s.gap, delay: s.delay + 1.2 })
        tl.fromTo(strands[i], { p: 0 }, { p: 1, duration: s.dur, ease: 'sine.inOut' }, 0)
        tl.fromTo(strands[i], { on: 0 }, { on: 1, duration: 1.2, ease: 'power1.in' }, 0)
        tl.to(strands[i], { on: 0, duration: 1.5, ease: 'power1.out' }, s.dur - 1.5)
      })
      ScrollTrigger.create({
        trigger: host,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? start() : stop()),
      })
      start()
    })

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (ScrollTrigger.isInViewport(host)) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      cursor.x = e.clientX - rect.x
      cursor.y = e.clientY - rect.y
      cursor.lastMove = now * 1000
      cursor.idle = Math.max(cursor.idle, 0.999)
      if (!animated && !document.hidden) staticGlowRepaint()
    }
    const onLeave = () => {
      cursor.x = -1e4
      cursor.y = -1e4
    }
    let glowRaf = 0
    const staticGlowRepaint = () => {
      // reduced motion: brightness-only response, throttled to one repaint per frame
      cancelAnimationFrame(glowRaf)
      glowRaf = requestAnimationFrame(() => staticFrame())
    }
    if (isFinePointer && isDesktop) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (!animated) staticFrame()
    })
    ro.observe(host)

    let fontRepaint = false
    document.fonts.ready.then(() => {
      if (fontRepaint) return
      fontRepaint = true
      lastKey.fill('')
      if (!animated) staticFrame()
    })

    return () => {
      stop()
      cancelAnimationFrame(glowRaf)
      ctxGsap.revert()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={sectionRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
