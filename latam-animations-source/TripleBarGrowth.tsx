import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion'

const StaticGrid: React.FC = () => {
  return (
    <g aria-label="Static background grid">
      <rect
        x="0.25"
        y="0.25"
        width="187.5"
        height="85.5"
        fill="#F8F9FA"
        stroke="#E3E6E9"
        strokeWidth="0.5"
      />
      <path d="M188 11H0" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M14.3574 85.3052L14.3574 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M27.7148 85.3052L27.7148 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M41.0703 85.3052L41.0703 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M54.4297 85.3052L54.4297 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M67.7852 85.3052L67.7852 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M81.1426 85.3052L81.1426 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M94.5 85.3052L94.5 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M107.857 85.3052L107.857 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M121.215 85.3052L121.215 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M134.57 85.3052L134.57 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M147.93 85.3052L147.93 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M161.285 85.3052L161.285 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M174.643 85.3052L174.643 1" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M188 22H0" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M188 32H0" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M188 43H0" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M188 54H0" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M188 65H0" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M188 75H0" stroke="#E3E6E9" strokeWidth="0.5" />
    </g>
  )
}

const bars = [
  { x: 60, height: 58, color: '#DC150B', delay: 10 },
  { x: 90.5, height: 58, color: '#2C80CE', delay: 30 },
  { x: 121, height: 58, color: '#1AA8A8', delay: 50 },
]

export const TripleBarGrowth: React.FC = () => {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8F9FA' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 188 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <StaticGrid />

        {bars.map(({ x, height, color, delay }) => {
          const grow = interpolate(frame, [delay, delay + 24], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.back(1.6)),
          })
          const wobble = interpolate(
            frame,
            [delay + 24, delay + 50, delay + 76, delay + 102, 179],
            [1, 1.03, 0.99, 1.015, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.inOut(Easing.sin),
            }
          )
          return (
            <rect
              key={x}
              x={x}
              y={78 - height}
              width={13}
              height={height}
              fill={color}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
                scale: `1 ${grow * wobble}`,
              }}
            />
          )
        })}
      </svg>
    </AbsoluteFill>
  )
}
