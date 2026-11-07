import { useEffect, useRef } from "react"

const WORDS = ["Formula 1", "App Android", "Instagram", "Design", "Motion", "UI / UX", "Brand"]

function Band({
  tone,
  rotate,
  reverse,
}: {
  tone: string
  rotate: number
  reverse?: boolean
}) {
  const track = useRef<HTMLDivElement>(null)
  const band = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let x = 0
    let dir = reverse ? -1 : 1
    const base = reverse ? -1 : 1
    let last = window.scrollY
    let vel = 0
    let raf = 0
    const tick = () => {
      const y = window.scrollY
      const d = y - last
      last = y
      if (d !== 0) dir = (d > 0 ? 1 : -1) * base
      vel += (Math.min(Math.abs(d), 80) - vel) * 0.1
      x -= (1.2 + vel * 0.6) * dir
      const el = track.current
      if (el) {
        const w = el.scrollWidth / 4
        while (x <= -w) x += w
        while (x > 0) x -= w
        el.style.transform = `translateX(${x}px)`
      }
      if (band.current) band.current.style.transform = `rotate(${rotate}deg) skewX(${-vel * 0.15 * dir}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [rotate, reverse])

  const row = WORDS.map((w, i) => (
    <span key={i} className="flex items-center gap-8 px-4">
      <span className={i % 2 ? "font-light italic opacity-80" : ""}>{w}</span>
      <span className="text-3xl">✦</span>
    </span>
  ))

  return (
    <div
      ref={band}
      className={`-mx-8 py-5 font-display text-4xl font-black uppercase md:text-6xl ${tone}`}
    >
      <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="relative">
        <Band tone="bg-brand-yellow text-black" rotate={-2} />
        <div className="-mt-10 opacity-95">
          <Band tone="bg-brand-blue text-white" rotate={2} reverse />
        </div>
        <div
          className="-mx-8 mt-6 h-12 -rotate-1 motion-safe:[animation:checker-slide_2s_linear_infinite]"
          style={{ background: "repeating-conic-gradient(#fff 0 25%, #000 0 50%) 0 0 / 48px 48px" }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
