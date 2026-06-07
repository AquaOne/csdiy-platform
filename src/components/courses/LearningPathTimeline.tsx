"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { LearningPathData } from "@/types"

const pathIcons: Record<string, string> = {
  "零基础转码": "🌱",
  "在校CS学生": "🎓",
  "算法面试": "💡",
  "AI/ML方向": "🤖",
}

export function LearningPathTimeline({ paths }: { paths: LearningPathData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {paths.map((path, idx) => (
        <motion.div
          key={path.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <Link href={`/paths#${path.slug}`}>
            <Card className="group h-full overflow-hidden border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="text-3xl mb-4">{pathIcons[path.name] || "📚"}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {path.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {path.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {path.courses.length} 门课程
                    {path.estimatedDays && ` · ${path.estimatedDays}天`}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
