"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Icosahedron, MeshDistortMaterial } from "@react-three/drei"
import { ExpandMore, Search, HelpOutline, Payment, Security, Schedule, Chat } from "@mui/icons-material"

function AnimatedIcosahedron() {
  return (
    <Icosahedron args={[1]}>
      <MeshDistortMaterial color="#06b6d4" attach="material" distort={0.4} speed={1.5} roughness={0} />
    </Icosahedron>
  )
}

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 5]} />
      <AnimatedIcosahedron />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  )
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openItems, setOpenItems] = useState([])

  const categories = [
    { id: "all", name: "All Questions", icon: <HelpOutline className="w-5 h-5" /> },
    { id: "general", name: "General", icon: <HelpOutline className="w-5 h-5" /> },
    { id: "payment", name: "Payment", icon: <Payment className="w-5 h-5" /> },
    { id: "booking", name: "Booking", icon: <Schedule className="w-5 h-5" /> },
    { id: "chat", name: "Chat", icon: <Chat className="w-5 h-5" /> },
    { id: "security", name: "Security", icon: <Security className="w-5 h-5" /> },
  ]

  const faqs = [
    {
      id: 1,
      category: "general",
      question: "What is AstroConnect and how does it work?",
      answer:
        "AstroConnect is a platform that connects you with verified astrologers for personalized consultations. You can browse astrologers, book sessions, or start instant chats. Your first 10 minutes are completely free!",
    },
    {
      id: 2,
      category: "general",
      question: "Are your astrologers certified and experienced?",
      answer:
        "Yes, all our astrologers undergo rigorous verification. They have years of experience and certifications in their respective fields like Vedic astrology, numerology, tarot reading, and more.",
    },
    {
      id: 3,
      category: "payment",
      question: "How does the free 10-minute trial work?",
      answer:
        "Every new user gets 10 minutes of free consultation time. You can use this with any available astrologer. After the free time expires, you'll need to recharge your wallet to continue.",
    },
    {
      id: 4,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods through Razorpay including credit/debit cards, UPI, net banking, and digital wallets. All transactions are secure and encrypted.",
    },
    {
      id: 5,
      category: "payment",
      question: "How much do consultations cost?",
      answer:
        "Consultation rates vary by astrologer, typically ranging from ₹15-50 per minute. Each astrologer's rate is clearly displayed on their profile. You only pay for the time you use.",
    },
    {
      id: 6,
      category: "booking",
      question: "Can I book a session for a specific time?",
      answer:
        "Yes, you can book scheduled sessions with astrologers based on their availability. You can also start instant chats if the astrologer is online.",
    },
    {
      id: 7,
      category: "booking",
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule bookings up to 2 hours before the scheduled time. Cancellations made within 2 hours may incur a small fee.",
    },
    {
      id: 8,
      category: "chat",
      question: "How does the live chat feature work?",
      answer:
        "Our live chat allows real-time text communication with astrologers. You can share your concerns, ask questions, and receive instant guidance. Chat history is saved for your reference.",
    },
    {
      id: 9,
      category: "chat",
      question: "Can I share images or documents during chat?",
      answer:
        "Currently, our chat supports text messages. For sharing birth charts or documents, you can describe the details to your astrologer who can guide you accordingly.",
    },
    {
      id: 10,
      category: "security",
      question: "Is my personal information safe?",
      answer:
        "Absolutely. We use advanced encryption to protect your data. Your consultations are completely confidential, and we never share your personal information with third parties.",
    },
    {
      id: 11,
      category: "security",
      question: "Are my conversations with astrologers private?",
      answer:
        "Yes, all conversations are completely private and confidential. Only you and your chosen astrologer can access the chat history.",
    },
    {
      id: 12,
      category: "general",
      question: "What if I'm not satisfied with a consultation?",
      answer:
        "We strive for 100% satisfaction. If you're not happy with a consultation, please contact our support team within 24 hours, and we'll work to resolve the issue.",
    },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Frequently Asked
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Questions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about AstroConnect and our services.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {category.icon}
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
            >
              <motion.button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ExpandMore className="w-6 h-6 text-gray-400" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No questions found</h3>
            <p className="text-gray-300 mb-6">Try adjusting your search or browse different categories</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can not find what you are looking for? Our support team is here to help you 24/7.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
