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
      <path d="M188 54H0" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M188 65H0" stroke="#E3E6E9" strokeWidth="0.5" />
      <path d="M188 75H0" stroke="#E3E6E9" strokeWidth="0.5" />
    </g>
  )
}

export const TargetPulse: React.FC = () => {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8F9FA' }}>
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 188 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <StaticGrid />

          <path
            d="M33 44H156.483"
            stroke="#DC150B"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            style={{
              strokeDashoffset: interpolate(frame, [8, 42], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
          <path
            d="M95 13L95 75"
            stroke="#DC150B"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            style={{
              strokeDashoffset: interpolate(frame, [18, 52], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
          <circle
            cx="94.4849"
            cy="43.4834"
            r="26.3833"
            stroke="#2C80CE"
            strokeWidth="2"
            pathLength="1"
            strokeDasharray="1"
            style={{
              opacity: interpolate(frame, [34, 35, 77, 78], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              strokeDashoffset: interpolate(frame, [34, 78], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.65, 0, 0.35, 1),
              }),
              rotate: interpolate(frame, [34, 78], ['-90deg', '0deg'], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.65, 0, 0.35, 1),
              }),
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          />
          <circle
            cx="94.4849"
            cy="43.4834"
            r="26.3833"
            stroke="#2C80CE"
            strokeWidth="2"
            style={{
              opacity: interpolate(frame, [77, 78], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              scale: interpolate(
                frame,
                [78, 92, 108, 126, 146, 164, 179],
                [1, 1.035, 0.985, 1.025, 0.99, 1.012, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                  output: 'perceptual-scale',
                }
              ),
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          />
          <circle
            cx="94.4852"
            cy="42.45"
            r="13.95"
            fill="#DC150B"
            fillOpacity="0.3"
            style={{
              scale: interpolate(
                frame,
                [60, 78, 92, 108, 126, 146, 164, 179],
                [0, 1.08, 0.96, 1, 1.055, 0.975, 1.025, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                  output: 'perceptual-scale',
                }
              ),
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          />
        </svg>
      </div>
    </AbsoluteFill>
  )
}
