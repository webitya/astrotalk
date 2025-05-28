export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(message, 400)
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Access denied") {
    super(message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message, 409)
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500)
  }
}

export function handleApiError(error) {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    }
  }

  console.error("Unexpected error:", error)
  return {
    message: "An unexpected error occurred",
    statusCode: 500,
  }
}
