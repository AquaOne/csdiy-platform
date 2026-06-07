import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CategoryGrid } from "@/components/courses/CategoryGrid"
import { LearningPathTimeline } from "@/components/courses/LearningPathTimeline"
import { HeroSection } from "@/components/courses/HeroSection"
import { prisma } from "@/lib/prisma"

async function getHomeData() {
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
  const rawPaths = await prisma.learningPath.findMany({
    orderBy: { createdAt: "asc" },
  })
  const paths = rawPaths.map((p) => ({
    ...p,
    courses: JSON.parse(p.courses) as string[],
  }))
  return { categories, paths }
}

export default async function HomePage() {
  const { categories, paths } = await getHomeData()
  const totalCourses = categories.reduce((sum, cat) => sum + cat.courses.length, 0)
  const totalLessons = categories.reduce(
    (sum, cat) => sum + cat.courses.reduce((s, c) => s + c._count.lessons, 0),
    0
  )

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection totalCourses={totalCourses} totalLessons={totalLessons} />
        {paths.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">学习路径</h2>
                <p className="mt-2 text-muted-foreground">为不同目标量身定制的学习路线</p>
              </div>
              <LearningPathTimeline paths={paths} />
            </div>
          </section>
        )}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">全部课程</h2>
              <p className="mt-2 text-muted-foreground">
                涵盖 {categories.length} 个类别，{totalCourses} 门课程，{totalLessons}+ 节教程
              </p>
            </div>
            <CategoryGrid categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
