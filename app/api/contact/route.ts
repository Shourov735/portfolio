import { NextRequest, NextResponse } from "next/server"

const MAX_FIELD_LENGTH = 4000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const message = normalizeMessage(body)

    if (!isValidMessage(message)) {
      return NextResponse.json({ ok: false, error: "Invalid message" }, { status: 400 })
    }

    if (message.website) {
      return NextResponse.json({ ok: true, delivered: false })
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL

    if (!webhookUrl) {
      return NextResponse.json({ ok: false, error: "CONTACT_WEBHOOK_URL is not configured" }, { status: 503 })
    }

    const webhookPayload = buildWebhookPayload(webhookUrl, message)
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    })

    if (!webhookResponse.ok) {
      throw new Error(`Webhook failed with status ${webhookResponse.status}`)
    }

    return NextResponse.json({ ok: true, delivered: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ ok: false, error: "Unable to send message" }, { status: 500 })
  }
}

function normalizeMessage(body: Record<string, unknown>) {
  return {
    name: clean(body.name),
    email: clean(body.email),
    subject: clean(body.subject),
    message: clean(body.message),
    website: clean(body.website),
  }
}

function clean(value: unknown) {
  return String(value ?? "")
    .trim()
    .slice(0, MAX_FIELD_LENGTH)
}

function isValidMessage(data: {
  name: string
  email: string
  subject: string
  message: string
  website: string
}) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return (
    data.name.length >= 2 &&
    emailPattern.test(data.email) &&
    data.subject.length >= 3 &&
    data.message.length >= 10
  )
}

function buildWebhookPayload(webhookUrl: string, message: Record<string, string>) {
  const submittedAt = new Date().toISOString()

  if (isDiscordWebhook(webhookUrl)) {
    return {
      content: [
        "**New portfolio contact message**",
        `**Name:** ${message.name}`,
        `**Email:** ${message.email}`,
        `**Subject:** ${message.subject}`,
        `**Submitted:** ${submittedAt}`,
        "",
        message.message,
      ]
        .join("\n")
        .slice(0, 1900),
    }
  }

  return {
    source: "portfolio-contact-form",
    submittedAt,
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
  }
}

function isDiscordWebhook(webhookUrl: string) {
  return /discord(?:app)?\.com\/api\/webhooks\//.test(webhookUrl)
}
