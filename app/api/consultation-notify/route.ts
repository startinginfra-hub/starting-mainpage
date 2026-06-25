import { NextRequest, NextResponse } from "next/server"

const CHANNEL_API = "https://api.channel.io/open/v5"
const DEFAULT_GROUP_ID = "573316"

function escapeHtml(text: string) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function textBlock(value: string) {
  return { type: "text", value }
}

function buildNotificationText(
  company: string,
  name: string,
  phone: string,
  email: string,
  role: string,
) {
  const lines = [`${company}에서 유선 상담을 신청했어요`]
  if (name) lines.push(`담당자: ${name}`)
  if (phone) lines.push(`전화: ${phone}`)
  if (email) lines.push(`이메일: ${email}`)
  if (role) lines.push(`직군: ${role}`)
  return lines.join("\n")
}

function buildNotificationBlocks(
  company: string,
  name: string,
  phone: string,
  email: string,
  role: string,
) {
  const blocks = [textBlock(`<b>${escapeHtml(company)}</b>에서 유선 상담을 신청했어요`)]
  if (name) blocks.push(textBlock(`담당자: ${escapeHtml(name)}`))
  if (phone) blocks.push(textBlock(`전화: ${escapeHtml(phone)}`))
  if (email) blocks.push(textBlock(`이메일: ${escapeHtml(email)}`))
  if (role) blocks.push(textBlock(`직군: ${escapeHtml(role)}`))
  return blocks
}

function getAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

function corsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin")
  const allowed = getAllowedOrigins()
  const isLocalhost =
    origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)

  const headers = new Headers({
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  })

  if (
    origin &&
    (allowed.length === 0 ||
      allowed.includes(origin) ||
      allowed.includes("*") ||
      isLocalhost)
  ) {
    headers.set("Access-Control-Allow-Origin", origin)
    headers.set("Vary", "Origin")
  }

  return headers
}

async function sendGroupMessage(
  groupId: string,
  plainText: string,
  blocks: ReturnType<typeof buildNotificationBlocks>,
  botName?: string,
) {
  const accessKey = process.env.CHANNEL_ACCESS_KEY
  const accessSecret = process.env.CHANNEL_ACCESS_SECRET

  if (!accessKey || !accessSecret) {
    throw new Error("Missing CHANNEL_ACCESS_KEY or CHANNEL_ACCESS_SECRET")
  }

  const url = new URL(`${CHANNEL_API}/groups/${groupId}/messages`)
  if (botName) url.searchParams.set("botName", botName)

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-key": accessKey,
      "x-access-secret": accessSecret,
    },
    body: JSON.stringify({ plainText, blocks }),
  })

  if (!response.ok) {
    const body = await response.text()
    const err = new Error(`Channel API ${response.status}: ${body}`) as Error & {
      status?: number
    }
    err.status = response.status
    throw err
  }

  return response.json()
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) })
}

export async function POST(request: NextRequest) {
  const headers = corsHeaders(request)

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const company = String(body.company || "").trim()
  const name = String(body.name || "").trim()
  const phone = String(body.phone || "").trim()
  const email = String(body.email || "").trim()
  const role = String(body.role || "").trim()

  if (!company) {
    return NextResponse.json({ error: "company is required" }, { status: 400, headers })
  }
  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400, headers })
  }
  if (!phone) {
    return NextResponse.json({ error: "phone is required" }, { status: 400, headers })
  }

  const groupId = process.env.CHANNEL_GROUP_ID || DEFAULT_GROUP_ID
  const plainText = buildNotificationText(company, name, phone, email, role)
  const blocks = buildNotificationBlocks(company, name, phone, email, role)

  try {
    const message = await sendGroupMessage(
      groupId,
      plainText,
      blocks,
      process.env.CHANNEL_BOT_NAME || undefined,
    )
    return NextResponse.json({ ok: true, messageId: message?.message?.id }, { headers })
  } catch (error) {
    console.error("[consultation-notify]", error)
    const missingCreds =
      !process.env.CHANNEL_ACCESS_KEY || !process.env.CHANNEL_ACCESS_SECRET
    const err = error as Error & { status?: number }
    return NextResponse.json(
      {
        error: "Failed to send notification",
        hint: missingCreds
          ? "Missing CHANNEL_ACCESS_KEY or CHANNEL_ACCESS_SECRET on Vercel"
          : err.status
            ? `Channel API returned ${err.status}`
            : err.message,
      },
      { status: 500, headers },
    )
  }
}
