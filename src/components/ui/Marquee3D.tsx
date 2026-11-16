import type { CSSProperties, ReactNode } from "react"
import { cn } from "../../lib/utils"

/**
 * Nastro che scorre all'infinito (orizzontale o verticale).
 * La durata si regola con la variabile CSS --duration, lo spazio con --gap.
 */
export function Marquee({
  children,
  vertical = false,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  className,
  style,
}: {
  children: ReactNode
  vertical?: boolean
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      style={style}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 ? "true" : undefined}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "marquee-y flex-col" : "marquee-x flex-row",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export default Marquee
