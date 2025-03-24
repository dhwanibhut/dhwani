import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const recipeId = params.id

    // Get recipe details
    const recipes = await db.query(
      `SELECT r.recipe_id, r.title, r.description, r.prep_time, r.servings
       FROM recipe r
       WHERE r.recipe_id = ?`,
      [recipeId],
    )

    if (recipes.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    const recipe = recipes[0]

    // Get ingredients
    const ingredients = await db.query(
      `SELECT i.name, ri.quantity, ri.unit
       FROM recipe_ingredients ri
       JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
       WHERE ri.recipe_id = ?`,
      [recipeId],
    )

    // Get cooking steps
    const steps = await db.query(
      `SELECT step_no, instruction
       FROM cooking_step
       WHERE recipe_id = ?
       ORDER BY step_no`,
      [recipeId],
    )

    // Get nutrients
    const nutrients = await db.query(
      `SELECT total_cal
       FROM nutrients
       WHERE recipe_id = ?`,
      [recipeId],
    )

    // Get average rating
    const ratings = await db.query(
      `SELECT AVG(rating) as avg_rating, COUNT(*) as review_count
       FROM rating
       WHERE recipe_id = ?`,
      [recipeId],
    )

    return NextResponse.json({
      ...recipe,
      ingredients,
      steps,
      nutrients: nutrients[0] || { total_cal: 0 },
      rating: {
        average: ratings[0]?.avg_rating || 0,
        count: ratings[0]?.review_count || 0,
      },
    })
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

