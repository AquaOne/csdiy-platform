"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Code2, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  totalCourses: number
  totalLessons: number
}

const stats = [
  { icon: BookOpen, label: "课程", value: 0, suffix: "+" },
  { icon: Code2, label: "教程", value: 0, suffix: "+" },
  { icon: TrendingUp, label: "学习路径", value: 4, suffix: "" },
  { icon: Users, label: "免费开源", value: "∞", suffix: "" },
]

export function HeroSection({ totalCourses, totalLessons }: HeroSectionProps) {
  const displayStats = stats.map((s) => ({
    ...s,
    value: s.label === "课程" ? totalCourses : s.label === "教程" ? totalLessons : s.value,
  }))

  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              基于 CS 自学指南 · AI 驱动
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              计算机科学
            </span>
            <br />
            交互式自学平台
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            从零基础到顶尖学者，AI 生成的原创教程配合交互式代码编辑和测验系统，
            让你在浏览器中完成全部学习流程，无需跳转任何外部网站。
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/courses">
              <Button size="lg" className="rounded-full h-12 px-8 gap-2 text-base">
                开始学习 <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/paths">
              <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base">
                查看学习路径
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {displayStats.map((stat, i) => (
              <div key={i} className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
                <stat.icon className="h-5 w-5 text-primary mb-1 mx-auto" />
                <div className="text-2xl font-bold">{stat.value}{stat.suffix}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
