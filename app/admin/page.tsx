"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Upload } from "lucide-react"

export default function AdminPage() {
  const [courseFormData, setCourseFormData] = useState({
    title: "",
    description: "",
    category: "",
  })

  const [lessonFormData, setLessonFormData] = useState({
    title: "",
    courseId: "",
    steps: "",
    audioUrl: "",
    videoUrl: "",
    imageUrl: "",
    quizQuestion: "",
    quizOptions: ["", "", "", ""],
    correctOption: "0",
  })

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Course form submitted:", courseFormData)
    // Reset form
    setCourseFormData({
      title: "",
      description: "",
      category: "",
    })
  }

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Lesson form submitted:", lessonFormData)
    // Reset form
    setLessonFormData({
      title: "",
      courseId: "",
      steps: "",
      audioUrl: "",
      videoUrl: "",
      imageUrl: "",
      quizQuestion: "",
      quizOptions: ["", "", "", ""],
      correctOption: "0",
    })
  }

  const updateQuizOption = (index: number, value: string) => {
    const newOptions = [...lessonFormData.quizOptions]
    newOptions[index] = value
    setLessonFormData({ ...lessonFormData, quizOptions: newOptions })
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNav title="Admin Panel" />
        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="courses">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="courses">Manage Courses</TabsTrigger>
              <TabsTrigger value="lessons">Manage Lessons</TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Course</CardTitle>
                  <CardDescription>Create a new course for the Mwangaza platform.</CardDescription>
                </CardHeader>
                <form onSubmit={handleCourseSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-title">Course Title</Label>
                      <Input
                        id="course-title"
                        placeholder="Enter course title"
                        value={courseFormData.title}
                        onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="course-description">Description</Label>
                      <Textarea
                        id="course-description"
                        placeholder="Enter course description"
                        value={courseFormData.description}
                        onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="course-category">Category</Label>
                      <Select
                        value={courseFormData.category}
                        onValueChange={(value) => setCourseFormData({ ...courseFormData, category: value })}
                        required
                      >
                        <SelectTrigger id="course-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="language">Language</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="cooking">Cooking</SelectItem>
                          <SelectItem value="wellness">Wellness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="course-image">Course Image</Label>
                      <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" className="w-full bg-transparent">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Course
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Lessons Tab */}
            <TabsContent value="lessons">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Lesson</CardTitle>
                  <CardDescription>Create a new lesson for an existing course.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLessonSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lesson-title">Lesson Title</Label>
                      <Input
                        id="lesson-title"
                        placeholder="Enter lesson title"
                        value={lessonFormData.title}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lesson-course">Course</Label>
                      <Select
                        value={lessonFormData.courseId}
                        onValueChange={(value) => setLessonFormData({ ...lessonFormData, courseId: value })}
                        required
                      >
                        <SelectTrigger id="lesson-course">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="course-1">Basic English Communication</SelectItem>
                          <SelectItem value="course-4">Cooking Fundamentals</SelectItem>
                          <SelectItem value="course-6">Stress Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lesson-steps">Lesson Steps</Label>
                      <Textarea
                        id="lesson-steps"
                        placeholder="Enter lesson steps (one per line)"
                        value={lessonFormData.steps}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, steps: e.target.value })}
                        required
                        rows={5}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="lesson-audio">Audio URL</Label>
                        <Input
                          id="lesson-audio"
                          placeholder="Enter audio URL"
                          value={lessonFormData.audioUrl}
                          onChange={(e) => setLessonFormData({ ...lessonFormData, audioUrl: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lesson-video">Video URL</Label>
                        <Input
                          id="lesson-video"
                          placeholder="Enter YouTube video URL"
                          value={lessonFormData.videoUrl}
                          onChange={(e) => setLessonFormData({ ...lessonFormData, videoUrl: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lesson-image">Lesson Image</Label>
                      <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" className="w-full bg-transparent">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Quiz</h3>

                      <div className="space-y-2">
                        <Label htmlFor="quiz-question">Question</Label>
                        <Input
                          id="quiz-question"
                          placeholder="Enter quiz question"
                          value={lessonFormData.quizQuestion}
                          onChange={(e) => setLessonFormData({ ...lessonFormData, quizQuestion: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Options</Label>
                        <div className="space-y-2">
                          {lessonFormData.quizOptions.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <RadioGroup
                                value={lessonFormData.correctOption}
                                onValueChange={(value) =>
                                  setLessonFormData({ ...lessonFormData, correctOption: value })
                                }
                                className="flex-shrink-0"
                              >
                                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                              </RadioGroup>
                              <Input
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => updateQuizOption(index, e.target.value)}
                                required
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Select the radio button next to the correct answer.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Lesson
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
