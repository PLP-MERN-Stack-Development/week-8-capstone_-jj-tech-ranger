"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Phone, Video, Plus } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const appointments = [
  {
    id: 1,
    clientName: "John Doe",
    clientEmail: "john@example.com",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: 60,
    type: "video",
    status: "confirmed",
    issue: "Stress Management",
    notes: "Follow-up session on coping strategies",
  },
  {
    id: 2,
    clientName: "Mary Smith",
    clientEmail: "mary@example.com",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: 45,
    type: "phone",
    status: "pending",
    issue: "Career Guidance",
    notes: "Initial consultation",
  },
  {
    id: 3,
    clientName: "Peter Johnson",
    clientEmail: "peter@example.com",
    date: "2024-01-16",
    time: "11:00 AM",
    duration: 60,
    type: "video",
    status: "confirmed",
    issue: "Family Issues",
    notes: "Relationship counseling session",
  },
]

function AppointmentsContent() {
  const [selectedTab, setSelectedTab] = useState("upcoming")

  const upcomingAppointments = appointments.filter((apt) => apt.status === "confirmed" || apt.status === "pending")
  const completedAppointments = appointments.filter((apt) => apt.status === "completed")

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Appointments" subtitle="Manage your counseling sessions" />
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Appointments</h1>
              <p className="text-muted-foreground">Manage your counseling sessions and client meetings</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule New
            </Button>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid gap-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
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
                            <h3 className="font-semibold">{appointment.clientName}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.clientEmail}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">
                                  {appointment.time} ({appointment.duration} min)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                              {appointment.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{appointment.issue}</p>
                          </div>
                          <div className="flex gap-2">
                            {appointment.type === "video" ? (
                              <Button size="sm">
                                <Video className="h-4 w-4 mr-1" />
                                Join Call
                              </Button>
                            ) : (
                              <Button size="sm">
                                <Phone className="h-4 w-4 mr-1" />
                                Call Client
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="bg-transparent">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm">{appointment.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No completed appointments to show</p>
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>View your appointments in calendar format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Calendar integration coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default function AppointmentsPage() {
  return (
    <ProtectedRoute allowedRoles={["counselor"]}>
      <AppointmentsContent />
    </ProtectedRoute>
  )
}
