"use client"

import { Search, FileText, BookOpen, ArrowRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

interface SearchResult {
  title: string
  description: string
  url: string
  type: "course" | "lesson"
}

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((data) => setResults(data.results || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [query])

  const handleSelect = useCallback(
    (url: string) => {
      onOpenChange(false)
      router.push(url)
    },
    [onOpenChange, router]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] top-[15%] translate-y-0">
        <div className="flex items-center border-b pb-3">
          <Search className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            placeholder="搜索课程、教程..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 text-base"
            autoFocus
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {loading && (
            <div className="py-8 text-center text-muted-foreground">搜索中...</div>
          )}
          {!loading && query && results.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">未找到结果</div>
          )}
          {!loading &&
            results.map((result, i) => (
              <button
                key={i}
                onClick={() => handleSelect(result.url)}
                className="flex w-full items-start gap-3 rounded-lg p-3 text-left hover:bg-muted transition-colors"
              >
                {result.type === "course" ? (
                  <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                ) : (
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{result.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {result.description}
                  </div>
                </div>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
        </div>
        <div className="border-t pt-3 text-xs text-muted-foreground">
          <kbd className="rounded border bg-muted px-1.5 py-0.5">↑↓</kbd> 导航
          <kbd className="ml-2 rounded border bg-muted px-1.5 py-0.5">Enter</kbd> 选择
          <kbd className="ml-2 rounded border bg-muted px-1.5 py-0.5">Esc</kbd> 关闭
        </div>
      </DialogContent>
    </Dialog>
  )
}
