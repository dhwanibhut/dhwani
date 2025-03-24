import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ingredients = await db.query(
      `SELECT i.ingredient_id, i.name, i.category
       FROM user_ingredient ui
       JOIN ingredients i ON ui.ingredient_id = i.ingredient_id
       WHERE ui.user_id = ?`,
      [user.userId],
    )

    return NextResponse.json({ ingredients })
  } catch (error) {
    console.error("Error fetching user ingredients:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { ingredientId } = await request.json()

    // Check if ingredient exists
    const ingredients = await db.query("SELECT * FROM ingredients WHERE ingredient_id = ?", [ingredientId])

    if (ingredients.length === 0) {
      return NextResponse.json({ error: "Ingredient not found" }, { status: 404 })
    }

    // Check if user already has this ingredient
    const userIngredients = await db.query("SELECT * FROM user_ingredient WHERE user_id = ? AND ingredient_id = ?", [
      user.userId,
      ingredientId,
    ])

    if (userIngredients.length > 0) {
      return NextResponse.json({ error: "Ingredient already added" }, { status: 400 })
    }

    // Add ingredient to user
    await db.query("INSERT INTO user_ingredient (user_id, ingredient_id) VALUES (?, ?)", [user.userId, ingredientId])

    return NextResponse.json({ message: "Ingredient added successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error adding ingredient:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const ingredientId = searchParams.get("ingredientId")

    if (!ingredientId) {
      return NextResponse.json({ error: "Ingredient ID is required" }, { status: 400 })
    }

    // Remove ingredient from user
    await db.query("DELETE FROM user_ingredient WHERE user_id = ? AND ingredient_id = ?", [user.userId, ingredientId])

    return NextResponse.json({ message: "Ingredient removed successfully" })
  } catch (error) {
    console.error("Error removing ingredient:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

