"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"

// Inline Dashboard3D component
function Dashboard3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1, 100, 200]} scale={1.5} position={[-2, 0, 0]}>
        <MeshDistortMaterial color="#10B981" attach="material" distort={0.3} speed={1} />
      </Sphere>
      <Sphere args={[1, 100, 200]} scale={1.2} position={[2, 0, 0]}>
        <MeshDistortMaterial color="#3B82F6" attach="material" distort={0.2} speed={0.8} />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </>
  )
}

// Inline components
function DashboardHeader({ user, onLogout }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-purple-200">Your cosmic dashboard awaits</p>
          {user?.isSuperkey && (
            <div className="mt-2">
              <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                🔑 Superkey Access
              </span>
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          {user?.isSuperkey && (
            <a
              href="/admin"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Admin Panel
            </a>
          )}
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-2">Total Sessions</h3>
        <p className="text-3xl font-bold text-purple-300">12</p>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-2">Favorite Astrologers</h3>
        <p className="text-3xl font-bold text-blue-300">3</p>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-2">Credits</h3>
        <p className="text-3xl font-bold text-green-300">₹500</p>
      </div>
    </div>
  )
}

function DashboardActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <a
            href="/astrologers"
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
          >
            Browse Astrologers
          </a>
          <a
            href="/chat"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
          >
            Start Chat Session
          </a>
          <a
            href="/payment"
            className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
          >
            Add Credits
          </a>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="text-purple-200">
            <p className="text-sm">Chat with Astrologer Maya</p>
            <p className="text-xs text-purple-300">2 hours ago</p>
          </div>
          <div className="text-purple-200">
            <p className="text-sm">Added ₹200 credits</p>
            <p className="text-xs text-purple-300">1 day ago</p>
          </div>
          <div className="text-purple-200">
            <p className="text-sm">Completed reading session</p>
            <p className="text-xs text-purple-300">3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        router.push("/auth/login")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Dashboard3D />
        </Canvas>
      </div>

      <div className="relative z-10 p-8">
        <DashboardHeader user={user} onLogout={handleLogout} />
        <DashboardStats />
        <DashboardActions />
      </div>
    </div>
  )
}
