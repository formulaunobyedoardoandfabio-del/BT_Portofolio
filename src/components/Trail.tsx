import { useEffect, useRef } from "react"

const COLORS = ["#ffd400", "#ff2a2a", "#8a3dff", "#1f4bff", "#19e36b"]

export default function Trail() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const canvas = ref.current
    if (!fine || reduce || !canvas) return
    const ctx = canvas.getContext("2d")!
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const pts: { x: number; y: number }[] = []
    let moved = false
    let raf = 0
    const move = (e: MouseEvent) => {
      pts.push({ x: e.clientX, y: e.clientY })
      if (pts.length > 26) pts.shift()
      moved = true
    }
    const tick = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (window.scrollY > window.innerHeight * 1.1) pts.length = 0
      if (!moved && pts.length) pts.shift()
      moved = false
      ctx.lineCap = "round"
      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length
        ctx.strokeStyle = COLORS[(Math.floor(i / 4 + now / 120)) % COLORS.length]
        ctx.globalAlpha = t
        ctx.lineWidth = t * 16
        ctx.beginPath()
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y)
        ctx.lineTo(pts[i].x, pts[i].y)
        ctx.stroke()
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("resize", resize)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[90] mix-blend-screen" />
}
