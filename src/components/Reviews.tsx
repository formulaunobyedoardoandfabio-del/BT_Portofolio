import Magnetic from "./Magnetic"
import Reveal from "./Reveal"
import { IconPlay, IconStar } from "./Icons"
import { Marquee } from "./ui/Marquee3D"
import RevealText from "./ui/RevealText"
import SpecialText from "./ui/SpecialText"
import { PLAY_STORE_URL, REVIEWS, REVIEWS_ARE_EXAMPLES } from "../lib/config"

type Review = (typeof REVIEWS)[number]

const TONES = ["bg-brand-yellow text-black", "bg-brand-blue", "bg-brand-purple", "bg-brand-red", "bg-brand-green text-black"]

function ReviewCard({ r, i }: { r: Review; i: number }) {
  return (
    <figure className="w-60 rounded-2xl border border-white/10 bg-[#111] p-5">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-black ${TONES[i % TONES.length]}`}
          aria-hidden="true"
        >
          {r.name[0]}
        </span>
        <div className="min-w-0">
          <figcaption className="flex items-center gap-2 text-sm font-medium text-foreground">
            {r.name}
            <span className="rounded-full border border-white/15 px-1.5 py-px font-mono text-[9px] uppercase tracking-widest text-white/60">
              {r.source}
            </span>
          </figcaption>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{r.handle}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-0.5 text-accent" aria-label={`${r.stars} stelle su 5`}>
        {Array.from({ length: 5 }, (_, k) => (
          <span key={k} className={k < r.stars ? "" : "opacity-25"}>
            <IconStar size={13} />
          </span>
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-white/75">{r.body}</blockquote>
    </figure>
  )
}

export default function Reviews() {
  const half = Math.ceil(REVIEWS.length / 2)
  const cols = [REVIEWS, [...REVIEWS.slice(half), ...REVIEWS.slice(0, half)], REVIEWS.slice().reverse(), REVIEWS]

  return (
    <section id="reviews" className="relative overflow-hidden bg-background px-5 py-28 md:px-10 md:py-40">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              <SpecialText>( 05 ) Recensioni</SpecialText>
            </p>
          </Reveal>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black uppercase leading-[0.95]">
            <RevealText text="Dicono" />
            <br />
            <RevealText text="di noi" overlayColor="text-brand-purple" />
          </h2>
          <p className="mt-8 max-w-md text-foreground/70">
            Cosa pensa chi usa l&apos;app B&amp;T e chi passa dal sito. Passa il mouse sulle colonne per fermarle.
          </p>
          {REVIEWS_ARE_EXAMPLES && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-red/50 bg-brand-red/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-brand-red">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> Esempi: le recensioni vere arriveranno presto
            </p>
          )}
          <div className="mt-10">
            <Magnetic
              href={PLAY_STORE_URL}
              label="Recensisci"
              className="items-center gap-3 rounded-full bg-accent px-7 py-4 font-mono text-xs uppercase tracking-widest text-accent-foreground"
            >
              <IconPlay size={18} /> Lascia una recensione
            </Magnetic>
          </div>
        </div>

        <div className="relative isolate flex h-[34rem] w-full items-center justify-center overflow-hidden [clip-path:inset(0)] [perspective:300px]">
          <div
            className="flex flex-row items-center gap-4"
            style={{
              transform: "translateX(-60px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
            }}
          >
            {cols.map((list, c) => (
              <Marquee key={c} vertical pauseOnHover reverse={c % 2 === 1} repeat={3} className="h-[60rem] [--duration:40s]">
                {list.map((r, i) => (
                  <ReviewCard key={`${c}-${i}`} r={r} i={i + c} />
                ))}
              </Marquee>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
        </div>
      </div>
    </section>
  )
}
