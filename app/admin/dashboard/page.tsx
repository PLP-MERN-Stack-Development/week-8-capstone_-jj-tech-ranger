"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, BookOpen, GraduationCap, TrendingUp, Users, UserCheck, AlertCircle, Settings } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

// Mock data for admin dashboard
const platformStats = {
  totalUsers: 1247,
  activeLearners: 892,
  counselors: 15,
  totalCourses: 24,
  completedSessions: 3456,
  averageProgress: 67,
}

const recentActivity = [
  {
    id: 1,
    type: "user_registration",
    message: "New learner registered: John Doe",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "course_completion",
    message: "Mary Smith completed 'Basic English Communication'",
    time: "15 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "counselor_session",
    message: "Dr. Wilson completed session with Peter Johnson",
    time: "1 hour ago",
    status: "info",
  },
  {
    id: 4,
    type: "system_alert",
    message: "Server maintenance scheduled for tonight",
    time: "2 hours ago",
    status: "warning",
  },
]

const topCourses = [
  {
    id: 1,
    title: "Basic English Communication",
    enrollments: 234,
    completionRate: 78,
    category: "Language",
  },
  {
    id: 2,
    title: "First Aid Basics",
    enrollments: 189,
    completionRate: 85,
    category: "Health",
  },
  {
    id: 3,
    title: "Cooking Fundamentals",
    enrollments: 156,
    completionRate: 72,
    category: "Life Skills",
  },
  {
    id: 4,
    title: "Stress Management",
    enrollments: 143,
    completionRate: 91,
    category: "Wellness",
  },
]

function AdminDashboardContent() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Admin Dashboard" subtitle="Platform Overview & Management" />
        <main className="flex-1 p-4 md:p-6">
          {/* Key Metrics */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.activeLearners.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+2</span> added this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.averageProgress}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5%</span> improvement
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events and user actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Performing Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Courses</CardTitle>
                <CardDescription>Most popular courses by enrollment and completion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{course.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.enrollments} enrollments • {course.category}
                        </p>
                      </div>
                      <Badge variant="outline">{course.completionRate}%</Badge>
                    </div>
                    <Progress value={course.completionRate} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Management Tabs */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Platform Management</CardTitle>
              <CardDescription>Manage users, content, and system settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Button className="h-20 flex-col">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      Analytics
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Users className="h-6 w-6 mb-2" />
                      User Management
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <BookOpen className="h-6 w-6 mb-2" />
                      Content Library
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Settings className="h-6 w-6 mb-2" />
                      System Settings
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="users" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">User Management</h3>
                      <Button>Add New User</Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Learners</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{platformStats.activeLearners}</div>
                          <p className="text-xs text-muted-foreground">Active users</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Counselors</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{platformStats.counselors}</div>
                          <p className="text-xs text-muted-foreground">Professional staff</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Admins</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3</div>
                          <p className="text-xs text-muted-foreground">System administrators</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Content Management</h3>
                      <Button>Create New Course</Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Course Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Courses</span>
                            <span className="font-medium">{platformStats.totalCourses}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Published</span>
                            <span className="font-medium">22</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Draft</span>
                            <span className="font-medium">2</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Content Health</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Avg. Completion Rate</span>
                            <span className="font-medium">79%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">User Satisfaction</span>
                            <span className="font-medium">4.6/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Content Updates</span>
                            <span className="font-medium">12 this month</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Settings</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Platform Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Settings className="h-4 w-4 mr-2" />
                            General Settings
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <UserCheck className="h-4 w-4 mr-2" />
                            User Permissions
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            System Alerts
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Maintenance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            System Health
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Backup & Restore
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Performance Monitor
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
