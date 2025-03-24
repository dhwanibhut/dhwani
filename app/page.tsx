import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Search, Heart, Clock, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Find Recipes With What You Have
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Enter the ingredients you have on hand and discover delicious recipes you can make right now.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/ingredients">
                <Button className="h-11 px-8">
                  <Search className="mr-2 h-4 w-4" /> Find Recipes
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="h-11 px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChefHat className="h-12 w-12 text-muted-foreground/50" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Delicious Recipe {i}</CardTitle>
                <CardDescription>A quick and easy meal for any occasion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="mr-3">30 mins</span>
                  <Users className="mr-1 h-4 w-4" />
                  <span>4 servings</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Recipe
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/recipes">
            <Button variant="outline">View All Recipes</Button>
          </Link>
        </div>
      </section>

      <section className="py-12 bg-muted rounded-lg my-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 items-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Easy to Use</h3>
              <p className="text-muted-foreground">
                Simply enter the ingredients you have and we'll find recipes that match.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Save Your Favorites</h3>
              <p className="text-muted-foreground">Create an account to save your favorite recipes for later.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Rate and Review</h3>
              <p className="text-muted-foreground">
                Share your experience with others by rating and reviewing recipes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

