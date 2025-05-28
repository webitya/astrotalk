import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../../../lib/auth.js"
import { verifyRazorpayPayment } from "../../../../lib/razorpay.js"
import { AuthenticationError, ValidationError, handleApiError } from "../../../../lib/errors.js"

export async function POST(request) {
  try {
    // Authenticate user
    const user = getUserFromRequest(request)
    if (!user) {
      throw new AuthenticationError()
    }

    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new ValidationError("Missing payment verification data")
    }

    // Verify payment signature
    const isValid = verifyRazorpayPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    })

    if (!isValid) {
      throw new ValidationError("Payment verification failed")
    }

    // Update payment status
    // Note: In a real implementation, you'd find the payment by order ID first
    // For now, we'll assume the payment exists and update it

    return NextResponse.json({
      message: "Payment verified successfully",
      verified: true,
    })
  } catch (error) {
    const { message, statusCode } = handleApiError(error)
    return NextResponse.json({ message }, { status: statusCode })
  }
}
