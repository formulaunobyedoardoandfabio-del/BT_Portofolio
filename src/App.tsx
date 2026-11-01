import { useCallback, useState } from "react"
import About from "./components/About"
import AppShowcase from "./components/AppShowcase"
import BrandPortal from "./components/BrandPortal"
import Contact from "./components/Contact"
import Cursor from "./components/Cursor"
import Hero from "./components/Hero"
import Instagram from "./components/Instagram"
import Marquee from "./components/Marquee"
import Nav from "./components/Nav"
import Preloader from "./components/Preloader"
import RollingTyre from "./components/RollingTyre"
import Trail from "./components/Trail"
import Work from "./components/Work"

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Preloader onDone={onDone} />
      <Cursor />
      <Trail />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <RollingTyre />
        <About />
        <Work />
        <AppShowcase />
        <BrandPortal />
        <Instagram />
      </main>
      <Contact />
    </div>
  )
}
