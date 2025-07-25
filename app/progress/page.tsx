"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { ProgressTracker } from "@/components/progress-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Trophy } from "lucide-react"

// Mock data
const enrolledCourses = [
  {
    id: "course-1",
    title: "Basic English Communication",
    progress: 60,
    lessonsCompleted: 3,
    totalLessons: 5,
    streak: 4,
    badgeEarned: false,
  },
  {
    id: "course-4",
    title: "Cooking Fundamentals",
    progress: 25,
    lessonsCompleted: 1,
    totalLessons: 4,
    streak: 2,
    badgeEarned: false,
  },
  {
    id: "course-6",
    title: "Stress Management",
    progress: 100,
    lessonsCompleted: 3,
    totalLessons: 3,
    streak: 7,
    badgeEarned: true,
  },
]

const overallStats = {
  totalProgress: 62,
  coursesCompleted: 1,
  totalCourses: 3,
  currentStreak: 7,
  longestStreak: 10,
  badgesEarned: 1,
  totalBadges: 3,
}

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="My Learning Progress" />
        <main className="flex-1 p-4 md:p-6">
          {/* Overall Stats */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl font-bold">{overallStats.totalProgress}%</div>
                  <Progress value={overallStats.totalProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {overallStats.coursesCompleted} of {overallStats.totalCourses} courses completed
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{overallStats.currentStreak} days</div>
                    <p className="text-xs text-muted-foreground">Longest: {overallStats.longestStreak} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {overallStats.badgesEarned}/{overallStats.totalBadges}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {overallStats.totalBadges - overallStats.badgesEarned} badges remaining
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Time Spent Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3h 45m</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          {/* Course Progress */}
          <h2 className="mb-4 text-xl font-bold">Course Progress</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <ProgressTracker key={course.id} {...course} courseId={course.id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
