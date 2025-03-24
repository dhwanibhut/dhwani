"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Users, Heart, Star, ChefHat, Printer, Share2 } from "lucide-react"
import Link from "next/link"

interface Recipe {
  id: number
  title: string
  description: string
  prepTime: number
  servings: number
  rating: number
  ingredients: {
    name: string
    quantity: string
    unit: string
  }[]
  steps: {
    number: number
    instruction: string
  }[]
  nutrients: {
    calories: number
  }
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchRecipe = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setRecipe({
          id: Number.parseInt(params.id),
          title: "Pasta Primavera",
          description: "A light and fresh pasta dish with seasonal vegetables",
          prepTime: 25,
          servings: 4,
          rating: 4.5,
          ingredients: [
            { name: "Pasta", quantity: "8", unit: "oz" },
            { name: "Broccoli", quantity: "1", unit: "cup" },
            { name: "Bell Peppers", quantity: "1", unit: "cup" },
            { name: "Cherry Tomatoes", quantity: "1", unit: "cup" },
            { name: "Olive Oil", quantity: "2", unit: "tbsp" },
            { name: "Garlic", quantity: "2", unit: "cloves" },
            { name: "Parmesan Cheese", quantity: "1/4", unit: "cup" },
          ],
          steps: [
            {
              number: 1,
              instruction:
                "Bring a large pot of salted water to a boil. Add pasta and cook according to package directions.",
            },
            {
              number: 2,
              instruction:
                "Meanwhile, heat olive oil in a large skillet over medium heat. Add garlic and cook until fragrant, about 30 seconds.",
            },
            {
              number: 3,
              instruction:
                "Add broccoli and bell peppers to the skillet. Cook for 3-4 minutes until vegetables begin to soften.",
            },
            { number: 4, instruction: "Add cherry tomatoes and cook for another 2 minutes." },
            { number: 5, instruction: "Drain pasta, reserving 1/2 cup of pasta water." },
            {
              number: 6,
              instruction:
                "Add pasta to the skillet with vegetables. Add reserved pasta water as needed to create a light sauce.",
            },
            { number: 7, instruction: "Sprinkle with Parmesan cheese and serve immediately." },
          ],
          nutrients: {
            calories: 320,
          },
        })
      } catch (error) {
        console.error("Error fetching recipe:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>

          <Skeleton className="h-10 w-full mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="mb-8">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link href="/recipes">
          <Button>Browse Recipes</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-muted-foreground">{recipe.description}</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{recipe.prepTime} mins</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center">
            <div className="flex mr-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(recipe.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                  />
                ))}
            </div>
            <span>{recipe.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Save Recipe
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="aspect-video relative bg-muted mb-8 rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <ChefHat className="h-16 w-16 text-muted-foreground/50" />
          </div>
        </div>

        <Tabs defaultValue="ingredients" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 font-medium">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                      <span>{ingredient.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions">
            <Card>
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  {recipe.steps.map((step) => (
                    <li key={step.number} className="flex">
                      <Badge variant="outline" className="h-6 w-6 rounded-full mr-3 flex items-center justify-center">
                        {step.number}
                      </Badge>
                      <span>{step.instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Calories</span>
                    <span className="font-medium">{recipe.nutrients.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Fat</span>
                    <span className="font-medium">12g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbohydrates</span>
                    <span className="font-medium">45g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protein</span>
                    <span className="font-medium">10g</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

