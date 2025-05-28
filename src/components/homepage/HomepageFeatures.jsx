"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Psychology, Schedule, Chat, Payment } from "@mui/icons-material"

export default function HomepageFeatures() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
  )
}
