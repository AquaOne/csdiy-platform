import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({
      totalCourses: 0,
      totalLessons: 0,
      completedLessons: 0,
      totalQuizzes: 0,
      correctQuizzes: 0,
      streakDays: 0,
      totalNotes: 0,
    })
  }

  const userId = session.user.id

  const [totalLessons, completedProgress, totalNotes] = await Promise.all([
    prisma.lesson.count(),
    prisma.userProgress.count({ where: { userId, completed: true } }),
    prisma.note.count({ where: { userId } }),
  ])

  const totalCourses = await prisma.course.count()

  return NextResponse.json({
    totalCourses,
    totalLessons,
    completedLessons: completedProgress,
    totalQuizzes: 0,
    correctQuizzes: 0,
    streakDays: 0,
    totalNotes,
  })
}
