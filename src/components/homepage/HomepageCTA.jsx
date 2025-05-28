"use client"

import { motion } from "framer-motion"
import { Chat } from "@mui/icons-material"
import Link from "next/link"

export default function HomepageCTA() {
  return (
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
  )
}
