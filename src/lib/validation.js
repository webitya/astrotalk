// Simple validation functions without Zod

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phone)
}

export function validatePassword(password) {
  return password && password.length >= 8 && password.length <= 100
}

export function validateUserRegistration(data) {
  const errors = []

  if (!data.name || data.name.length < 2 || data.name.length > 50) {
    errors.push("Name must be between 2 and 50 characters")
  }

  if (!validateEmail(data.email)) {
    errors.push("Invalid email address")
  }

  if (!validatePhone(data.phone)) {
    errors.push("Invalid phone number")
  }

  if (!validatePassword(data.password)) {
    errors.push("Password must be between 8 and 100 characters")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateUserLogin(data) {
  const errors = []

  if (!validateEmail(data.email)) {
    errors.push("Invalid email address")
  }

  if (!data.password) {
    errors.push("Password is required")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateAstrologerRegistration(data) {
  const errors = []

  if (!data.name || data.name.length < 2 || data.name.length > 50) {
    errors.push("Name must be between 2 and 50 characters")
  }

  if (!validateEmail(data.email)) {
    errors.push("Invalid email address")
  }

  if (!validatePhone(data.phone)) {
    errors.push("Invalid phone number")
  }

  if (!validatePassword(data.password)) {
    errors.push("Password must be between 8 and 100 characters")
  }

  if (!data.specialization) {
    errors.push("Specialization is required")
  }

  if (!data.experience || data.experience < 1 || data.experience > 50) {
    errors.push("Experience must be between 1 and 50 years")
  }

  if (!data.rate || data.rate < 10 || data.rate > 500) {
    errors.push("Rate must be between ₹10 and ₹500 per minute")
  }

  if (!data.qualification || data.qualification.length < 10) {
    errors.push("Please provide detailed qualifications")
  }

  if (!data.bio || data.bio.length < 50 || data.bio.length > 500) {
    errors.push("Bio must be between 50 and 500 characters")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateContactForm(data) {
  const errors = []

  if (!data.name || data.name.length < 2 || data.name.length > 50) {
    errors.push("Name must be between 2 and 50 characters")
  }

  if (!validateEmail(data.email)) {
    errors.push("Invalid email address")
  }

  if (!data.subject || data.subject.length < 5 || data.subject.length > 100) {
    errors.push("Subject must be between 5 and 100 characters")
  }

  if (!data.message || data.message.length < 10 || data.message.length > 1000) {
    errors.push("Message must be between 10 and 1000 characters")
  }

  if (!["general", "support", "astrologer", "partnership", "feedback"].includes(data.inquiryType)) {
    errors.push("Invalid inquiry type")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validatePayment(data) {
  const errors = []

  if (!data.amount || data.amount < 100 || data.amount > 50000) {
    errors.push("Amount must be between ₹100 and ₹50,000")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
