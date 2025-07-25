"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MessageCircle, Phone, Users, Video } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

// Mock data for counselor dashboard
const upcomingAppointments = [
  {
    id: 1,
    clientName: "John Doe",
    time: "10:00 AM",
    date: "Today",
    type: "video",
    status: "confirmed",
    issue: "Stress Management",
  },
  {
    id: 2,
    clientName: "Mary Smith",
    time: "2:00 PM",
    date: "Today",
    type: "phone",
    status: "pending",
    issue: "Career Guidance",
  },
  {
    id: 3,
    clientName: "Peter Johnson",
    time: "11:00 AM",
    date: "Tomorrow",
    type: "video",
    status: "confirmed",
    issue: "Family Issues",
  },
]

const recentSessions = [
  {
    id: 1,
    clientName: "Sarah Wilson",
    date: "Yesterday",
    duration: "45 min",
    notes: "Made good progress on anxiety management techniques",
    followUp: "Schedule follow-up in 1 week",
  },
  {
    id: 2,
    clientName: "David Brown",
    date: "2 days ago",
    duration: "60 min",
    notes: "Discussed coping strategies for workplace stress",
    followUp: "Homework: Practice breathing exercises daily",
  },
]

const stats = {
  totalClients: 24,
  sessionsThisWeek: 12,
  pendingAppointments: 3,
  completedSessions: 156,
}

function CounselorDashboardContent() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Counselor Dashboard" subtitle="Welcome back, Dr. Sarah Wilson" />
        <main className="flex-1 p-4 md:p-6">
          {/* Stats Overview */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClients}</div>
                <p className="text-xs text-muted-foreground">Active clients</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.sessionsThisWeek}</div>
                <p className="text-xs text-muted-foreground">Sessions completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingAppointments}</div>
                <p className="text-xs text-muted-foreground">Appointments to confirm</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedSessions}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled sessions for today and tomorrow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>
                          {appointment.clientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{appointment.clientName}</p>
                        <p className="text-xs text-muted-foreground">{appointment.issue}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {appointment.date} at {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {appointment.type === "video" ? (
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Video className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Summary of your latest counseling sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>
                            {session.clientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{session.clientName}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.date} • {session.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{session.notes}</p>
                    <div className="bg-primary/10 rounded p-2">
                      <p className="text-xs">
                        <strong>Follow-up:</strong> {session.followUp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <MessageCircle className="h-6 w-6 mb-2" />
                  Client Messages
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Users className="h-6 w-6 mb-2" />
                  Client Directory
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Clock className="h-6 w-6 mb-2" />
                  Session Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default function CounselorDashboard() {
  return (
    <ProtectedRoute allowedRoles={["counselor"]}>
      <CounselorDashboardContent />
    </ProtectedRoute>
  )
}
