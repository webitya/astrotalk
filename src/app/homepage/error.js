"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Homepage error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">Something went wrong!</h1>
        <p className="text-gray-300 mb-6">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>

        <button
          onClick={reset}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          Try Again
        </button>

        <Link href="/">
          <button className="w-full py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-900 transition-all duration-300">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  )
}
