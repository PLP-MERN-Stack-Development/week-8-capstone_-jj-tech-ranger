"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, Calendar, FileText, Phone } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const clients = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    lastSession: "2024-01-10",
    totalSessions: 8,
    issues: ["Stress Management", "Work-Life Balance"],
    progress: "Good progress on anxiety management",
  },
  {
    id: 2,
    name: "Mary Smith",
    email: "mary@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    lastSession: "2024-01-12",
    totalSessions: 3,
    issues: ["Career Guidance", "Self-Confidence"],
    progress: "Building confidence in professional settings",
  },
  {
    id: 3,
    name: "Peter Johnson",
    email: "peter@example.com",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    lastSession: "2023-12-20",
    totalSessions: 12,
    issues: ["Family Issues", "Communication"],
    progress: "Completed initial treatment goals",
  },
]

function ClientsContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Clients" subtitle="Manage your client relationships" />
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Client Directory</h1>
                <p className="text-muted-foreground">Manage your client relationships and session history</p>
              </div>
              <Button>Add New Client</Button>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {filteredClients.map((client) => (
              <Card key={client.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{client.name}</h3>
                          <Badge variant={client.status === "active" ? "default" : "secondary"}>{client.status}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>{client.email}</p>
                          <p>{client.phone}</p>
                          <p>Last session: {client.lastSession}</p>
                          <p>Total sessions: {client.totalSessions}</p>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Current Issues:</p>
                          <div className="flex gap-1 flex-wrap">
                            {client.issues.map((issue, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {issue}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm">{client.progress}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <FileText className="h-4 w-4 mr-1" />
                        Notes
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No clients found matching your search</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function ClientsPage() {
  return (
    <ProtectedRoute allowedRoles={["counselor"]}>
      <ClientsContent />
    </ProtectedRoute>
  )
}
