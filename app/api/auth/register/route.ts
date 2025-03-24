import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await db.query("SELECT * FROM user WHERE email = ?", [email])

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await db.query("INSERT INTO user (name, email, password, created_at) VALUES (?, ?, ?, NOW())", [
      name,
      email,
      hashedPassword,
    ])

    return NextResponse.json({ message: "User registered successfully", userId: result.insertId }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

