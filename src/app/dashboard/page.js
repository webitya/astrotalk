"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardStats from "@/components/dashboard/DashboardStats"
import DashboardActions from "@/components/dashboard/DashboardActions"
import Dashboard3D from "@/components/dashboard/Dashboard3D"
import Chat from "@/components/icons/Chat" // Import Chat component
import Payment from "@/components/icons/Payment" // Import Payment component

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalSessions: 0,
    freeMinutesLeft: 10,
    totalSpent: 0,
    favoriteAstrologers: 0,
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <DashboardLayout scene3D={<Dashboard3D />}>
      <DashboardHeader user={user} />

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-xl text-gray-300">Your cosmic journey continues here</p>
        </motion.div>

        <DashboardStats stats={stats} />
        <DashboardActions />

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Chat className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold">Chat with Astrologer Maya</div>
                <div className="text-gray-300 text-sm">2 hours ago • 15 minutes</div>
              </div>
              <div className="text-green-400 font-semibold">Completed</div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Payment className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold">Wallet Recharged</div>
                <div className="text-gray-300 text-sm">1 day ago • ₹500</div>
              </div>
              <div className="text-blue-400 font-semibold">Success</div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
