import Followers from "./Followers"
import Magnetic from "./Magnetic"
import ReelStack from "./ReelStack"
import Reveal from "./Reveal"
import { IconInstagram } from "./Icons"
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../lib/config"

export default function Instagram() {
  return (
    <section id="instagram" className="bg-background px-5 py-28 md:px-10 md:py-40">
      <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">( 04 ) Social</p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-[0.95]">
            Seguici su
            <br />
            Insta<span className="text-brand-purple">gram</span>
          </h2>
        </Reveal>
        <Magnetic
          href={INSTAGRAM_URL}
          label="Segui"
          className="items-center gap-3 self-start rounded-full bg-accent px-7 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground md:self-auto"
        >
          <IconInstagram size={20} /> {INSTAGRAM_HANDLE}
        </Magnetic>
      </div>

      <Followers />

      <div className="mt-28 md:mt-40">
        <ReelStack />
      </div>
    </section>
  )
}
