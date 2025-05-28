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
      const token = generateToken(superkeyUser)

      const response = NextResponse.json({
        message: "Superkey login successful",
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

    // Find user
    const user = await findUserByEmail(email)
    if (!user || user.role !== "user") {
      throw new AuthenticationError("Invalid credentials")
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      throw new AuthenticationError("Invalid credentials")
    }

    // Generate token
    const token = generateToken(user)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
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
