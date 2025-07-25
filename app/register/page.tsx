"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { InputField } from "@/components/auth/input-field"
import { PasswordInput } from "@/components/auth/password-input"
import { RoleSelect } from "@/components/auth/role-select"
import { SubmitButton } from "@/components/auth/submit-button"
import { useToast } from "@/hooks/use-toast"
import { mockAuthService } from "@/services/auth"

const registerSchema = yup.object({
  fullName: yup.string().min(2, "Name must be at least 2 characters").required("Full name is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  role: yup
    .string()
    .oneOf(["learner", "counselor", "admin"], "Please select a valid role")
    .required("Role is required"),
})

type RegisterFormData = yup.InferType<typeof registerSchema>

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  })

  const watchedRole = watch("role")

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    try {
      await mockAuthService.register(data)

      toast({
        title: "Registration successful!",
        description: "Please sign in with your new account",
      })

      router.push("/login")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Create Account" description="Join Mwangaza and start your learning journey">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required
          error={errors.fullName?.message}
          {...register("fullName")}
        />

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
          placeholder="Create a password"
          required
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <RoleSelect
          label="Role"
          required
          value={watchedRole}
          onValueChange={(value) => setValue("role", value as any)}
          error={errors.role?.message}
        />

        <SubmitButton loading={loading}>Create Account</SubmitButton>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  )
}
