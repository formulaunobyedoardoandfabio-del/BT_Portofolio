import { lazy, Suspense } from "react"
import Magnetic from "./Magnetic"
import { Chars } from "./Reveal"
import { IconArrowUpRight, IconInstagram, IconPlay } from "./Icons"
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PLAY_STORE_URL } from "../lib/config"

const HeroScene = lazy(() => import("./three/HeroScene"))

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-5 pb-12 pt-32 md:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at calc(60% + var(--nx) * 8%) calc(40% + var(--ny) * 8%), rgba(138,61,255,0.28), transparent 45%), radial-gradient(circle at calc(30% - var(--nx) * 6%) 80%, rgba(31,75,255,0.2), transparent 40%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>{ready && <HeroScene />}</Suspense>
      </div>

      <p className="relative mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Portfolio — {new Date().getFullYear()} / {INSTAGRAM_HANDLE}
      </p>
      {ready && (
        <h1 className="relative font-display text-[clamp(3rem,11.5vw,12rem)] font-black uppercase leading-[0.9] tracking-tight">
          <div>
            <Chars text="Creiamo" />
          </div>
          <div className="text-accent">
            <Chars text="cose che" base={250} />
          </div>
          <div>
            <Chars text="si muovono" base={500} colors={["#ffffff", "#5b7bff", "#b07dff", "#ffffff", "#ff5a5a", "#4dff95"]} />
          </div>
        </h1>
      )}

      <div className="relative mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-lg text-foreground/75">
          Siamo B&amp;T: design, app e contenuti sulla Formula 1. Scarica la nostra app dal Play Store e seguici su Instagram
          per vedere cosa stiamo costruendo.
        </p>
        <div className="flex flex-wrap gap-3">
          <Magnetic
            href={PLAY_STORE_URL}
            label="Scarica"
            className="items-center gap-3 rounded-full bg-accent px-7 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground"
          >
            <IconPlay size={20} /> Google Play <IconArrowUpRight size={18} />
          </Magnetic>
          <Magnetic
            href={INSTAGRAM_URL}
            label="Segui"
            className="items-center gap-3 rounded-full border border-foreground/40 px-7 py-4 font-mono text-sm uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
          >
            <IconInstagram size={20} /> Instagram
          </Magnetic>
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted md:block">
        Scroll
      </div>
    </section>
  )
}
