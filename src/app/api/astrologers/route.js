import { NextResponse } from "next/server"
import { getAllAstrologers } from "../../../lib/database.js"
import { handleApiError } from "../../../lib/errors.js"

export async function GET(request) {
  try {
    const astrologers = await getAllAstrologers()

    // Remove sensitive information
    const publicAstrologers = astrologers.map((astrologer) => {
      const { password, ...publicData } = astrologer
      return publicData
    })

    return NextResponse.json({
      astrologers: publicAstrologers,
      total: publicAstrologers.length,
    })
  } catch (error) {
    const { message, statusCode } = handleApiError(error)
    return NextResponse.json({ message }, { status: statusCode })
  }
}
