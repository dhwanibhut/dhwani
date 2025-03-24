import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const savedRecipes = await db.query(
      `SELECT sr.recipe_id, r.title, r.description, r.prep_time, r.servings, 
              sr.saved_at, AVG(rt.rating) as avg_rating
       FROM saved_recipe sr
       JOIN recipe r ON sr.recipe_id = r.recipe_id
       LEFT JOIN rating rt ON r.recipe_id = rt.recipe_id
       WHERE sr.user_id = ?
       GROUP BY sr.recipe_id
       ORDER BY sr.saved_at DESC`,
      [user.userId],
    )

    return NextResponse.json({ savedRecipes })
  } catch (error) {
    console.error("Error fetching saved recipes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { recipeId } = await request.json()

    // Check if recipe exists
    const recipes = await db.query("SELECT * FROM recipe WHERE recipe_id = ?", [recipeId])

    if (recipes.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    // Check if recipe is already saved
    const savedRecipes = await db.query("SELECT * FROM saved_recipe WHERE user_id = ? AND recipe_id = ?", [
      user.userId,
      recipeId,
    ])

    if (savedRecipes.length > 0) {
      return NextResponse.json({ error: "Recipe already saved" }, { status: 400 })
    }

    // Save recipe
    await db.query("INSERT INTO saved_recipe (user_id, recipe_id, saved_at) VALUES (?, ?, NOW())", [
      user.userId,
      recipeId,
    ])

    return NextResponse.json({ message: "Recipe saved successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error saving recipe:", error)
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
    const recipeId = searchParams.get("recipeId")

    if (!recipeId) {
      return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 })
    }

    // Remove saved recipe
    await db.query("DELETE FROM saved_recipe WHERE user_id = ? AND recipe_id = ?", [user.userId, recipeId])

    return NextResponse.json({ message: "Recipe removed from saved successfully" })
  } catch (error) {
    console.error("Error removing saved recipe:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

