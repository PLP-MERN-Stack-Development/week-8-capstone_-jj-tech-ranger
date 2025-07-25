import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LightbulbIcon } from "lucide-react"

interface AuthCardProps {
  title: string
  description: string
  children: React.ReactNode
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LightbulbIcon className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Mwangaza</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2">
            Lighting the path to a better life
          </CardDescription>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">{children}</CardContent>
      </Card>
    </div>
  )
}
