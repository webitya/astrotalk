import Razorpay from "razorpay"
import crypto from "crypto"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function createRazorpayOrder(options) {
  try {
    const order = await razorpay.orders.create({
      amount: options.amount * 100, // Convert to paise
      currency: options.currency || "INR",
      receipt: options.receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    })
    return { success: true, order }
  } catch (error) {
    console.error("Razorpay order creation failed:", error)
    return { success: false, error: "Failed to create payment order" }
  }
}

export function verifyRazorpayPayment(options) {
  try {
    const body = options.razorpay_order_id + "|" + options.razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    return expectedSignature === options.razorpay_signature
  } catch (error) {
    console.error("Payment verification failed:", error)
    return false
  }
}
