"use client"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Text3D, Environment } from "@react-three/drei"
import HomepageNavigation from "@/components/homepage/HomepageNavigation"
import HomepageHero from "@/components/homepage/HomepageHero"
import HomepageFeatures from "@/components/homepage/HomepageFeatures"
import HomepageCTA from "@/components/homepage/HomepageCTA"
import Homepage3D from "@/components/homepage/Homepage3D"

function FloatingCrystal({ position }) {
  return (
    <motion.mesh
      position={position}
      animate={{
        rotateY: [0, Math.PI * 2],
        y: [position[1] - 0.5, position[1] + 0.5, position[1] - 0.5],
      }}
      transition={{
        rotateY: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
    >
      <octahedronGeometry args={[0.5]} />
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.8} />
    </motion.mesh>
  )
}

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <FloatingCrystal position={[-3, 2, -2]} />
      <FloatingCrystal position={[3, -1, -3]} />
      <FloatingCrystal position={[0, 3, -4]} />

      <Text3D font="/fonts/Geist_Bold.json" size={0.8} height={0.1} position={[-2, 0, -2]}>
        AstroConnect
        <meshStandardMaterial color="#fbbf24" />
      </Text3D>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Homepage3D />
      <HomepageNavigation />
      <HomepageHero />
      <HomepageFeatures />
      <HomepageCTA />
    </div>
  )
}
