"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Quiz {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string | null
}

// Sample quizzes will be fetched from API in production
const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: "q1",
    question: "Shell 中，哪个命令用于列出当前目录的内容？",
    options: ["cd", "ls", "pwd", "cat"],
    answer: 1,
    explanation: "`ls` 是最常用的文件列表命令，可以显示当前目录下的文件和文件夹。`cd` 用于切换目录，`pwd` 显示当前路径，`cat` 查看文件内容。",
  },
  {
    id: "q2",
    question: "在 Git 中，'git commit' 命令的作用是什么？",
    options: ["删除文件", "创建新分支", "保存当前更改到本地仓库", "推送到远程仓库"],
    answer: 2,
    explanation: "`git commit` 将暂存区的更改保存为一次提交到本地仓库。`git push` 才用于推送到远程仓库。",
  },
  {
    id: "q3",
    question: "Vim 编辑器中，哪个按键用于进入插入模式？",
    options: ["Esc", "i", ":", "wq"],
    answer: 1,
    explanation: "在 Vim 中，按 `i` 键从普通模式切换到插入模式，此时可以输入文本。`Esc` 返回普通模式，`:` 进入命令行模式。",
  },
]

interface QuizPanelProps {
  lessonId: string
}

export function QuizPanel({ lessonId }: QuizPanelProps) {
  const [quizzes] = useState(SAMPLE_QUIZZES)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [allSubmitted, setAllSubmitted] = useState(false)

  const handleSubmit = (quizId: string) => {
    if (answers[quizId] === undefined) return
    setSubmitted((prev) => ({ ...prev, [quizId]: true }))
  }

  const handleSubmitAll = () => {
    const all: Record<string, boolean> = {}
    quizzes.forEach((q) => {
      if (answers[q.id] !== undefined) all[q.id] = true
    })
    setSubmitted(all)
    setAllSubmitted(true)
  }

  const isCorrect = (quizId: string) => {
    const q = quizzes.find((q) => q.id === quizId)
    if (!q) return false
    return answers[quizId] === q.answer
  }

  const correctCount = quizzes.filter((q) => submitted[q.id] && isCorrect(q.id)).length

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary" />
            知识测验
          </h3>
          {allSubmitted && (
            <span className="text-xs text-muted-foreground">
              {correctCount}/{quizzes.length} 正确
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {quizzes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            本教程暂未配备测验题
          </div>
        ) : (
          quizzes.map((quiz, idx) => {
            const isSubmitted = submitted[quiz.id]
            const correct = isSubmitted && isCorrect(quiz.id)
            return (
              <div key={quiz.id} className="space-y-3">
                <p className="text-sm font-medium">
                  {idx + 1}. {quiz.question}
                </p>
                <RadioGroup
                  value={String(answers[quiz.id] ?? "")}
                  onValueChange={(val) => {
                    if (!isSubmitted) {
                      setAnswers((prev) => ({ ...prev, [quiz.id]: parseInt(val) }))
                    }
                  }}
                  className="space-y-2"
                >
                  {quiz.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg border p-3 transition-colors",
                        isSubmitted && optIdx === quiz.answer && "border-green-500 bg-green-500/5",
                        isSubmitted &&
                          optIdx === answers[quiz.id] &&
                          optIdx !== quiz.answer &&
                          "border-red-500 bg-red-500/5",
                        !isSubmitted && answers[quiz.id] === optIdx && "border-primary",
                        !isSubmitted && "hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem
                        value={String(optIdx)}
                        id={`${quiz.id}-${optIdx}`}
                        disabled={isSubmitted}
                      />
                      <Label
                        htmlFor={`${quiz.id}-${optIdx}`}
                        className="flex-1 text-sm cursor-pointer"
                      >
                        {option}
                      </Label>
                      {isSubmitted && optIdx === quiz.answer && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                      {isSubmitted &&
                        optIdx === answers[quiz.id] &&
                        optIdx !== quiz.answer && (
                          <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        )}
                    </div>
                  ))}
                </RadioGroup>

                {isSubmitted && (
                  <div
                    className={cn(
                      "text-xs p-2 rounded-md",
                      correct
                        ? "bg-green-500/10 text-green-600"
                        : "bg-amber-500/10 text-amber-600"
                    )}
                  >
                    {correct ? "✅ 回答正确！" : `❌ 正确答案是选项 ${quiz.answer + 1}`}
                    {quiz.explanation && (
                      <p className="mt-1 text-muted-foreground">{quiz.explanation}</p>
                    )}
                  </div>
                )}

                {!isSubmitted && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleSubmit(quiz.id)}
                    disabled={answers[quiz.id] === undefined}
                  >
                    提交答案
                  </Button>
                )}
              </div>
            )
          })
        )}
      </div>

      {quizzes.length > 0 && !allSubmitted && (
        <div className="p-3 border-t">
          <Button onClick={handleSubmitAll} size="sm" className="w-full text-xs h-8">
            提交全部
          </Button>
        </div>
      )}
    </div>
  )
}
