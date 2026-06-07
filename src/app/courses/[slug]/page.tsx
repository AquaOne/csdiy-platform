import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronRight, CheckCircle2, Circle, PlayCircle, FileText } from "lucide-react"

async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      category: true,
      lessons: { orderBy: { order: "asc" } },
    },
  })
  return course
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourse(slug)
  if (!course) notFound()

  const difficultyMap: Record<string, { label: string; color: string }> = {
    beginner: { label: "入门", color: "border-green-500/30 text-green-600" },
    intermediate: { label: "进阶", color: "border-yellow-500/30 text-yellow-600" },
    advanced: { label: "高级", color: "border-red-500/30 text-red-600" },
  }
  const diff = difficultyMap[course.difficulty || ""] || { label: course.difficulty || "", color: "" }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/courses" className="hover:text-foreground transition-colors">全部课程</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/courses?category=${course.category.slug}`} className="hover:text-foreground transition-colors">
              {course.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{course.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {course.difficulty && (
                    <Badge variant="outline" className={diff.color}>{diff.label}</Badge>
                  )}
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{course.category.name}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{course.title}</h1>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{course.description}</p>
                {course.longDescription && (
                  <p className="mt-2 text-muted-foreground">{course.longDescription}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link href={`/courses/${course.slug}/learn/${course.lessons[0]?.slug}`}>
                <Button size="lg" className="rounded-full h-12 px-8 gap-2">
                  <PlayCircle className="h-5 w-5" /> 开始学习
                </Button>
              </Link>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {course.lessons.length} 节教程</span>
                {course.estimatedHours && (
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 约 {course.estimatedHours} 小时</span>
                )}
              </div>
            </div>
          </div>

          {/* Course Outline */}
          <div>
            <h2 className="text-xl font-bold mb-6">课程大纲</h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, idx) => (
                <Link
                  key={lesson.id}
                  href={`/courses/${course.slug}/learn/${lesson.slug}`}
                >
                  <Card className="group hover:shadow-md hover:border-primary/30 transition-all duration-200">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {lesson.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {lesson.estimatedMinutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {lesson.estimatedMinutes}分钟
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
