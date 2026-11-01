import { useEffect, useId, useRef } from "react"

const SPINS = 2
const DIGITS = Array.from({ length: (SPINS + 1) * 10 }, (_, i) => i % 10)

function readVar(name: string) {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0
}

function Col({ digit, index }: { digit: number; index: number }) {
  const strip = useRef<HTMLDivElement>(null)
  const blur = useRef<SVGFEGaussianBlurElement>(null)
  const prev = useRef(0)
  const fid = useId().replace(/:/g, "")

  useEffect(() => {
    const el = strip.current
    if (!el) return
    const from = prev.current
    prev.current = digit
    if (from === digit && digit === 0) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transition = "none"
      el.style.transform = `translateY(calc(var(--reel-cell) * ${-digit}))`
      return
    }

    el.style.transition = "none"
    el.style.transform = `translateY(calc(var(--reel-cell) * ${-from}))`
    void el.offsetHeight
    el.style.transition = `transform var(--reel-dur) var(--reel-ease) calc(var(--reel-stagger) * ${index})`
    el.style.transform = `translateY(calc(var(--reel-cell) * ${-(SPINS * 10 + digit)}))`

    const dur = readVar("--reel-dur")
    const delay = readVar("--reel-stagger") * index
    const maxBlur = readVar("--reel-spin-blur")
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = (now - start - delay) / dur
      const y = t <= 0 ? maxBlur : maxBlur * Math.pow(Math.max(1 - t, 0), 2)
      blur.current?.setAttribute("stdDeviation", `0 ${y.toFixed(2)}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [digit, index])

  return (
    <span className="t-reel-col">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id={fid} x="-20%" y="-5%" width="140%" height="110%">
          <feGaussianBlur ref={blur} stdDeviation="0 0" />
        </filter>
      </svg>
      <span ref={strip} className="t-reel-strip" style={{ filter: `url(#${fid})` }}>
        {DIGITS.map((d, i) => (
          <span key={i} className="t-reel-digit">
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

export default function SpinningCounter({
  value,
  cell = 64,
  className = "",
}: {
  value: number
  cell?: number
  className?: string
}) {
  const text = value.toLocaleString("it-IT")
  const chars = text.split("")
  return (
    <span
      role="img"
      aria-label={text}
      className={`t-reel ${className}`}
      style={{ ["--reel-cell" as string]: `${cell}px`, fontSize: cell * 0.78 }}
    >
      {chars.map((c, i) =>
        /\d/.test(c) ? (
          <Col key={chars.length - i} digit={Number(c)} index={i} />
        ) : (
          <span key={chars.length - i} className="t-reel-sep">
            {c}
          </span>
        ),
      )}
    </span>
  )
}
