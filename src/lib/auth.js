import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
export const JWT_EXPIRES_IN = "7d"

// Superkey credentials from environment variables
export const SUPERKEY_EMAIL = process.env.SUPERKEY_EMAIL || "webitya@gmail.com"
export const SUPERKEY_PASSWORD = process.env.SUPERKEY_PASSWORD || "1234567"

export function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      isSuperkey: user.isSuperkey || false,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}

export function validateSuperkey(email, password) {
  return email === SUPERKEY_EMAIL && password === SUPERKEY_PASSWORD
}

export function createSuperkeyUser() {
  return {
    id: 999999,
    name: "Super Admin",
    email: SUPERKEY_EMAIL,
    role: "admin",
    isSuperkey: true,
    isVerified: true,
    isOnline: true,
  }
}

export function getTokenFromRequest(request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  const cookieToken = request.cookies.get("auth-token")?.value
  return cookieToken || null
}

export function getUserFromRequest(request) {
  const token = getTokenFromRequest(request)
  if (!token) return null

  return verifyToken(token)
}
