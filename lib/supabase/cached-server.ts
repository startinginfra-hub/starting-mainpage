import { cache } from "react"
import { createClient } from "@/lib/supabase/server"

/** 동일 RSC 요청 안에서 Supabase 클라이언트를 한 번만 생성합니다. */
export const getCachedServerSupabase = cache(createClient)

/** 동일 RSC 요청 안에서 auth.getUser()를 한 번만 호출합니다. */
export const getCachedAuthUser = cache(async () => {
  const supabase = await getCachedServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
})
