import { useState } from "react"
import Magnetic from "./Magnetic"
import Repel from "./Repel"
import Reveal from "./Reveal"
import { IconArrowUp, IconInstagram, IconMail, IconPlay } from "./Icons"
import { burst } from "../lib/confetti"
import { EMAIL, INSTAGRAM_URL, PLAY_STORE_URL } from "../lib/config"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async (x: number, y: number) => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      /* clipboard non disponibile */
    }
    burst(x, y, 60, 1.4)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer id="contact" className="relative overflow-hidden bg-accent px-5 pb-8 pt-28 text-black md:px-10 md:pt-40">
      <Reveal>
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/70">( 05 ) Contatti</p>
      </Reveal>
      <a
        href={`mailto:${EMAIL}`}
        data-cursor="Scrivi"
        className="group block font-display text-[clamp(2.6rem,10vw,10rem)] font-black uppercase leading-[0.92]"
      >
        <span className="block">
          <Repel text="Parliamo" />
        </span>
        <span className="block font-light italic transition-colors duration-500 group-hover:text-white">
          <Repel text="insieme →" />
        </span>
      </a>

      <div className="mt-16 flex flex-wrap items-center gap-3">
        <button
          onClick={(e) => copy(e.clientX, e.clientY)}
          data-cursor="Copia"
          className="rounded-full bg-black px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-transform hover:scale-105"
        >
          {copied ? "Copiata! ✓" : `Copia ${EMAIL}`}
        </button>
      </div>

      <div className="mt-12 flex flex-col gap-8 border-t border-black/20 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          {[
            [PLAY_STORE_URL, "Google Play", <IconPlay key="p" size={18} />],
            [INSTAGRAM_URL, "Instagram", <IconInstagram key="i" size={18} />],
            [`mailto:${EMAIL}`, "Email", <IconMail key="m" size={18} />],
          ].map(([href, label, icon]) => (
            <Magnetic
              key={label as string}
              href={href as string}
              className="items-center gap-2 rounded-full border border-black/30 px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
            >
              {icon} {label}
            </Magnetic>
          ))}
        </div>
        <div className="flex items-center justify-between gap-6 font-mono text-xs uppercase tracking-widest text-black/70">
          <span>© {new Date().getFullYear()} B&amp;T</span>
          <a
            href="#top"
            data-cursor="Su"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-transform hover:-translate-y-1"
            aria-label="Torna su"
          >
            <IconArrowUp size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
