import { useEffect, useRef, useState } from "react"
import SpinningCounter from "./SpinningCounter"
import { useFollowers } from "../hooks/useFollowers"
import { FOLLOWERS_ENDPOINT, INSTAGRAM_HANDLE } from "../lib/config"

export default function Followers() {
  const { count, live } = useFollowers()
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const [cell, setCell] = useState(96)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { threshold: 0.4 })
    io.observe(el)
    const size = () => setCell(Math.max(52, Math.min(150, window.innerWidth / 8)))
    size()
    window.addEventListener("resize", size)
    return () => {
      io.disconnect()
      window.removeEventListener("resize", size)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-purple/30 via-background to-brand-blue/30 p-6 md:p-12"
    >
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
        <span className="relative flex h-3 w-3">
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${live ? "bg-brand-green" : "bg-brand-red"}`}
            style={{ animation: "pulse-ring 2s ease-out infinite" }}
          />
          <span className={`relative inline-flex h-3 w-3 rounded-full ${live ? "bg-brand-green" : "bg-brand-red"}`} />
        </span>
        <span>{live ? "Live" : "Demo"}</span>
        <span className="text-muted">/ {INSTAGRAM_HANDLE}</span>
      </div>
      <div className="mt-8 font-display font-black text-accent">
        <SpinningCounter value={seen ? count : 0} cell={cell} />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest text-muted">
        <span>Follower su Instagram</span>
        <span>
          {FOLLOWERS_ENDPOINT ? "Aggiornato ogni 30 secondi" : "Valore dimostrativo, collega l'API in config.ts"}
        </span>
      </div>
    </div>
  )
}
