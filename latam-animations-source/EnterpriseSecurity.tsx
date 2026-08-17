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

export const EnterpriseSecurity: React.FC = () => {
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

          <rect
            x="61"
            y="22"
            width="13"
            height="43"
            fill="#DC150B"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center bottom',
              scale: interpolate(
                frame,
                [8, 34, 50, 70, 90, 110, 130, 150, 170, 179],
                [
                  '1 0',
                  '1 1',
                  '0.992 1.008',
                  '1.04 1.055',
                  '1.018 1.025',
                  '0.992 1.008',
                  '1.04 1.055',
                  '1.018 1.025',
                  '0.992 1.008',
                  '1 1',
                ],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                }
              ),
              translate: interpolate(
                frame,
                [34, 50, 70, 90, 110, 130, 150, 170, 179],
                [
                  '0px 0px',
                  '0px 0px',
                  '0px -0.9px',
                  '0px -0.45px',
                  '0px 0px',
                  '0px -0.9px',
                  '0px -0.45px',
                  '0px 0px',
                  '0px 0px',
                ],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                }
              ),
            }}
          />
          <rect
            x="88"
            y="51"
            width="13"
            height="27"
            fill="#C76FF2"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center bottom',
              scale: interpolate(
                frame,
                [20, 46, 62, 82, 102, 122, 142, 162, 179],
                [
                  '1 0',
                  '1 1',
                  '0.992 1.008',
                  '1.04 1.055',
                  '1.018 1.025',
                  '0.992 1.008',
                  '1.04 1.055',
                  '1.018 1.025',
                  '1 1',
                ],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                }
              ),
              translate: interpolate(
                frame,
                [46, 62, 82, 102, 122, 142, 162, 179],
                [
                  '0px 0px',
                  '0px 0px',
                  '0px -0.9px',
                  '0px -0.45px',
                  '0px 0px',
                  '0px -0.9px',
                  '0px -0.45px',
                  '0px 0px',
                ],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                }
              ),
            }}
          />
          <rect
            x="114"
            y="8"
            width="13"
            height="43"
            fill="#1AA8A8"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center bottom',
              scale: interpolate(
                frame,
                [14, 40, 56, 76, 96, 116, 136, 156, 176, 179],
                [
                  '1 0',
                  '1 1',
                  '0.992 1.008',
                  '1.04 1.055',
                  '1.018 1.025',
                  '0.992 1.008',
                  '1.04 1.055',
                  '1.018 1.025',
                  '0.992 1.008',
                  '1 1',
                ],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                }
              ),
              translate: interpolate(
                frame,
                [40, 56, 76, 96, 116, 136, 156, 176, 179],
                [
                  '0px 0px',
                  '0px 0px',
                  '0px -0.9px',
                  '0px -0.45px',
                  '0px 0px',
                  '0px -0.9px',
                  '0px -0.45px',
                  '0px 0px',
                  '0px 0px',
                ],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                }
              ),
            }}
          />

          <g
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              scale: interpolate(
                frame,
                [48, 66, 82, 102, 116, 130, 146, 166, 179],
                [0, 1, 0.988, 1.045, 1.075, 1.018, 0.988, 1.045, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                  output: 'perceptual-scale',
                }
              ),
              translate: interpolate(
                frame,
                [66, 82, 102, 116, 130, 146, 166, 179],
                [
                  '0px 0px',
                  '0px 0px',
                  '0px -0.85px',
                  '0px -1.1px',
                  '0px -0.4px',
                  '0px 0px',
                  '0px -0.85px',
                  '0px 0px',
                ],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.inOut(Easing.sin),
                }
              ),
            }}
          >
            <circle cx="94.5" cy="31.5" r="13.5" fill="#2C80CE" />
            <path
              d="M89 31L93.4828 35L102 27"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="20"
              strokeDashoffset={interpolate(frame, [62, 82], [20, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.65, 0, 0.35, 1),
              })}
            />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  )
}
