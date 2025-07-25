"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronRight, Quote } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CourseCard } from "@/components/course-card"
import { ProtectedRoute } from "@/components/protected-route"

// Mock data
const userData = {
  name: "John Doe",
  overallProgress: 42,
  lastActiveCourse: {
    id: "course-1",
    title: "Basic English Communication",
    lessonId: "lesson-3",
    lessonTitle: "Everyday Conversations",
    progress: 60,
    image: "/placeholder.svg?height=200&width=400",
  },
  quote: {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
}

const recommendedCourses = [
  {
    id: "course-2",
    title: "Basic Math Skills",
    description: "Learn essential math for everyday tasks like budgeting and shopping.",
    category: "Mathematics",
    image: "/placeholder.svg?height=200&width=400",
    progress: 0,
    enrolled: false,
  },
  {
    id: "course-3",
    title: "First Aid Basics",
    description: "Learn how to handle common emergencies and provide basic first aid.",
    category: "Health",
    image: "/placeholder.svg?height=200&width=400",
    progress: 0,
    enrolled: false,
  },
]

function DashboardContent() {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  })

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Dashboard" />
        <main className="flex-1 p-4 md:p-6">
          {/* Welcome Banner */}
          <section className="mb-6">
            <Card className="bg-primary/10">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">
                    {greeting}, {userData.name}!
                  </h1>
                  <p className="text-muted-foreground">
                    Welcome back to your learning journey. You're making great progress!
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Overall completion across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm">{userData.overallProgress}%</span>
                  </div>
                  <Progress value={userData.overallProgress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/progress">View All Progress</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Continue Learning Card */}
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-32 w-full">
                  <img
                    src={userData.lastActiveCourse.image || "/placeholder.svg"}
                    alt={userData.lastActiveCourse.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-lg font-bold text-white">{userData.lastActiveCourse.title}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium">Continue where you left off</h4>
                  <p className="text-sm text-muted-foreground">Lesson: {userData.lastActiveCourse.lessonTitle}</p>
                </div>
                <Progress value={userData.lastActiveCourse.progress} className="mb-4 h-2" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/lessons/${userData.lastActiveCourse.id}/${userData.lastActiveCourse.lessonId}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Motivational Quote */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Quote className="h-5 w-5" />
                  Daily Inspiration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-primary pl-4">
                  <p className="italic">{userData.quote.text}</p>
                  <footer className="mt-2 text-sm text-muted-foreground">— {userData.quote.author}</footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Courses */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Recommended Courses</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/courses" className="flex items-center">
                  Browse All Courses
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute allowedRoles={["learner"]}>
      <DashboardContent />
    </ProtectedRoute>
  )
}
