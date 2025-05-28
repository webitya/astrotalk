"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Torus, Environment } from "@react-three/drei"
import { useRouter } from "next/navigation"
import {
  Psychology,
  Chat,
  Schedule,
  Payment,
  Star,
  TrendingUp,
  People,
  AccessTime,
  ExitToApp,
} from "@mui/icons-material"

function AnimatedTorus() {
  return (
    <Torus args={[1, 0.4, 16, 100]}>
      <meshStandardMaterial color="#fbbf24" attach="material" />
    </Torus>
  )
}

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <AnimatedTorus />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  )
}

export default function AstrologerDashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalConsultations: 156,
    todayEarnings: 2450,
    monthlyEarnings: 45600,
    rating: 4.8,
    activeChats: 3,
    pendingBookings: 7,
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role === "astrologer") {
        setUser(parsedUser)
      } else {
        router.push("/auth/astrologer-login")
      }
    } else {
      router.push("/auth/astrologer-login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  const dashboardCards = [
    {
      title: "Total Consultations",
      value: stats.totalConsultations,
      icon: <People className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
    },
    {
      title: "Today's Earnings",
      value: `₹${stats.todayEarnings}`,
      icon: <Payment className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      change: "+18%",
    },
    {
      title: "Monthly Earnings",
      value: `₹${stats.monthlyEarnings}`,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      change: "+25%",
    },
    {
      title: "Rating",
      value: `${stats.rating}/5`,
      icon: <Star className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      change: "+0.2",
    },
  ]

  const quickActions = [
    {
      title: "Active Chats",
      value: stats.activeChats,
      action: "View Chats",
      color: "from-green-600 to-emerald-600",
      icon: <Chat className="w-6 h-6" />,
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      action: "View Bookings",
      color: "from-blue-600 to-cyan-600",
      icon: <Schedule className="w-6 h-6" />,
    },
    {
      title: "Go Online",
      value: user.isOnline ? "Online" : "Offline",
      action: user.isOnline ? "Go Offline" : "Go Online",
      color: user.isOnline ? "from-red-600 to-pink-600" : "from-green-600 to-emerald-600",
      icon: <AccessTime className="w-6 h-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10">
        {/* Header */}
        <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                <Psychology className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Astrologer Dashboard</h1>
                <p className="text-gray-300">Welcome back, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-white text-right">
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-300">{user.specialization}</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Psychology className="text-white" />
              </div>
              <button onClick={handleLogout} className="p-2 text-gray-300 hover:text-white transition-colors">
                <ExitToApp />
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome back, {user.name.split(" ")[0]}!</h1>
            <p className="text-xl text-gray-300">Ready to guide souls on their cosmic journey?</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
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

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}
                  >
                    {action.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{action.value}</div>
                </div>
                <h3 className="text-white font-semibold mb-2">{action.title}</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 bg-gradient-to-r ${action.color} text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300`}
                >
                  {action.action}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Consultations</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Chat className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">Chat with Sarah Wilson</div>
                  <div className="text-gray-300 text-sm">1 hour ago • 25 minutes • ₹625</div>
                </div>
                <div className="text-green-400 font-semibold">Completed</div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Schedule className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">Scheduled Session with John Doe</div>
                  <div className="text-gray-300 text-sm">2 hours ago • 30 minutes • ₹750</div>
                </div>
                <div className="text-blue-400 font-semibold">Completed</div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Chat className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">Chat with Mike Johnson</div>
                  <div className="text-gray-300 text-sm">3 hours ago • 20 minutes • ₹500</div>
                </div>
                <div className="text-green-400 font-semibold">Completed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
