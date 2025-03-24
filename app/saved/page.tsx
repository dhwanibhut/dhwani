"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChefHat, Clock, Heart, Users, Star, Trash2 } from "lucide-react"
import Link from "next/link"

interface SavedRecipe {
  id: number
  title: string
  description: string
  prepTime: number
  servings: number
  rating: number
  savedAt: string
}

export default function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchSavedRecipes = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setSavedRecipes([
          {
            id: 1,
            title: "Pasta Primavera",
            description: "A light and fresh pasta dish with seasonal vegetables",
            prepTime: 25,
            servings: 4,
            rating: 4.5,
            savedAt: "2023-05-15",
          },
          {
            id: 2,
            title: "Vegetable Stir Fry",
            description: "Quick and healthy stir fry with mixed vegetables",
            prepTime: 20,
            servings: 2,
            rating: 4.2,
            savedAt: "2023-05-10",
          },
        ])
      } catch (error) {
        console.error("Error fetching saved recipes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedRecipes()
  }, [])

  const removeFromSaved = (id: number) => {
    setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Saved Recipes</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
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
      ) : savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
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
                <div className="mt-2 text-sm text-muted-foreground">
                  Saved on {new Date(recipe.savedAt).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/recipes/${recipe.id}`}>
                  <Button variant="outline" size="sm">
                    View Recipe
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => removeFromSaved(recipe.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-medium mb-2">No Saved Recipes</h2>
          <p className="text-muted-foreground mb-6">
            You haven't saved any recipes yet. Browse recipes and click the heart icon to save them for later.
          </p>
          <Link href="/recipes">
            <Button>Browse Recipes</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

