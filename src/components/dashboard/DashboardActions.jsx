"use client"

import { motion } from "framer-motion"
import { Schedule, Chat, Payment, Star } from "@mui/icons-material"
import Link from "next/link"

export default function DashboardActions() {
  const dashboardItems = [
    {
      icon: <Schedule className="w-8 h-8" />,
      title: "Book Session",
      description: "Schedule with an astrologer",
      link: "/astrologers",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: <Chat className="w-8 h-8" />,
      title: "Live Chat",
      description: "Start instant consultation",
      link: "/chat",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <Payment className="w-8 h-8" />,
      title: "Recharge Wallet",
      description: "Add credits to your account",
      link: "/payment",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "My Readings",
      description: "View past consultations",
      link: "/readings",
      color: "from-yellow-500 to-orange-600",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {dashboardItems.map((item, index) => (
        <Link key={index} href={item.link}>
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-br ${item.color} rounded-xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-white/80">{item.description}</p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}
