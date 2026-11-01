import { useEffect, useRef, useState, type MouseEvent } from "react"
import { createPortal } from "react-dom"
import { PROJECTS } from "../lib/config"
import { IconArrowUpRight } from "./Icons"

type Project = (typeof PROJECTS)[number]
type Open = { p: Project; rect: DOMRect }

const bg = (hue: number, x = "50%", y = "50%") =>
  `radial-gradient(circle at ${x} ${y}, hsl(${hue} 90% 60% / 0.55), hsl(${hue} 60% 12%) 70%)`

function Card({ p, onOpen }: { p: Project; onOpen: (p: Project, r: DOMRect) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`)
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`)
  }
  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      data-cursor="Apri"
      onMouseMove={move}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = ""
      }}
      onClick={() => {
        const el = ref.current
        if (!el) return
        el.style.transform = ""
        onOpen(p, el.getBoundingClientRect())
      }}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && ref.current) onOpen(p, ref.current.getBoundingClientRect())
      }}
      className="group relative flex h-[62vh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-border p-8 transition-transform duration-300 ease-out md:w-[44vw] lg:h-[68vh]"
      style={{ background: bg(p.hue, "var(--gx,50%)", "var(--gy,50%)") }}
    >
      <div className="flex items-start justify-between font-mono text-xs uppercase tracking-widest">
        <span>{p.tag}</span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-500 group-hover:rotate-45">
          <IconArrowUpRight size={22} />
        </span>
      </div>
      <div>
        <div className="font-display text-[9rem] font-black leading-none text-foreground/15 transition-transform duration-500 group-hover:-translate-y-3 md:text-[12rem]">
          {p.n}
        </div>
        <h3 className="font-display text-3xl font-bold uppercase md:text-5xl">{p.title}</h3>
      </div>
    </div>
  )
}

function Detail({ open, expanded, onClose }: { open: Open; expanded: boolean; onClose: () => void }) {
  const { p, rect } = open
  const show = { opacity: expanded ? 1 : 0, transition: `opacity 500ms ease ${expanded ? 450 : 0}ms` }
  return createPortal(
    <div
      className="fixed z-[150] overflow-hidden text-white"
      style={{
        left: expanded ? 0 : rect.left,
        top: expanded ? 0 : rect.top,
        width: expanded ? "100vw" : rect.width,
        height: expanded ? "100vh" : rect.height,
        borderRadius: expanded ? 0 : 24,
        background: bg(p.hue),
        transition: "all 700ms cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      <div className="relative flex h-full w-full flex-col justify-between p-6 md:p-12" style={show}>
        <div className="flex items-start justify-between font-mono text-xs uppercase tracking-widest">
          <span>{p.tag}</span>
          <button
            onClick={onClose}
            data-cursor="Chiudi"
            aria-label="Chiudi"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-black transition-transform hover:rotate-90"
          >
            ✕
          </button>
        </div>
        <div>
          <div className="font-display text-[clamp(6rem,24vw,20rem)] font-black leading-none text-white/15">{p.n}</div>
          <h3 className="font-display text-[clamp(2.2rem,7vw,6rem)] font-black uppercase leading-none">{p.title}</h3>
          <p className="mt-6 max-w-xl text-lg text-white/80">{p.desc}</p>
          <a
            href={p.href}
            data-cursor="Vai"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-mono text-sm uppercase tracking-widest text-black"
          >
            {p.cta} <IconArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function Work() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Open | null>(null)
  const [expanded, setExpanded] = useState(false)

  const openCard = (p: Project, rect: DOMRect) => {
    setOpen({ p, rect })
    requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(true)))
  }
  const close = () => {
    setExpanded(false)
    setTimeout(() => setOpen(null), 700)
  }

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const key = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", key)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", key)
    }
  }, [open])

  useEffect(() => {
    const on = () => {
      const s = section.current
      const t = track.current
      if (!s || !t) return
      if (window.innerWidth < 1000) {
        t.style.transform = ""
        return
      }
      const r = s.getBoundingClientRect()
      const total = s.offsetHeight - window.innerHeight
      const p = Math.min(Math.max(-r.top / total, 0), 1)
      const max = t.scrollWidth - window.innerWidth
      t.style.transform = `translate3d(${-p * max}px,0,0)`
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
    <section ref={section} id="work" className="relative lg:h-[400vh]">
      <div className="py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div className="mb-10 flex items-end justify-between px-5 md:px-10">
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-none">
            Lavori<span className="text-accent">.</span>
          </h2>
          <p className="hidden font-mono text-xs uppercase tracking-widest text-muted md:block">Scorri →</p>
        </div>
        <div
          ref={track}
          className="flex flex-col gap-6 px-5 will-change-transform md:px-10 lg:w-max lg:flex-row lg:gap-8"
        >
          {PROJECTS.map((p) => (
            <Card key={p.n} p={p} onOpen={openCard} />
          ))}
        </div>
      </div>
      {open && <Detail open={open} expanded={expanded} onClose={close} />}
    </section>
  )
}
