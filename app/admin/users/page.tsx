"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MoreHorizontal, UserCheck, UserX, Edit } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "learner",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    coursesEnrolled: 3,
    progress: 67,
  },
  {
    id: 2,
    name: "Dr. Sarah Wilson",
    email: "sarah@example.com",
    role: "counselor",
    status: "active",
    joinDate: "2023-12-01",
    lastActive: "2024-01-20",
    totalSessions: 156,
    activeClients: 24,
  },
  {
    id: 3,
    name: "Mary Smith",
    email: "mary@example.com",
    role: "learner",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    coursesEnrolled: 2,
    progress: 45,
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@mwangaza.com",
    role: "admin",
    status: "active",
    joinDate: "2023-11-01",
    lastActive: "2024-01-20",
  },
]

function UsersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || user.role === selectedTab
    return matchesSearch && matchesTab
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "counselor":
        return "default"
      case "learner":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="User Management" subtitle="Manage platform users and permissions" />
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">User Management</h1>
                <p className="text-muted-foreground">Manage users, roles, and permissions across the platform</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Users ({users.length})</TabsTrigger>
              <TabsTrigger value="learner">Learners ({users.filter((u) => u.role === "learner").length})</TabsTrigger>
              <TabsTrigger value="counselor">
                Counselors ({users.filter((u) => u.role === "counselor").length})
              </TabsTrigger>
              <TabsTrigger value="admin">Admins ({users.filter((u) => u.role === "admin").length})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid gap-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{user.name}</h3>
                              <Badge variant={getRoleColor(user.role)}>{user.role}</Badge>
                              <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Joined: {user.joinDate}</span>
                              <span>Last active: {user.lastActive}</span>
                            </div>
                            {user.role === "learner" && (
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <span>Courses: {user.coursesEnrolled}</span>
                                <span>Progress: {user.progress}%</span>
                              </div>
                            )}
                            {user.role === "counselor" && (
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <span>Sessions: {user.totalSessions}</span>
                                <span>Active clients: {user.activeClients}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCheck className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function UsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <UsersContent />
    </ProtectedRoute>
  )
}
