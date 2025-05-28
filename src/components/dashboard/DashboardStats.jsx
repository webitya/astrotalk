"use client"

import { motion } from "framer-motion"

export default function DashboardStats({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="text-3xl font-bold text-white mb-2">{stats.totalSessions}</div>
        <div className="text-gray-300">Total Sessions</div>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="text-3xl font-bold text-green-400 mb-2">{stats.freeMinutesLeft}</div>
        <div className="text-gray-300">Free Minutes Left</div>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="text-3xl font-bold text-yellow-400 mb-2">₹{stats.totalSpent}</div>
        <div className="text-gray-300">Total Spent</div>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="text-3xl font-bold text-purple-400 mb-2">{stats.favoriteAstrologers}</div>
        <div className="text-gray-300">Favorite Astrologers</div>
      </div>
    </motion.div>
  )
}
