"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const courses = [
  {
    id: 1,
    title: "Basic English Communication",
    description: "Learn essential English phrases for everyday conversations.",
    category: "Language",
    status: "published",
    enrollments: 234,
    completionRate: 78,
    createdDate: "2024-01-01",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "Basic Math Skills",
    description: "Learn essential math for everyday tasks like budgeting and shopping.",
    category: "Mathematics",
    status: "published",
    enrollments: 189,
    completionRate: 72,
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-12",
  },
  {
    id: 3,
    title: "First Aid Basics",
    description: "Learn how to handle common emergencies and provide basic first aid.",
    category: "Health",
    status: "draft",
    enrollments: 0,
    completionRate: 0,
    createdDate: "2024-01-18",
    lastUpdated: "2024-01-18",
  },
]

function CoursesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || course.status === selectedTab
    return matchesSearch && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default"
      case "draft":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Course Management" subtitle="Manage courses and learning content" />
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Course Management</h1>
                <p className="text-muted-foreground">Create, edit, and manage learning courses</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Courses ({courses.length})</TabsTrigger>
              <TabsTrigger value="published">
                Published ({courses.filter((c) => c.status === "published").length})
              </TabsTrigger>
              <TabsTrigger value="draft">Draft ({courses.filter((c) => c.status === "draft").length})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                            <Badge variant={getStatusColor(course.status)}>{course.status}</Badge>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          <CardDescription>{course.description}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm font-medium">Enrollments</p>
                          <p className="text-2xl font-bold">{course.enrollments}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Completion Rate</p>
                          <p className="text-2xl font-bold">{course.completionRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Created</p>
                          <p className="text-sm text-muted-foreground">{course.createdDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Last Updated</p>
                          <p className="text-sm text-muted-foreground">{course.lastUpdated}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No courses found matching your criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <CoursesContent />
    </ProtectedRoute>
  )
}
