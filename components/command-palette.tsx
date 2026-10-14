"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"

interface CommandAction {
  id: string
  title: string
  subtitle?: string
  category: "Flagship Case Studies" | "Navigation" | "Quick Utilities" | "Profiles & Links"
  shortcut?: string
  perform: () => void
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null
  return <CommandDialog onClose={onClose} />
}

function CommandDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2200)
  }, [])

  const actions: CommandAction[] = [
    // Flagships
    {
      id: "nabodigonto",
      title: "Nabodigonto Case Study",
      subtitle: "Double-signed blind audit protocol & member platform",
      category: "Flagship Case Studies",
      perform: () => {
        router.push("/projects/nabodigonto")
        onClose()
      },
    },
    {
      id: "insidejibon",
      title: "InsideJibon Case Study",
      subtitle: "Cloudflare Durable Objects & Workers AI Vectorize RAG",
      category: "Flagship Case Studies",
      perform: () => {
        router.push("/projects/insidejibon")
        onClose()
      },
    },
    {
      id: "arvaana",
      title: "ARVAANA Case Study",
      subtitle: "Luxury fragrance platform with zero-FOUC & WhatsApp engine",
      category: "Flagship Case Studies",
      perform: () => {
        router.push("/projects/arvaana")
        onClose()
      },
    },

    // Navigation
    {
      id: "nav-projects",
      title: "Projects Directory",
      subtitle: "Interactive index of 11 systems and repositories",
      category: "Navigation",
      perform: () => {
        const el = document.getElementById("projects")
        if (el) el.scrollIntoView({ behavior: "smooth" })
        else router.push("/#projects")
        onClose()
      },
    },
    {
      id: "nav-bento",
      title: "Open-Source & Algorithmic Proof",
      subtitle: "Maven Central PR #255 & 150+ competitive solutions",
      category: "Navigation",
      perform: () => {
        const el = document.getElementById("algorithmic-proof")
        if (el) el.scrollIntoView({ behavior: "smooth" })
        else router.push("/#algorithmic-proof")
        onClose()
      },
    },
    {
      id: "nav-skills",
      title: "Technical Competence",
      subtitle: "Explore primary and working technologies",
      category: "Navigation",
      perform: () => {
        const el = document.getElementById("skills")
        if (el) el.scrollIntoView({ behavior: "smooth" })
        else router.push("/#skills")
        onClose()
      },
    },
    {
      id: "nav-education",
      title: "Academic Foundation",
      subtitle: "BSSE at IIT, University of Dhaka & national merit",
      category: "Navigation",
      perform: () => {
        const el = document.getElementById("education")
        if (el) el.scrollIntoView({ behavior: "smooth" })
        else router.push("/#education")
        onClose()
      },
    },
    {
      id: "nav-blog",
      title: "Engineering Notes & Writing",
      subtitle: "Case studies on edge architecture and systems design",
      category: "Navigation",
      perform: () => {
        router.push("/blog")
        onClose()
      },
    },
    {
      id: "nav-contact",
      title: "Contact & Collaboration",
      subtitle: "Send a message or find direct communication channels",
      category: "Navigation",
      perform: () => {
        const el = document.getElementById("contact")
        if (el) el.scrollIntoView({ behavior: "smooth" })
        else router.push("/#contact")
        onClose()
      },
    },

    // Quick Utilities
    {
      id: "util-email",
      title: "Copy Email Address",
      subtitle: "mdshourov735@gmail.com",
      category: "Quick Utilities",
      shortcut: "C",
      perform: () => {
        if (navigator?.clipboard) {
          navigator.clipboard.writeText("mdshourov735@gmail.com")
          showToast("✓ Copied mdshourov735@gmail.com to clipboard")
        }
      },
    },
    {
      id: "util-resume",
      title: "Download Resume PDF",
      subtitle: "Md. Shourov — Software Engineering Resume",
      category: "Quick Utilities",
      shortcut: "D",
      perform: () => {
        window.open("/assets/resume/Md-Shourov-Resume.pdf", "_blank")
        onClose()
      },
    },
    {
      id: "util-theme",
      title: `Toggle Theme (${theme === "dark" ? "Switch to Light" : "Switch to Dark"})`,
      subtitle: `Currently in ${theme} mode`,
      category: "Quick Utilities",
      shortcut: "T",
      perform: () => {
        toggleTheme()
        showToast(`Switched theme to ${theme === "dark" ? "light" : "dark"} mode`)
      },
    },

    // Profiles & Links
    {
      id: "profile-github",
      title: "GitHub Profile",
      subtitle: "github.com/Shourov735",
      category: "Profiles & Links",
      perform: () => {
        window.open("https://github.com/Shourov735", "_blank", "noopener,noreferrer")
        onClose()
      },
    },
    {
      id: "profile-linkedin",
      title: "LinkedIn Profile",
      subtitle: "linkedin.com/in/md-shourov-613934358",
      category: "Profiles & Links",
      perform: () => {
        window.open("https://linkedin.com/in/md-shourov-613934358", "_blank", "noopener,noreferrer")
        onClose()
      },
    },
    {
      id: "profile-codeforces",
      title: "Codeforces Profile",
      subtitle: "codeforces.com/profile/Shourov735",
      category: "Profiles & Links",
      perform: () => {
        window.open("https://codeforces.com/profile/Shourov735", "_blank", "noopener,noreferrer")
        onClose()
      },
    },
    {
      id: "profile-leetcode",
      title: "LeetCode Profile",
      subtitle: "leetcode.com/u/Shourov735/",
      category: "Profiles & Links",
      perform: () => {
        window.open("https://leetcode.com/u/Shourov735/", "_blank", "noopener,noreferrer")
        onClose()
      },
    },
  ]

  const filtered = actions.filter((act) => {
    const text = `${act.title} ${act.subtitle || ""} ${act.category}`.toLowerCase()
    return text.includes(query.toLowerCase())
  })

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].perform()
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      onClose()
    }
  }

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>("[data-selected='true']")
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-[560px] bg-[var(--color-surface)] border border-[var(--color-line)] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-[var(--color-text)]">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[var(--color-line)] px-4 py-3">
          <span className="text-[var(--color-primary-strong)] font-mono text-base mr-3 select-none">
            ⌘
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or jump to case study..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-0 outline-none text-sm font-sans placeholder:text-[var(--color-muted)] text-[var(--color-text)]"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)] hover:text-[var(--color-text)] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Toast Feedback Banner */}
        {toastMessage && (
          <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary-strong)] border-b border-[var(--color-primary)]/20 px-4 py-2 text-xs font-mono font-medium animate-in fade-in duration-150">
            {toastMessage}
          </div>
        )}

        {/* Results List */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm font-mono text-[var(--color-muted)]">
              No matching commands or case studies for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((action, idx) => {
              const isSelected = selectedIndex === idx
              return (
                <button
                  key={action.id}
                  type="button"
                  data-selected={isSelected}
                  onClick={() => action.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-[var(--color-surface-muted)] text-[var(--color-text)] ring-1 ring-[var(--color-primary)]/40"
                      : "hover:bg-[var(--color-surface-muted)]/50 text-[var(--color-text)]"
                  }`}
                >
                  <div className="truncate">
                    <p className="text-sm font-medium font-sans truncate">{action.title}</p>
                    {action.subtitle && (
                      <p className="text-xs font-mono text-[var(--color-muted)] truncate mt-0.5">
                        {action.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-line)]">
                      {action.category}
                    </span>
                    {action.shortcut && (
                      <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-muted)]">
                        {action.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="border-t border-[var(--color-line)] p-2.5 px-4 bg-[var(--color-surface-muted)]/50 flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Md. Shourov · Portfolio</span>
        </div>
      </div>
    </div>
  )
}
