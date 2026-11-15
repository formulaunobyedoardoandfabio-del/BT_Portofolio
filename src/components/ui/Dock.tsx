import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { createContext, useContext, useRef, useState, type ReactNode } from "react"
import { cn } from "../../lib/utils"

const BASE = 42
const MAX = 66
const RANGE = 140

type DockCtx = { mouseX: MotionValue<number> }
const Ctx = createContext<DockCtx | null>(null)
const ItemCtx = createContext<{ hovered: boolean; width: MotionValue<number> } | null>(null)

/** Barra in stile macOS: le icone vicine al mouse si ingrandiscono. */
export function Dock({ children, className }: { children: ReactNode; className?: string }) {
  const mouseX = useMotionValue(Infinity)
  return (
    <Ctx.Provider value={{ mouseX }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex h-[62px] items-end gap-2.5 rounded-2xl border border-white/15 bg-[#0b0b0b]/90 px-2.5 pb-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl",
          className,
        )}
        role="toolbar"
      >
        {children}
      </motion.div>
    </Ctx.Provider>
  )
}

export function DockItem({
  children,
  className,
  href,
  active,
  label,
}: {
  children: ReactNode
  className?: string
  href: string
  active?: boolean
  label: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const ctx = useContext(Ctx)!
  const [hovered, setHovered] = useState(false)
  const distance = useTransform(ctx.mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect() ?? { x: 0, width: BASE }
    return x - r.x - r.width / 2
  })
  const target = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE])
  const width = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 })

  return (
    <ItemCtx.Provider value={{ hovered, width }}>
      <motion.a
        ref={ref}
        href={href}
        aria-label={label}
        aria-current={active ? "true" : undefined}
        data-cursor={label}
        style={{ width, height: width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className,
        )}
      >
        {children}
        {active && <span className="absolute -bottom-2 h-1 w-1 rounded-full bg-accent" />}
      </motion.a>
    </ItemCtx.Provider>
  )
}

export function DockLabel({ children }: { children: ReactNode }) {
  const item = useContext(ItemCtx)!
  return (
    <AnimatePresence>
      {item.hovered && (
        <motion.span
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-background"
          role="tooltip"
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export function DockIcon({ children }: { children: ReactNode }) {
  const item = useContext(ItemCtx)!
  const size = useTransform(item.width, (w) => w * 0.46)
  return (
    <motion.span style={{ width: size, height: size }} className="flex items-center justify-center [&>svg]:h-full [&>svg]:w-full">
      {children}
    </motion.span>
  )
}
