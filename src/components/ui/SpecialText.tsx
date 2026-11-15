import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>_"

/**
 * Testo in "modalità codice": quando entra nello schermo i caratteri scorrono
 * a caso e si fissano uno dopo l'altro sul testo vero. Al passaggio del mouse riparte.
 */
export default function SpecialText({
  children,
  className,
  speed = 28,
}: {
  children: string
  className?: string
  /** Millisecondi tra un fotogramma e l'altro. */
  speed?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [out, setOut] = useState(children)
  const timer = useRef(0)

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    window.clearInterval(timer.current)
    let frame = 0
    const total = children.length
    timer.current = window.setInterval(() => {
      frame++
      const fixed = Math.floor(frame / 2)
      setOut(
        children
          .split("")
          .map((c, i) => (c === " " || i < fixed ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      )
      if (fixed >= total) window.clearInterval(timer.current)
    }, speed)
  }

  useEffect(() => {
    setOut(children)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)} onMouseEnter={run} aria-label={children}>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}
