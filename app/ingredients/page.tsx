"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, X } from "lucide-react"
import Link from "next/link"

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()])
      setInputValue("")
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addIngredient()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Find Recipes by Ingredients</h1>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>What ingredients do you have?</CardTitle>
            <CardDescription>
              Enter the ingredients you have on hand. Common ingredients like salt, pepper, and spices are assumed to be
              available.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="search">
              <TabsList className="mb-4">
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="search">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter an ingredient..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button onClick={addIngredient}>
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="categories">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Vegetables", "Fruits", "Meat", "Dairy", "Grains", "Seafood"].map((category) => (
                    <Button key={category} variant="outline" className="justify-start" onClick={() => {}}>
                      {category}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Your ingredients:</h3>
              {ingredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient) => (
                    <Badge key={ingredient} variant="secondary" className="pl-2">
                      {ingredient}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1"
                        onClick={() => removeIngredient(ingredient)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No ingredients added yet.</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={ingredients.length > 0 ? `/recipes/search?ingredients=${ingredients.join(",")}` : "#"}>
              <Button disabled={ingredients.length === 0} className="w-full">
                <Search className="mr-2 h-4 w-4" /> Find Recipes
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

