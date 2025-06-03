"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

export default function AuthLayout({ children, scene3D }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {scene3D && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Canvas dpr={[1, 2]} gl={{ antialias: true }} aria-hidden="true">
            <ambientLight intensity={0.8} />
            <directionalLight position={[0, 0, 5]} />
            {scene3D}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      )}

      {/* Optional gradient overlay */}
      {/* <div className="absolute inset-0 bg-black/30 z-[1]" /> */}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  )
}
