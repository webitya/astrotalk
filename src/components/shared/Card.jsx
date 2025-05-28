"use client"

import { motion } from "framer-motion"

export default function Card({ children, className = "", hover = true, ...props }) {
  const baseClasses = "bg-white/10 backdrop-blur-lg rounded-xl border border-white/20"
  const hoverClasses = hover ? "hover:bg-white/15 transition-all duration-300" : ""

  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
