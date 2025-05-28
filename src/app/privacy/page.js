"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Octahedron, MeshDistortMaterial } from "@react-three/drei"
import { Security, Shield, Lock, Visibility, DataUsage, Policy } from "@mui/icons-material"

function AnimatedOctahedron() {
  return (
    <Octahedron args={[1]}>
      <MeshDistortMaterial color="#10b981" attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Octahedron>
  )
}

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 5]} />
      <AnimatedOctahedron />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  )
}

export default function PrivacyPage() {
  const sections = [
    {
      icon: <DataUsage className="w-8 h-8" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Payment information processed securely through our payment partners",
        "Consultation history and chat logs for service improvement",
        "Device information and usage analytics to enhance user experience",
        "Birth details and personal questions shared during consultations",
      ],
    },
    {
      icon: <Visibility className="w-8 h-8" />,
      title: "How We Use Your Information",
      content: [
        "To provide personalized astrological consultations and services",
        "To process payments and manage your account",
        "To communicate with you about your bookings and account updates",
        "To improve our services and develop new features",
        "To ensure platform security and prevent fraudulent activities",
        "To comply with legal obligations and resolve disputes",
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Information Sharing",
      content: [
        "We never sell your personal information to third parties",
        "Consultation details are only shared with your chosen astrologer",
        "Payment information is processed by secure third-party payment processors",
        "We may share anonymized data for research and analytics purposes",
        "Legal authorities may access information when required by law",
        "Service providers who help us operate the platform under strict confidentiality",
      ],
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Data Security",
      content: [
        "All data is encrypted in transit and at rest using industry-standard protocols",
        "Regular security audits and vulnerability assessments",
        "Secure data centers with 24/7 monitoring and access controls",
        "Employee access to personal data is strictly limited and monitored",
        "Regular backups ensure data availability and disaster recovery",
        "Compliance with international data protection standards",
      ],
    },
    {
      icon: <Policy className="w-8 h-8" />,
      title: "Your Rights",
      content: [
        "Access and download your personal data at any time",
        "Request correction of inaccurate or incomplete information",
        "Delete your account and associated data (subject to legal requirements)",
        "Opt-out of marketing communications while maintaining service access",
        "Data portability to transfer your information to another service",
        "Lodge complaints with relevant data protection authorities",
      ],
    },
    {
      icon: <Security className="w-8 h-8" />,
      title: "Cookies and Tracking",
      content: [
        "Essential cookies for platform functionality and security",
        "Analytics cookies to understand user behavior and improve services",
        "Preference cookies to remember your settings and choices",
        "You can control cookie settings through your browser",
        "Third-party cookies from payment processors and analytics providers",
        "No tracking for advertising purposes without explicit consent",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Privacy
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              {" "}
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
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
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            At AstroConnect, we understand that your personal information is sensitive and important to you. This
            Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
            astrological consultation platform.
          </p>
          <p className="text-gray-300 leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance with this policy. We
            are committed to protecting your privacy and ensuring the security of your personal data at all times.
          </p>
        </motion.div>

        {/* Privacy Sections */}
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
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Data Retention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We retain your personal information only for as long as necessary to provide our services and fulfill the
            purposes outlined in this privacy policy. Specific retention periods include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Account Information</h3>
              <p className="text-gray-300 text-sm">Retained until account deletion or 3 years of inactivity</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Consultation Records</h3>
              <p className="text-gray-300 text-sm">Retained for 2 years for service quality and legal compliance</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Payment Information</h3>
              <p className="text-gray-300 text-sm">Processed by payment partners, not stored on our servers</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Analytics Data</h3>
              <p className="text-gray-300 text-sm">Anonymized data retained for up to 5 years for research</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 bg-gradient-to-r from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact
            us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300"
            >
              Contact Us
            </motion.a>
            <motion.a
              href="mailto:privacy@astroconnect.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-emerald-900 transition-all duration-300"
            >
              privacy@astroconnect.com
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
