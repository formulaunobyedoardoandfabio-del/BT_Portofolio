import { Fragment, useEffect, useRef, type ReactNode } from "react"

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
  // Le lettere sono raggruppate per parola: il browser può andare a capo solo tra le parole, mai a metà.
  let i = 0
  return (
    <span style={{ ["--base" as string]: `${base}ms` }} role="text" aria-label={text}>
      {text.split(" ").map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((c) => {
            const n = i++
            return (
              <span key={n} className="char-wrap">
                <span
                  className="char"
                  style={{ ["--i" as string]: n, ...(colors ? { ["--cc" as string]: colors[n % colors.length] } : {}) }}
                >
                  {c}
                </span>
              </span>
            )
          })}
          </span>
        </Fragment>
      ))}
    </span>
  )
}
