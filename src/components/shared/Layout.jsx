"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

export default function Layout({ children, scene3D, background = "from-indigo-900 via-purple-900 to-pink-900" }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${background} relative overflow-hidden`}>
      {scene3D && (
        <div className="absolute inset-0 z-0">
          <Canvas>
            <ambientLight intensity={0.6} />
            <directionalLight position={[0, 0, 5]} />
            {scene3D}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate />
          </Canvas>
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
