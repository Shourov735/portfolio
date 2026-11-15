"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Script from "next/script"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SiYoutube, SiX, SiMedium, SiTelegram } from "react-icons/si"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { FiAlertCircle, FiCheckCircle, FiLoader, FiWifiOff } from "react-icons/fi"
import { useConnectivity } from "@/components/connectivity-banner"

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string
          action?: string
          cData?: string
          callback?: (token: string) => void
          "error-callback"?: (errorCode?: string) => void
          "expired-callback"?: () => void
          "timeout-callback"?: () => void
          theme?: "light" | "dark" | "auto"
          size?: "normal" | "compact" | "flexible"
          tabindex?: number
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
      getResponse: (widgetId?: string) => string
    }
  }
}

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

const DRAFT_STORAGE_KEY = "mdshourov_contact_draft_v1"

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
}

export function Contact() {
  const { isOnline } = useConnectivity()
  const [formValues, setFormValues] = useState<FormValues>(() => {
    if (typeof window === "undefined") {
      return { name: "", email: "", subject: "", message: "" }
    }
    try {
      const saved = sessionStorage.getItem(DRAFT_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          return {
            name: typeof parsed.name === "string" ? parsed.name : "",
            email: typeof parsed.email === "string" ? parsed.email : "",
            subject: typeof parsed.subject === "string" ? parsed.subject : "",
            message: typeof parsed.message === "string" ? parsed.message : "",
          }
        }
      }
    } catch {
      // sessionStorage unavailable
    }
    return { name: "", email: "", subject: "", message: "" }
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)
  const [sending, setSending] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [shouldLoadTurnstile, setShouldLoadTurnstile] = useState(false)

  const contactSectionRef = useRef<HTMLElement>(null)
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const subjectInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !turnstileContainerRef.current || widgetIdRef.current || !siteKey) {
      return
    }

    try {
      widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: siteKey,
        action: "contact",
        theme: "auto",
        callback: (token: string) => {
          setTurnstileToken(token)
          setStatus((prev) =>
            prev?.type === "error" && prev.message.toLowerCase().includes("verification") ? null : prev
          )
        },
        "expired-callback": () => {
          setTurnstileToken(null)
        },
        "error-callback": () => {
          setTurnstileToken(null)
        },
      })
    } catch (err) {
      console.error("Turnstile render error:", err)
    }
  }, [siteKey])

  useEffect(() => {
    const el = contactSectionRef.current
    if (!el || shouldLoadTurnstile) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadTurnstile(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldLoadTurnstile])

  useEffect(() => {
    if (shouldLoadTurnstile && typeof window !== "undefined" && window.turnstile) {
      renderWidget()
    }
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget, shouldLoadTurnstile])

  const validateField = (name: string, value: string): string | null => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    switch (name) {
      case "name":
        if (!value.trim()) return "Please enter your name."
        if (value.trim().length < 2) return "Name must be at least 2 characters."
        return null
      case "email":
        if (!value.trim()) return "Please enter your email address."
        if (!emailPattern.test(value.trim())) return "Enter a valid email address (e.g. name@example.com)."
        return null
      case "subject":
        if (!value.trim()) return "Please enter a subject."
        if (value.trim().length < 3) return "Subject must be at least 3 characters."
        return null
      case "message":
        if (!value.trim()) return "Please enter your message."
        if (value.trim().length < 10) return "Message must be at least 10 characters."
        return null
      default:
        return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => {
      const next = { ...prev, [name]: value }
      try {
        sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage quota exceeded or disabled
      }
      return next
    })

    if (touched[name]) {
      const errorMsg = validateField(name, value)
      setFieldErrors((prev) => ({ ...prev, [name]: errorMsg || "" }))
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const errorMsg = validateField(name, value)
    setFieldErrors((prev) => ({ ...prev, [name]: errorMsg || "" }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isOnline) {
      setStatus({
        type: "error",
        message: "You are currently offline. Please reconnect to the internet to submit your message.",
      })
      return
    }

    // Validate all fields
    const errors: Record<string, string> = {}
    let firstInvalid: HTMLInputElement | HTMLTextAreaElement | null = null

    const fieldKeys: (keyof FormValues)[] = ["name", "email", "subject", "message"]
    for (const key of fieldKeys) {
      const err = validateField(key, formValues[key])
      if (err) {
        errors[key] = err
        if (!firstInvalid) {
          if (key === "name") firstInvalid = nameInputRef.current
          else if (key === "email") firstInvalid = emailInputRef.current
          else if (key === "subject") firstInvalid = subjectInputRef.current
          else if (key === "message") firstInvalid = messageInputRef.current
        }
      }
    }

    setTouched({ name: true, email: true, subject: true, message: true })
    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      firstInvalid?.focus()
      setStatus({
        type: "error",
        message: "Please correct the highlighted fields before submitting.",
      })
      return
    }

    if (siteKey && !turnstileToken) {
      setStatus({ type: "error", message: "Please complete the human verification and try again." })
      return
    }

    setSending(true)
    setStatus(null)

    const abortController = new AbortController()
    const slowTimer = setTimeout(() => {
      setStatus({
        type: "info",
        message: "Sending is taking longer than usual... please hold on.",
      })
    }, 3000)

    const timeoutTimer = setTimeout(() => {
      abortController.abort()
    }, 25000)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          turnstileToken,
        }),
        signal: abortController.signal,
      })

      clearTimeout(slowTimer)
      clearTimeout(timeoutTimer)

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Failed to submit message. Please try again.",
        })
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current)
        }
        setTurnstileToken(null)
        return
      }

      // Success cleanup
      try {
        sessionStorage.removeItem(DRAFT_STORAGE_KEY)
      } catch {}

      setFormValues({ name: "", email: "", subject: "", message: "" })
      setFieldErrors({})
      setTouched({})
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
      setTurnstileToken(null)
      setStatus({
        type: "success",
        message: "Thanks! Your message was submitted successfully. I will get back to you soon.",
      })
    } catch (err: unknown) {
      clearTimeout(slowTimer)
      clearTimeout(timeoutTimer)

      const isAbort = err instanceof Error && err.name === "AbortError"
      if (isAbort) {
        setStatus({
          type: "error",
          message: "Request timed out after 25 seconds. Please try again or open your mail client.",
        })
      } else if (!navigator.onLine) {
        setStatus({
          type: "error",
          message: "Network connection lost. Your draft is preserved. Reconnect to retry.",
        })
      } else {
        openMailFallback(formValues)
        setStatus({
          type: "info",
          message:
            "Unable to reach endpoint directly. Opened your default mail app with the message pre-filled.",
        })
      }
    } finally {
      setSending(false)
    }
  }

  const resetFormState = () => {
    setStatus(null)
    setFieldErrors({})
    setTouched({})
  }

  return (
    <section
      ref={contactSectionRef}
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
            onFocusCapture={() => setShouldLoadTurnstile(true)}
            noValidate
            aria-describedby={status ? "form-status" : undefined}
            className="grid gap-4 border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 md:p-8"
          >
            {/* Form-level Status Alert */}
            {status && (
              <div
                id="form-status"
                role="status"
                aria-live="polite"
                className={`rounded-md px-4 py-3 font-medium text-xs md:text-sm border flex items-start justify-between gap-3 ${
                  status.type === "success"
                    ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary-strong)]"
                    : status.type === "info"
                      ? "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300"
                      : "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {status.type === "success" ? (
                    <FiCheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-primary)]" />
                  ) : status.type === "info" ? (
                    <FiLoader className="w-4 h-4 mt-0.5 shrink-0 animate-spin" />
                  ) : (
                    <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
                  )}
                  <span>{status.message}</span>
                </div>
                {status.type === "success" && (
                  <button
                    type="button"
                    onClick={resetFormState}
                    className="text-xs font-mono underline hover:opacity-80 shrink-0 ml-2"
                  >
                    Send another
                  </button>
                )}
              </div>
            )}

            {/* Field: Name */}
            <div className="grid gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] flex items-center justify-between"
              >
                <span>Name</span>
                <span className="text-[10px] text-[var(--color-muted)] opacity-70">Required</span>
              </label>
              <input
                ref={nameInputRef}
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={formValues.name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                aria-required="true"
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                className={`w-full border rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-2.5 text-sm transition-[border-color] duration-160 ${
                  fieldErrors.name
                    ? "border-red-500 focus:border-red-600 focus:outline-2 focus:outline-red-500/30"
                    : "border-[var(--color-line)] focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40"
                }`}
              />
              {fieldErrors.name && (
                <span
                  id="contact-name-error"
                  role="alert"
                  className="text-xs text-red-600 dark:text-red-400 inline-flex items-center gap-1 font-mono"
                >
                  <FiAlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{fieldErrors.name}</span>
                </span>
              )}
            </div>

            {/* Field: Email */}
            <div className="grid gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] flex items-center justify-between"
              >
                <span>Email</span>
                <span className="text-[10px] text-[var(--color-muted)] opacity-70">Required</span>
              </label>
              <input
                ref={emailInputRef}
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                aria-required="true"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                className={`w-full border rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-2.5 text-sm transition-[border-color] duration-160 ${
                  fieldErrors.email
                    ? "border-red-500 focus:border-red-600 focus:outline-2 focus:outline-red-500/30"
                    : "border-[var(--color-line)] focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40"
                }`}
              />
              {fieldErrors.email && (
                <span
                  id="contact-email-error"
                  role="alert"
                  className="text-xs text-red-600 dark:text-red-400 inline-flex items-center gap-1 font-mono"
                >
                  <FiAlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{fieldErrors.email}</span>
                </span>
              )}
            </div>

            {/* Field: Subject */}
            <div className="grid gap-1.5">
              <label
                htmlFor="contact-subject"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] flex items-center justify-between"
              >
                <span>Subject</span>
                <span className="text-[10px] text-[var(--color-muted)] opacity-70">Required</span>
              </label>
              <input
                ref={subjectInputRef}
                id="contact-subject"
                type="text"
                name="subject"
                value={formValues.subject}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                aria-required="true"
                aria-invalid={!!fieldErrors.subject}
                aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
                className={`w-full border rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-2.5 text-sm transition-[border-color] duration-160 ${
                  fieldErrors.subject
                    ? "border-red-500 focus:border-red-600 focus:outline-2 focus:outline-red-500/30"
                    : "border-[var(--color-line)] focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40"
                }`}
              />
              {fieldErrors.subject && (
                <span
                  id="contact-subject-error"
                  role="alert"
                  className="text-xs text-red-600 dark:text-red-400 inline-flex items-center gap-1 font-mono"
                >
                  <FiAlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{fieldErrors.subject}</span>
                </span>
              )}
            </div>

            {/* Field: Message */}
            <div className="grid gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] flex items-center justify-between"
              >
                <span>Message</span>
                <span className="text-[10px] text-[var(--color-muted)] opacity-70">Min 10 characters</span>
              </label>
              <textarea
                ref={messageInputRef}
                id="contact-message"
                name="message"
                rows={5}
                value={formValues.message}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                aria-required="true"
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                className={`w-full border rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-2.5 text-sm resize-y transition-[border-color] duration-160 ${
                  fieldErrors.message
                    ? "border-red-500 focus:border-red-600 focus:outline-2 focus:outline-red-500/30"
                    : "border-[var(--color-line)] focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40"
                }`}
              />
              {fieldErrors.message && (
                <span
                  id="contact-message-error"
                  role="alert"
                  className="text-xs text-red-600 dark:text-red-400 inline-flex items-center gap-1 font-mono"
                >
                  <FiAlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{fieldErrors.message}</span>
                </span>
              )}
            </div>

            {/* Honeypot field */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
            >
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Turnstile verification */}
            {siteKey && shouldLoadTurnstile && (
              <>
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  strategy="afterInteractive"
                  onLoad={renderWidget}
                />
                <div className="min-h-[66px] flex flex-col justify-center">
                  <div
                    ref={turnstileContainerRef}
                    className="cf-turnstile-wrapper overflow-hidden rounded-lg"
                  />
                  {turnstileToken && (
                    <span className="sr-only" aria-live="polite">
                      Human verification complete.
                    </span>
                  )}
                </div>
              </>
            )}

            {/* Offline warning and Submit button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="submit"
                disabled={sending || !isOnline}
                aria-busy={sending}
                className="btn-primary min-w-[150px] inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {sending ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>

              {!isOnline && (
                <span
                  role="status"
                  aria-live="polite"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-600 dark:text-amber-400"
                >
                  <FiWifiOff className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Connect to internet to send</span>
                </span>
              )}
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}

function openMailFallback(data: FormValues) {
  const subject = encodeURIComponent(`[Portfolio] ${data.subject}`)
  const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)
  window.location.href = `mailto:mdshourov735@gmail.com?subject=${subject}&body=${body}`
}
