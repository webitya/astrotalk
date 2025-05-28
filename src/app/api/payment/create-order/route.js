import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../../../lib/auth.js"
import { createRazorpayOrder } from "../../../../lib/razorpay.js"
import { createPayment } from "../../../../lib/database.js"
import { validatePayment } from "../../../../lib/validation.js"
import { AuthenticationError, ValidationError, handleApiError } from "../../../../lib/errors.js"

export async function POST(request) {
  try {
    // Authenticate user
    const user = getUserFromRequest(request)
    if (!user) {
      throw new AuthenticationError()
    }

    const body = await request.json()

    // Validate input data
    const validation = validatePayment(body)
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(", "))
    }

    const { amount } = body

    // Create Razorpay order
    const orderResult = await createRazorpayOrder({
      amount,
      receipt: `recharge_${user.userId}_${Date.now()}`,
    })

    if (!orderResult.success) {
      throw new Error(orderResult.error)
    }

    // Create payment record
    await createPayment({
      userId: user.userId,
      amount,
      type: "recharge",
      status: "pending",
      razorpayOrderId: orderResult.order.id,
    })

    return NextResponse.json({
      id: orderResult.order.id,
      amount: orderResult.order.amount,
      currency: orderResult.order.currency,
    })
  } catch (error) {
    const { message, statusCode } = handleApiError(error)
    return NextResponse.json({ message }, { status: statusCode })
  }
}
