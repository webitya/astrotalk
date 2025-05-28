"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"

export default function Homepage3D() {
  const starsRef = useRef()

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#f5e3b9" />

      {/* Animated stars background */}
      <Stars ref={starsRef} radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />

      {/* Simple glowing sphere */}
      <mesh position={[0, 0, -5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ff7b00" emissive="#ff7b00" emissiveIntensity={0.5} />
      </mesh>
    </>
  )
}
