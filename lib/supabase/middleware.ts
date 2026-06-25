import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { applyAdminRefCookieToResponse } from '@/lib/job-applications/admin-referral'
import { canAccessAppAdminPath, isAppAdminUser } from '@/lib/auth/app-admin'
import { getAuthenticatedRedirectPath } from '@/lib/auth/home-redirect'
import { isGuestOnlyAuthPath } from '@/lib/auth/guest-only-auth-paths'
import {
  isMaintenanceBypassPath,
  isMaintenanceModeEnabled,
} from '@/lib/maintenance/mode'
import { applyNoIndexHeaders } from '@/lib/seo/no-index-headers'
import { getSupabaseEnv, hasSupabaseEnv } from './env'

export async function updateSession(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return applyNoIndexHeaders(
      NextResponse.next({
        request,
      }),
    )
  }

  const { url, anonKey } = getSupabaseEnv()

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  if (isMaintenanceModeEnabled() && !isMaintenanceBypassPath(pathname) && !isAppAdminUser(user)) {
    if (pathname.startsWith('/api/')) {
      return applyNoIndexHeaders(
        NextResponse.json({ error: 'maintenance' }, { status: 503 }),
      )
    }

    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    url.search = ''
    return applyNoIndexHeaders(NextResponse.redirect(url, 307))
  }

  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      return applyNoIndexHeaders(NextResponse.redirect(url))
    }
    if (!isAppAdminUser(user)) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return applyNoIndexHeaders(NextResponse.redirect(url))
    }
    if (!canAccessAppAdminPath(user, pathname)) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/dashboard'
      url.search = ''
      return applyNoIndexHeaders(NextResponse.redirect(url))
    }
  }

  if (user && isGuestOnlyAuthPath(request.nextUrl.pathname)) {
    const redirectPath = await getAuthenticatedRedirectPath({
      supabase,
      user,
      next: request.nextUrl.searchParams.get('next'),
      siteOrigin: request.nextUrl.origin,
    })
    return applyNoIndexHeaders(NextResponse.redirect(new URL(redirectPath, request.url)))
  }

  return applyNoIndexHeaders(applyAdminRefCookieToResponse(request, supabaseResponse))
}
