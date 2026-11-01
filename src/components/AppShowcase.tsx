import { useEffect, useRef, useState } from "react"
import Magnetic from "./Magnetic"
import Reveal from "./Reveal"
import { IconArrowUpRight, IconPlay, IconSparkles } from "./Icons"
import { FEATURES, PLAY_STORE_URL } from "../lib/config"

const APP_URL = "https://bt-app-2.vercel.app/"

export default function AppShowcase( ) {
  const section = useRef<HTMLElement>(null)
  const phone = useRef<HTMLDivElement>(null)

  const [iframeError, setIframeError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = section.current
      const currentPhone = phone.current

      if (!currentSection || !currentPhone) return

      const rect = currentSection.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const progress = Math.min(
        Math.max(
          (viewportHeight - rect.top) /
            (rect.height + viewportHeight),
          0
        ),
        1
      )

      const rotation = (progress - 0.5) * 70
      const scale =
        0.85 + Math.sin(progress * Math.PI) * 0.2

      currentPhone.style.transform = `
        perspective(1200px)
        rotateY(${-rotation}deg)
        rotateZ(${rotation * 0.15}deg)
        scale(${scale})
      `
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <section
      ref={section}
      id="app"
      className="
        relative
        overflow-hidden
        bg-paper
        px-5
        py-28
        text-background
        md:px-10
        md:py-40
      "
    >
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Colonna testo */}
        <div>
          <Reveal>
            <p
              className="
                mb-6
                flex
                items-center
                gap-2
                font-mono
                text-xs
                uppercase
                tracking-[0.3em]
              "
            >
              <IconSparkles size={16} />
              ( 03 ) L&apos;app
            </p>

            <h2
              className="
                font-display
                text-[clamp(2.5rem,7vw,6.5rem)]
                font-black
                uppercase
                leading-[0.95]
              "
            >
              Nel tuo{" "}
              <span
                className="
                  inline-block
                  -rotate-2
                  rounded-xl
                  bg-background
                  px-3
                  text-accent
                "
              >
                telefono
              </span>
                

              in un tap.
            </h2>
          </Reveal>

          {/* Features */}
          <ul
            className="
              mt-12
              grid
              gap-px
              overflow-hidden
              rounded-2xl
              border
              border-background/15
              bg-background/15
              sm:grid-cols-2
            "
          >
            {FEATURES.map((feature, index) => (
              <li
                key={feature.t}
                className="
                  bg-paper
                  p-6
                  transition-colors
                  duration-300
                  hover:bg-accent
                "
              >
                <Reveal delay={index * 100}>
                  <div className="font-mono text-xs">
                    0{index + 1}
                  </div>

                  <div
                    className="
                      mt-3
                      font-display
                      text-xl
                      font-bold
                      uppercase
                    "
                  >
                    {feature.t}
                  </div>

                  <p className="mt-2 text-sm text-background/70">
                    {feature.d}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* CTA Play Store */}
          <div className="mt-12">
            <Magnetic
              href={PLAY_STORE_URL}
              label="Scarica"
              className="
                items-center
                gap-4
                rounded-2xl
                bg-background
                px-7
                py-4
                text-foreground
              "
            >
              <IconPlay size={30} />

              <span className="text-left leading-tight">
                <span
                  className="
                    block
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-widest
                    text-muted
                  "
                >
                  Disponibile su
                </span>

                <span
                  className="
                    block
                    font-display
                    text-lg
                    font-bold
                  "
                >
                  Google Play
                </span>
              </span>

              <IconArrowUpRight size={20} />
            </Magnetic>
          </div>
        </div>

        {/* Colonna smartphone */}
        <div className="flex justify-center">
          <div
            ref={phone}
            className="
              will-change-transform
              transition-transform
              duration-300
              ease-out
            "
          >
            <div
              className="
                relative
                h-[560px]
                w-[270px]
                overflow-hidden
                rounded-[44px]
                border-[10px]
                border-background
                bg-background
                shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]
                md:h-[620px]
                md:w-[300px]
              "
            >
              {/* Notch */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-3
                  z-30
                  h-5
                  w-20
                  -translate-x-1/2
                  rounded-full
                  bg-black
                "
              />

              {/* Riflesso sul vetro */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-20
                  rounded-[34px]
                  bg-gradient-to-br
                  from-white/10
                  via-transparent
                  to-transparent
                "
              />

              {/* Pagina interattiva Vercel */}
              {!iframeError ? (
                <iframe
                  src={APP_URL}
                  title="Anteprima interattiva dell'app B&T Formula 1"
                  className="
                    h-full
                    w-full
                    rounded-[34px]
                    border-0
                    bg-black
                  "
                  loading="lazy"
                  allow="fullscreen"
                  onError={() => setIframeError(true)}
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    rounded-[34px]
                    bg-background
                    px-6
                    text-center
                    text-foreground
                  "
                >
                  <span className="text-4xl">!</span>

                  <p
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-widest
                    "
                  >
                    App preview unavailable
                  </p>

                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      border-b
                      border-accent
                      pb-1
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-widest
                      text-accent
                    "
                  >
                    Apri preview
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
