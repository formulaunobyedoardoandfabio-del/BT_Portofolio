import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, type ReactNode } from "react"
import { cn } from "../../lib/utils"

export interface SocialItem {
  letter: string
  icon: ReactNode
  label: string
  href?: string
  onClick?: () => void
}

function SocialFlipNode({
  item,
  index,
  isHovered,
  tooltipIndex,
  setTooltipIndex,
}: {
  item: SocialItem
  index: number
  isHovered: boolean
  tooltipIndex: number | null
  setTooltipIndex: (v: number | null) => void
}) {
  const external = item.href?.startsWith("http")
  const content = (
    <>
      <AnimatePresence>
        {isHovered && tooltipIndex === index && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -54, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-0 z-50 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-widest text-black shadow-xl"
            role="tooltip"
          >
            {item.label}
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        className="relative block h-full w-full"
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15, delay: index * 0.08 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-neutral-900 font-display text-xl font-black text-white"
          style={{ backfaceVisibility: "hidden" }}
          aria-hidden="true"
        >
          {item.letter}
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-accent text-black"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          aria-hidden="true"
        >
          {item.icon}
        </span>
      </motion.span>
    </>
  )

  const common = {
    className: "relative block h-12 w-12 md:h-14 md:w-14",
    style: { perspective: "1000px" },
    onMouseEnter: () => setTooltipIndex(index),
    onMouseLeave: () => setTooltipIndex(null),
    onFocus: () => setTooltipIndex(index),
    onBlur: () => setTooltipIndex(null),
    "aria-label": item.label,
    "data-cursor": item.label,
  }

  return item.href ? (
    <a href={item.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...common}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={item.onClick} {...common}>
      {content}
    </button>
  )
}

/**
 * Lettere che, al passaggio del mouse, si girano una dopo l'altra mostrando l'icona del social.
 * Su touch (niente hover) restano girate, così le icone si vedono sempre.
 */
export default function SocialFlipButton({ items, className }: { items: SocialItem[]; className?: string }) {
  const [hovered, setHovered] = useState(false)
  const [touch, setTouch] = useState(false)
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null)

  useEffect(() => {
    setTouch(!window.matchMedia("(hover: hover)").matches)
  }, [])

  const flipped = hovered || touch

  return (
    <div
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] md:gap-3 md:p-4",
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setTooltipIndex(null)
      }}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <span className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl" aria-hidden="true">
        <motion.span
          className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </span>
      {items.map((item, i) => (
        <SocialFlipNode
          key={item.label}
          item={item}
          index={i}
          isHovered={flipped}
          tooltipIndex={tooltipIndex}
          setTooltipIndex={setTooltipIndex}
        />
      ))}
    </div>
  )
}
