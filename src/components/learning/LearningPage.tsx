"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, BookOpen, FileText, Code2, GraduationCap, Maximize2, Minimize2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { LessonContent } from "@/components/learning/LessonContent"
import { CodePlayground } from "@/components/learning/CodePlayground"
import { QuizPanel } from "@/components/learning/QuizPanel"
import { NoteEditor } from "@/components/learning/NoteEditor"
import { cn } from "@/lib/utils"
import { useProgressStore } from "@/store/progress-store"
import { toast } from "sonner"
import type { CourseDetail, LessonWithProgress } from "@/types"

interface LearningPageProps {
  course: CourseDetail
  lesson: {
    id: string
    title: string
    slug: string
    content: string
    order: number
    estimatedMinutes: number | null
  }
  allLessons: LessonWithProgress[]
}

type RightPanel = "notes" | "quiz" | "code" | null

export function LearningPage({ course, lesson, allLessons }: LearningPageProps) {
  const router = useRouter()
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [rightPanel, setRightPanel] = useState<RightPanel>(null)
  const [expanded, setExpanded] = useState(false)
  const { completeLesson, isCompleted } = useProgressStore()
  const completed = isCompleted(lesson.id)

  const progressPercent = ((currentIndex + 1) / allLessons.length) * 100

  const toggleRightPanel = (panel: RightPanel) => {
    setRightPanel(rightPanel === panel ? null : panel)
  }

  const handleNext = () => {
    if (!completed) {
      completeLesson(lesson.id)
      toast.success("太棒了！继续加油！")
    }
    if (nextLesson) {
      router.push(`/courses/${course.slug}/learn/${nextLesson.slug}`)
    }
  }

  const handlePrev = () => {
    if (prevLesson) {
      router.push(`/courses/${course.slug}/learn/${prevLesson.slug}`)
    }
  }

  return (
    <div className={cn("flex h-screen overflow-hidden bg-background", expanded && "fixed inset-0 z-50")}>
      {/* Sidebar - Course Outline */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-r bg-card/50 backdrop-blur-sm flex-shrink-0 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm truncate">{course.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>进度</span>
                  <span>{currentIndex + 1}/{allLessons.length}</span>
                </div>
                <Progress value={progressPercent} className="h-1" />
              </div>
              <ScrollArea className="flex-1">
                <nav className="p-2 space-y-0.5">
                  {allLessons.map((l, idx) => {
                    const isActive = l.id === lesson.id
                    const isComp = l.completed
                    return (
                      <button
                        key={l.id}
                        onClick={() => router.push(`/courses/${course.slug}/learn/${l.slug}`)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          {isComp ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : isActive ? (
                            <span className="w-2 h-2 rounded-full bg-primary" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground/40" />
                          )}
                        </span>
                        <span className="truncate text-xs">{l.title}</span>
                      </button>
                    )
                  })}
                </nav>
              </ScrollArea>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm font-medium truncate max-w-[300px]">{lesson.title}</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              · {currentIndex + 1}/{allLessons.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={rightPanel === "notes" ? "default" : "ghost"}
              size="sm"
              onClick={() => toggleRightPanel("notes")}
              className="h-8 gap-1.5 text-xs"
            >
              <FileText className="h-3.5 w-3.5" /> 笔记
            </Button>
            <Button
              variant={rightPanel === "quiz" ? "default" : "ghost"}
              size="sm"
              onClick={() => toggleRightPanel("quiz")}
              className="h-8 gap-1.5 text-xs"
            >
              <GraduationCap className="h-3.5 w-3.5" /> 测验
            </Button>
            <Button
              variant={rightPanel === "code" ? "default" : "ghost"}
              size="sm"
              onClick={() => toggleRightPanel("code")}
              className="h-8 gap-1.5 text-xs"
            >
              <Code2 className="h-3.5 w-3.5" /> 代码
            </Button>
            <Separator orientation="vertical" className="h-5 mx-1" />
            <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)} className="h-8 w-8">
              {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </header>

        {/* Content + Right Panel */}
        <div className="flex flex-1 min-h-0">
          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto py-8 px-6 md:px-10">
              <LessonContent content={lesson.content} title={lesson.title} />
            </div>
          </div>

          {/* Right Panel */}
          <AnimatePresence>
            {rightPanel && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 380, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-l bg-card/30 backdrop-blur-sm flex-shrink-0 overflow-hidden"
              >
                <div className="w-[380px] h-full">
                  {rightPanel === "notes" && <NoteEditor lessonId={lesson.id} />}
                  {rightPanel === "quiz" && <QuizPanel lessonId={lesson.id} />}
                  {rightPanel === "code" && <CodePlayground />}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <footer className="h-14 border-t bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 flex-shrink-0">
          <div>
            {prevLesson && (
              <Button variant="ghost" size="sm" onClick={handlePrev} className="gap-1.5">
                <ChevronLeft className="h-4 w-4" /> {prevLesson.title}
              </Button>
            )}
          </div>
          <Button
            variant={completed ? "outline" : "default"}
            size="sm"
            onClick={() => {
              completeLesson(lesson.id)
              toast.success("已完成本节！")
            }}
            className="gap-1.5"
          >
            <CheckCircle2 className="h-4 w-4" />
            {completed ? "已完成" : "标记完成"}
          </Button>
          <div>
            {nextLesson && (
              <Button variant="default" size="sm" onClick={handleNext} className="gap-1.5">
                {nextLesson.title} <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}
