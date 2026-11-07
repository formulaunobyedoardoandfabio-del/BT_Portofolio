import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import { LOGO_H, LOGO_PATH, LOGO_VIEWBOX, LOGO_W } from "../../lib/logo"

// R3F 9.x crea ancora THREE.Clock internamente: nascondiamo solo questo avviso finché non esce una versione aggiornata.
const originalWarn = console.warn
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return
  originalWarn(...args)
}

/** Logo B&T estruso in 3D dal tracciato SVG: bordi netti a qualsiasi risoluzione. */
function useLogoGeometry() {
  return useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}"><path d="${LOGO_PATH}"/></svg>`
    const { paths } = new SVGLoader().parse(svg)
    const shapes = paths.flatMap((p) => SVGLoader.createShapes(p))
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 2.2,
      bevelSize: 1.4,
      bevelSegments: 6,
      curveSegments: 18,
    })
    geo.translate(-LOGO_W / 2, -LOGO_H / 2, -8)
    geo.scale(1, -1, 1) // SVG ha l'asse Y verso il basso
    geo.computeVertexNormals()
    return geo
  }, [])
}

function Logo3D() {
  const geometry = useLogoGeometry()
  const group = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  useEffect(() => {
    const on = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", on)
    return () => window.removeEventListener("pointermove", on)
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5)
    const ty = -0.35 + mouse.current.x * 0.55 + Math.sin(t * 0.55) * 0.18 + scroll * 1.8
    const tx = 0.12 + mouse.current.y * 0.3 + Math.cos(t * 0.45) * 0.06 + scroll * 0.35
    const k = Math.min(dt * 3, 1)
    g.rotation.y += (ty - g.rotation.y) * k
    g.rotation.x += (tx - g.rotation.x) * k
    g.position.y = Math.sin(t * 0.9) * 0.1
  })

  const size = Math.min(4.2, viewport.width * 0.62)
  const s = size / LOGO_H

  return (
    <group ref={group}>
      <mesh geometry={geometry} scale={s} castShadow>
        <meshStandardMaterial attach="material-0" color="#f2f0ea" roughness={0.28} metalness={0.15} />
        <meshStandardMaterial
          attach="material-1"
          color="#ffd400"
          emissive="#ff8a00"
          emissiveIntensity={0.25}
          roughness={0.35}
          metalness={0.55}
        />
      </mesh>
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
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 7]} intensity={2.6} />
      <pointLight position={[-4, 2, 3]} intensity={45} color="#1f4bff" />
      <pointLight position={[4, -3, 2]} intensity={45} color="#8a3dff" />
      <pointLight position={[0, 3, -3]} intensity={25} color="#ffd400" />
      <Logo3D />
      <Tyre position={[-2.9, 2.1, -1.5]} color="#ff2a2a" scale={0.8} />
      <Tyre position={[2.7, -2.2, 0.5]} color="#1f4bff" scale={0.7} speed={1.4} />
      <Tyre position={[2.6, 2.3, -2]} color="#19e36b" scale={0.55} speed={1.1} />
      <Sparkles count={60} scale={[9, 7, 5]} size={2.6} speed={0.4} color="#ffd400" />
    </Canvas>
  )
}
