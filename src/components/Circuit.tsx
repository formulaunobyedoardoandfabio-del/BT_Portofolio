import { useEffect, useRef } from "react"

const D =
  "M20 55 C10 40 20 20 40 22 L70 22 C85 22 90 12 102 14 C115 18 112 36 98 40 L88 44 C78 50 86 62 70 64 L34 64 C26 64 22 60 20 55 Z"

export default function Circuit() {
  const base = useRef<SVGPathElement>(null)
  const prog = useRef<SVGPathElement>(null)
  const dot = useRef<SVGCircleElement>(null)
  const lap = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const p = Math.min(Math.max(window.scrollY / (h.scrollHeight - h.clientHeight || 1), 0), 1)
      const path = base.current
      if (!path) return
      const len = path.getTotalLength()
      prog.current?.setAttribute("stroke-dashoffset", String(1 - p))
      const pt = path.getPointAtLength(p * len)
      dot.current?.setAttribute("cx", String(pt.x))
      dot.current?.setAttribute("cy", String(pt.y))
      if (lap.current) lap.current.textContent = `${String(Math.round(p * 100)).padStart(2, "0")}%`
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[55] hidden h-24 w-32 items-center justify-center rounded-2xl bg-black/60 backdrop-blur sm:flex">
      <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden="true">
        <path ref={base} d={D} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" strokeLinejoin="round" />
        <path
          ref={prog}
          d={D}
          pathLength={1}
          fill="none"
          stroke="#ffd400"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <circle ref={dot} r="5" fill="#ff2a2a" stroke="#fff" strokeWidth="2" cx="20" cy="55" />
      </svg>
      <span ref={lap} className="absolute bottom-1 right-2 font-mono text-[10px] tracking-widest text-white/70">
        00%
      </span>
    </div>
  )
}
