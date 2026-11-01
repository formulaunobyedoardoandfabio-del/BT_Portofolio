import { useEffect, useRef } from "react"

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (!finePointer || reducedMotion) return

    document.body.classList.add("custom-cursor-active")

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    let ringX = mouseX
    let ringY = mouseY

    let animationFrame = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `
          translate3d(${mouseX}px, ${mouseY}px, 0)
          translate(-50%, -50%)
        `
      }
    }

    const animate = () => {
      /*
       * Più il valore è basso, più l'anello segue velocemente.
       * 0.12 = movimento morbido e visibile.
       */
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `
          translate3d(${ringX}px, ${ringY}px, 0)
          translate(-50%, -50%)
        `
      }

      animationFrame = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animationFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrame)
      document.body.classList.remove("custom-cursor-active")
    }
  }, [])

  return (
    <>
      {/* Punto giallo: segue immediatamente il mouse */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          h-[7px]
          w-[7px]
          rounded-full
          bg-[#d7f521]
          [@media(hover:hover)_and_(pointer:fine)]:block
        "
      />

      {/* Anello bianco: segue con ritardo */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9998]
          hidden
          h-[34px]
          w-[34px]
          rounded-full
          border
          border-white
          [@media(hover:hover)_and_(pointer:fine)]:block
        "
      />
    </>
  )
}
