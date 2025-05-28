"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { ErrorOutline, Refresh } from "@mui/icons-material"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md w-full border border-white/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ErrorOutline className="w-8 h-8 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-4">Something went wrong!</h1>
        <p className="text-gray-300 mb-6">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Refresh className="w-5 h-5" />
          Try Again
        </motion.button>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block mt-4 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-900 transition-all duration-300"
        >
          Go Home
        </motion.a>
      </motion.div>
    </div>
  )
}
