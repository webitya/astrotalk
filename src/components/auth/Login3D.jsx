"use client"

import { Sphere, MeshDistortMaterial } from "@react-three/drei"

export default function Login3D() {
  return (
    <Sphere args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Sphere>
  )
}
