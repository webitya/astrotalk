// Mock database implementation - Replace with real database in production

// Mock data stores
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "user@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password
    role: "user",
    phone: "+91 9876543210",
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Maya Sharma",
    email: "maya@astro.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password
    role: "astrologer",
    phone: "+91 9876543211",
    isVerified: true,
    isOnline: true,
    specialization: "Vedic Astrology",
    experience: 15,
    rate: 25,
    qualification: "PhD in Astrology",
    bio: "Expert in Vedic astrology with deep knowledge of planetary movements.",
    rating: 4.9,
    totalConsultations: 1250,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const consultations = []
const payments = []

// User operations
export async function createUser(userData) {
  const newUser = {
    ...userData,
    id: users.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  users.push(newUser)
  return newUser
}

export async function findUserByEmail(email) {
  return users.find((user) => user.email === email) || null
}

export async function findUserById(id) {
  return users.find((user) => user.id === id) || null
}

export async function updateUser(id, updates) {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return users[userIndex]
}

export async function getAllAstrologers() {
  return users.filter((user) => user.role === "astrologer" && user.isVerified)
}

// Consultation operations
export async function createConsultation(consultationData) {
  const newConsultation = {
    ...consultationData,
    id: consultations.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  consultations.push(newConsultation)
  return newConsultation
}

export async function getConsultationsByUserId(userId) {
  return consultations.filter((consultation) => consultation.userId === userId)
}

export async function getConsultationsByAstrologerId(astrologerId) {
  return consultations.filter((consultation) => consultation.astrologerId === astrologerId)
}

// Payment operations
export async function createPayment(paymentData) {
  const newPayment = {
    ...paymentData,
    id: payments.length + 1,
    createdAt: new Date().toISOString(),
  }
  payments.push(newPayment)
  return newPayment
}

export async function updatePayment(id, updates) {
  const paymentIndex = payments.findIndex((payment) => payment.id === id)
  if (paymentIndex === -1) return null

  payments[paymentIndex] = {
    ...payments[paymentIndex],
    ...updates,
  }
  return payments[paymentIndex]
}
