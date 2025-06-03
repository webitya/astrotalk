export const runtime = 'nodejs' // 👈 Ensure Node.js runtime for compatibility with nodemailer

import { NextResponse } from "next/server"
import { createUser, findUserByEmail } from "../../../../lib/database.js"
import { hashPassword } from "../../../../lib/auth.js"
import { validateAstrologerRegistration } from "../../../../lib/validation.js"
import { sendEmail, generateAstrologerApplicationEmail } from "../../../../lib/email.js"
import { ConflictError, ValidationError, handleApiError } from "../../../../lib/errors.js"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate input data
    const validation = validateAstrologerRegistration(body)
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(", "))
    }

    const { name, email, phone, password, specialization, experience, rate, qualification, bio } = body

    // Check if astrologer already exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      throw new ConflictError("Application already exists with this email")
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create astrologer application
    const newAstrologer = await createUser({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "astrologer",
      isVerified: false,
      isOnline: false,
      specialization,
      experience,
      rate,
      qualification,
      bio,
      rating: 0,
      totalConsultations: 0,
    })

    // Send application confirmation and admin notification emails
    try {
      await sendEmail({
        to: email,
        subject: "Astrologer Application Received - AstroConnect",
        html: generateAstrologerApplicationEmail(name),
      })

      if (process.env.ADMIN_EMAIL) {
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: "New Astrologer Application - AstroConnect",
          html: `
            <h2>New Astrologer Application</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Specialization:</strong> ${specialization}</p>
            <p><strong>Experience:</strong> ${experience} years</p>
            <p><strong>Rate:</strong> ₹${rate}/min</p>
            <p><strong>Qualification:</strong> ${qualification}</p>
            <p><strong>Bio:</strong> ${bio}</p>
          `,
        })
      }
    } catch (emailError) {
      console.error("Failed to send application emails:", emailError)
    }

    return NextResponse.json(
      {
        message: "Application submitted successfully. We will review and contact you within 24-48 hours.",
        applicationId: newAstrologer.id,
      },
      { status: 201 },
    )
  } catch (error) {
    const { message, statusCode } = handleApiError(error)
    return NextResponse.json({ message }, { status: statusCode })
  }
}
