import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { prisma } from "@/lib/prisma"
import { CategoryGrid } from "@/components/courses/CategoryGrid"

async function getCoursesData() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      courses: {
        orderBy: { order: "asc" },
        include: {
          _count: { select: { lessons: true } },
          lessons: { select: { id: true } },
        },
      },
    },
  })
  return categories
}

export default async function CoursesPage() {
  const categories = await getCoursesData()

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">全部课程</h1>
            <p className="mt-2 text-muted-foreground">
              从编程入门到深度学习，系统化学习计算机科学
            </p>
          </div>
          <CategoryGrid categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  )
}
