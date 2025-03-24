"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ChefHat, Clock, Heart, Users, Star } from "lucide-react"
import Link from "next/link"

interface Recipe {
  id: number
  title: string
  description: string
  prepTime: number
  servings: number
  rating: number
}

export default function RecipeSearchPage() {
  const searchParams = useSearchParams()
  const ingredientsParam = searchParams.get("ingredients")
  const ingredients = ingredientsParam ? ingredientsParam.split(",") : []

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchRecipes = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        setRecipes([
          {
            id: 1,
            title: "Pasta Primavera",
            description: "A light and fresh pasta dish with seasonal vegetables",
            prepTime: 25,
            servings: 4,
            rating: 4.5,
          },
          {
            id: 2,
            title: "Vegetable Stir Fry",
            description: "Quick and healthy stir fry with mixed vegetables",
            prepTime: 20,
            servings: 2,
            rating: 4.2,
          },
          {
            id: 3,
            title: "Chicken Salad",
            description: "Refreshing salad with grilled chicken and mixed greens",
            prepTime: 15,
            servings: 2,
            rating: 4.7,
          },
        ])
      } catch (error) {
        console.error("Error fetching recipes:", error)
      } finally {
        setLoading(false)
      }
    }

    if (ingredients.length > 0) {
      fetchRecipes()
    }
  }, [ingredients])

  if (ingredients.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">No Ingredients Selected</h1>
        <p className="mb-8">Please go back and select some ingredients to find recipes.</p>
        <Link href="/ingredients">
          <Button>Select Ingredients</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Recipe Results</h1>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Searching with:</h2>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary">
              {ingredient}
            </Badge>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-muted" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-28" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChefHat className="h-12 w-12 text-muted-foreground/50" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="mr-3">{recipe.prepTime} mins</span>
                  <Users className="mr-1 h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(recipe.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                      />
                    ))}
                  <span className="ml-2 text-sm">{recipe.rating.toFixed(1)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/recipes/${recipe.id}`}>
                  <Button variant="outline" size="sm">
                    View Recipe
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No Recipes Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find any recipes that match your ingredients. Try adding more ingredients or removing some.
          </p>
          <Link href="/ingredients">
            <Button>Modify Ingredients</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

