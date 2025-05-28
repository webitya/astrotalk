"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner({ size = "w-8 h-8", color = "border-purple-500" }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className={`${size} border-2 ${color} border-t-transparent rounded-full`}
    />
  )
}
