import { createClient } from "@supabase/supabase-js"

/**
 * 서버 전용. RLS를 우회해 로그인 식별자 해석 등에 사용.
 * SUPABASE_SERVICE_ROLE_KEY는 브라우저에 절대 포함하지 않습니다.
 */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY 또는 NEXT_PUBLIC_SUPABASE_URL이 설정되지 않았습니다.",
    )
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
