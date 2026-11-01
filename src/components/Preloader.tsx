import { useEffect, useRef, useState } from "react"
import Logo from "./Logo"

type ContentProps = { lit: number; out: boolean; time: string }

function Content({ lit, out, time }: ContentProps) {
  return (
    <div className="absolute inset-x-0 top-0 flex h-screen flex-col items-center justify-center bg-black text-white">
      <div className="relative flex flex-col items-center">
        <div
          className="flex gap-3 rounded-2xl border border-white/15 bg-[#0c0c0c] p-4 transition-opacity duration-300 sm:gap-5 sm:p-6"
          style={{ opacity: out ? 0 : 1 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3 sm:gap-5">
              {[0, 1].map((j) => (
                <span
                  key={j}
                  className="block h-8 w-8 rounded-full transition-all duration-150 sm:h-14 sm:w-14"
                  style={{
                    background: i < lit ? "#ff2a2a" : "#1d1d1d",
                    boxShadow: i < lit ? "0 0 28px 6px rgba(255,42,42,0.7)" : "inset 0 0 0 2px #2a2a2a",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div
          className="mt-8 font-mono text-2xl tabular-nums tracking-widest transition-colors sm:text-4xl"
          style={{ color: out ? "#19e36b" : "#8d8b85" }}
        >
          {time}
        </div>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-[62%] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:w-56"
          style={{ opacity: out ? 1 : 0, transform: `translate(-50%, -62%) scale(${out ? 1 : 0.4})` }}
        >
          <Logo tone="light" className="h-full w-full" />
        </div>
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          {out ? "Via!" : "Clicca per saltare"}
        </div>
      </div>
    </div>
  )
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState(0)
  const [out, setOut] = useState(false)
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)
  const [ms, setMs] = useState(0)
  const skip = useRef<() => void>(() => {})
  const outAt = useRef(0)

  useEffect(() => {
    const seen = sessionStorage.getItem("bt-seen") === "1"
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const step = reduce ? 0 : seen ? 110 : 380
    const hold = seen || reduce ? 250 : 650
    const wait = seen || reduce ? 300 : 700
    const timers: number[] = []
    const at = (fn: () => void, t: number) => timers.push(window.setTimeout(fn, t))

    const finish = () => {
      setOpen(true)
      onDone()
      sessionStorage.setItem("bt-seen", "1")
      at(() => setGone(true), 1100)
    }
    const tOut = 250 + 5 * step + hold
    for (let i = 1; i <= 5; i++) at(() => setLit(i), 250 + i * step)
    at(() => {
      outAt.current = performance.now()
      setOut(true)
    }, tOut)
    at(finish, tOut + wait)

    skip.current = () => {
      timers.forEach(clearTimeout)
      timers.length = 0
      setLit(5)
      if (!outAt.current) outAt.current = performance.now()
      setOut(true)
      finish()
    }
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  useEffect(() => {
    if (!out || open) return
    let raf = 0
    const tick = () => {
      setMs(performance.now() - outAt.current)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [out, open])

  if (gone) return null

  const s = Math.floor(ms / 1000)
  const time = `0:${String(s).padStart(2, "0")}.${String(Math.floor(ms % 1000)).padStart(3, "0")}`
  const ease = "transform 1000ms cubic-bezier(0.76,0,0.24,1)"

  return (
    <div className="fixed inset-0 z-[200]" onClick={() => !open && skip.current()} role="presentation">
      <div
        className="absolute inset-x-0 top-0 h-1/2 overflow-hidden"
        style={{ transform: open ? "translateY(-100%)" : "none", transition: ease }}
      >
        <Content lit={lit} out={out} time={time} />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
        style={{ transform: open ? "translateY(100%)" : "none", transition: ease }}
      >
        <div className="absolute inset-x-0 bottom-0 h-screen">
          <Content lit={lit} out={out} time={time} />
        </div>
      </div>
    </div>
  )
}
