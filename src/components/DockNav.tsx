import { useEffect, useState } from "react"
import { Dock, DockIcon, DockItem, DockLabel } from "./ui/Dock"
import { IconFolder, IconHome, IconInstagram, IconMail, IconPhone, IconStar, IconUser } from "./Icons"

const ITEMS = [
  { id: "top", title: "Home", icon: <IconHome /> },
  { id: "about", title: "Chi siamo", icon: <IconUser /> },
  { id: "work", title: "Lavori", icon: <IconFolder /> },
  { id: "app", title: "L'app", icon: <IconPhone /> },
  { id: "instagram", title: "Instagram", icon: <IconInstagram /> },
  { id: "reviews", title: "Recensioni", icon: <IconStar /> },
  { id: "contact", title: "Contatti", icon: <IconMail /> },
]

/** Barra di navigazione in basso (desktop): compare dopo l'hero e segna la sezione in vista. */
export default function DockNav() {
  const [active, setActive] = useState("top")
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.5)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    for (const it of ITEMS) {
      const el = document.getElementById(it.id)
      if (el) io.observe(el)
    }
    return () => {
      window.removeEventListener("scroll", onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <nav
      aria-label="Sezioni"
      className={`fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:block ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <Dock>
        {ITEMS.map((it) => (
          <DockItem
            key={it.id}
            href={`#${it.id}`}
            label={it.title}
            active={active === it.id}
            className={active === it.id ? "bg-accent text-black" : "bg-white/10 text-white hover:bg-white/20"}
          >
            <DockLabel>{it.title}</DockLabel>
            <DockIcon>{it.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </nav>
  )
}
