"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { CourseCard } from "@/components/course-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowDownAZ, ArrowUpZA, Filter } from "lucide-react"

// Mock data
const courses = [
  {
    id: "course-1",
    title: "Basic English Communication",
    description: "Learn essential English phrases for everyday conversations.",
    category: "Language",
    image: "/placeholder.svg?height=200&width=400",
    progress: 60,
    enrolled: true,
  },
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
  {
    id: "course-4",
    title: "Cooking Fundamentals",
    description: "Master basic cooking techniques and simple recipes.",
    category: "Cooking",
    image: "/placeholder.svg?height=200&width=400",
    progress: 25,
    enrolled: true,
  },
  {
    id: "course-5",
    title: "Basic Kiswahili",
    description: "Learn conversational Kiswahili for everyday situations.",
    category: "Language",
    image: "/placeholder.svg?height=200&width=400",
    progress: 0,
    enrolled: false,
  },
  {
    id: "course-6",
    title: "Stress Management",
    description: "Learn techniques to manage stress and improve mental wellbeing.",
    category: "Wellness",
    image: "/placeholder.svg?height=200&width=400",
    progress: 10,
    enrolled: true,
  },
]

const categories = ["All", "Language", "Mathematics", "Health", "Cooking", "Wellness"]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const filteredCourses = courses
    .filter((course) => selectedCategory === "All" || course.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title)
      } else {
        return b.title.localeCompare(a.title)
      }
    })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Courses" subtitle="Browse and enroll in courses" />
        <main className="flex-1 p-4 md:p-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSortOrder}
              className="flex items-center gap-2 bg-transparent"
            >
              {sortOrder === "asc" ? (
                <>
                  <ArrowDownAZ className="h-4 w-4" /> A-Z
                </>
              ) : (
                <>
                  <ArrowUpZA className="h-4 w-4" /> Z-A
                </>
              )}
            </Button>
          </div>

          {/* Course Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <p className="text-lg font-medium">No courses found</p>
              <p className="text-sm text-muted-foreground">
                Try changing your filter or check back later for new courses.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
