"use client"

import Link from "next/link"
import { BookOpen, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              CS 自学平台
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              基于 CS 自学指南，AI 驱动的交互式计算机学习平台
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">导航</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/courses" className="hover:text-foreground transition-colors">全部课程</Link>
              <Link href="/paths" className="hover:text-foreground transition-colors">学习路径</Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">学习统计</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">相关资源</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="https://csdiy.wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                CS 自学指南
              </a>
              <a
                href="https://github.com/PKUFlyingPig/cs-self-learning"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" /> GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>基于 CS 自学指南构建 · 仅供学习使用</p>
        </div>
      </div>
    </footer>
  )
}
