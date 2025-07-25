"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { InputField } from "@/components/auth/input-field"
import { PasswordInput } from "@/components/auth/password-input"
import { SubmitButton } from "@/components/auth/submit-button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"

const loginSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

type LoginFormData = yup.InferType<typeof loginSchema>

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login, user, isAuthenticated } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
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
          router.push("/dashboard")
      }
    }
  }, [isAuthenticated, user, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const response = await login(data)

      toast({
        title: "Login successful!",
        description: `Welcome back, ${response.user.name}`,
      })

      // Role-based redirect
      switch (response.user.role) {
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
          router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span>Redirecting to dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <AuthCard title="Welcome Back" description="Sign in to your Mwangaza account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          required
          error={errors.password?.message}
          {...register("password")}
        />

        <SubmitButton loading={loading}>Sign In</SubmitButton>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs font-medium mb-2">Demo Credentials:</p>
          <div className="text-xs space-y-1">
            <p>
              <strong>Admin:</strong> admin@mwangaza.com / admin123
            </p>
            <p>
              <strong>Learner:</strong> learner@mwangaza.com / learner123
            </p>
            <p>
              <strong>Counselor:</strong> counselor@mwangaza.com / counselor123
            </p>
          </div>
        </div>
      </form>
    </AuthCard>
  )
}
