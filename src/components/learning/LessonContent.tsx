"use client"

import { MDXRemote } from "next-mdx-remote"

interface LessonContentProps {
  content: string
  title: string
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4 pb-2 border-b" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 text-muted-foreground mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="relative overflow-x-auto rounded-lg border bg-[#0d1117] dark:bg-[#161b22] p-4 my-4" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 border-l-3 border-primary bg-primary/5 pl-4 py-2 rounded-r-lg italic text-muted-foreground" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium text-primary underline underline-offset-2 hover:text-primary/80" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
}

export function LessonContent({ content, title }: LessonContentProps) {
  // For now we render content as markdown-like text with basic formatting
  // In production, this would use MDXRemote with proper MDX compilation
  return (
    <article className="prose max-w-none">
      <h1 className="text-3xl font-bold tracking-tight mb-8">{title}</h1>
      <div className="space-y-4 leading-7 text-muted-foreground">
        {content.split("\n\n").map((paragraph, i) => {
          // Check if it's a heading
          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={i} className="text-2xl font-semibold tracking-tight mt-10 mb-4 pb-2 border-b text-foreground">
                {paragraph.replace("## ", "")}
              </h2>
            )
          }
          // Check if it's a code block
          if (paragraph.startsWith("```")) {
            const lines = paragraph.split("\n")
            const lang = lines[0].replace("```", "").trim()
            const code = lines.slice(1, -1).join("\n")
            return (
              <pre key={i} className="relative overflow-x-auto rounded-lg border bg-[#0d1117] dark:bg-[#161b22] p-4 my-4">
                <code className="text-sm font-mono">{code}</code>
              </pre>
            )
          }
          // Check if it's a bold-tip
          if (paragraph.startsWith("**")) {
            return (
              <blockquote key={i} className="mt-6 border-l-3 border-primary bg-primary/5 pl-4 py-2 rounded-r-lg italic">
                <p>{paragraph.replace(/\*\*/g, "").replace(/^— /, "")}</p>
              </blockquote>
            )
          }
          // Check if it's bullets
          if (paragraph.split("\n").every((l) => l.trim().startsWith("- "))) {
            return (
              <ul key={i} className="my-4 ml-6 list-disc space-y-2">
                {paragraph.split("\n").map((line, j) => (
                  <li key={j} className="leading-7">{line.replace("- ", "")}</li>
                ))}
              </ul>
            )
          }
          // Check if numbered list
          if (paragraph.split("\n").every((l) => /^\d+\.\s/.test(l.trim()))) {
            return (
              <ol key={i} className="my-4 ml-6 list-decimal space-y-2">
                {paragraph.split("\n").map((line, j) => (
                  <li key={j} className="leading-7">{line.replace(/^\d+\.\s/, "")}</li>
                ))}
              </ol>
            )
          }
          // Regular paragraph
          return <p key={i} className="leading-7">{paragraph}</p>
        })}
      </div>
    </article>
  )
}
