"use client"

import { MenuIcon } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"

interface TopNavProps {
  title?: string
  subtitle?: string
}

export function TopNav({ title, subtitle }: TopNavProps) {
  const { setTheme, theme } = useTheme()

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </SidebarTrigger>
        {title && (
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
