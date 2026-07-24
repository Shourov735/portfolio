"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Contact() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    if (!isValid(payload)) {
      setStatus({ type: "error", message: "Please complete every field with a valid email and message." })
      return
    }

    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("API unavailable")
      form.reset()
      setStatus({ type: "success", message: "Thanks! Your message was submitted successfully." })
    } catch {
      openMailFallback(payload)
      setStatus({ type: "success", message: "The email fallback opened your email app with the message prepared." })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section bg-gradient-to-br from-[var(--color-surface-muted)]/82 to-[var(--color-bg)]" id="contact">
      <div className="container-main grid grid-cols-[0.85fr_1fr] gap-[42px] items-start max-md:grid-cols-1">
        <ScrollReveal>
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-bold leading-[1.08] text-[var(--color-text)]">
              Have an idea, opportunity, or collaboration?
            </h2>
            <p className="text-[var(--color-muted)] mt-2">
              Send a message through the form and I will get back to you as soon as possible.
            </p>
            <div className="grid gap-3 mt-6">
              <a href="mailto:mdshourov735@gmail.com" className="text-[var(--color-muted)] font-bold hover:text-[var(--color-primary-strong)] transition-colors">
                mdshourov735@gmail.com
              </a>
              <a href="https://github.com/Shourov735" target="_blank" rel="noreferrer" className="text-[var(--color-muted)] font-bold hover:text-[var(--color-primary-strong)] transition-colors">
                github.com/Shourov735
              </a>
              <a href="https://linkedin.com/in/md-shourov-89125a337" target="_blank" rel="noreferrer" className="text-[var(--color-muted)] font-bold hover:text-[var(--color-primary-strong)] transition-colors">
                LinkedIn profile
              </a>
              <a href="https://x.com/@Shourov735" target="_blank" rel="noreferrer" className="text-[var(--color-muted)] font-bold hover:text-[var(--color-primary-strong)] transition-colors">
                X / Twitter
              </a>
              <a href="https://t.me/Shourov735" target="_blank" rel="noreferrer" className="text-[var(--color-muted)] font-bold hover:text-[var(--color-primary-strong)] transition-colors">
                Telegram
              </a>
              <a href="https://www.youtube.com/@mdshourovgaming" target="_blank" rel="noreferrer" className="text-[var(--color-muted)] font-bold hover:text-[var(--color-primary-strong)] transition-colors">
                YouTube
              </a>
              <a href="https://medium.com/@Shourov735" target="_blank" rel="noreferrer" className="text-[var(--color-muted)] font-bold hover:text-[var(--color-primary-strong)] transition-colors">
                Medium
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-[26px]"
          >
            {status && (
              <div
                className={`rounded-md px-3 py-3 font-bold text-sm ${
                  status.type === "success"
                    ? "bg-[var(--color-primary)]/12 text-green-700 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:text-red-300"
                }`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </div>
            )}

            <label className="grid gap-[7px] text-sm font-bold text-[var(--color-muted)]">
              <span>Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-3 transition-[border-color,box-shadow] duration-160 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_var(--color-primary)/18] focus:outline-0"
              />
            </label>

            <label className="grid gap-[7px] text-sm font-bold text-[var(--color-muted)]">
              <span>Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-3 transition-[border-color,box-shadow] duration-160 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_var(--color-primary)/18] focus:outline-0"
              />
            </label>

            <label className="grid gap-[7px] text-sm font-bold text-[var(--color-muted)]">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                required
                minLength={3}
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-3 transition-[border-color,box-shadow] duration-160 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_var(--color-primary)/18] focus:outline-0"
              />
            </label>

            <label className="grid gap-[7px] text-sm font-bold text-[var(--color-muted)]">
              <span>Message</span>
              <textarea
                name="message"
                rows={6}
                required
                minLength={10}
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-3 transition-[border-color,box-shadow] duration-160 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_var(--color-primary)/18] focus:outline-0 resize-y"
              />
            </label>

            <label className="absolute left-[-9999px]" aria-hidden="true">
              <span>Leave this empty</span>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>

            <button
              type="submit"
              disabled={sending}
              className="btn-primary disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}

function isValid(data: Record<string, unknown>) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return (
    !data.website &&
    typeof data.name === "string" && data.name.trim().length >= 2 &&
    typeof data.email === "string" && emailPattern.test(data.email) &&
    typeof data.subject === "string" && data.subject.trim().length >= 3 &&
    typeof data.message === "string" && data.message.trim().length >= 10
  )
}

function openMailFallback(data: Record<string, unknown>) {
  const subject = encodeURIComponent(`[Portfolio] ${data.subject}`)
  const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)
  window.location.href = `mailto:mdshourov735@gmail.com?subject=${subject}&body=${body}`
}