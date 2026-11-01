import { useEffect, useRef } from "react"

export default function Repel({ text }: { text: string }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return
    const mouse = { x: -9999, y: -9999 }
    const off = refs.current.map(() => ({ x: 0, y: 0 }))
    const move = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    let raf = 0
    const tick = () => {
      refs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return
        const cx = r.left + r.width / 2 - off[i].x
        const cy = r.top + r.height / 2 - off[i].y
        const dx = cx - mouse.x
        const dy = cy - mouse.y
        const d = Math.hypot(dx, dy) || 1
        const f = d < 180 ? (1 - d / 180) * 70 : 0
        off[i].x += ((dx / d) * f - off[i].x) * 0.14
        off[i].y += ((dy / d) * f - off[i].y) * 0.14
        el.style.transform = `translate(${off[i].x.toFixed(1)}px, ${off[i].y.toFixed(1)}px)`
      })
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener("mousemove", move)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <span aria-label={text}>
      {text.split("").map((c, i) =>
        c === " " ? (
          <span key={i} className="inline-block w-[0.28em]" />
        ) : (
          <span
            key={i}
            aria-hidden="true"
            ref={(el) => {
              refs.current[i] = el
            }}
            className="inline-block will-change-transform"
          >
            {c}
          </span>
        ),
      )}
    </span>
  )
}
