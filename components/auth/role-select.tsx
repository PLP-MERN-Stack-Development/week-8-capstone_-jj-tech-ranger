"use client"

import { forwardRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface RoleSelectProps {
  label: string
  error?: string
  required?: boolean
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}

export const RoleSelect = forwardRef<HTMLButtonElement, RoleSelectProps>(
  ({ label, error, required, value, onValueChange, placeholder = "Select your role" }, ref) => {
    const roles = [
      { value: "learner", label: "Learner" },
      { value: "counselor", label: "Counselor" },
      { value: "admin", label: "Admin" },
    ]

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger ref={ref} className={error ? "border-destructive focus:ring-destructive" : ""}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
)

RoleSelect.displayName = "RoleSelect"
