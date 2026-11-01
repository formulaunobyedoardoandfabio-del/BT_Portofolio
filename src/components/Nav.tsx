import { useState } from "react"
import Logo from "./Logo"
import Magnetic from "./Magnetic"
import { IconPlay } from "./Icons"
import { PLAY_STORE_URL } from "../lib/config"

const LINKS = [
  ["Chi sono", "#about"],
  ["Lavori", "#work"],
  ["App", "#app"],
  ["Instagram", "#instagram"],
  ["Contatti", "#contact"],
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10">
        <a href="#top" aria-label="Home" data-cursor="Top" className="block h-11 w-11 text-white">
          <Logo className="h-full w-full" />
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-white lg:flex">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} className="group relative py-1">
              {l}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Magnetic
            href={PLAY_STORE_URL}
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-black sm:inline-flex"
          >
            <IconPlay size={16} /> Scarica l&apos;app
          </Magnetic>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 text-white lg:hidden"
          >
            <span className={`h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-background px-8 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          open ? "[clip-path:circle(150%_at_100%_0)]" : "[clip-path:circle(0_at_100%_0)]"
        }`}
      >
        {LINKS.map(([l, h]) => (
          <a
            key={h}
            href={h}
            onClick={() => setOpen(false)}
            className="font-display text-4xl font-bold uppercase active:text-accent"
          >
            {l}
          </a>
        ))}
      </div>
    </>
  )
}
