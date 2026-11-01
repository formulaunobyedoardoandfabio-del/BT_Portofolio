import { useRef, type ReactNode } from "react"
import { burst } from "../lib/confetti"

export default function Magnetic({
  href,
  children,
  label,
  className = "",
}: {
  href: string
  children: ReactNode
  label?: string
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  return (
    <a
      ref={ref}
      href={href}
      data-cursor={label}
      className={`inline-flex transition-transform duration-300 ease-out will-change-transform ${className}`}
      onClick={(e) => burst(e.clientX, e.clientY, 16, 0.7)}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width / 2) * 0.28
        const y = (e.clientY - r.top - r.height / 2) * 0.4
        el.style.transform = `translate(${x}px, ${y}px)`
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = ""
      }}
    >
      {children}
    </a>
  )
}
