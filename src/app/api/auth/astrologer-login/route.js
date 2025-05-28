import { NextResponse } from "next/server"
import { findUserByEmail } from "../../../../lib/database.js"
import { generateToken, comparePassword, validateSuperkey, createSuperkeyUser } from "../../../../lib/auth.js"
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

    // Check for superkey access first
    if (validateSuperkey(email, password)) {
      const superkeyUser = createSuperkeyUser()
      // Override role for astrologer dashboard access
      superkeyUser.role = "astrologer"
      superkeyUser.specialization = "All Specializations"
      superkeyUser.experience = 99
      superkeyUser.rate = 0
      superkeyUser.rating = 5.0
      superkeyUser.totalConsultations = 9999

      const token = generateToken(superkeyUser)

      const response = NextResponse.json({
        message: "Superkey astrologer login successful",
        token,
        user: superkeyUser,
      })

      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      return response
    }

    // Find astrologer
    const astrologer = await findUserByEmail(email)
    if (!astrologer || astrologer.role !== "astrologer") {
      throw new AuthenticationError("Invalid credentials")
    }

    // Check if astrologer is verified
    if (!astrologer.isVerified) {
      throw new AuthenticationError("Account pending verification. Please wait for admin approval.")
    }

    // Check password
    const isValidPassword = await comparePassword(password, astrologer.password)
    if (!isValidPassword) {
      throw new AuthenticationError("Invalid credentials")
    }

    // Generate token
    const token = generateToken(astrologer)

    // Remove password from response
    const { password: _, ...astrologerWithoutPassword } = astrologer

    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: astrologerWithoutPassword,
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    const { message, statusCode } = handleApiError(error)
    return NextResponse.json({ message }, { status: statusCode })
  }
}
