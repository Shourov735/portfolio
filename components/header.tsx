"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#notes", label: "Notes" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    )
    document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.classList.remove("overflow-hidden")
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.classList.toggle("overflow-hidden", !menuOpen)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-transparent bg-[var(--color-bg)]/86 backdrop-blur-lg transition-[border-color,box-shadow] duration-180 ${
        scrolled ? "border-[var(--color-line)] shadow-sm" : ""
      }`}
    >
      <nav
        className="container-main flex h-[72px] items-center justify-between gap-5"
        aria-label="Primary navigation"
      >
        <a
          href="#home"
          className="inline-flex items-center gap-2.5 font-extrabold text-[var(--color-text)]"
          aria-label="Md. Shourov home"
        >
          <span className="inline-grid h-9 w-9 place-items-center rounded-md bg-[var(--color-primary)] text-white font-black">
            S
          </span>
          <span>Shourov</span>
        </a>

        <button
          className="menu-toggle md:hidden flex flex-col justify-center w-11 h-11 p-2.5 border-0 bg-transparent cursor-pointer"
          onClick={toggleMenu}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          <span
            className={`block h-0.5 w-6 rounded-full bg-[var(--color-text)] transition-all duration-180 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full bg-[var(--color-text)] transition-all duration-180 my-[5px] ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full bg-[var(--color-text)] transition-all duration-180 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>

        <div
          id="nav-menu"
          className={`flex items-center gap-1.5 max-md:fixed max-md:inset-x-0 max-md:top-[72px] max-md:grid max-md:p-3.5 max-md:border-b max-md:border-[var(--color-line)] max-md:bg-[var(--color-surface)] max-md:shadow-lg max-md:transition-transform max-md:duration-200 ${
            menuOpen ? "max-md:translate-y-0" : "max-md:-translate-y-[120%]"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`min-h-10 rounded-md px-2.5 py-2 text-sm font-bold transition-colors duration-160 max-md:w-full max-md:justify-start max-md:px-3 ${
                activeSection === link.href.slice(1)
                  ? "text-[var(--color-primary-strong)] bg-[var(--color-surface-muted)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-primary-strong)] hover:bg-[var(--color-surface-muted)]"
              }`}
              onClick={(e) => {
                closeMenu()
                const target = document.querySelector(link.href)
                if (target) {
                  e.preventDefault()
                  target.scrollIntoView({ behavior: "smooth", block: "start" })
                  history.pushState(null, "", link.href)
                }
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="inline-grid place-items-center w-10 h-10 rounded-md border-0 bg-transparent cursor-pointer text-[var(--color-muted)] hover:text-[var(--color-primary-strong)] hover:bg-[var(--color-surface-muted)] max-md:w-full max-md:justify-start max-md:px-3"
            type="button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
