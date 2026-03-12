'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
}

// Exact colors from reference animation
const COLORS = ['#00ffff', '#ff00ff', '#bfff00']

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    function resize() {
      if (!canvas) return
      const w = canvas.offsetWidth || canvas.parentElement?.clientWidth || window.innerWidth
      const h = canvas.offsetHeight || canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    function initParticles() {
      if (!canvas) return
      particles = []
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    function animate() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height

      // Trail effect: fill with semi-transparent dark to create comet tails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, w, h)

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = (1 - dist / 180) * 0.3
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    // setTimeout(0) defers until after layout, works across React Strict Mode double-mount
    const timerId = setTimeout(() => {
      resize()
      initParticles()
      animate()
    }, 0)

    const resizeObserver = new ResizeObserver(() => {
      resize()
      initParticles()
    })
    resizeObserver.observe(canvas)

    return () => {
      clearTimeout(timerId)
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
