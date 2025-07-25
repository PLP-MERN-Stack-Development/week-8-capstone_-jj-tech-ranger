"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedRoles = [], redirectTo = "/login" }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (authLoading) return

    if (!isAuthenticated || !user) {
      router.push(redirectTo)
      return
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect based on user role
      switch (user.role) {
        case "admin":
          router.push("/admin/dashboard")
          break
        case "learner":
          router.push("/dashboard")
          break
        case "counselor":
          router.push("/counselor")
          break
        default:
          router.push("/login")
      }
      return
    }

    setIsLoading(false)
  }, [user, isAuthenticated, authLoading, router, allowedRoles, redirectTo])

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
