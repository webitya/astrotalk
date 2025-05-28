"use client"

import { motion } from "framer-motion"
import { SearchOff, Home } from "@mui/icons-material"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md w-full border border-white/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <SearchOff className="w-8 h-8 text-white" />
        </motion.div>

        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-6">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
