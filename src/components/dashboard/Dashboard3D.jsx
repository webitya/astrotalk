"use client"

import { Torus, MeshDistortMaterial } from "@react-three/drei"

export default function Dashboard3D() {
  return (
    <Torus args={[1, 0.4, 16, 100]}>
      <MeshDistortMaterial color="#fbbf24" attach="material" distort={0.5} speed={2} roughness={0} />
    </Torus>
  )
}
