import { SITE_URL } from "@/lib/site"

export const DEFAULT_INDEXNOW_KEY = "847f210cbf204c80b163ce2c301be881"

export interface IndexNowPayload {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

export interface IndexNowResult {
  ok: boolean
  status: number
  message: string
  submittedUrls: string[]
}

/**
 * Returns the active IndexNow API key.
 * Can be overridden via environment variable INDEXNOW_KEY.
 */
export function getIndexNowKey(): string {
  return process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY
}

/**
 * Submits an array of canonical URLs to IndexNow (Bing, Yandex, etc.).
 * @param urls Array of absolute URLs belonging to https://mdshourov.vercel.app
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const key = getIndexNowKey()
  const host = new URL(SITE_URL).hostname

  // Ensure URLs are valid, deduplicated, and belong strictly to our canonical domain
  const validUrls = Array.from(
    new Set(
      urls.filter((u) => {
        try {
          const parsed = new URL(u)
          return parsed.hostname === host
        } catch {
          return false
        }
      })
    )
  )

  if (validUrls.length === 0) {
    return {
      ok: false,
      status: 400,
      message: "No valid URLs provided matching canonical domain",
      submittedUrls: [],
    }
  }

  const payload: IndexNowPayload = {
    host,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: validUrls,
  }

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    })

    const status = response.status

    if (status === 200) {
      return {
        ok: true,
        status,
        message: "URLs submitted successfully to IndexNow",
        submittedUrls: validUrls,
      }
    }

    if (status === 202) {
      return {
        ok: true,
        status,
        message: "URLs received by IndexNow; key verification in progress",
        submittedUrls: validUrls,
      }
    }

    const text = await response.text().catch(() => "")
    return {
      ok: false,
      status,
      message: `IndexNow returned status ${status}: ${text || "Submission failed"}`,
      submittedUrls: validUrls,
    }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: error instanceof Error ? error.message : "Network error during IndexNow submission",
      submittedUrls: validUrls,
    }
  }
}
