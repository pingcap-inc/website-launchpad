import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion'

const Grid: React.FC = () => {
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
      {[
        14.3574, 27.7139, 41.0713, 54.4287, 67.7861, 81.1426, 94.5, 107.857, 121.214, 134.571,
        147.929, 161.285, 174.643,
      ].map((x) => (
        <path key={x} d={`M${x} 85.3052L${x} 1`} stroke="#E3E6E9" strokeWidth="0.5" />
      ))}
      {[22, 32, 43, 54, 54, 65, 75].map((y, index) => (
        <path key={`${y}-${index}`} d={`M188 ${y}H0`} stroke="#E3E6E9" strokeWidth="0.5" />
      ))}
    </g>
  )
}

export const CompatibleLine: React.FC = () => {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8F9FA' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 188 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <Grid />

          <g
            aria-label="Animated compatible connector"
            style={{
              transformOrigin: '94.25px 38.5px',
              rotate: interpolate(
                frame,
                [0, 24, 56, 78, 112, 140, 179],
                ['0deg', '0deg', '-5deg', '4deg', '-2deg', '0deg', '0deg'],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.bezier(0.65, 0, 0.35, 1),
                }
              ),
              scale: interpolate(
                frame,
                [0, 24, 50, 70, 92, 116, 140, 179],
                [1, 1, 1.055, 0.965, 1.045, 0.985, 1, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                }
              ),
            }}
          >
            <path
              d="M27.5 65.5L94.25 38.5"
              stroke="#DC150B"
              strokeWidth="6"
              style={{
                translate: interpolate(
                  frame,
                  [0, 24, 56, 78, 112, 126, 140, 179],
                  [
                    '0px 0px',
                    '0px 0px',
                    '-15px 6.067px',
                    '-15px 6.067px',
                    '1.4px -0.566px',
                    '-0.45px 0.182px',
                    '0px 0px',
                    '0px 0px',
                  ],
                  {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.bezier(0.65, 0, 0.35, 1),
                  }
                ),
              }}
            />
            <path
              d="M94.25 38.5L161 11.5"
              stroke="#DC150B"
              strokeWidth="6"
              style={{
                translate: interpolate(
                  frame,
                  [0, 24, 56, 78, 112, 126, 140, 179],
                  [
                    '0px 0px',
                    '0px 0px',
                    '15px -6.067px',
                    '15px -6.067px',
                    '-1.4px 0.566px',
                    '0.45px -0.182px',
                    '0px 0px',
                    '0px 0px',
                  ],
                  {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.bezier(0.65, 0, 0.35, 1),
                  }
                ),
              }}
            />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  )
}
