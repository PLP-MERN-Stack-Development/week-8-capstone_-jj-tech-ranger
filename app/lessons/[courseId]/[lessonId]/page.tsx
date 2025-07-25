"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QuizModal } from "@/components/quiz-modal"
import { ArrowLeft, ArrowRight, CheckCircle, Play, Volume2 } from "lucide-react"

// Mock data
const lessonData = {
  id: "lesson-3",
  title: "Everyday Conversations",
  number: 3,
  courseId: "course-1",
  courseTitle: "Basic English Communication",
  audioUrl: "#",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  content: [
    "Introduce yourself: 'Hello, my name is [your name]. Nice to meet you.'",
    "Ask how someone is doing: 'How are you today?'",
    "Respond to greetings: 'I'm fine, thank you. And you?'",
    "Ask for help: 'Excuse me, could you help me please?'",
    "Express gratitude: 'Thank you very much for your help.'",
  ],
  image: "/placeholder.svg?height=300&width=500",
  nextLessonId: "lesson-4",
  prevLessonId: "lesson-2",
  quiz: {
    question: "Which phrase would you use to introduce yourself?",
    options: [
      { id: "a", text: "How are you today?" },
      { id: "b", text: "Hello, my name is [your name]. Nice to meet you." },
      { id: "c", text: "Thank you very much." },
      { id: "d", text: "Could you help me please?" },
    ],
    correctOptionId: "b",
  },
}

export default function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const router = useRouter()

  const handleMarkComplete = () => {
    setIsQuizOpen(true)
  }

  const handlePrevious = () => {
    if (lessonData.prevLessonId) {
      router.push(`/lessons/${params.courseId}/${lessonData.prevLessonId}`)
    }
  }

  const handleNext = () => {
    if (lessonData.nextLessonId) {
      router.push(`/lessons/${params.courseId}/${lessonData.nextLessonId}`)
    }
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title={lessonData.courseTitle} subtitle={`Lesson ${lessonData.number}`} />
        <main className="flex-1 p-4 md:p-6">
          <Card className="mb-6 overflow-hidden">
            <div className="p-6">
              <h1 className="mb-2 text-2xl font-bold">{lessonData.title}</h1>
              <p className="text-sm text-muted-foreground">Lesson {lessonData.number}</p>
            </div>

            {/* Audio Player */}
            <div className="border-t border-b bg-muted/30 p-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-transparent">
                  <Play className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <div className="mb-1 h-2 rounded-full bg-muted">
                    <div className="h-full w-0 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0:00</span>
                    <span>2:30</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Video */}
            <div className="aspect-video w-full">
              <iframe
                src={lessonData.videoUrl}
                title={lessonData.title}
                className="h-full w-full"
                allowFullScreen
              ></iframe>
            </div>

            {/* Lesson Content */}
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Key Phrases</h2>
              <ul className="mb-6 space-y-3">
                {lessonData.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {lessonData.image && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img src={lessonData.image || "/placeholder.svg"} alt="Lesson visual" className="h-auto w-full" />
                </div>
              )}

              <Button onClick={handleMarkComplete} className="w-full" disabled={isCompleted}>
                {isCompleted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed
                  </>
                ) : (
                  "Mark as Complete"
                )}
              </Button>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={!lessonData.prevLessonId}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
            <Button variant="outline" onClick={handleNext} disabled={!lessonData.nextLessonId || !isCompleted}>
              Next Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        open={isQuizOpen}
        onOpenChange={setIsQuizOpen}
        question={lessonData.quiz.question}
        options={lessonData.quiz.options}
        correctOptionId={lessonData.quiz.correctOptionId}
        nextLessonId={lessonData.nextLessonId}
        courseId={params.courseId}
      />
    </div>
  )
}
