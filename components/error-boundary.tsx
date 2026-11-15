"use client"

import React, { Component, type ReactNode } from "react"
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi"

interface ErrorBoundaryProps {
  children: ReactNode
  fallbackTitle?: string
  fallbackMessage?: string
  onReset?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="p-6 md:p-8 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-xs text-center flex flex-col items-center justify-center my-4"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center mb-3">
            <FiAlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--color-text)]">
            {this.props.fallbackTitle || "Unable to display this component"}
          </h3>
          <p className="text-xs text-[var(--color-muted)] mt-1.5 max-w-[42ch]">
            {this.props.fallbackMessage ||
              "An unexpected error occurred while loading this section. You can try reloading it below."}
          </p>
          <button
            type="button"
            onClick={this.resetErrorBoundary}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-[var(--color-text)] bg-[var(--color-surface-muted)] hover:bg-[var(--color-line)]/50 border border-[var(--color-line)] transition-colors cursor-pointer"
          >
            <FiRefreshCw className="w-3 h-3 text-[var(--color-primary)]" aria-hidden="true" />
            <span>Try Reloading</span>
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
