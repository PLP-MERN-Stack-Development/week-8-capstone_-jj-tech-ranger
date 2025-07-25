"use client"

import {
  Book,
  GraduationCap,
  Home,
  LightbulbIcon,
  LogOut,
  Settings,
  Sun,
  Users,
  Calendar,
  MessageCircle,
  BarChart3,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const { user, logout } = useAuth()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Role-based navigation
  const getNavigationItems = () => {
    if (!user) return []

    const baseItems = [
      {
        name: "Dashboard",
        href: user.role === "admin" ? "/admin/dashboard" : user.role === "counselor" ? "/counselor" : "/dashboard",
        icon: Home,
      },
    ]

    switch (user.role) {
      case "learner":
        return [
          ...baseItems,
          { name: "Courses", href: "/courses", icon: Book },
          { name: "My Learning", href: "/progress", icon: GraduationCap },
        ]
      case "counselor":
        return [
          ...baseItems,
          { name: "Appointments", href: "/counselor/appointments", icon: Calendar },
          { name: "Clients", href: "/counselor/clients", icon: Users },
          { name: "Messages", href: "/counselor/messages", icon: MessageCircle },
        ]
      case "admin":
        return [
          ...baseItems,
          { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
          { name: "Users", href: "/admin/users", icon: Users },
          { name: "Courses", href: "/admin/courses", icon: Book },
          { name: "Settings", href: "/admin/settings", icon: Settings },
        ]
      default:
        return baseItems
    }
  }

  const navigation = getNavigationItems()

  if (!user) return null

  return (
    <Sidebar>
      <SidebarHeader className="pb-2">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LightbulbIcon className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">Mwangaza</span>
            <span className="text-xs text-muted-foreground">Lighting the path</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleTheme}>
              <Sun className="h-4 w-4" />
              <span>Toggle Theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{user?.name || "User"}</span>
                <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
