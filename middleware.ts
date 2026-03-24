import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { defaultLocale, isLocale, locales } from "@/lib/i18n/config"

const LOCALE_PREFIX = new RegExp(`^/(${locales.join("|")})(/|$)`)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split("/")[1]
  if (!LOCALE_PREFIX.test(pathname)) {
    const url = request.nextUrl.clone()
    const suffix = pathname === "/" ? "" : pathname
    url.pathname = `/${defaultLocale}${suffix}`
    return NextResponse.redirect(url, 308)
  }

  const locale = isLocale(firstSegment) ? firstSegment : defaultLocale

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-sonopilot-locale", locale)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_vercel|favicon.ico|images|fonts|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.gif|.*\\.ico|.*\\.txt|.*\\.xml).*)",
    "/",
  ],
}
