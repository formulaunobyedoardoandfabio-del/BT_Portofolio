import About from "./components/About"
import AppShowcase from "./components/AppShowcase"
import BrandPortal from "./components/BrandPortal"
import Contact from "./components/Contact"
import Cursor from "./components/Cursor"
import Hero from "./components/Hero"
import Instagram from "./components/Instagram"
import Marquee from "./components/Marquee"
import Nav from "./components/Nav"
import RollingTyre from "./components/RollingTyre"
import Trail from "./components/Trail"
import Work from "./components/Work"

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Cursor />
      <Trail />
      <Nav />
      <main>
        <Hero />
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
