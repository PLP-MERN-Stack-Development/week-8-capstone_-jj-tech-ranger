"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, BookOpen, GraduationCap, Clock } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const analyticsData = {
  userGrowth: {
    current: 1247,
    previous: 1108,
    change: 12.5,
  },
  courseCompletions: {
    current: 892,
    previous: 756,
    change: 18.0,
  },
  averageProgress: {
    current: 67,
    previous: 62,
    change: 8.1,
  },
  sessionTime: {
    current: 24.5,
    previous: 22.1,
    change: 10.9,
  },
}

const topCourses = [
  { name: "Basic English Communication", completions: 234, rating: 4.8 },
  { name: "First Aid Basics", completions: 189, rating: 4.9 },
  { name: "Cooking Fundamentals", completions: 156, rating: 4.7 },
  { name: "Stress Management", completions: 143, rating: 4.9 },
  { name: "Basic Math Skills", completions: 128, rating: 4.6 },
]

const userEngagement = [
  { metric: "Daily Active Users", value: 456, change: 8.2 },
  { metric: "Weekly Active Users", value: 892, change: 12.1 },
  { metric: "Monthly Active Users", value: 1247, change: 15.3 },
  { metric: "Session Duration", value: "24.5 min", change: 10.9 },
]

function AnalyticsContent() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Analytics" subtitle="Platform performance and user insights" />
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track platform performance and user engagement metrics</p>
          </div>

          {/* Key Metrics */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.userGrowth.current.toLocaleString()}</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+{analyticsData.userGrowth.change}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.courseCompletions.current.toLocaleString()}</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+{analyticsData.courseCompletions.change}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.averageProgress.current}%</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+{analyticsData.averageProgress.change}%</span>
                  <span className="text-muted-foreground ml-1">improvement</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.sessionTime.current} min</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+{analyticsData.sessionTime.change}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Performing Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Courses</CardTitle>
                <CardDescription>Most completed courses with user ratings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{course.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{course.rating} ⭐</Badge>
                          <span className="text-sm text-muted-foreground">{course.completions}</span>
                        </div>
                      </div>
                      <Progress value={(course.completions / 250) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* User Engagement */}
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Active user metrics and engagement trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userEngagement.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.metric}</p>
                      <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+{item.change}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Learning Progress Overview */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Learning Progress Overview</CardTitle>
              <CardDescription>Course completion rates across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Language</span>
                    <span className="text-sm">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Health</span>
                    <span className="text-sm">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Life Skills</span>
                    <span className="text-sm">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Wellness</span>
                    <span className="text-sm">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AnalyticsContent />
    </ProtectedRoute>
  )
}
