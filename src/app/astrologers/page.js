"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Star, Schedule, Chat, Language, Search, FilterList, Favorite, FavoriteBorder } from "@mui/icons-material"

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

export default function AstrologersPage() {
  const [astrologers, setAstrologers] = useState([])
  const [filteredAstrologers, setFilteredAstrologers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [favorites, setFavorites] = useState([])

  const mockAstrologers = [
    {
      id: 1,
      name: "Maya Sharma",
      specialty: "Vedic Astrology",
      experience: 15,
      rating: 4.9,
      reviews: 1250,
      languages: ["Hindi", "English"],
      rate: 25,
      isOnline: true,
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Expert in Vedic astrology with deep knowledge of planetary movements and their effects on human life.",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      specialty: "Numerology",
      experience: 12,
      rating: 4.8,
      reviews: 980,
      languages: ["Hindi", "English", "Bengali"],
      rate: 30,
      isOnline: false,
      image: "/placeholder.svg?height=100&width=100",
      description: "Numerology specialist helping people understand their life path through numbers.",
    },
    {
      id: 3,
      name: "Priya Patel",
      specialty: "Tarot Reading",
      experience: 8,
      rating: 4.7,
      reviews: 750,
      languages: ["English", "Gujarati"],
      rate: 20,
      isOnline: true,
      image: "/placeholder.svg?height=100&width=100",
      description: "Intuitive tarot reader providing insights into love, career, and spiritual growth.",
    },
    {
      id: 4,
      name: "Dr. Anil Joshi",
      specialty: "Palmistry",
      experience: 20,
      rating: 4.9,
      reviews: 1500,
      languages: ["Hindi", "English", "Marathi"],
      rate: 35,
      isOnline: true,
      image: "/placeholder.svg?height=100&width=100",
      description: "Renowned palmist with expertise in reading life lines and predicting future events.",
    },
    {
      id: 5,
      name: "Sunita Devi",
      specialty: "Vastu Shastra",
      experience: 18,
      rating: 4.8,
      reviews: 1100,
      languages: ["Hindi", "English"],
      rate: 28,
      isOnline: false,
      image: "/placeholder.svg?height=100&width=100",
      description: "Vastu expert helping create harmonious living and working spaces.",
    },
    {
      id: 6,
      name: "Vikram Singh",
      specialty: "Gemstone Therapy",
      experience: 10,
      rating: 4.6,
      reviews: 650,
      languages: ["Hindi", "English", "Punjabi"],
      rate: 22,
      isOnline: true,
      image: "/placeholder.svg?height=100&width=100",
      description: "Gemstone therapy specialist recommending the right stones for prosperity and health.",
    },
  ]

  const specialties = [
    "all",
    "Vedic Astrology",
    "Numerology",
    "Tarot Reading",
    "Palmistry",
    "Vastu Shastra",
    "Gemstone Therapy",
  ]

  useEffect(() => {
    setAstrologers(mockAstrologers)
    setFilteredAstrologers(mockAstrologers)
  }, [])

  useEffect(() => {
    let filtered = astrologers

    if (searchTerm) {
      filtered = filtered.filter(
        (astrologer) =>
          astrologer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          astrologer.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((astrologer) => astrologer.specialty === selectedSpecialty)
    }

    setFilteredAstrologers(filtered)
  }, [searchTerm, selectedSpecialty, astrologers])

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleBookSession = (astrologer) => {
    // Store selected astrologer and redirect to booking
    localStorage.setItem("selectedAstrologer", JSON.stringify(astrologer))
    window.location.href = "/booking"
  }

  const handleStartChat = (astrologer) => {
    // Store selected astrologer and redirect to chat
    localStorage.setItem("selectedAstrologer", JSON.stringify(astrologer))
    window.location.href = "/chat"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Find Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {" "}
              Perfect{" "}
            </span>
            Astrologer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with certified astrologers for personalized guidance and cosmic insights
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or specialty..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <FilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty} className="bg-gray-800">
                    {specialty === "all" ? "All Specialties" : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAstrologers.map((astrologer, index) => (
            <motion.div
              key={astrologer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative">
                    <Star className="text-white w-8 h-8" />
                    {astrologer.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{astrologer.name}</h3>
                    <p className="text-purple-300 text-sm">{astrologer.specialty}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(astrologer.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  {favorites.includes(astrologer.id) ? (
                    <Favorite className="w-6 h-6 text-red-400" />
                  ) : (
                    <FavoriteBorder className="w-6 h-6" />
                  )}
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-semibold">{astrologer.rating}</span>
                  <span className="text-gray-300 text-sm">({astrologer.reviews})</span>
                </div>
                <div className="text-gray-300 text-sm">{astrologer.experience} years exp.</div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2 mb-4">
                <Language className="w-4 h-4 text-gray-400" />
                <div className="flex gap-2">
                  {astrologer.languages.map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{astrologer.description}</p>

              {/* Rate */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-white">
                  <span className="text-2xl font-bold">₹{astrologer.rate}</span>
                  <span className="text-gray-300 text-sm">/min</span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    astrologer.isOnline ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {astrologer.isOnline ? "Online" : "Offline"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStartChat(astrologer)}
                  disabled={!astrologer.isOnline}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Chat className="w-4 h-4" />
                  Chat Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookSession(astrologer)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Schedule className="w-4 h-4" />
                  Book
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAstrologers.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No astrologers found</h3>
            <p className="text-gray-300">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
