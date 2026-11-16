import GlassFolder from "./ui/GlassFolder"
import RevealText from "./ui/RevealText"
import SpecialText from "./ui/SpecialText"
import { FOLDERS } from "../lib/config"

export default function Work() {
  return (
    <section id="work" className="relative overflow-hidden bg-background px-5 py-28 md:px-10 md:py-40">
      {/* Piano di lavoro a puntini */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        style={{ backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)", backgroundSize: "22px 22px" }}
      />

      <div className="relative mb-20 flex flex-col gap-6 md:mb-28 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            <SpecialText>( 02 ) Lavori</SpecialText>
          </p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-none">
            <RevealText text="Lavori." overlayColor="text-accent" />
          </h2>
        </div>
        <p className="max-w-xs text-foreground/65">
          Tre cartelle, tutto quello che facciamo. Passa sopra per inclinarle, clicca per aprirle.
        </p>
      </div>

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-end justify-items-center gap-x-14 gap-y-24 pt-28 md:grid-cols-2 xl:grid-cols-3">
        {FOLDERS.map((f, i) => (
          <GlassFolder
            key={f.label}
            label={f.label}
            meta={f.meta}
            art={f.art}
            tone={f.tone}
            seed={f.seed}
            files={f.files}
            appearDelay={i * 140}
          />
        ))}
      </div>

      <p className="relative mt-16 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span className="hidden [@media(hover:hover)]:inline">Passa sopra per inclinare · Clicca per aprire · Esc per chiudere</span>
        <span className="[@media(hover:hover)]:hidden">Tocca una cartella per aprirla</span>
      </p>
    </section>
  )
}
