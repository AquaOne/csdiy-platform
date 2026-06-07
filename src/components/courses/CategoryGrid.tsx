"use client"

import { motion } from "framer-motion"
import { GraduationCap, Compass, Target, Zap, Code2, Database, Cpu, Network, Shield, Brain, BookOpen, Pencil, Palette } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const categoryIcons: Record<string, React.ElementType> = {
  "编程入门": Code2,
  "编程语言设计与分析": Pencil,
  "数学基础": BookOpen,
  "数学进阶": BookOpen,
  "数据结构与算法": Cpu,
  "计算机系统基础": Database,
  "操作系统": Cpu,
  "计算机网络": Network,
  "体系结构": Cpu,
  "数据库系统": Database,
  "Web开发": Palette,
  "编译原理": Code2,
  "并行与分布式系统": Network,
  "系统安全": Shield,
  "人工智能": Brain,
  "机器学习": Brain,
  "机器学习系统": Cpu,
  "机器学习进阶": Brain,
  "深度学习": Brain,
  "深度生成模型": Brain,
  "计算机图形学": Palette,
  "软件工程": Code2,
  "电子基础": Cpu,
  "数据科学": Database,
  "数据可视化": Palette,
  "必学工具": Compass,
}

const categoryColors: Record<string, string> = {
  "编程入门": "from-blue-500/20 to-blue-600/20 border-blue-500/30",
  "数学基础": "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  "数据结构与算法": "from-orange-500/20 to-orange-600/20 border-orange-500/30",
  "操作系统": "from-red-500/20 to-red-600/20 border-red-500/30",
  "计算机网络": "from-green-500/20 to-green-600/20 border-green-500/30",
  "数据库系统": "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
  "人工智能": "from-violet-500/20 to-violet-600/20 border-violet-500/30",
  "机器学习": "from-pink-500/20 to-pink-600/20 border-pink-500/30",
  "深度学习": "from-rose-500/20 to-rose-600/20 border-rose-500/30",
}

function getCategoryColor(name: string): string {
  return categoryColors[name] || "from-primary/10 to-primary/5 border-primary/20"
}

function getCategoryIcon(name: string): React.ElementType {
  return categoryIcons[name] || BookOpen
}

interface CategoryGridProps {
  categories: Array<{
    id: string
    name: string
    slug: string
    description: string | null
    icon: string | null
    color: string | null
    courses: Array<{
      id: string
      title: string
      slug: string
      description: string
      difficulty: string | null
      estimatedHours: number | null
      icon: string | null
      order: number
      _count: { lessons: number }
    }>
  }>
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="space-y-16">
      {categories.map((category, catIdx) => {
        const Icon = getCategoryIcon(category.name)
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: catIdx * 0.05 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Link
                  href={`/courses?category=${category.slug}`}
                  className="text-xl font-bold hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
                {category.description && (
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.courses.map((course, courseIdx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: courseIdx * 0.03 }}
                >
                  <Link href={`/courses/${course.slug}`}>
                    <Card className={`group h-full overflow-hidden border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 ${getCategoryColor(category.name)}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          {course.difficulty && (
                            <Badge variant="outline" className={`text-xs ${
                              course.difficulty === "beginner" ? "border-green-500/30 text-green-600" :
                              course.difficulty === "intermediate" ? "border-yellow-500/30 text-yellow-600" :
                              "border-red-500/30 text-red-600"
                            }`}>
                              {course.difficulty === "beginner" ? "入门" : course.difficulty === "intermediate" ? "进阶" : "高级"}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold mt-3 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>
                      </CardHeader>
                      <CardFooter className="text-xs text-muted-foreground pt-0">
                        <div className="flex items-center gap-4">
                          <span>{course._count.lessons} 节教程</span>
                          {course.estimatedHours && <span>~{course.estimatedHours}小时</span>}
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
