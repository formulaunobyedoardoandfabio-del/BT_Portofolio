import { lazy, Suspense } from "react"
import Magnetic from "./Magnetic"
import { Chars } from "./Reveal"
import { IconArrowUpRight, IconInstagram, IconPlay } from "./Icons"
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PLAY_STORE_URL } from "../lib/config"

const HeroScene = lazy(() => import("./three/HeroScene"))

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050505] px-5 pb-8 pt-28 text-foreground md:px-10 md:pb-10 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(138,61,255,0.28),transparent_27%),radial-gradient(circle_at_18%_92%,rgba(31,75,255,0.18),transparent_32%),linear-gradient(125deg,#050505_0%,#0b0b0b_58%,#11110d_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(242,240,234,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(242,240,234,.09)_1px,transparent_1px)] [background-size:clamp(42px,6vw,90px)_clamp(42px,6vw,90px)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[#ffd400]/10 blur-[110px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-9rem)] max-w-[1500px] flex-col">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#19e36b]" />
            B&T / Creative signal
          </span>
          <span className="hidden sm:inline">Milano — worldwide / {new Date().getFullYear()}</span>
          <span className="sm:hidden">{new Date().getFullYear()}</span>
        </div>

        <div className="relative flex flex-1 items-center py-12 md:py-16">
          <div className="pointer-events-none absolute -right-20 top-1/2 h-[min(78vw,760px)] w-[min(78vw,760px)] -translate-y-1/2 opacity-90 md:-right-10 md:w-[min(62vw,900px)]">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>

          <div className="relative z-10 max-w-[1050px]">
            <p className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-white/60">
              Portfolio / {INSTAGRAM_HANDLE}
              <span className="h-px w-12 bg-[#ffd400]" />
            </p>

            <h1 className="max-w-[1050px] font-display text-[clamp(3.7rem,10.8vw,11.8rem)] font-black uppercase leading-[0.82] tracking-[-0.085em]">
              <span className="block"><Chars text="Creiamo" /></span>
              <span className="block text-[#ffd400]"><Chars text="cose che" base={180} /></span>
              <span className="block text-white"><Chars text="si muovono" base={360} colors={["#ffffff", "#5b7bff", "#b07dff", "#ffffff", "#ff5a5a", "#4dff95"]} /></span>
            </h1>

            <div className="mt-10 grid max-w-3xl gap-8 border-t border-white/15 pt-6 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-md text-base leading-relaxed text-white/65 md:text-lg">
                Design, app e contenuti sulla Formula 1. Costruiamo idee con abbastanza ritmo da uscire dallo schermo e restare nella testa.
              </p>

              <div className="flex flex-wrap gap-3">
                <Magnetic
                  href={PLAY_STORE_URL}
                  label="Scarica"
                  className="items-center gap-3 rounded-full bg-[#ffd400] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.03]"
                >
                  <IconPlay size={17} /> App <IconArrowUpRight size={16} />
                </Magnetic>
                <Magnetic
                  href={INSTAGRAM_URL}
                  label="Instagram"
                  className="items-center gap-3 rounded-full border border-white/35 bg-white/[0.04] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  <IconInstagram size={17} /> Instagram
                </Magnetic>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-0 z-10 hidden w-48 flex-col gap-5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/45 lg:flex">
            <div className="border-l border-[#ffd400] pl-4">
              <span className="mb-2 block text-[#ffd400]">01 / 04</span>
              <span>Content<br />design<br />digital worlds</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <span className="h-8 w-px bg-white/35" />
              Scroll to explore
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/15 pt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
          <span>Make it move.</span>
          <span className="hidden sm:inline">Creative studio / Formula 1 / Product</span>
          <span className="text-[#ffd400]">↘</span>
        </div>
      </div>
    </section>
  )
}
