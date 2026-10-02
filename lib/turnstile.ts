const CLOUDFLARE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export interface TurnstileVerificationResponse {
  success: boolean
  "error-codes"?: string[]
  challenge_ts?: string
  hostname?: string
  action?: string
  cdata?: string
  metadata?: {
    result_with_testing_key?: boolean
    interactive?: boolean
  }
}

export interface VerifyTurnstileResult {
  success: boolean
  error?: string
  errorCodes?: string[]
}

interface VerifyTurnstileOptions {
  token: unknown
  remoteIp?: string | null
  expectedAction?: string
}

export async function verifyTurnstileToken({
  token,
  remoteIp,
  expectedAction = "contact",
}: VerifyTurnstileOptions): Promise<VerifyTurnstileResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET

  if (!secretKey) {
    console.error("Turnstile configuration error: Neither TURNSTILE_SECRET_KEY nor TURNSTILE_SECRET is configured.")
    return {
      success: false,
      error: "Human verification configuration error on the server.",
    }
  }

  if (typeof token !== "string" || !token.trim()) {
    return {
      success: false,
      error: "Verification token is missing. Please complete the human verification.",
    }
  }

  const trimmedToken = token.trim()

  if (trimmedToken.length > 2048) {
    return {
      success: false,
      error: "Verification token is invalid.",
    }
  }

  try {
    const formData = new URLSearchParams()
    formData.append("secret", secretKey)
    formData.append("response", trimmedToken)
    if (remoteIp) {
      formData.append("remoteip", remoteIp)
    }

    const response = await fetch(CLOUDFLARE_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      console.error(`Turnstile siteverify responded with HTTP status ${response.status}`)
      return {
        success: false,
        error: "Unable to complete human verification right now. Please try again.",
      }
    }

    const data: TurnstileVerificationResponse = await response.json()

    if (!data.success) {
      const errorCodes = data["error-codes"] || []
      if (errorCodes.includes("timeout-or-duplicate")) {
        return {
          success: false,
          error: "Verification expired or has already been used. Please complete verification again.",
          errorCodes,
        }
      }
      return {
        success: false,
        error: "Please complete the human verification and try again.",
        errorCodes,
      }
    }

    const isTestKey = data.metadata?.result_with_testing_key === true

    // Validate action if present and expectedAction specified
    if (data.action && expectedAction && data.action !== expectedAction) {
      console.warn(`Turnstile action mismatch: expected '${expectedAction}', received '${data.action}'`)
      return {
        success: false,
        error: "Verification validation failed. Please try again.",
      }
    }

    // Hostname validation
    const configuredHostnames = (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean)

    const allowedHostnames = new Set<string>([
      "mdshourov.vercel.app",
      ...configuredHostnames,
    ])

    if (process.env.NODE_ENV !== "production" || isTestKey) {
      allowedHostnames.add("localhost")
      allowedHostnames.add("127.0.0.1")
      allowedHostnames.add("example.com")
    }

    if (data.hostname && !allowedHostnames.has(data.hostname.toLowerCase())) {
      console.warn(`Turnstile hostname rejected: '${data.hostname}' is not in allowed hostnames.`)
      return {
        success: false,
        error: "Verification origin is not authorized.",
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Turnstile verification network error:", error instanceof Error ? error.message : "Unknown error")
    return {
      success: false,
      error: "Unable to verify human verification service. Please try again.",
    }
  }
}
