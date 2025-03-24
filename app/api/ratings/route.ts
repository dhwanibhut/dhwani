import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { recipeId, rating, review } = await request.json()

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Check if recipe exists
    const recipes = await db.query("SELECT * FROM recipe WHERE recipe_id = ?", [recipeId])

    if (recipes.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    // Check if user already rated this recipe
    const existingRatings = await db.query("SELECT * FROM rating WHERE user_id = ? AND recipe_id = ?", [
      user.userId,
      recipeId,
    ])

    if (existingRatings.length > 0) {
      // Update existing rating
      await db.query("UPDATE rating SET rating = ?, review = ? WHERE user_id = ? AND recipe_id = ?", [
        rating,
        review,
        user.userId,
        recipeId,
      ])

      return NextResponse.json({ message: "Rating updated successfully" })
    } else {
      // Create new rating
      await db.query("INSERT INTO rating (user_id, recipe_id, rating, review) VALUES (?, ?, ?, ?)", [
        user.userId,
        recipeId,
        rating,
        review,
      ])

      return NextResponse.json({ message: "Rating submitted successfully" }, { status: 201 })
    }
  } catch (error) {
    console.error("Error submitting rating:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

