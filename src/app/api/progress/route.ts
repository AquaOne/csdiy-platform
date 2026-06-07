import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ progress: [] })
  }

  const progress = await prisma.userProgress.findMany({
    where: { userId: session.user.id },
    select: { lessonId: true, completed: true, score: true, completedAt: true },
  })

  return NextResponse.json({ progress })
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { lessonId, courseId, completed } = body

  const progress = await prisma.userProgress.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId,
      },
    },
    update: {
      completed,
      completedAt: completed ? new Date() : null,
    },
    create: {
      userId: session.user.id,
      lessonId,
      courseId,
      completed,
      completedAt: completed ? new Date() : null,
    },
  })

  return NextResponse.json({ progress })
}
