import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ notes: [] })
  }

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
  })

  return NextResponse.json({ notes })
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { lessonId, content } = body

  const note = await prisma.note.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId,
      },
    },
    update: { content },
    create: {
      userId: session.user.id,
      lessonId,
      content,
    },
  })

  return NextResponse.json({ note })
}
