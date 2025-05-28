"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import HomepageNavigation from "../../components/homepage/HomepageNavigation"
import HomepageHero from "../../components/homepage/HomepageHero"
import HomepageFeatures from "../../components/homepage/HomepageFeatures"
import HomepageCTA from "../../components/homepage/HomepageCTA"
import Homepage3D from "../../components/homepage/Homepage3D"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 30% 20%, rgba(76, 29, 149, 0.8) 0%, rgba(30, 58, 138, 0.4) 50%, rgba(79, 70, 229, 0.2) 100%)",
            "radial-gradient(circle at 70% 60%, rgba(76, 29, 149, 0.8) 0%, rgba(30, 58, 138, 0.4) 50%, rgba(79, 70, 229, 0.2) 100%)",
            "radial-gradient(circle at 40% 80%, rgba(76, 29, 149, 0.8) 0%, rgba(30, 58, 138, 0.4) 50%, rgba(79, 70, 229, 0.2) 100%)",
            "radial-gradient(circle at 30% 20%, rgba(76, 29, 149, 0.8) 0%, rgba(30, 58, 138, 0.4) 50%, rgba(79, 70, 229, 0.2) 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Homepage3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <HomepageNavigation />
      <HomepageHero />
      <HomepageFeatures />
      <HomepageCTA />
    </div>
  )
}
