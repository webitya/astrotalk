"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import { Send, Timer, Star, Phone, VideoCall, MoreVert, EmojiEmotions } from "@mui/icons-material"

function FloatingSphere({ position, color }) {
  return (
    <Sphere args={[0.5, 32, 32]} position={position}>
      <meshStandardMaterial color={color} attach="material" roughness={0} transparent opacity={0.6} />
    </Sphere>
  )
}

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 0, 5]} />
      <FloatingSphere position={[-2, 1, -3]} color="#8b5cf6" />
      <FloatingSphere position={[2, -1, -2]} color="#ec4899" />
      <FloatingSphere position={[0, 2, -4]} color="#06b6d4" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "astrologer",
      text: "Welcome! I'm Astrologer Maya. I'm here to guide you through your cosmic journey. Your first 10 minutes are free!",
      timestamp: new Date(Date.now() - 300000),
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [freeMinutesLeft, setFreeMinutesLeft] = useState(10)
  const [sessionActive, setSessionActive] = useState(true)
  const [walletBalance, setWalletBalance] = useState(250)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (sessionActive && freeMinutesLeft > 0) {
      const timer = setInterval(() => {
        setFreeMinutesLeft((prev) => {
          if (prev <= 1) {
            setSessionActive(false)
            return 0
          }
          return prev - 1
        })
      }, 60000) // 1 minute intervals

      return () => clearInterval(timer)
    }
  }, [sessionActive, freeMinutesLeft])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate astrologer response
    setTimeout(() => {
      const responses = [
        "I sense strong cosmic energy around you. Tell me more about what's troubling you.",
        "The stars are aligning in your favor. This is a time of great transformation.",
        "Your aura shows signs of recent challenges. Let's explore this together.",
        "I see opportunities coming your way. The universe has plans for you.",
        "Your chakras need balancing. I can guide you through this process.",
      ]

      const astrologerMessage = {
        id: messages.length + 2,
        sender: "astrologer",
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setMessages((prev) => [...prev, astrologerMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleRecharge = () => {
    // Redirect to payment page
    window.location.href = "/payment"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star className="text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Astrologer Maya</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white text-sm">
                  {freeMinutesLeft > 0 ? (
                    <span className="text-green-400">Free: {freeMinutesLeft}m left</span>
                  ) : (
                    <span className="text-yellow-400">₹{walletBalance} balance</span>
                  )}
                </div>
                <div className="text-gray-300 text-xs">₹2/min after free time</div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <VideoCall className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <MoreVert className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-3 max-w-xs lg:max-w-md ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.sender === "astrologer" && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="text-white w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-4 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/10 backdrop-blur-lg text-white border border-white/20"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex gap-3 max-w-xs lg:max-w-md">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="text-white w-4 h-4" />
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Payment Warning */}
        {freeMinutesLeft === 0 && sessionActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Timer className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Free time expired!</div>
                  <div className="text-sm opacity-90">Recharge to continue chatting</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecharge}
                className="px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Recharge Now
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Input */}
        <div className="bg-black/20 backdrop-blur-lg border-t border-white/10 p-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <EmojiEmotions className="w-6 h-6" />
            </motion.button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={
                  freeMinutesLeft > 0 || walletBalance > 0 ? "Type your message..." : "Recharge to continue..."
                }
                disabled={freeMinutesLeft === 0 && walletBalance === 0}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || (freeMinutesLeft === 0 && walletBalance === 0)}
              className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
