"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Play, RotateCcw, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const LANGUAGES = [
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "c", label: "C" },
  { id: "cpp", label: "C++" },
  { id: "java", label: "Java" },
  { id: "rust", label: "Rust" },
  { id: "go", label: "Go" },
]

const DEFAULT_CODE: Record<string, string> = {
  python: "# 在这里编写你的代码\nprint(\"Hello, CS Learner!\")\n",
  javascript: "// 在这里编写你的代码\nconsole.log(\"Hello, CS Learner!\");\n",
  typescript: "// 在这里编写你的代码\nconsole.log(\"Hello, CS Learner!\");\n",
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, CS Learner!\\n");\n    return 0;\n}\n',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, CS Learner!" << std::endl;\n    return 0;\n}\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CS Learner!");\n    }\n}\n',
  rust: 'fn main() {\n    println!("Hello, CS Learner!");\n}\n',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, CS Learner!")\n}\n',
}

export function CodePlayground() {
  const [language, setLanguage] = useState("python")
  const [code, setCode] = useState(DEFAULT_CODE["python"])
  const [output, setOutput] = useState("")
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleLanguageChange = (value: string) => {
    if (!value) return
    setLanguage(value)
    setCode(DEFAULT_CODE[value] || "")
    setOutput("")
  }

  const handleRun = async () => {
    setRunning(true)
    setOutput("⏳ 正在运行...")

    try {
      // Use Piston API for code execution
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language === "cpp" ? "c++" : language,
          version: "*",
          files: [{ name: `main.${language}`, content: code }],
        }),
      })

      if (!response.ok) {
        setOutput("⚠️ 代码执行服务暂时不可用，请稍后再试。\n(提示：你可以复制代码到本地环境运行)")
        return
      }

      const result = await response.json()
      const runOutput = result.run?.stdout || ""
      const runError = result.run?.stderr || ""
      setOutput(runError ? `错误:\n${runError}` : runOutput || "(无输出)")
    } catch {
      setOutput("⚠️ 执行服务连接失败。\n请将代码复制到本地运行。")
    } finally {
      setRunning(false)
    }
  }

  const handleReset = () => {
    setCode(DEFAULT_CODE[language] || "")
    setOutput("")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            代码练习
          </h3>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7">
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset} className="h-7 w-7">
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <Select value={language} onValueChange={(v) => v && handleLanguageChange(v)}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((l) => (
              <SelectItem key={l.id} value={l.id} className="text-xs">
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 8 },
            fontFamily: "'Geist Mono', 'Fira Code', monospace",
          }}
        />
      </div>

      <div className="p-3 border-t">
        <Button
          onClick={handleRun}
          disabled={running}
          size="sm"
          className="w-full gap-1.5 text-xs h-8"
        >
          <Play className="h-3.5 w-3.5" />
          {running ? "运行中..." : "运行代码"}
        </Button>
      </div>

      {output && (
        <div className="border-t bg-[#0d1117] dark:bg-[#161b22]">
          <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground border-b border-border/50">
            输出结果
          </div>
          <pre className="p-3 text-xs font-mono leading-relaxed overflow-x-auto max-h-[200px] overflow-y-auto whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}
