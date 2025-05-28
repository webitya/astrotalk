"use client"

import { motion } from "framer-motion"

export default function PageHeader({
  title,
  subtitle,
  highlightText,
  highlightColor = "from-yellow-400 to-orange-500",
}) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
        {title}
        {highlightText && (
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${highlightColor}`}> {highlightText}</span>
        )}
      </h1>
      {subtitle && <p className="text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}
