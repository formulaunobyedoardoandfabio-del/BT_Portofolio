import { useEffect, useRef, useState } from "react"
import { REELS } from "../lib/config"
import { IconInstagram, IconPlay } from "./Icons"
import SpinningCounter from "./SpinningCounter"

const TONES = [
  "from-brand-yellow to-brand-red",
  "from-brand-blue to-brand-purple",
  "from-brand-purple to-brand-red",
  "from-brand-green to-brand-blue",
  "from-brand-red to-brand-yellow",
  "from-white to-brand-blue",
]

export default function ReelStack() {
  const wrap = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const [current, setCurrent] = useState(0)
  const N = REELS.length

  useEffect(() => {
    const on = () => {
      const w = wrap.current
      if (!w) return
      const H = w.offsetHeight / N
      if (!H) return
      const raw = -w.getBoundingClientRect().top / H
      const u = Number.isFinite(raw) ? Math.min(Math.max(raw, 0), N - 1) : 0
      cards.current.forEach((c, i) => {
        if (!c) return
        const k = Math.max(u - i, 0)
        const side = i % 2 ? 1 : -1
        const scale = 1 - Math.min(k, 4) * 0.05
        const rot = side * (2 + (i % 3)) * (1 - Math.min(k, 1) * 0.4) + side * k * 1.2
        c.style.transform = `translate3d(${side * (14 + k * 10)}px, ${-k * 18}px, 0) rotate(${rot}deg) scale(${scale})`
        c.style.filter = `brightness(${Math.max(1 - k * 0.22, 0.35)})`
      })
      setCurrent(Math.min(Math.round(u), N - 1))
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
    }
  }, [N])

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return
      if (i === current) v.play().catch(() => {})
      else v.pause()
    })
  }, [current])

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(320px,440px)] lg:gap-20">
      <div className="lg:sticky lg:top-[14vh] lg:h-fit lg:self-start">
        <div className="font-display font-black text-brand-yellow">
          <SpinningCounter value={current + 1} cell={96} className="[--reel-stagger:0ms]" />
          <span className="ml-3 align-top font-mono text-sm text-muted">/ {String(N).padStart(2, "0")}</span>
        </div>
        <h3 className="mt-6 font-display text-3xl font-bold uppercase md:text-5xl">{REELS[current]?.title}</h3>
        <p className="mt-4 max-w-sm text-foreground/70">
          Un video sopra l&apos;altro, mentre scorri la pila cresce. Ogni reel arriva direttamente dal nostro Instagram.
        </p>
      </div>

      <div ref={wrap} style={{ height: `${N * 78}vh` }}>
        {REELS.map((r, i) => (
          <div key={r.id} className="sticky top-[10vh] flex h-[78vh] items-start justify-center" style={{ zIndex: i }}>
            <div
              ref={(el) => {
                cards.current[i] = el
              }}
              className="relative aspect-[9/16] h-[72vh] max-h-[760px] overflow-hidden rounded-[28px] border border-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] will-change-transform"
            >
              {r.src ? (
                <video
                  ref={(el) => {
                    videos.current[i] = el
                  }}
                  src={r.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${TONES[i % TONES.length]}`}>
                  <div className="absolute -right-10 top-10 h-52 w-52 rounded-full border-[28px] border-black/20" />
                  <div className="absolute -left-12 bottom-24 h-40 w-40 rounded-full border-[20px] border-white/30" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
                    <IconPlay size={32} />
                  </div>
                </div>
              )}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent p-5 font-mono text-xs uppercase tracking-widest text-white">
                <span>Reel {r.id}</span>
                <IconInstagram size={20} />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 font-display text-xl font-bold uppercase text-white">
                {r.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
