"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Dodecahedron, MeshDistortMaterial } from "@react-three/drei"
import {
  Dashboard,
  People,
  Psychology,
  Chat,
  Payment,
  Analytics,
  Settings,
  TrendingUp,
  Schedule,
} from "@mui/icons-material"

function AnimatedDodecahedron() {
  return (
    <Dodecahedron args={[1]}>
      <MeshDistortMaterial color="#6366f1" attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Dodecahedron>
  )
}

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 5]} />
      <AnimatedDodecahedron />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalAstrologers: 45,
    activeSessions: 23,
    todayRevenue: 15750,
    totalBookings: 890,
    pendingPayments: 12,
  })

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "user_registration",
      message: "New user registered: John Doe",
      timestamp: "2 minutes ago",
      icon: <People className="w-5 h-5" />,
    },
    {
      id: 2,
      type: "payment",
      message: "Payment received: ₹500 from Sarah Wilson",
      timestamp: "5 minutes ago",
      icon: <Payment className="w-5 h-5" />,
    },
    {
      id: 3,
      type: "chat_started",
      message: "Chat session started with Astrologer Maya",
      timestamp: "8 minutes ago",
      icon: <Chat className="w-5 h-5" />,
    },
    {
      id: 4,
      type: "booking",
      message: "New booking: Tarot reading with Priya Patel",
      timestamp: "12 minutes ago",
      icon: <Schedule className="w-5 h-5" />,
    },
  ])

  const dashboardCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <People className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
    },
    {
      title: "Active Astrologers",
      value: stats.totalAstrologers,
      icon: <Psychology className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      change: "+5%",
    },
    {
      title: "Live Sessions",
      value: stats.activeSessions,
      icon: <Chat className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      change: "+18%",
    },
    {
      title: "Today's Revenue",
      value: `₹${stats.todayRevenue.toLocaleString()}`,
      icon: <Payment className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      change: "+25%",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <Schedule className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      change: "+8%",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      change: "-3%",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Dashboard className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300">Manage your astrology platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2 inline" />
                Settings
              </motion.button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {dashboardCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}
                  >
                    {card.icon}
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      card.change.startsWith("+") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {card.change}
                  </div>
                </div>
                <h3 className="text-gray-300 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Analytics className="w-6 h-6" />
                Recent Activities
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.message}</p>
                      <p className="text-gray-400 text-xs">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white text-center hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                >
                  <People className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Manage Users</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  <Psychology className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Manage Astrologers</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white text-center hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                >
                  <Payment className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Payment Reports</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg text-white text-center hover:from-orange-700 hover:to-red-700 transition-all duration-300"
                >
                  <Analytics className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Analytics</div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
