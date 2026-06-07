import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, CheckCircle2, Clock, FileText, TrendingUp, Zap } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/api/auth/signin")

  const userId = session.user.id

  const [totalCourses, totalLessons, completedProgress, totalNotes] = await Promise.all([
    prisma.course.count(),
    prisma.lesson.count(),
    prisma.userProgress.count({ where: { userId, completed: true } }),
    prisma.note.count({ where: { userId } }),
  ])

  const recentProgress = await prisma.userProgress.findMany({
    where: { userId, completed: true },
    orderBy: { completedAt: "desc" },
    take: 5,
    include: {
      lesson: { select: { title: true, slug: true } },
      course: { select: { title: true, slug: true } },
    },
  })

  const stats = [
    { icon: BookOpen, label: "全部课程", value: totalCourses, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: CheckCircle2, label: "已完成", value: completedProgress, color: "text-green-500", bg: "bg-green-500/10" },
    { icon: Clock, label: "待学习", value: totalLessons - completedProgress, color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: FileText, label: "笔记数", value: totalNotes, color: "text-purple-500", bg: "bg-purple-500/10" },
  ]

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">学习统计</h1>
            <p className="mt-2 text-muted-foreground">
              {session.user.name}，继续加油！你已经完成了 {completedProgress} 节教程。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                最近完成
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentProgress.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  还没有完成任何教程，去学习吧！
                </p>
              ) : (
                <div className="space-y-3">
                  {recentProgress.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Zap className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{p.lesson.title}</span>
                      <span className="text-muted-foreground">· {p.course.title}</span>
                      {p.completedAt && (
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(p.completedAt).toLocaleDateString("zh-CN")}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
