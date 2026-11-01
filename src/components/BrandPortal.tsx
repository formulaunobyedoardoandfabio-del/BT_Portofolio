import { useEffect, useRef } from "react"
import { LOGO_URL } from "./Logo"

const SIZE = "min(110vw, 110vh)"
const OX = 0.555
const OY = 0.51

export default function BrandPortal() {
  const section = useRef<HTMLElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const copy = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => {
      const s = section.current
      if (!s) return
      const r = s.getBoundingClientRect()
      const p = Math.min(Math.max(-r.top / (s.offsetHeight - window.innerHeight), 0), 1)
      if (img.current) img.current.style.transform = `scale(${0.75 * Math.pow(110, p)}) rotate(${p * -6}deg)`
      if (copy.current) {
        copy.current.style.opacity = String(Math.max(1 - p * 5, 0))
        copy.current.style.transform = `translateY(${p * -120}px)`
      }
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
    <section ref={section} id="brand" className="relative h-[320vh] bg-paper">
      <div className="sticky top-0 h-screen overflow-hidden bg-paper">
        <img
          ref={img}
          src={LOGO_URL}
          alt="Logo B&T"
          draggable={false}
          className="absolute max-w-none select-none will-change-transform"
          style={{
            width: SIZE,
            height: SIZE,
            left: `calc(50% - ${OX} * ${SIZE})`,
            top: `calc(50% - ${OY} * ${SIZE})`,
            transformOrigin: `${OX * 100}% ${OY * 100}%`,
            filter: "grayscale(1) contrast(24)",
          }}
        />
        <div
          ref={copy}
          className="pointer-events-none absolute inset-x-0 bottom-10 flex items-end justify-between px-5 font-mono text-xs uppercase tracking-[0.3em] text-black md:px-10"
        >
          <span>( B&amp;T ) Il marchio</span>
          <span>Scorri per entrare ↓</span>
        </div>
      </div>
    </section>
  )
}
