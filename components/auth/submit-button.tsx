import type React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface SubmitButtonProps {
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
}

export function SubmitButton({
  children,
  loading = false,
  disabled = false,
  className,
  type = "submit",
}: SubmitButtonProps) {
  return (
    <Button type={type} disabled={loading || disabled} className={`w-full ${className}`}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
