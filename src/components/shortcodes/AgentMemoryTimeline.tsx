'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

interface AgentMemoryTimelineProps {
  accent?: string
  autoplay?: boolean
  loopSeconds?: number
  className?: string
}

const SEGMENTS: Array<[number, number]> = [
  [0.05, 0.3],
  [0.39, 0.64],
  [0.73, 0.96],
]

const RECORDS = [
  ['workflow.checkpoint', 'step 4 / 9'],
  ['approved_scopes', 'fs:read, web'],
  ['user.preference', 'verbosity: low'],
] as const

const CHIP_LABELS = ['messages[]', 'scratchpad', 'tool_call']

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function ease(value: number) {
  return value * value * (3 - 2 * value)
}

export function AgentMemoryTimeline({
  accent = '#E8412B',
  autoplay = true,
  loopSeconds = 14,
  className,
}: AgentMemoryTimelineProps) {
  const [progress, setProgress] = useState(autoplay ? 0 : 0.88)
  const [durable, setDurable] = useState(true)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)
  const phaseRef = useRef<'play' | 'rewind'>('play')
  const lastRef = useRef<number | null>(null)

  useEffect(() => {
    setProgress(autoplay ? 0 : 0.88)
    phaseRef.current = autoplay ? 'play' : 'rewind'
  }, [autoplay])

  useEffect(() => {
    const frame = (timestamp: number) => {
      if (lastRef.current == null) {
        lastRef.current = timestamp
      }

      const dt = Math.min(0.05, (timestamp - lastRef.current) / 1000)
      lastRef.current = timestamp

      if (autoplay && !draggingRef.current) {
        const duration = Math.max(4, loopSeconds)
        setProgress((prev) => {
          let next = prev

          if (phaseRef.current === 'play') {
            next += dt / duration
            if (next >= 1) {
              next = 1
              phaseRef.current = 'rewind'
            }
          } else {
            next -= dt / (duration * 0.16)
            if (next <= 0) {
              next = 0
              phaseRef.current = 'play'
            }
          }

          return next
        })
      }

      rafRef.current = window.requestAnimationFrame(frame)
    }

    const rafRef = { current: window.requestAnimationFrame(frame) }
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      lastRef.current = null
    }
  }, [autoplay, loopSeconds])

  useEffect(() => {
    const pointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return
      setProgress(progressFromPointer(event.clientX, trackRef.current, progress))
    }

    const pointerUp = () => {
      if (!draggingRef.current) return
      draggingRef.current = false
      phaseRef.current = progress >= 0.999 ? 'rewind' : 'play'
    }

    window.addEventListener('pointermove', pointerMove)
    window.addEventListener('pointerup', pointerUp)

    return () => {
      window.removeEventListener('pointermove', pointerMove)
      window.removeEventListener('pointerup', pointerUp)
    }
  }, [progress])

  const visualState = useMemo(() => {
    let activeIndex = -1
    let fill = 0

    for (let index = 0; index < SEGMENTS.length; index += 1) {
      const [start, end] = SEGMENTS[index]
      if (progress >= start && progress <= end) {
        activeIndex = index
        fill = ease(clamp((progress - start) / (end - start), 0, 1))
      }
    }

    let persistedCount = 0
    for (const [, end] of SEGMENTS) {
      if (progress > end) persistedCount += 1
    }

    let chipBaseAlpha = 0
    let chipDrift = 0
    let chipFillCount = 0
    if (activeIndex >= 0) {
      chipBaseAlpha = 1
      chipFillCount = fill * 3
    } else {
      let previousIndex = -1
      for (let index = 0; index < SEGMENTS.length; index += 1) {
        if (progress > SEGMENTS[index][1]) previousIndex = index
      }
      if (previousIndex >= 0) {
        const gapElapsed = progress - SEGMENTS[previousIndex][1]
        const evaporation = ease(clamp(gapElapsed / 0.05, 0, 1))
        chipBaseAlpha = 1 - evaporation
        chipDrift = -22 * evaporation
        chipFillCount = 3
      }
    }

    return {
      activeIndex,
      chipBaseAlpha,
      chipDrift,
      chipFillCount,
      persistedCount: durable ? persistedCount : 0,
    }
  }, [durable, progress])

  return (
    <div className={className}>
      <div
        style={{
          border: '1px solid #ECEDEF',
          background: '#FBFBFC',
          borderRadius: 8,
          padding: '22px 26px 24px',
          boxShadow: '0 1px 2px rgba(10,10,10,0.03)',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        <button
          type="button"
          onClick={() => setDurable((value) => !value)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: 14,
            cursor: 'pointer',
            textAlign: 'left',
            marginBottom: 22,
            padding: '15px 18px',
            borderRadius: 8,
            border: '1px solid #E6E8EB',
            background: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                display: 'inline-flex',
                width: 34,
                height: 20,
                borderRadius: 10,
                background: durable ? accent : '#C2C6CC',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  left: durable ? 16 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 1px 2px rgba(0,0,0,.25)',
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '.06em',
                color: '#0A0A0A',
                textTransform: 'uppercase',
              }}
            >
              Durable layer {durable ? 'on' : 'off'}
            </span>
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: durable ? '#6B7077' : '#9AA0A6',
              textAlign: 'right',
            }}
          >
            {durable ? 'State survives a restart' : 'Nothing survives a restart'}
          </span>
        </button>

        <div style={{ marginBottom: 22 }}>
          <div
            ref={trackRef}
            onPointerDown={(event) => {
              draggingRef.current = true
              setProgress(progressFromPointer(event.clientX, trackRef.current, progress))
              event.preventDefault()
            }}
            style={{ position: 'relative', height: 58, cursor: 'grab', touchAction: 'none' }}
          >
            <div
              style={{
                position: 'absolute',
                top: 27.5,
                left: 0,
                right: 0,
                height: 1,
                background: '#E6E8EB',
              }}
            />
            {SEGMENTS.map(([start, end], index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 25,
                  left: `${start * 100}%`,
                  width: `${(end - start) * 100}%`,
                  height: 6,
                  borderRadius: 3,
                  background:
                    visualState.activeIndex === index
                      ? accent
                      : progress > end
                        ? '#9AA0A6'
                        : '#DADDE1',
                  transition: 'background .25s',
                }}
              />
            ))}
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: `${progress * 100}%`,
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{ width: 12, height: 12, background: accent, transform: 'rotate(45deg)' }}
              />
              <div style={{ width: 2, height: 40, background: accent, marginTop: -1 }} />
            </div>
          </div>

          <div style={{ position: 'relative', height: 15, marginTop: 1 }}>
            {SEGMENTS.map(([start, end], index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${((start + end) / 2) * 100}%`,
                  transform: 'translateX(-50%)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10.5,
                  letterSpacing: '.1em',
                  color: visualState.activeIndex === index ? '#0A0A0A' : '#AEB3B9',
                }}
              >
                0{index + 1}
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: 'center',
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: '.18em',
              color: '#C2C6CC',
              marginTop: 9,
              textTransform: 'uppercase',
            }}
          >
            drag to scrub
          </div>
        </div>

        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: '-.01em',
              color: '#0A0A0A',
              margin: '0 0 13px',
              display: 'flex',
              alignItems: 'center',
              gap: 9,
            }}
          >
            <span style={{ fontSize: 11, lineHeight: 1, letterSpacing: '.08em' }}>CLEAR</span>
            Short-term memory clears between sessions
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              alignItems: 'center',
              minHeight: 38,
            }}
          >
            {visualState.chipBaseAlpha < 0.04 ? (
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  color: '#C2C6CC',
                  fontStyle: 'italic',
                }}
              >
                -- wiped --
              </div>
            ) : null}
            {CHIP_LABELS.map((label, index) => {
              const opacity =
                clamp(visualState.chipFillCount - index, 0, 1) * visualState.chipBaseAlpha
              return (
                <div
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '7px 11px',
                    border: '1px dashed #C7CBD1',
                    borderRadius: 5,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: '#7A8088',
                    background: '#fff',
                    whiteSpace: 'nowrap',
                    opacity,
                    transform: `translateY(${visualState.chipDrift * (1 - index * 0.07)}px)`,
                  }}
                >
                  {label}
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: '-.01em',
              color: durable ? '#0A0A0A' : '#B7BBC1',
              margin: '0 0 6px',
              display: 'flex',
              alignItems: 'center',
              gap: 9,
            }}
          >
            <span style={{ fontSize: 11, lineHeight: 1, letterSpacing: '.08em' }}>KEEP</span>
            Persistent memory carries across sessions
          </div>
          <div style={{ marginTop: 2 }}>
            {RECORDS.map(([key, value], index) => {
              const opacity = durable
                ? ease(clamp((progress - SEGMENTS[index][1]) / 0.025, 0, 1))
                : 0
              return (
                <div
                  key={key}
                  style={{
                    position: 'relative',
                    height: 38,
                    borderTop: '1px solid #EEF0F2',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
                      opacity: 1 - opacity,
                      pointerEvents: 'none',
                    }}
                  >
                    <span
                      style={{ width: 8, height: 8, border: '1px solid #DADCE0', flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 12.5,
                        color: '#C7CBD0',
                      }}
                    >
                      {durable ? `session 0${index + 1} ->` : 'discarded - not persisted'}
                    </span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
                      opacity,
                      transform: `translateX(${(1 - opacity) * 10}px)`,
                    }}
                  >
                    <span style={{ width: 8, height: 8, background: accent, flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 13,
                        color: '#0A0A0A',
                      }}
                    >
                      {key}
                    </span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 12.5,
                        color: '#6B7077',
                      }}
                    >
                      {value}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: '.04em',
          color: '#9AA0A6',
          textAlign: 'right',
        }}
      >
        persisted events: {visualState.persistedCount}
      </div>
    </div>
  )
}

function progressFromPointer(clientX: number, element: HTMLDivElement | null, fallback: number) {
  if (!element) return fallback
  const bounds = element.getBoundingClientRect()
  return clamp((clientX - bounds.left) / bounds.width, 0, 1)
}
