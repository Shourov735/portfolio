"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { FiWifiOff, FiCheck, FiX } from "react-icons/fi"

interface ConnectivityContextType {
  isOnline: boolean
}

const ConnectivityContext = createContext<ConnectivityContextType>({ isOnline: true })

export function useConnectivity() {
  return useContext(ConnectivityContext)
}

export function ConnectivityProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    return navigator.onLine
  })

  const [status, setStatus] = useState<"online" | "offline" | "reconnected">(() => {
    if (typeof window === "undefined") return "online"
    return navigator.onLine ? "online" : "offline"
  })

  const [dismissed, setDismissed] = useState<boolean>(false)

  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null

    const handleOffline = () => {
      setIsOnline(false)
      setStatus("offline")
      setDismissed(false)
    }

    const handleOnline = () => {
      setIsOnline(true)
      setStatus("reconnected")
      setDismissed(false)

      if (reconnectTimer) clearTimeout(reconnectTimer)
      reconnectTimer = setTimeout(() => {
        setStatus("online")
      }, 3500)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      if (reconnectTimer) clearTimeout(reconnectTimer)
    }
  }, [])

  return (
    <ConnectivityContext.Provider value={{ isOnline }}>
      {children}
      {/* Banner display */}
      {status !== "online" && !dismissed && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 sm:max-w-md z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
        >
          <div
            className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border shadow-lg backdrop-blur-md text-xs font-mono font-medium ${
              status === "offline"
                ? "bg-[var(--color-surface)]/95 border-amber-500/40 text-amber-700 dark:text-amber-300"
                : "bg-[var(--color-surface)]/95 border-[var(--color-primary)]/40 text-[var(--color-primary-strong)]"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {status === "offline" ? (
                <FiWifiOff className="text-amber-500 text-sm shrink-0" aria-hidden="true" />
              ) : (
                <FiCheck className="text-[var(--color-primary)] text-sm shrink-0" aria-hidden="true" />
              )}
              <span className="truncate">
                {status === "offline"
                  ? "You're offline. Viewing cached portfolio content."
                  : "Back online. Connection restored."}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="p-1 rounded-md hover:bg-[var(--color-surface-muted)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors shrink-0"
              aria-label="Dismiss connectivity notification"
            >
              <FiX className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}
    </ConnectivityContext.Provider>
  )
}
