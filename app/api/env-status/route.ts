import { NextResponse } from "next/server"

function envSet(name: string) {
  const value = process.env[name]
  return typeof value === "string" && value.trim().length > 0
}

export async function GET() {
  const checks = {
    CHANNEL_ACCESS_KEY: envSet("CHANNEL_ACCESS_KEY"),
    CHANNEL_ACCESS_SECRET: envSet("CHANNEL_ACCESS_SECRET"),
    CHANNEL_GROUP_ID: envSet("CHANNEL_GROUP_ID"),
    NEXT_PUBLIC_SUPABASE_URL: envSet("NEXT_PUBLIC_SUPABASE_URL"),
    SUPABASE_ANON_KEY: envSet("SUPABASE_ANON_KEY") || envSet("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: envSet("SUPABASE_SERVICE_ROLE_KEY"),
    ALLOWED_ORIGINS: envSet("ALLOWED_ORIGINS"),
  }

  const supabaseReady = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ].every((key) => {
    if (key === "SUPABASE_ANON_KEY") {
      return checks.SUPABASE_ANON_KEY
    }
    return checks[key as keyof typeof checks]
  })

  return NextResponse.json({
    ok: supabaseReady,
    supabaseReady,
    checks,
    hint: supabaseReady
      ? "Supabase env vars are set on this deployment."
      : "Missing Supabase env vars. Add them in Vercel → Settings → Environment Variables.",
  })
}
