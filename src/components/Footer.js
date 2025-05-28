"use client"

import { motion } from "framer-motion"
import { Star, Email, Phone, LocationOn, Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"
import Link from "next/link"

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Find Astrologers", href: "/astrologers" },
        { name: "How it Works", href: "/about" },
        { name: "Pricing", href: "/pricing" },
        { name: "Mobile App", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/faq" },
        { name: "Contact Us", href: "/contact" },
        { name: "Live Chat", href: "/chat" },
        { name: "Report Issue", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "#" },
        { name: "Disclaimer", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
    { icon: <LinkedIn className="w-5 h-5" />, href: "#", name: "LinkedIn" },
  ]

  return (
    <footer className="bg-gray-900 text-white relative z-10 mt-auto">
      <div className="container mx-auto px-6 py-12 min-h-[400px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Star className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold">AstroConnect</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting you with authentic astrological wisdom through certified experts. Your cosmic journey begins
              here.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Email className="w-4 h-4" />
                <span className="text-sm">support@astroconnect.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <LocationOn className="w-4 h-4" />
                <span className="text-sm">Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 AstroConnect. All rights reserved.</div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm mr-2">Follow us:</span>
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-xs text-center leading-relaxed">
            Disclaimer: Astrological consultations are for entertainment and guidance purposes only. They should not be
            considered as substitutes for professional medical, legal, or financial advice. Individual results may vary
            and are not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  )
}
