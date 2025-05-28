import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail(options) {
  try {
    await transporter.sendMail({
      from: options.from || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })
    return true
  } catch (error) {
    console.error("Email sending failed:", error)
    return false
  }
}

export function generateWelcomeEmail(name) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8b5cf6;">Welcome to AstroConnect!</h2>
      <p>Dear ${name},</p>
      <p>Welcome to AstroConnect! We're excited to have you join our cosmic community.</p>
      <p>You can now:</p>
      <ul>
        <li>Connect with expert astrologers</li>
        <li>Get personalized readings</li>
        <li>Enjoy your first 10 minutes free</li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/astrologers" 
           style="background: linear-gradient(45deg, #8b5cf6, #ec4899); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Find Your Astrologer
        </a>
      </div>
      <p>Best regards,<br>The AstroConnect Team</p>
    </div>
  `
}

export function generateAstrologerApplicationEmail(name) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #fbbf24;">Application Received!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for applying to become an astrologer on AstroConnect!</p>
      <p>Your application is now under review. Our team will:</p>
      <ul>
        <li>Verify your credentials and qualifications</li>
        <li>Review your experience and specialization</li>
        <li>Conduct a brief interview if needed</li>
      </ul>
      <p>We'll contact you within 24-48 hours with an update on your application status.</p>
      <p>Best regards,<br>The AstroConnect Team</p>
    </div>
  `
}
