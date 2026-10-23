import type { ReactNode } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "@/components/reading/code-block"
import type { TocItem } from "@/components/reading/table-of-contents"

type PostContentProps = {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose-article">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...rest }) => {
            const isExternal = href?.startsWith("http")
            if (isExternal) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
                  {children}
                </a>
              )
            }
            return (
              <a href={href} {...rest}>
                {children}
              </a>
            )
          },
          h2: ({ children, ...rest }) => {
            const id = slugifyHeading(extractText(children))
            return (
              <h2 id={id} className="scroll-mt-24 group flex items-center gap-2" {...rest}>
                <a href={`#${id}`} className="no-underline">
                  {children}
                </a>
                <span aria-hidden="true" className="opacity-0 group-hover:opacity-100 text-[var(--color-muted)] text-sm font-mono transition-opacity">
                  #
                </span>
              </h2>
            )
          },
          h3: ({ children, ...rest }) => {
            const id = slugifyHeading(extractText(children))
            return (
              <h3 id={id} className="scroll-mt-24 group flex items-center gap-2" {...rest}>
                <a href={`#${id}`} className="no-underline">
                  {children}
                </a>
                <span aria-hidden="true" className="opacity-0 group-hover:opacity-100 text-[var(--color-muted)] text-sm font-mono transition-opacity">
                  #
                </span>
              </h3>
            )
          },
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
            const match = /language-(\w+)/.exec(className || "")
            const isBlock = match || String(children).includes("\n")

            if (!isBlock) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-[var(--color-surface-muted)] text-[var(--color-primary-strong)] font-mono text-xs border border-[var(--color-line)]"
                  {...props}
                >
                  {children}
                </code>
              )
            }

            return (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={match ? match[1] : undefined}
              />
            )
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}

export function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children)
  }
  return ""
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80)
}

export function extractTocFromMarkdown(content: string): TocItem[] {
  const lines = content.split("\n")
  const items: TocItem[] = []
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (match) {
      const level = match[1].length
      const rawText = match[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[`*_]/g, "")
        .trim()
      const id = slugifyHeading(rawText)
      if (id) {
        items.push({ id, text: rawText, level })
      }
    }
  }
  return items
}
