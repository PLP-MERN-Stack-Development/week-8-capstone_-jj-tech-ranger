"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface QuizOption {
  id: string
  text: string
}

interface QuizModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: string
  options: QuizOption[]
  correctOptionId: string
  nextLessonId?: string
  courseId: string
}

export function QuizModal({
  open,
  onOpenChange,
  question,
  options,
  correctOptionId,
  nextLessonId,
  courseId,
}: QuizModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const router = useRouter()

  const handleSubmit = () => {
    if (!selectedOption) return

    const correct = selectedOption === correctOptionId
    setIsCorrect(correct)
    setHasSubmitted(true)
  }

  const handleNext = () => {
    if (nextLessonId) {
      router.push(`/lessons/${courseId}/${nextLessonId}`)
    } else {
      router.push(`/courses/${courseId}`)
    }
    onOpenChange(false)
    // Reset state for next time
    setSelectedOption(null)
    setHasSubmitted(false)
    setIsCorrect(false)
  }

  const handleRetry = () => {
    setSelectedOption(null)
    setHasSubmitted(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Knowledge Check</DialogTitle>
          <DialogDescription>Answer correctly to proceed to the next lesson.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="mb-4 text-lg font-medium">{question}</h3>

          {hasSubmitted ? (
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span className="text-lg font-medium text-green-500">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-500" />
                    <span className="text-lg font-medium text-red-500">Incorrect</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {isCorrect
                  ? "Great job! You've answered correctly."
                  : "That's not quite right. Try again or review the lesson."}
              </p>
            </div>
          ) : (
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
              {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        <DialogFooter>
          {hasSubmitted ? (
            <>
              {isCorrect ? (
                <Button onClick={handleNext}>{nextLessonId ? "Next Lesson" : "Complete Course"}</Button>
              ) : (
                <Button onClick={handleRetry}>Try Again</Button>
              )}
            </>
          ) : (
            <Button onClick={handleSubmit} disabled={!selectedOption}>
              Submit Answer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
