"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Tetrahedron, MeshDistortMaterial } from "@react-three/drei"
import { Gavel, Assignment, Warning, AccountBalance, Security, Support } from "@mui/icons-material"

function AnimatedTetrahedron() {
  return (
    <Tetrahedron args={[1]}>
      <MeshDistortMaterial color="#f59e0b" attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Tetrahedron>
  )
}

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 5]} />
      <AnimatedTetrahedron />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  )
}

export default function TermsPage() {
  const sections = [
    {
      icon: <Assignment className="w-8 h-8" />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using AstroConnect, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our platform",
        "We reserve the right to modify these terms at any time with notice to users",
        "Continued use of the platform after changes constitutes acceptance of new terms",
        "These terms apply to all users, including astrologers and customers",
      ],
    },
    {
      icon: <AccountBalance className="w-8 h-8" />,
      title: "User Accounts",
      content: [
        "You must be at least 18 years old to create an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must provide accurate and complete information during registration",
        "One person may not maintain multiple accounts without permission",
        "You are responsible for all activities that occur under your account",
        "Notify us immediately of any unauthorized use of your account",
      ],
    },
    {
      icon: <Gavel className="w-8 h-8" />,
      title: "Service Usage",
      content: [
        "Our platform is for entertainment and guidance purposes only",
        "Astrological consultations should not replace professional medical, legal, or financial advice",
        "You may not use the platform for any illegal or unauthorized purpose",
        "Harassment, abuse, or inappropriate behavior towards astrologers is prohibited",
        "You may not attempt to circumvent payment systems or access controls",
        "Sharing account credentials or consultation content is not permitted",
      ],
    },
    {
      icon: <Warning className="w-8 h-8" />,
      title: "Payment Terms",
      content: [
        "All payments are processed securely through our payment partners",
        "Consultation rates are clearly displayed and agreed upon before sessions",
        "Your first 10 minutes are free for new users only",
        "Refunds are subject to our refund policy and may be processed at our discretion",
        "You are responsible for any applicable taxes on your purchases",
        "Wallet credits do not expire but are non-transferable",
      ],
    },
    {
      icon: <Security className="w-8 h-8" />,
      title: "Intellectual Property",
      content: [
        "All content on the platform is owned by AstroConnect or licensed to us",
        "You may not reproduce, distribute, or create derivative works without permission",
        "Astrologers retain rights to their consultation methodologies and techniques",
        "User-generated content may be used by us for service improvement",
        "Trademarks and logos are protected and may not be used without authorization",
        "We respect intellectual property rights and expect users to do the same",
      ],
    },
    {
      icon: <Support className="w-8 h-8" />,
      title: "Limitation of Liability",
      content: [
        "AstroConnect provides the platform 'as is' without warranties of any kind",
        "We are not liable for the accuracy or outcomes of astrological consultations",
        "Our liability is limited to the amount paid for the specific service",
        "We are not responsible for decisions made based on consultations",
        "Force majeure events may affect service availability without liability",
        "Users assume full responsibility for their use of the platform",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Terms of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              {" "}
              Service
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using our astrological consultation platform.
          </p>
          <div className="mt-6 text-gray-400">
            <p>Last updated: January 2024</p>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Agreement Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            These Terms of Service Terms govern your use of the AstroConnect platform and services. By creating an
            account or using our services, you enter into a legally binding agreement with us.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our platform connects users with certified astrologers for consultations and guidance. These terms ensure a
            safe, respectful, and legally compliant environment for all users.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Termination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Account Termination</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">User Termination</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">You may delete your account at any time</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">Unused wallet balance may be refunded</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">Data deletion follows our privacy policy</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Platform Termination</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">We may suspend accounts for violations</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">Notice will be provided when possible</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">Appeals process available for disputes</p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about these Terms of Service or need clarification on any point, please contact
            our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
            >
              Contact Us
            </motion.a>
            <motion.a
              href="mailto:legal@astroconnect.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-amber-900 transition-all duration-300"
            >
              legal@astroconnect.com
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
