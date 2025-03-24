import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

interface AuthUser {
  userId: number
  email: string
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")

  if (!token) {
    return null
  }

  try {
    const decoded = verify(token.value, process.env.JWT_SECRET || "fallback_secret") as AuthUser
    return decoded
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

