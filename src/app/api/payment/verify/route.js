import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature === razorpay_signature) {
      // Payment is verified
      // Here you would typically:
      // 1. Update user's wallet balance in database
      // 2. Create a transaction record
      // 3. Send confirmation email

      return NextResponse.json({
        message: "Payment verified successfully",
        verified: true,
      })
    } else {
      return NextResponse.json({ message: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
