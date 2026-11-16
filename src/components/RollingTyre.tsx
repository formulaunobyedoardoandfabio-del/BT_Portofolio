import { useEffect, useRef } from "react"

function TyreSvg() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <circle cx="100" cy="100" r="98" fill="#111" stroke="#333" strokeWidth="2" />
      {Array.from({ length: 28 }, (_, i) => (
        <rect key={i} x="97" y="2" width="6" height="14" rx="2" fill="#2b2b2b" transform={`rotate(${i * (360 / 28)} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="72" fill="#181818" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="#ffd400" strokeWidth="5" strokeDasharray="60 18" />
      <circle cx="100" cy="100" r="52" fill="#d8d8d8" />
      <circle cx="100" cy="100" r="46" fill="#9a9a9a" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="94" y="56" width="12" height="40" rx="5" fill="#222" transform={`rotate(${i * 72} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="11" fill="#ffd400" />
      <circle cx="100" cy="100" r="4" fill="#111" />
    </svg>
  )
}

const WORD = "text-[clamp(3.5rem,15vw,15rem)] font-black uppercase leading-[0.9] font-display"

export default function RollingTyre() {
  const section = useRef<HTMLElement>(null)
  const tyre = useRef<HTMLDivElement>(null)
  const wheel = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const skid = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => {
      const s = section.current
      const t = tyre.current
      if (!s || !t) return
      const r = s.getBoundingClientRect()
      const p = Math.min(Math.max(-r.top / (s.offsetHeight - window.innerHeight), 0), 1)
      const size = t.offsetWidth
      const vw = window.innerWidth
      const x = p * (vw + size) - size
      const cx = x + size / 2
      t.style.transform = `translateX(${x}px)`
      if (wheel.current) wheel.current.style.transform = `rotate(${(x / (size / 2)) * (180 / Math.PI)}deg)`
      if (fill.current) fill.current.style.clipPath = `inset(0 ${Math.max(100 - (cx / vw) * 100, 0)}% 0 0)`
      if (skid.current) skid.current.style.width = `${Math.max(cx, 0)}px`
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
    <section ref={section} className="relative h-[220vh]" aria-label="Piede a fondo">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-x-0 top-[14%] px-5 md:px-10">
          <div className="relative">
            <div className={`${WORD} text-white/[0.07]`}>
              Piede
              <br />a fondo
            </div>
            <div ref={fill} className={`${WORD} absolute inset-0 text-foreground`} style={{ clipPath: "inset(0 100% 0 0)" }}>
              Piede
              <br />
              <span className="text-accent">a fondo</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[66%]">
          <div
            ref={tyre}
            className="absolute left-0 top-0 aspect-square will-change-transform"
            style={{ width: "clamp(150px, 26vw, 300px)" }}
          >
            <div ref={wheel} className="h-full w-full">
              <TyreSvg />
            </div>
          </div>
          <div
            ref={skid}
            className="absolute left-0 h-2 rounded-full"
            style={{
              top: "clamp(150px, 26vw, 300px)",
              background: "linear-gradient(90deg,#1f4bff,#8a3dff,#ff2a2a,#ffd400,#19e36b)",
            }}
          />
        </div>
      </div>
    </section>
  )
}
