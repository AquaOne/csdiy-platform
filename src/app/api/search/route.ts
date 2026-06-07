export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")
  if (!q || q.trim().length === 0) {
    return NextResponse.json({ results: [] })
  }
  const query = q.trim()

  try {
    const [courses, lessons] = await Promise.all([
      prisma.course.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
          ],
        },
        select: {
          title: true,
          slug: true,
          description: true,
        },
        take: 5,
      }),
      prisma.lesson.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { content: { contains: query } },
          ],
        },
        select: {
          title: true,
          slug: true,
          course: { select: { slug: true } },
        },
        take: 10,
      }),
    ])

    const results = [
      ...courses.map((c) => ({
        title: c.title,
        description: c.description,
        url: `/courses/${c.slug}`,
        type: "course" as const,
      })),
      ...lessons.map((l) => ({
        title: l.title,
        description: `教程 · ${l.course.slug}`,
        url: `/courses/${l.course.slug}/learn/${l.slug}`,
        type: "lesson" as const,
      })),
    ]

    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] })
  }
}
