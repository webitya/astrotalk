import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create transporter for sending emails
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request) {
  try {
    const { name, email, phone, subject, message, inquiryType } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Email to admin
    const adminEmailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || "admin@astroconnect.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            This email was sent from the AstroConnect contact form.
          </p>
        </div>
      `,
    }

    // Confirmation email to user
    const userEmailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting AstroConnect",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">Thank You for Contacting Us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <p>In the meantime, feel free to explore our platform and connect with our expert astrologers.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://astroconnect.com"}" 
               style="background: linear-gradient(45deg, #8b5cf6, #ec4899); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit AstroConnect
            </a>
          </div>

          <p style="color: #666; font-size: 12px;">
            Best regards,<br>
            The AstroConnect Team
          </p>
        </div>
      `,
    }

    // Send emails
    await Promise.all([transporter.sendMail(adminEmailOptions), transporter.sendMail(userEmailOptions)])

    // Store in database (mock implementation)
    const contactSubmission = {
      id: Date.now(),
      name,
      email,
      phone,
      subject,
      message,
      inquiryType,
      createdAt: new Date().toISOString(),
      status: "new",
    }

    // In production, save to database
    console.log("Contact submission:", contactSubmission)

    return NextResponse.json({
      message: "Contact form submitted successfully",
      id: contactSubmission.id,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 })
  }
}
