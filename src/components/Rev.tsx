import { useEffect, useRef } from "react"

const polar = (a: number, r: number) => {
  const rad = (a * Math.PI) / 180
  return `${(50 + r * Math.cos(rad)).toFixed(2)} ${(50 + r * Math.sin(rad)).toFixed(2)}`
}
const arc = (a1: number, a2: number, r = 38) =>
  `M${polar(a1, r)} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${polar(a2, r)}`

export default function Rev() {
  const needle = useRef<SVGLineElement>(null)
  const txt = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let last = window.scrollY
    let vel = 0
    let raf = 0
    const tick = (now: number) => {
      const y = window.scrollY
      vel += (Math.min(Math.abs(y - last), 120) - vel) * 0.08
      last = y
      const kmh = Math.min(vel * 3.5, 330)
      const p = Math.min(kmh / 330 + Math.sin(now / 180) * 0.012, 1)
      needle.current?.setAttribute("transform", `rotate(${135 + Math.max(p, 0) * 270} 50 50)`)
      if (txt.current) txt.current.textContent = String(Math.round(kmh)).padStart(3, "0")
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[55] hidden h-24 w-24 items-center justify-center rounded-full bg-black/60 backdrop-blur sm:flex">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={arc(135, 270)} fill="none" stroke="#19e36b" strokeWidth="5" strokeLinecap="round" />
        <path d={arc(274, 338)} fill="none" stroke="#ffd400" strokeWidth="5" strokeLinecap="round" />
        <path d={arc(342, 405)} fill="none" stroke="#ff2a2a" strokeWidth="5" strokeLinecap="round" />
        <line ref={needle} x1="50" y1="50" x2="82" y2="50" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" transform="rotate(135 50 50)" />
        <circle cx="50" cy="50" r="4" fill="#fff" />
      </svg>
      <div className="relative mt-9 text-center leading-none text-white">
        <span ref={txt} className="font-mono text-sm tabular-nums">
          000
        </span>
        <span className="block font-mono text-[8px] uppercase tracking-widest text-white/60">km/h</span>
      </div>
    </div>
  )
}
