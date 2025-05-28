"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HomepageHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative z-10 container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          Discover Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> Cosmic </span>
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
    </div>
  )
}
