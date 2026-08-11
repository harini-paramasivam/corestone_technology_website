import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus } from '@react-three/drei'

function DriftingRing() {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.08
    ref.current.rotation.y += delta * 0.12
  })
  return (
    <Torus ref={ref} args={[1, 0.28, 24, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#10b981" emissive="#047857" roughness={0.35} metalness={0.5} />
    </Torus>
  )
}

/**
 * Tiny, subtle, optimized Three.js accent sitting behind the hero
 * dashboard mockup. Kept intentionally minimal (one primitive, low poly
 * count, no postprocessing) since this loads on every visit to "/".
 */
export default function HeroAccent() {
  return (
    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 opacity-70">
      <Canvas camera={{ position: [0, 0, 3.4], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <DriftingRing />
      </Canvas>
    </div>
  )
}
