import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ingredients = searchParams.get("ingredients")

    let query = `
      SELECT r.recipe_id, r.title, r.description, r.prep_time, r.servings,
             AVG(rt.rating) as avg_rating
      FROM recipe r
      LEFT JOIN rating rt ON r.recipe_id = rt.recipe_id
    `

    const queryParams = []

    if (ingredients) {
      const ingredientList = ingredients.split(",")

      query += `
        WHERE r.recipe_id IN (
          SELECT ri.recipe_id
          FROM recipe_ingredients ri
          JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
          WHERE i.name IN (${ingredientList.map(() => "?").join(",")})
          GROUP BY ri.recipe_id
          HAVING COUNT(DISTINCT i.ingredient_id) >= ?
        )
      `

      queryParams.push(...ingredientList, ingredientList.length)
    }

    query += `
      GROUP BY r.recipe_id
      ORDER BY avg_rating DESC
      LIMIT 20
    `

    const recipes = await db.query(query, queryParams)

    return NextResponse.json({ recipes })
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

