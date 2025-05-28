"use client"

import { Dashboard, Person, ExitToApp } from "@mui/icons-material"
import { useRouter } from "next/navigation"

export default function DashboardHeader({ user }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <nav className="relative z-10 p-6 flex justify-between items-center bg-black/20 backdrop-blur-lg">
      <div className="text-2xl font-bold text-white flex items-center gap-2">
        <Dashboard className="text-yellow-400" />
        Dashboard
      </div>

      <div className="flex items-center gap-4">
        <div className="text-white text-right">
          <div className="font-semibold">{user?.name}</div>
          <div className="text-sm text-gray-300">{user?.email}</div>
        </div>
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Person className="text-white" />
        </div>
        <button onClick={handleLogout} className="p-2 text-gray-300 hover:text-white transition-colors">
          <ExitToApp />
        </button>
      </div>
    </nav>
  )
}
