const CHANNEL_API = "https://api.channel.io/open/v5";
const DEFAULT_GROUP_ID = "573316";

function parseBody(req) {
  if (typeof req.body === "object" && req.body !== null) return req.body;
  if (typeof req.body === "string" && req.body) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

function buildNotificationText(company, name, phone, email, role) {
  const lines = [`${company}에서 유선 상담을 신청했어요`];
  if (name) lines.push(`담당자: ${name}`);
  if (phone) lines.push(`전화: ${phone}`);
  if (email) lines.push(`이메일: ${email}`);
  if (role) lines.push(`직군: ${role}`);
  return lines.join("\n");
}

function getAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const allowed = getAllowedOrigins();
  const isLocalhost =
    origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (!origin) return;

  if (
    allowed.length === 0 ||
    allowed.includes(origin) ||
    allowed.includes("*") ||
    isLocalhost
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
}

async function sendGroupMessage(groupId, plainText, botName) {
  const accessKey = process.env.CHANNEL_ACCESS_KEY;
  const accessSecret = process.env.CHANNEL_ACCESS_SECRET;

  if (!accessKey || !accessSecret) {
    throw new Error("Missing CHANNEL_ACCESS_KEY or CHANNEL_ACCESS_SECRET");
  }

  const url = new URL(`${CHANNEL_API}/groups/${groupId}/messages`);
  if (botName) url.searchParams.set("botName", botName);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-key": accessKey,
      "x-access-secret": accessSecret,
    },
    body: JSON.stringify({ plainText }),
  });

  if (!response.ok) {
    const body = await response.text();
    const err = new Error(`Channel API ${response.status}: ${body}`);
    err.status = response.status;
    err.body = body;
    throw err;
  }

  return response.json();
}

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = parseBody(req);
  const company = (body.company || "").trim();
  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const email = (body.email || "").trim();
  const role = (body.role || "").trim();
  if (!company) {
    return res.status(400).json({ error: "company is required" });
  }
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  if (!phone) {
    return res.status(400).json({ error: "phone is required" });
  }

  const groupId = process.env.CHANNEL_GROUP_ID || DEFAULT_GROUP_ID;
  const plainText = buildNotificationText(company, name, phone, email, role);

  try {
    const message = await sendGroupMessage(
      groupId,
      plainText,
      process.env.CHANNEL_BOT_NAME || undefined
    );
    return res.status(200).json({ ok: true, messageId: message?.message?.id });
  } catch (error) {
    console.error("[consultation-notify]", error);
    const missingCreds = !process.env.CHANNEL_ACCESS_KEY || !process.env.CHANNEL_ACCESS_SECRET;
    return res.status(500).json({
      error: "Failed to send notification",
      hint: missingCreds
        ? "Missing CHANNEL_ACCESS_KEY or CHANNEL_ACCESS_SECRET on Vercel"
        : error.status
          ? `Channel API returned ${error.status}`
          : error.message,
    });
  }
};
