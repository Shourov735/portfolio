"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SiYoutube, SiX, SiMedium, SiTelegram } from "react-icons/si"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:mdshourov735@gmail.com",
    icon: MdEmail,
  },
  {
    label: "GitHub",
    href: "https://github.com/Shourov735",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/md-shourov-613934358",
    icon: FaLinkedin,
  },
  {
    label: "X",
    href: "https://x.com/Shourov735",
    icon: SiX,
  },
  {
    label: "Telegram",
    href: "https://t.me/Shourov735",
    icon: SiTelegram,
  },
  {
    label: "Medium",
    href: "https://medium.com/@Shourov735",
    icon: SiMedium,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MD._SHOUROV_",
    icon: SiYoutube,
  },
]

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
      setStatus({
        type: "success",
        message: "The email fallback opened your email app with the message prepared.",
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      className="section bg-gradient-to-br from-[var(--color-surface-muted)]/82 to-[var(--color-bg)]"
      id="contact"
    >
      <div className="container-main grid grid-cols-[0.85fr_1fr] gap-[42px] items-start max-md:grid-cols-1">
        <ScrollReveal>
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.04] tracking-tight text-[var(--color-text)] text-balance">
              Have an idea, opportunity, or collaboration?
            </h2>
            <p className="text-[var(--color-muted)] mt-3 max-w-[44ch]">
              Send a message through the form and I will get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-strong)] hover:bg-[var(--color-surface-hover)] transition-all duration-200 group shadow-sm"
                >
                  <Icon className="text-[var(--color-primary)] text-base shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-describedby={status ? "form-status" : undefined}
            className="grid gap-4 border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 md:p-8"
          >
            {status && (
              <div
                id="form-status"
                className={`rounded-md px-4 py-3 font-medium text-sm border ${
                  status.type === "success"
                    ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary-strong)]"
                    : "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300"
                }`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </div>
            )}

            <div className="grid gap-2">
              <label
                htmlFor="contact-name"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40 transition-[border-color] duration-160"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contact-email"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40 transition-[border-color] duration-160"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contact-subject"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                required
                minLength={3}
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40 transition-[border-color] duration-160"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contact-message"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                minLength={10}
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40 transition-[border-color] duration-160 resize-y"
              />
            </div>

            <label className="absolute left-[-9999px]" aria-hidden="true">
              <span>Leave this empty</span>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>

            <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60 mt-1">
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
    typeof data.name === "string" &&
    data.name.trim().length >= 2 &&
    typeof data.email === "string" &&
    emailPattern.test(data.email) &&
    typeof data.subject === "string" &&
    data.subject.trim().length >= 3 &&
    typeof data.message === "string" &&
    data.message.trim().length >= 10
  )
}

function openMailFallback(data: Record<string, unknown>) {
  const subject = encodeURIComponent(`[Portfolio] ${data.subject}`)
  const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)
  window.location.href = `mailto:mdshourov735@gmail.com?subject=${subject}&body=${body}`
}
