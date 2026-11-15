import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { cn } from "../../lib/utils"

/**
 * Testo "interattivo": le lettere salgono a molla quando il titolo entra nello schermo;
 * al passaggio del mouse una copia colorata scorre sopra ogni lettera, una dopo l'altra.
 */
export default function RevealText({
  text,
  className,
  textColor = "text-foreground",
  overlayColor = "text-accent",
  letterDelay = 0.06,
  overlayDelay = 0.04,
  overlayDuration = 0.35,
  springDuration = 600,
}: {
  text: string
  className?: string
  textColor?: string
  overlayColor?: string
  letterDelay?: number
  overlayDelay?: number
  overlayDuration?: number
  springDuration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [hover, setHover] = useState(false)
  const letters = text.split("")

  return (
    <span
      ref={ref}
      className={cn("inline-flex flex-wrap", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={text}
      role="text"
    >
      {letters.map((c, i) => (
        <span key={i} aria-hidden="true" className="relative inline-block overflow-hidden pb-[0.06em]">
          <motion.span
            className={cn("inline-block", textColor)}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : undefined}
            transition={{ type: "spring", duration: springDuration / 1000, bounce: 0.35, delay: i * letterDelay }}
          >
            {c === " " ? " " : c}
          </motion.span>
          <motion.span
            className={cn("absolute inset-0 inline-block", overlayColor)}
            initial={false}
            animate={{ clipPath: hover ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
            transition={{ duration: overlayDuration, ease: [0.76, 0, 0.24, 1], delay: i * overlayDelay }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
