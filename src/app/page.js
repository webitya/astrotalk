"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Text3D, Environment } from "@react-three/drei"
import { Star, Psychology, Schedule, Payment, Chat } from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    router.push("/homepage")
  }, [router])

  const features = [
    {
      icon: <Psychology className="w-8 h-8" />,
      title: "Expert Astrologers",
      description: "Connect with certified astrologers worldwide",
    },
    {
      icon: <Schedule className="w-8 h-8" />,
      title: "Instant Booking",
      description: "Book sessions instantly, 24/7 availability",
    },
    {
      icon: <Chat className="w-8 h-8" />,
      title: "Live Chat",
      description: "Real-time chat with your astrologer",
    },
    {
      icon: <Payment className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Scene3D />

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
          className="text-2xl font-bold text-white flex items-center gap-2"
        >
          <Star className="text-yellow-400" />
          AstroConnect
        </motion.div>

        <div className="flex gap-4">
          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-purple-900 transition-all duration-300"
            >
              Login
            </motion.button>
          </Link>
          <Link href="/auth/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-yellow-400 text-purple-900 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Discover Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {" "}
              Cosmic{" "}
            </span>
            Destiny
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with expert astrologers for personalized readings, guidance, and cosmic insights. Your first 10
            minutes are absolutely free!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/astrologers">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Find Your Astrologer
              </motion.button>
            </Link>
            <Link href="/auth/astrologer-register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:text-purple-900 transition-all duration-300"
              >
                Become an Astrologer
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20"
            >
              <div className="text-yellow-400 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 z-20"
      >
        <Link href="/chat">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl"
          >
            <Chat className="w-8 h-8" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
