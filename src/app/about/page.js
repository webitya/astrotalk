"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Text3D, Environment } from "@react-three/drei"
import { Psychology, Star, People, Security, Verified, TrendingUp, Favorite, EmojiEvents } from "@mui/icons-material"

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <Environment preset="night" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Text3D font="/fonts/Geist_Bold.json" size={0.6} height={0.1} position={[-2, 1, -3]}>
        Our Story
        <meshStandardMaterial color="#fbbf24" />
      </Text3D>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </Canvas>
  )
}

export default function AboutPage() {
  const stats = [
    { number: "10,000+", label: "Happy Users", icon: <People className="w-8 h-8" /> },
    { number: "500+", label: "Expert Astrologers", icon: <Psychology className="w-8 h-8" /> },
    { number: "50,000+", label: "Consultations", icon: <Star className="w-8 h-8" /> },
    { number: "4.9/5", label: "User Rating", icon: <EmojiEvents className="w-8 h-8" /> },
  ]

  const values = [
    {
      icon: <Psychology className="w-12 h-12" />,
      title: "Authentic Guidance",
      description:
        "We connect you with certified astrologers who provide genuine, personalized insights based on ancient wisdom and modern understanding.",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: <Security className="w-12 h-12" />,
      title: "Privacy & Security",
      description:
        "Your personal information and consultations are completely confidential. We use advanced encryption to protect your data.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Verified className="w-12 h-12" />,
      title: "Verified Experts",
      description:
        "All our astrologers undergo rigorous verification and have years of experience in their respective fields of expertise.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Favorite className="w-12 h-12" />,
      title: "Compassionate Care",
      description:
        "We believe in providing guidance with empathy and understanding, helping you navigate life's challenges with confidence.",
      color: "from-pink-500 to-rose-600",
    },
  ]

  const team = [
    {
      name: "Rajesh Sharma",
      role: "Founder & CEO",
      experience: "20+ years in Vedic Astrology",
      image: "/placeholder.svg?height=150&width=150",
      description: "Visionary leader with deep knowledge of ancient astrological sciences.",
    },
    {
      name: "Dr. Priya Patel",
      role: "Chief Astrologer",
      experience: "15+ years in Numerology & Tarot",
      image: "/placeholder.svg?height=150&width=150",
      description: "Expert in multiple divination arts with a PhD in Astrological Studies.",
    },
    {
      name: "Amit Kumar",
      role: "Head of Technology",
      experience: "12+ years in Tech",
      image: "/placeholder.svg?height=150&width=150",
      description: "Technology enthusiast bringing ancient wisdom to the digital age.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {" "}
              AstroConnect
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bridging ancient wisdom with modern technology to provide authentic astrological guidance for your life's
            most important decisions.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20"
            >
              <div className="text-yellow-400 mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-16 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                AstroConnect was born from a simple belief: everyone deserves access to authentic astrological guidance,
                regardless of their location or background. Founded in 2020 by a team of experienced astrologers and
                technology enthusiasts, we set out to create a platform that honors the ancient traditions of astrology
                while embracing the convenience of modern technology.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our journey began when our founder, Rajesh Sharma, realized that many people were struggling to find
                genuine astrological guidance in an increasingly digital world. With over two decades of experience in
                Vedic astrology, he envisioned a platform where seekers could connect with verified experts from the
                comfort of their homes.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, AstroConnect serves thousands of users worldwide, providing them with personalized insights,
                guidance, and support through life's challenges and opportunities. We're proud to be at the forefront of
                digital astrology, maintaining the authenticity and depth of traditional practices while making them
                accessible to a global audience.
              </p>
            </div>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-center"
              >
                <TrendingUp className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/90">
                  To democratize access to authentic astrological wisdom and empower individuals to make informed
                  decisions about their lives through personalized cosmic guidance.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Psychology className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-purple-300 font-medium mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm mb-3">{member.experience}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users who have found clarity and direction through our platform. Your cosmic
            guidance awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/astrologers"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Find Your Astrologer
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
