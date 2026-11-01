import { useEffect, useRef, useState } from "react"
import Reveal from "./Reveal"

const TEXT =
  "Siamo B&T, un duo che trasforma idee in app e contenuti che si fanno notare. Disegniamo interfacce, costruiamo prodotti e raccontiamo tutto su Instagram. Ogni dettaglio si muove con uno scopo."

const STATS: [number, string, string][] = [
  [1, "App su Google Play", ""],
  [24, "Progetti creati", "+"],
  [100, "Passione per i dettagli", "%"],
]

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const s = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - s) / 1600, 1)
        setV(Math.round((1 - Math.pow(1 - p, 3)) * to))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const [lit, setLit] = useState(0)
  const words = TEXT.split(" ")

  useEffect(() => {
    const on = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0), 1)
      setLit(Math.round(p * words.length))
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
    }
  }, [words.length])

  return (
    <section id="about" className="bg-brand-blue px-5 py-32 md:px-10 md:py-48">
      <Reveal>
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.3em] text-accent">( 01 ) Chi siamo</p>
      </Reveal>
      <p
        ref={ref}
        className="max-w-6xl font-display text-[clamp(1.6rem,4.2vw,4rem)] font-medium leading-[1.2]"
      >
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-block pr-[0.28em] transition-colors duration-300"
            style={{ color: i < lit ? "var(--foreground)" : "rgba(242,240,234,0.3)" }}
          >
            {w}
          </span>
        ))}
      </p>
      <div className="mt-24 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
        {STATS.map(([n, l, s], i) => (
          <Reveal key={l} delay={i * 120}>
            <div className="font-display text-6xl font-black text-accent md:text-8xl">
              <Counter to={n} suffix={s} />
            </div>
            <div className="mt-3 font-mono text-xs uppercase tracking-widest text-white/75">{l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
