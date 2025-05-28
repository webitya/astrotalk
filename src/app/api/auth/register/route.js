import { NextResponse } from "next/server"
import { createUser, findUserByEmail } from "../../../../lib/database.js"
import { generateToken, hashPassword } from "../../../../lib/auth.js"
import { validateUserRegistration } from "../../../../lib/validation.js"
import { sendEmail, generateWelcomeEmail } from "../../../../lib/email.js"
import { ConflictError, ValidationError, handleApiError } from "../../../../lib/errors.js"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate input data
    const validation = validateUserRegistration(body)
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(", "))
    }

    const { name, email, phone, password } = body

    // Check if user already exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      throw new ConflictError("User already exists with this email")
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const newUser = await createUser({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
      isVerified: true,
    })

    // Generate token
    const token = generateToken(newUser)

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to AstroConnect!",
        html: generateWelcomeEmail(name),
      })
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail registration if email fails
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    const response = NextResponse.json(
      {
        message: "Registration successful",
        token,
        user: userWithoutPassword,
      },
      { status: 201 },
    )

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
