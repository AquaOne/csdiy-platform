import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w一-龥]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} 分钟`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours} 小时 ${mins} 分钟` : `${hours} 小时`
}

export function getDifficultyLabel(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  }
  return map[difficulty] || difficulty
}

export function getDifficultyColor(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: "text-green-500",
    intermediate: "text-yellow-500",
    advanced: "text-red-500",
  }
  return map[difficulty] || "text-muted-foreground"
}

export function getDifficultyBadgeColor(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: "bg-green-500/10 text-green-500 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    advanced: "bg-red-500/10 text-red-500 border-red-500/20",
  }
  return map[difficulty] || "bg-muted text-muted-foreground"
}
