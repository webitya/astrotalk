"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Button from "./shared/Button";


export function Navigation() {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const getDashboardLink = () => {
    if (!user) return "/auth/login"

    if (user.isSuperkey) {
      // Superkey users can access any dashboard
      return "/admin"
    }

    switch (user.role) {
      case "astrologer":
        return "/astrologer/dashboard"
      case "admin":
        return "/admin"
      default:
        return "/dashboard"
    }
  }

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-yellow-600">
              AstroConnect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-gray-600  px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/astrologers"
                className="text-gray-400 hover:text-gray-600  px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Astrologers
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-gray-600  px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </Link>

              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href={getDashboardLink()}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {user.isSuperkey ? "Admin Panel" : "Dashboard"}
                  </Link>
                  <span className="text-gray-300 text-sm">{user.isSuperkey ? "Super Admin" : user.name}</span>
                  <Button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/login"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/admin-login"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors"
                  >
                    Admin
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/10 backdrop-blur-lg rounded-lg mt-2">
              <Link
                href="/"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="/astrologers"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Astrologers
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {user.isSuperkey ? "Admin Panel" : "Dashboard"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    Logout ({user.isSuperkey ? "Super Admin" : user.name})
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/admin-login"
                    className="text-yellow-400 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Admin Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
