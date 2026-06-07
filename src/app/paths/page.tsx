import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"

async function getPaths() {
  return await prisma.learningPath.findMany({
    orderBy: { createdAt: "asc" },
  })
}

const difficultyColors: Record<string, string> = {
  beginner: "border-green-500/30 text-green-600 bg-green-500/10",
  intermediate: "border-yellow-500/30 text-yellow-600 bg-yellow-500/10",
  advanced: "border-red-500/30 text-red-600 bg-red-500/10",
}

const difficultyLabels: Record<string, string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
}

export default async function PathsPage() {
  const paths = await getPaths()

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">学习路径</h1>
            <p className="mt-2 text-muted-foreground">
              根据你的目标选择合适的学习路径，系统会推荐最优的课程顺序
            </p>
          </div>

          <div className="space-y-6">
            {paths.map((path) => (
              <Card key={path.id} className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{path.icon || "📚"}</span>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {path.name}
                        </CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={difficultyColors[path.difficulty] || ""}
                    >
                      {difficultyLabels[path.difficulty] || path.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{path.longDescription}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" /> {(JSON.parse(path.courses) as string[]).length} 门课程
                    </span>
                    {path.estimatedDays && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> 预计 {path.estimatedDays} 天
                      </span>
                    )}
                    <span className="flex items-center gap-1 ml-auto text-primary group-hover:gap-2 transition-all">
                      查看详情 <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
