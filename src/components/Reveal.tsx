import { useEffect, useRef, type ReactNode } from "react"

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in")
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function Chars({ text, base = 0, colors }: { text: string; base?: number; colors?: string[] }) {
  return (
    <span style={{ ["--base" as string]: `${base}ms` }} aria-label={text}>
      {text.split("").map((c, i) =>
        c === " " ? (
          <span key={i} className="inline-block w-[0.28em]" />
        ) : (
          <span key={i} className="char-wrap" aria-hidden="true">
            <span
              className="char"
              style={{ ["--i" as string]: i, ...(colors ? { ["--cc" as string]: colors[i % colors.length] } : {}) }}
            >
              {c}
            </span>
          </span>
        ),
      )}
    </span>
  )
}
