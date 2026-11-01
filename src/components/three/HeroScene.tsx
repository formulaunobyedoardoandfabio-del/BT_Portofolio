import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import logoUrl from "../../assets/bt-logo-white.png"

// R3F 9.x crea ancora THREE.Clock internamente: nascondiamo solo questo avviso finché non esce una versione aggiornata.
const originalWarn = console.warn
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return
  originalWarn(...args)
}

const STOPS =["#1f4bff", "#8a3dff", "#ff2a2a", "#ffd400", "#19e36b"].map((c) => new THREE.Color(c))
const LAYERS = 30
const GAP = 0.034

function useLogoTexture() {
  const [data, setData] = useState<{ texture: THREE.Texture; aspect: number } | null>(null)
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const c = document.createElement("canvas")
      c.width = img.width
      c.height = img.height
      const ctx = c.getContext("2d")!
      ctx.drawImage(img, 0, 0)
      const d = ctx.getImageData(0, 0, c.width, c.height)
      let minX = c.width
      let minY = c.height
      let maxX = 0
      let maxY = 0
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
          const i = (y * c.width + x) * 4
          const a = Math.max(0, Math.min(255, (255 - d.data[i]) * 1.4))
          d.data[i] = d.data[i + 1] = d.data[i + 2] = 255
          d.data[i + 3] = a
          if (a > 128) {
            minX = Math.min(minX, x)
            maxX = Math.max(maxX, x)
            minY = Math.min(minY, y)
            maxY = Math.max(maxY, y)
          }
        }
      }
      ctx.putImageData(d, 0, 0)
      const w = maxX - minX + 1
      const h = maxY - minY + 1
      const c2 = document.createElement("canvas")
      c2.width = w
      c2.height = h
      c2.getContext("2d")!.drawImage(c, minX, minY, w, h, 0, 0, w, h)
      const texture = new THREE.CanvasTexture(c2)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = 8
      setData({ texture, aspect: w / h })
    }
    img.src = logoUrl
  }, [])
  return data
}

function LayeredLogo() {
  const logo = useLogoTexture()
  const group = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  useEffect(() => {
    const on = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("mousemove", on)
    return () => window.removeEventListener("mousemove", on)
  }, [])

  const colors = useMemo(
    () =>
      Array.from({ length: LAYERS }, (_, i) => {
        if (i === LAYERS - 1) return new THREE.Color("#ffffff")
        const t = (i / (LAYERS - 2)) * (STOPS.length - 1)
        const a = Math.floor(t)
        const b = Math.min(a + 1, STOPS.length - 1)
        return new THREE.Color().lerpColors(STOPS[a], STOPS[b], t - a)
      }),
    [],
  )

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5)
    const ty = mouse.current.x * 0.7 + Math.sin(t * 0.6) * 0.25 + scroll * 1.6
    const tx = mouse.current.y * 0.4 + Math.cos(t * 0.5) * 0.08 + scroll * 0.4
    g.rotation.y += (ty - g.rotation.y) * Math.min(dt * 3, 1)
    g.rotation.x += (tx - g.rotation.x) * Math.min(dt * 3, 1)
    g.position.y = Math.sin(t * 0.9) * 0.12
  })

  if (!logo) return null
  const width = Math.min(4.4, viewport.width * 0.8)
  const height = width / logo.aspect
  const shiftX = viewport.width > 9 ? viewport.width * 0.2 : 0

  return (
    <group position={[shiftX, 0, 0]}>
      <group ref={group}>
        {colors.map((color, i) => (
          <mesh key={i} position={[0, 0, (i - LAYERS / 2) * GAP]}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial map={logo.texture} color={color} transparent alphaTest={0.45} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Tyre({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += dt * 0.6 * speed
    ref.current.rotation.y += dt * 0.9 * speed
  })
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[0.55, 0.22, 28, 64]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.35} />
      </mesh>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#8a3dff" />
      <LayeredLogo />
      <Tyre position={[-3.6, 2, -1]} color="#ff2a2a" scale={1.1} />
      <Tyre position={[3.9, -2.2, 0.5]} color="#1f4bff" scale={0.9} speed={1.4} />
      <Tyre position={[-2.6, -2.6, 1]} color="#19e36b" scale={0.6} speed={0.8} />
      <Tyre position={[4, 2.4, -2]} color="#ffd400" scale={0.7} speed={1.1} />
      <Sparkles count={70} scale={[12, 7, 5]} size={3} speed={0.4} color="#ffd400" />
    </Canvas>
  )
}
