const COLORS = ["#ffd400", "#1f4bff", "#8a3dff", "#ff2a2a", "#19e36b", "#ffffff"]

export function burst(x: number, y: number, count = 24, power = 1) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  const c = document.createElement("canvas")
  c.width = window.innerWidth
  c.height = window.innerHeight
  Object.assign(c.style, { position: "fixed", inset: "0", pointerEvents: "none", zIndex: "150" })
  document.body.appendChild(c)
  const ctx = c.getContext("2d")!
  const ps = Array.from({ length: count }, () => {
    const a = Math.random() * Math.PI * 2
    const s = (4 + Math.random() * 9) * power
    return {
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 4 * power,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      w: 5 + Math.random() * 7,
      h: 3 + Math.random() * 5,
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
    }
  })
  const start = performance.now()
  const tick = (now: number) => {
    const t = (now - start) / 1100
    ctx.clearRect(0, 0, c.width, c.height)
    if (t >= 1) {
      c.remove()
      return
    }
    for (const p of ps) {
      p.vy += 0.35
      p.vx *= 0.985
      p.x += p.vx
      p.y += p.vy
      p.r += p.vr
      ctx.save()
      ctx.globalAlpha = 1 - t * t
      ctx.translate(p.x, p.y)
      ctx.rotate(p.r)
      ctx.fillStyle = p.col
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
