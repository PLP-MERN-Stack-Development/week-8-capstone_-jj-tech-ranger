"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { mockAuthService } from "@/services/auth"
import { Loader2 } from "lucide-react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = mockAuthService.getCurrentUser()

    if (!user) {
      router.push("/login")
      return
    }

    // Redirect based on user role
    switch (user.role) {
      case "admin":
        router.push("/admin/dashboard")
        break
      case "counselor":
        router.push("/counselor")
        break
      case "learner":
        router.push("/dashboard")
        break
      default:
        router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Redirecting...</span>
      </div>
    </div>
  )
}
