import { useEffect, useRef } from "react"
import { cn } from "../../lib/utils"

const RAMP = " .,:;-~=+*o#%@"

/**
 * Sfondo di caratteri: una griglia di glifi la cui densità segue onde lente.
 * Tre "forme" (cerchi morbidi) attraversano il campo con un colore proprio e,
 * se interattivo, il mouse accende un bagliore attorno a sé.
 * I caratteri usano il colore del testo (`currentColor`) del contenitore.
 */
export function GlyphBackground({
  className,
  glowColor = "#ffd400",
  shapeColor = "#1f4bff",
  fontSize = 12,
  interactive = true,
}: {
  className?: string
  glowColor?: string
  shapeColor?: string
  fontSize?: number
  interactive?: boolean
}) {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = root.current
    const cv = canvas.current
    const ctx = cv?.getContext("2d")
    if (!el || !cv || !ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches

    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let color = "#fff"
    const cw = fontSize * 0.62
    const ch = fontSize * 1.15
    const mouse = { x: -9999, y: -9999, a: 0 }
    let raf = 0
    let visible = true
    let last = 0

    const resize = () => {
      const r = cv.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / cw)
      rows = Math.ceil(h / ch)
      color = getComputedStyle(cv).color
      ctx.font = `500 ${fontSize}px "DM Mono", ui-monospace, monospace`
      ctx.textBaseline = "top"
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const shapes = [
        { x: w * (0.5 + 0.38 * Math.sin(t * 0.00011)), y: h * (0.5 + 0.3 * Math.cos(t * 0.00017)), r: Math.min(w, h) * 0.28 },
        { x: w * (0.5 + 0.42 * Math.cos(t * 0.00008 + 2)), y: h * (0.5 + 0.35 * Math.sin(t * 0.00013 + 1)), r: Math.min(w, h) * 0.2 },
      ]
      const glowR = 160
      for (let j = 0; j < rows; j++) {
        const y = j * ch
        for (let i = 0; i < cols; i++) {
          const x = i * cw
          const v =
            0.5 +
            0.25 * Math.sin(i * 0.12 + t * 0.0009) +
            0.25 * Math.cos(j * 0.17 - t * 0.0007 + Math.sin(i * 0.05))
          let inShape = 0
          for (const s of shapes) {
            const d = Math.hypot(x - s.x, y - s.y)
            if (d < s.r) inShape = Math.max(inShape, 1 - d / s.r)
          }
          const md = Math.hypot(x - mouse.x, y - mouse.y)
          const glow = md < glowR ? (1 - md / glowR) * mouse.a : 0
          const level = Math.min(1, v * 0.55 + inShape * 0.6 + glow * 0.8)
          const c = RAMP[Math.floor(level * (RAMP.length - 1))]
          if (c === " ") continue
          if (glow > 0.15) {
            ctx.fillStyle = glowColor
            ctx.globalAlpha = 0.35 + glow * 0.65
          } else if (inShape > 0.05) {
            ctx.fillStyle = shapeColor
            ctx.globalAlpha = 0.25 + inShape * 0.6
          } else {
            ctx.fillStyle = color
            ctx.globalAlpha = 0.1 + level * 0.25
          }
          ctx.fillText(c, x, y)
        }
      }
      ctx.globalAlpha = 1
    }

    const frame = (t: number) => {
      raf = 0
      if (!visible) return
      // ~20 fps bastano per un movimento così lento e tengono basso il costo di fillText
      if (t - last > 50) {
        mouse.a += ((mouse.x > -999 ? 1 : 0) - mouse.a) * 0.15
        draw(t)
        last = t
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!raf && visible && !reduce) raf = requestAnimationFrame(frame)
    }

    resize()
    draw(0)
    start()

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      start()
    })
    io.observe(el)

    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const leave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    if (interactive && fine && !reduce) {
      window.addEventListener("pointermove", move, { passive: true })
      el.addEventListener("pointerleave", leave)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    }
  }, [fontSize, glowColor, shapeColor, interactive])

  return (
    <div ref={root} aria-hidden="true" className={cn("pointer-events-none overflow-hidden", className)}>
      <canvas ref={canvas} className="h-full w-full" />
    </div>
  )
}

export default GlyphBackground
