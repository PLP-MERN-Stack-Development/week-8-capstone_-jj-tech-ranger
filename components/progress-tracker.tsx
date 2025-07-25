import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Medal } from "lucide-react"
import Link from "next/link"

interface ProgressTrackerProps {
  courseId: string
  courseTitle: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  streak: number
  badgeEarned?: boolean
}

export function ProgressTracker({
  courseId,
  courseTitle,
  progress,
  lessonsCompleted,
  totalLessons,
  streak,
  badgeEarned = false,
}: ProgressTrackerProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-lg">{courseTitle}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              <CheckCircle className="mr-1 inline h-3 w-3" />
              {lessonsCompleted}/{totalLessons} lessons
            </span>
            <span>
              <Clock className="mr-1 inline h-3 w-3" />
              {Math.round((totalLessons - lessonsCompleted) * 15)} mins left
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={badgeEarned ? "default" : "outline"} className="h-8 w-8 rounded-full p-0">
              <Medal className="h-4 w-4" />
            </Badge>
            <span className="text-sm">{badgeEarned ? "Badge Earned!" : "Complete to earn badge"}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{streak}</span>
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href={`/lessons/${courseId}`}>Resume Learning</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
