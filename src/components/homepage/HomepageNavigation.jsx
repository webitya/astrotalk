"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "@mui/icons-material"
import Link from "next/link"

export default function HomepageNavigation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
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
  )
}
