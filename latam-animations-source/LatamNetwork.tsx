import React from 'react'
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion'

const MAP_OUTLINE =
  '190,15 330,8 460,30 555,75 600,160 585,255 545,335 465,395 345,418 215,405 110,375 55,320 30,220 35,120 50,40 135,20'

const routes = [
  { d: 'M383.09 165.691L515.878 61.3998', delay: 0 },
  { d: 'M247.951 244.718L82.8477 326.388', delay: 32 },
  { d: 'M387.789 245.305L495.312 324.332', delay: 67 },
  { d: 'M249.126 178.911L67.5703 79.9078', delay: 103 },
]

const markers = [
  { x: 539.259, y: 49.1521, color: '#DC150B', delay: 0 },
  { x: 516.152, y: 340.152, color: '#50DBD9', delay: 18 },
  { x: 25.2649, y: 38.7788, color: '#2C80CE', delay: 36 },
  { x: 64.0423, y: 338.433, color: '#C76FF2', delay: 54 },
]

export const LatamNetwork: React.FC = () => {
  const frame = useCurrentFrame()
  const background = frame % 180
  const rings = frame % 120
  const cube = frame % 240
  return (
    <AbsoluteFill style={{ backgroundColor: '#08070B', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 625 424"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern
            id="map-hatch"
            width="60"
            height="34"
            patternUnits="userSpaceOnUse"
            patternTransform="skewY(-30)"
          >
            <path
              d="M60 0H0V34"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <polygon points={MAP_OUTLINE} fill="#0D3152" stroke="#FFFFFF" strokeOpacity="0.16" />
        <polygon points={MAP_OUTLINE} fill="url(#map-hatch)" />
        <circle
          cx={319.044}
          cy={211.521}
          r={211.521}
          fill="#E92B4F"
          opacity={interpolate(background, [0, 90, 179], [0.02, 0.1, 0.02])}
        />
        {routes.map(({ d, delay }) => (
          <path
            key={d}
            d={d}
            pathLength={100}
            fill="none"
            stroke="#F35048"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeDasharray="9 91"
            strokeDashoffset={interpolate((frame + delay) % 150, [0, 149], [0, -100])}
            filter="url(#glow)"
          />
        ))}
        <circle
          cx={319.045}
          cy={211.521}
          r={76.1}
          fill="none"
          stroke="#E92B4F"
          strokeWidth={1}
          opacity={interpolate(rings, [0, 60, 119], [0.1, 0.42, 0.1])}
        />
        <circle
          cx={319.045}
          cy={211.521}
          r={51.4}
          fill="none"
          stroke="white"
          strokeWidth={0.8}
          opacity={interpolate(rings, [0, 60, 119], [0.5, 0.18, 0.5])}
        />
        <g
          transform={`translate(319.045 211.521) rotate(${interpolate(cube, [0, 239], [0, 360], { easing: Easing.inOut(Easing.ease) })}) scale(${interpolate(frame % 60, [0, 30, 59], [1, 1.12, 1], { easing: Easing.inOut(Easing.ease) })}) translate(-319.045 -211.521)`}
        >
          <path
            d="M371.027 223.302L356.289 171.392L304.143 157.749L318.445 209.543L371.03 223.304Z"
            fill="#F35048"
          />
          <path
            d="M371.025 223.309L333.184 261.463L281.082 247.875L318.353 209.53L371.025 223.307Z"
            fill="#DC150B"
          />
          <path
            d="M281.083 247.877L318.383 209.53L304.217 157.757L266.477 196.195L281.083 247.875Z"
            fill="#87120C"
          />
        </g>
        {markers.map((m) => {
          const p = (frame + m.delay) % 90
          return (
            <circle
              key={`${m.x}-${m.y}`}
              cx={m.x}
              cy={m.y}
              r={interpolate(p, [0, 24, 54, 89], [3.4, 6.2, 4.3, 3.4])}
              fill={m.color}
              opacity={interpolate(p, [0, 22, 55, 89], [0.28, 1, 0.45, 0.28])}
              filter="url(#glow)"
            />
          )
        })}
      </svg>
    </AbsoluteFill>
  )
}
