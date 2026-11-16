import { AnimatePresence, motion } from "motion/react"
import { useEffect, useId, useRef, useState } from "react"
import { cn } from "../../lib/utils"
import { IconArrowUpRight } from "../Icons"

export type FolderArt = "aurora" | "ember" | "dusk" | "verdant" | "none"

export interface FolderFile {
  name: string
  meta?: string
  art?: FolderArt
  href?: string
}

const ART: Record<Exclude<FolderArt, "none">, string[]> = {
  aurora: ["#19e36b", "#1f4bff", "#8a3dff"],
  ember: ["#ff2a2a", "#ff8a00", "#ffd400"],
  dusk: ["#8a3dff", "#ff4f9a", "#1f4bff"],
  verdant: ["#19e36b", "#0f7a4a", "#d4ff3d"],
}

/** Una "stampa a lunga esposizione": tre macchie di colore sfocate, posizionate dal seme. */
function artBackground(art: FolderArt, seed = 1) {
  if (art === "none") return "linear-gradient(160deg,#2a2a2a,#121212)"
  const [a, b, c] = ART[art]
  const r = (n: number) => ((Math.sin(seed * 97.13 + n * 13.7) + 1) / 2) * 100
  return [
    `radial-gradient(circle at ${r(1)}% ${r(2)}%, ${a} 0%, transparent 45%)`,
    `radial-gradient(circle at ${r(3)}% ${r(4)}%, ${b} 0%, transparent 50%)`,
    `radial-gradient(circle at ${r(5)}% ${r(6)}%, ${c} 0%, transparent 55%)`,
    "linear-gradient(160deg,#151515,#050505)",
  ].join(",")
}

/**
 * Cartella con il frontale in vetro sopra una stampa colorata.
 * Al passaggio del mouse il vetro si inclina verso di te e i fogli spuntano;
 * al click si apre e mostra i file come link.
 */
export default function GlassFolder({
  label,
  meta,
  tone = "light",
  art = "aurora",
  seed = 1,
  files = [],
  labelPlacement = "bottom-left",
  appearDelay = 0,
  className,
}: {
  label: string
  meta?: string
  tone?: "light" | "dark"
  art?: FolderArt
  seed?: number
  files?: FolderFile[]
  labelPlacement?: "bottom-left" | "top-left" | "top-right"
  appearDelay?: number
  className?: string
}) {
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener("keydown", key)
    window.addEventListener("mousedown", click)
    return () => {
      window.removeEventListener("keydown", key)
      window.removeEventListener("mousedown", click)
    }
  }, [open])

  const lean = open ? -38 : hover ? -14 : 0
  const glass =
    tone === "dark"
      ? "bg-black/45 border-white/15 text-white"
      : "bg-white/20 border-white/40 text-white"
  const place =
    labelPlacement === "top-left"
      ? "top-5 left-5"
      : labelPlacement === "top-right"
        ? "top-5 right-5 text-right"
        : "bottom-5 left-5"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: appearDelay / 1000 }}
      className={cn("relative w-[min(86vw,330px)]", className)}
    >
      {/* File aperti: escono sopra la cartella come schede cliccabili */}
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            className="absolute inset-x-3 bottom-[62%] z-30 flex flex-col gap-2"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{ show: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
          >
            {files.map((f) => (
              <motion.li
                key={f.name}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <a
                  href={f.href ?? "#"}
                  {...(f.href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  data-cursor="Apri"
                  className="group/file flex items-center gap-3 rounded-xl border border-white/15 bg-[#141414]/95 p-2.5 pr-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur transition-colors hover:border-accent"
                >
                  <span
                    className="h-9 w-9 shrink-0 rounded-lg"
                    style={{ background: artBackground(f.art ?? "none", f.name.length) }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white">{f.name}</span>
                    {f.meta && (
                      <span className="block truncate font-mono text-[10px] uppercase tracking-widest text-white/50">
                        {f.meta}
                      </span>
                    )}
                  </span>
                  <span className="text-white/50 transition-transform group-hover/file:rotate-45 group-hover/file:text-accent">
                    <IconArrowUpRight size={16} />
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${open ? "chiudi" : "apri"} la cartella (${files.length} elementi)`}
        data-cursor={open ? "Chiudi" : "Apri"}
        className="relative block aspect-[4/3] w-full rounded-2xl text-left outline-none [perspective:900px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        {/* Retro con linguetta */}
        <div className="absolute inset-0 top-[6%] rounded-2xl rounded-tl-none bg-[#1c1c1c] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]" />
        <div className="absolute left-0 top-0 h-[12%] w-[38%] rounded-t-xl bg-[#1c1c1c]" />

        {/* Fogli che spuntano */}
        {files.slice(0, 3).map((f, i) => (
          <motion.div
            key={f.name}
            className="absolute rounded-lg border border-black/10 bg-[#f2f0ea] shadow-md"
            style={{
              left: `${10 + i * 6}%`,
              right: `${14 - i * 4}%`,
              top: "14%",
              bottom: "10%",
              rotate: (i - 1) * 3,
              backgroundImage: f.art && f.art !== "none" ? artBackground(f.art, i + seed) : undefined,
            }}
            animate={{ y: open ? -18 : hover ? -22 - i * 8 : -i * 3 }}
            transition={{ type: "spring", stiffness: 220, damping: 20, delay: i * 0.03 }}
          />
        ))}

        {/* Frontale: stampa + vetro, incernierato in basso */}
        <motion.div
          className="absolute inset-x-0 bottom-0 top-[22%] origin-bottom overflow-hidden rounded-2xl"
          animate={{ rotateX: lean }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0" style={{ background: artBackground(art, seed) }} />
          <div className={cn("absolute inset-0 rounded-2xl border backdrop-blur-xl", glass)} />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className={cn("absolute", place)}>
            <span className="block font-display text-xl font-black uppercase leading-none text-white drop-shadow md:text-2xl">
              {label}
            </span>
            <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-widest text-white/70">
              {meta ?? `${files.length} elementi`}
            </span>
          </div>
        </motion.div>
      </button>
    </motion.div>
  )
}
