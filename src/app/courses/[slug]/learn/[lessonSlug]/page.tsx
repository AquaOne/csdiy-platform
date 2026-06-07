import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { LearningPage } from "@/components/learning/LearningPage"
import type { LessonWithProgress, CourseDetail } from "@/types"

async function getLessonData(slug: string, lessonSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      category: true,
      lessons: {
        orderBy: { order: "asc" },
      },
    },
  })
  if (!course) return null

  const lesson = course.lessons.find((l) => l.slug === lessonSlug)
  if (!lesson) return null

  const courseDetail: CourseDetail = {
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    longDescription: course.longDescription,
    difficulty: course.difficulty,
    estimatedHours: course.estimatedHours,
    icon: course.icon,
    videoUrl: course.videoUrl,
    prerequisites: course.prerequisites,
    category: {
      id: course.category.id,
      name: course.category.name,
      slug: course.category.slug,
    },
    lessons: course.lessons.map((l): LessonWithProgress => ({
      id: l.id,
      title: l.title,
      slug: l.slug,
      order: l.order,
      estimatedMinutes: l.estimatedMinutes,
      completed: false,
    })),
  }

  return { course: courseDetail, lesson }
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>
}) {
  const { slug, lessonSlug } = await params
  const data = await getLessonData(slug, lessonSlug)
  if (!data) notFound()

  return (
    <LearningPage
      course={data.course}
      lesson={data.lesson}
      allLessons={data.course.lessons}
    />
  )
}
