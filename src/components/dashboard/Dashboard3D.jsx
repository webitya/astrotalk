"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Torus } from "@react-three/drei"

export default function Dashboard3D() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Torus ref={meshRef} args={[1, 0.4, 16, 100]}>
      <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.5} />
    </Torus>
  )
}
