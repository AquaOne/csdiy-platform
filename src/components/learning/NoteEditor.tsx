"use client"

import { useState, useEffect } from "react"
import { FileText, Save, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface NoteEditorProps {
  lessonId: string
}

export function NoteEditor({ lessonId }: NoteEditorProps) {
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load notes from localStorage (will be replaced with API in production)
  useEffect(() => {
    const savedNotes = localStorage.getItem(`note-${lessonId}`)
    if (savedNotes) {
      setContent(savedNotes)
    }
  }, [lessonId])

  const handleSave = async () => {
    setSaving(true)
    // Save to localStorage as fallback
    localStorage.setItem(`note-${lessonId}`, content)
    // In production, save to API
    try {
      await fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, content }),
      })
    } catch {
      // Already saved to localStorage
    }
    setSaving(false)
    setSaved(true)
    setLastSaved(new Date())
    toast.success("笔记已保存")
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            学习笔记
          </h3>
          <div className="flex items-center gap-2">
            {lastSaved && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lastSaved.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <Button
              variant={saved ? "default" : "outline"}
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="h-7 text-xs gap-1"
            >
              <Save className="h-3 w-3" />
              {saving ? "保存中..." : saved ? "已保存" : "保存"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下你的学习笔记，支持 Markdown 格式..."
          className="h-full resize-none border-0 bg-transparent focus-visible:ring-0 text-sm leading-relaxed placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  )
}
