import { useEffect, useRef } from "react"
import { LOGO_H, LOGO_PATH, LOGO_VIEWBOX, LOGO_W } from "../lib/logo"

const RATIO = (LOGO_W / LOGO_H).toFixed(4)

// Il logo è vettoriale: lo zoom resta nitido fino a riempire lo schermo.
// Il punto di zoom (OX, OY) cade dentro l'asta della T, così lo schermo diventa nero
// e la sezione successiva (Instagram, su fondo nero) entra senza stacchi.
const SIZE = "min(58vw, 58vh)"
const OX = 0.62
const OY = 0.62

export default function BrandPortal() {
  const section = useRef<HTMLElement>(null)
  const logo = useRef<SVGSVGElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => {
      const s = section.current
      if (!s) return
      const r = s.getBoundingClientRect()
      const p = Math.min(Math.max(-r.top / (s.offsetHeight - window.innerHeight), 0), 1)
      const e = p * p * (3 - 2 * p)
      if (logo.current) logo.current.style.transform = `scale(${Math.pow(160, e)}) rotate(${e * -8}deg)`
      if (copy.current) {
        copy.current.style.opacity = String(Math.max(1 - p * 4, 0))
        copy.current.style.transform = `translateY(${p * -120}px)`
      }
      if (title.current) {
        title.current.style.opacity = String(Math.max(1 - p * 3, 0))
        title.current.style.transform = `translateY(${p * -40}vh)`
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
    <section ref={section} id="brand" className="relative h-[300vh] bg-paper" aria-label="Il marchio B&T">
      <div className="sticky top-0 h-screen overflow-hidden bg-paper text-black">
        <div
          ref={title}
          className="pointer-events-none absolute inset-x-0 top-24 z-10 px-5 font-display text-[clamp(1rem,1.7vw,1.5rem)] font-medium uppercase leading-tight md:left-auto md:top-28 md:right-10 md:max-w-sm md:px-0 md:text-right"
        >
          <span className="block font-mono text-xs tracking-[0.3em] text-black/50">( B&amp;T ) Il marchio</span>
          <span className="mt-4 block">Una B spezzata e una T in corsa. Pensato per muoversi.</span>
        </div>
        <svg
          ref={logo}
          viewBox={LOGO_VIEWBOX}
          aria-hidden="true"
          className="absolute will-change-transform"
          style={{
            width: `calc(${SIZE} * ${RATIO})`,
            height: SIZE,
            left: `calc(50% - ${OX} * ${SIZE} * ${RATIO})`,
            top: `calc(50% - ${OY} * ${SIZE})`,
            transformOrigin: `${OX * 100}% ${OY * 100}%`,
            color: "var(--background)",
          }}
        >
          <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
        </svg>
        <div
          ref={copy}
          className="pointer-events-none absolute inset-x-0 bottom-10 flex items-end justify-between px-5 font-mono text-xs uppercase tracking-[0.3em] text-black md:px-10"
        >
          <span>Logo / B&amp;T</span>
          <span>Scorri per entrare ↓</span>
        </div>
      </div>
    </section>
  )
}
