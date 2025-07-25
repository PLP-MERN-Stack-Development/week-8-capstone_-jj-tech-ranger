import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface CourseCardProps {
  id: string
  title: string
  description: string
  category: string
  image: string
  progress?: number
  enrolled?: boolean
}

export function CourseCard({
  id,
  title,
  description,
  category,
  image,
  progress = 0,
  enrolled = false,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <Badge className="absolute right-2 top-2">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2 p-4 pt-0">
        {enrolled && (
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <Button asChild className="w-full">
          <Link href={enrolled ? `/lessons/${id}` : `/courses/${id}`}>
            {enrolled ? "Continue Learning" : "Enroll Now"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
