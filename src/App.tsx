import About from "./components/About"
import AppShowcase from "./components/AppShowcase"
import BrandPortal from "./components/BrandPortal"
import Contact from "./components/Contact"
import Cursor from "./components/Cursor"
import DockNav from "./components/DockNav"
import Hero from "./components/Hero"
import Instagram from "./components/Instagram"
import Marquee from "./components/Marquee"
import Nav from "./components/Nav"
import Reviews from "./components/Reviews"
import RollingTyre from "./components/RollingTyre"
import Trail from "./components/Trail"
import Work from "./components/Work"

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Cursor />
      <Trail />
      <Nav />
      <DockNav />
      <main>
        <Hero />
        <Marquee />
        <RollingTyre />
        <About />
        <Work />
        <AppShowcase />
        <BrandPortal />
        <Instagram />
        <Reviews />
      </main>
      <Contact />
    </div>
  )
}
