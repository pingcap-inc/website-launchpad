import React from 'react'
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const COLORS = {
  background: '#F8F9FA',
  grid: '#E3E6E9',
  line: '#B7B7B7',
  red: '#DC150B',
  blue: '#509DEA',
  cyan: '#50DBD9',
}

const fadeWindow = (frame: number) =>
  interpolate(frame, [0, 8, 137, 149], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  })

const Node: React.FC<{
  x: number
  color: string
  delay: number
  pulse?: boolean
  size?: number
}> = ({ x, color, delay, pulse = false, size = 5.5 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 150, mass: 0.7 },
    durationInFrames: 22,
  })
  const pulseProgress = interpolate(frame, [delay + 2, delay + 27], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  return (
    <g
      opacity={fadeWindow(frame)}
      style={{
        translate: `${x}px 42.5px`,
        scale: entrance,
        transformBox: 'fill-box',
        transformOrigin: 'center',
      }}
    >
      {pulse ? (
        <circle
          r={size + 10 * pulseProgress}
          fill="none"
          stroke={color}
          strokeWidth={1.2}
          opacity={(1 - pulseProgress) * 0.5}
        />
      ) : null}
      <circle r={size + 2.5} fill={color} opacity={0.12} />
      <circle r={size} fill={color} />
    </g>
  )
}

export const DeployScale: React.FC = () => {
  const frame = useCurrentFrame()
  const centerDrop = spring({
    frame: frame - 7,
    fps: 30,
    config: { damping: 15, stiffness: 145, mass: 0.75 },
    durationInFrames: 24,
  })
  const coreOpacity = interpolate(frame, [5, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const firstLinks = interpolate(frame, [23, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })
  const expansion = interpolate(frame, [70, 104], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })
  const shimmer = interpolate(frame % 54, [0, 16, 25, 54], [0, 0, 0.65, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const overallOpacity = fadeWindow(frame)

  const verticals = Array.from({ length: 13 }, (_, index) => 14.357 + index * 13.357)
  const horizontals = [11, 22, 32, 43, 54, 65, 75]

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <svg
        viewBox="0 0 188 86"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        aria-label="Deploy and scale network animation"
      >
        <rect
          x={0.25}
          y={0.25}
          width={187.5}
          height={85.5}
          fill={COLORS.background}
          stroke={COLORS.grid}
          strokeWidth={0.5}
        />
        <g opacity={0.95}>
          {verticals.map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1={1}
              x2={x}
              y2={85.3}
              stroke={COLORS.grid}
              strokeWidth={0.5}
            />
          ))}
          {horizontals.map((y) => (
            <line
              key={`h-${y}`}
              x1={0}
              y1={y}
              x2={188}
              y2={y}
              stroke={COLORS.grid}
              strokeWidth={0.5}
            />
          ))}
        </g>

        <g opacity={overallOpacity}>
          <line
            x1={94.5 - 27 * firstLinks}
            y1={42.5}
            x2={94.5 + 27 * firstLinks}
            y2={42.5}
            stroke={COLORS.line}
            strokeWidth={1}
            strokeLinecap="round"
          />
          <line
            x1={67.5 - 29.5 * expansion}
            y1={42.5}
            x2={121.5 + 29.5 * expansion}
            y2={42.5}
            stroke={COLORS.line}
            strokeWidth={1}
            strokeLinecap="round"
            opacity={expansion}
          />
          <line
            x1={67.5 - 29.5 * expansion}
            y1={42.5}
            x2={121.5 + 29.5 * expansion}
            y2={42.5}
            stroke="white"
            strokeWidth={1.3}
            strokeLinecap="round"
            opacity={shimmer * expansion}
            strokeDasharray="5 120"
            strokeDashoffset={-frame * 1.7}
          />
        </g>

        <g
          opacity={coreOpacity * overallOpacity}
          style={{
            translate: `0px ${-15 * (1 - centerDrop)}px`,
            scale: centerDrop,
            transformBox: 'fill-box',
            transformOrigin: '94.5px 42.5px',
          }}
        >
          <circle cx={94.5} cy={42.5} r={13} fill={COLORS.blue} opacity={0.08} />
          <circle cx={94.5} cy={42.5} r={9} fill={COLORS.blue} opacity={0.12} />
          <circle cx={94.5} cy={42.5} r={5.5} fill={COLORS.blue} />
        </g>

        <Node x={67.5} color={COLORS.red} delay={35} pulse />
        <Node x={121.5} color={COLORS.cyan} delay={44} pulse />
        <Node x={38} color={COLORS.red} delay={82} size={4.5} pulse />
        <Node x={151} color={COLORS.cyan} delay={94} size={4.5} pulse />
      </svg>
    </AbsoluteFill>
  )
}
