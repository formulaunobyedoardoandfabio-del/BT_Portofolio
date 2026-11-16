import { useState } from "react"
import Repel from "./Repel"
import Reveal from "./Reveal"
import { IconArrowUp, IconGlobe, IconInstagram, IconMail, IconPlay } from "./Icons"
import SocialFlipButton from "./ui/SocialFlipButton"
import SpecialText from "./ui/SpecialText"
import { burst } from "../lib/confetti"
import { APP_URL, EMAIL, INSTAGRAM_URL, PLAY_STORE_URL } from "../lib/config"

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
    <footer id="contact" className="relative overflow-hidden bg-accent px-5 pb-8 pt-28 text-black md:px-10 md:pb-28 md:pt-40">
      <Reveal>
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/70">
          <SpecialText>( 06 ) Contatti</SpecialText>
        </p>
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
        <SocialFlipButton
          items={[
            { letter: "C", icon: <IconInstagram size={22} />, label: "Instagram", href: INSTAGRAM_URL },
            { letter: "I", icon: <IconMail size={22} />, label: "Email", href: `mailto:${EMAIL}` },
            { letter: "A", icon: <IconPlay size={22} />, label: "Google Play", href: PLAY_STORE_URL },
            { letter: "O", icon: <IconGlobe size={22} />, label: "App web", href: APP_URL },
          ]}
          className="self-start"
        />
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
