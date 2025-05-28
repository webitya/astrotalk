import { NextResponse } from "next/server"
import { validateSuperkey, generateSuperkeyUser, generateToken } from "../../../../lib/auth.js"
import { validateUserLogin } from "../../../../lib/validation.js"
import { AuthenticationError, ValidationError, handleApiError } from "../../../../lib/errors.js"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate input data
    const validation = validateUserLogin(body)
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(", "))
    }

    const { email, password } = body

    // Check for superkey access (only superkey can access admin)
    if (validateSuperkey(email, password)) {
      const superkeyUser = generateSuperkeyUser("admin")
      const token = generateToken(superkeyUser)

      const response = NextResponse.json({
        message: "Admin login successful",
        token,
        user: superkeyUser,
      })

      // Set HTTP-only cookie
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      return response
    }

    throw new AuthenticationError("Invalid admin credentials")
  } catch (error) {
    const { message, statusCode } = handleApiError(error)
    return NextResponse.json({ message }, { status: statusCode })
  }
}
