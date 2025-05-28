"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Cylinder } from "@react-three/drei"
import { Payment, AccountBalanceWallet, CreditCard, Security, CheckCircle, Star } from "@mui/icons-material"

function AnimatedCylinder() {
  return (
    <Cylinder args={[1, 1, 2, 32]}>
      <meshStandardMaterial color="#10b981" attach="material" />
    </Cylinder>
  )
}

function Scene3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 5]} />
      <AnimatedCylinder />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  )
}

export default function PaymentPage() {
  const [selectedAmount, setSelectedAmount] = useState(500)
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const predefinedAmounts = [100, 250, 500, 1000, 2000, 5000]

  const handleRazorpayPayment = async () => {
    setIsProcessing(true)

    try {
      // Create order on backend
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: customAmount || selectedAmount,
        }),
      })

      const order = await response.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AstroConnect",
        description: "Wallet Recharge",
        order_id: order.id,
        handler: async (response) => {
          // Verify payment on backend
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          if (verifyResponse.ok) {
            setPaymentSuccess(true)
            setTimeout(() => {
              window.location.href = "/dashboard"
            }, 3000)
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#8b5cf6",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 relative overflow-hidden flex items-center justify-center">
        <Scene3D />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-300 mb-6">₹{customAmount || selectedAmount} has been added to your wallet</p>
          <p className="text-gray-400">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      <Scene3D />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <AccountBalanceWallet className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Recharge Wallet</h1>
            <p className="text-gray-300">Add credits to continue your cosmic journey</p>
          </div>

          {/* Current Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-6 text-center"
          >
            <div className="text-white/80 text-sm">Current Balance</div>
            <div className="text-2xl font-bold text-white">₹250</div>
          </motion.div>

          {/* Amount Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <label className="block text-white text-sm font-medium mb-3">Select Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedAmount(amount)
                    setCustomAmount("")
                  }}
                  className={`p-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedAmount === amount && !customAmount
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  ₹{amount}
                </motion.button>
              ))}
            </div>

            <div className="relative">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(0)
                }}
                placeholder="Enter custom amount"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <label className="block text-white text-sm font-medium mb-3">Payment Method</label>
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-center gap-3">
              <CreditCard className="text-purple-400 w-6 h-6" />
              <div className="flex-1">
                <div className="text-white font-medium">Razorpay</div>
                <div className="text-gray-300 text-sm">Credit/Debit Card, UPI, Net Banking</div>
              </div>
              <Security className="text-green-400 w-5 h-5" />
            </div>
          </motion.div>

          {/* Bonus Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-400 w-5 h-5" />
              <span className="text-yellow-400 font-semibold">Bonus Offer!</span>
            </div>
            <p className="text-white text-sm">Get 10% extra credits on recharge of ₹1000 or more</p>
          </motion.div>

          {/* Pay Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRazorpayPayment}
            disabled={isProcessing || (!selectedAmount && !customAmount)}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Payment className="w-5 h-5" />
                Pay ₹{customAmount || selectedAmount}
              </>
            )}
          </motion.button>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
              <Security className="w-4 h-4" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
