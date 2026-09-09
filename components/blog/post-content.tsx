import type { ReactNode } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

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
              <h2 id={id} {...rest}>
                <a href={`#${id}`} className="no-underline">
                  {children}
                </a>
              </h2>
            )
          },
          h3: ({ children, ...rest }) => {
            const id = slugifyHeading(extractText(children))
            return (
              <h3 id={id} {...rest}>
                <a href={`#${id}`} className="no-underline">
                  {children}
                </a>
              </h3>
            )
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}

function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children)
  }
  return ""
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80)
}
