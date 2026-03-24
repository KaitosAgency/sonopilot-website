import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { defaultLocale, type Locale } from "@/lib/i18n/config"

const STATIC_EXT = /\.(ico|png|jpg|jpeg|webp|gif|svg|txt|xml|json)$/i

function withLocaleHeader(response: NextResponse, locale: Locale) {
  response.headers.set("x-sonopilot-locale", locale)
  return response
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    STATIC_EXT.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Anciennes URLs /en/* → version sans préfixe (anglais par défaut)
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const dest =
      pathname === "/en"
        ? "/"
        : pathname.replace(/^\/en(?=\/|$)/, "") || "/"
    const url = request.nextUrl.clone()
    url.pathname = dest.startsWith("/") ? dest : `/${dest}`
    return NextResponse.redirect(url, 308)
  }

  let locale: Locale = defaultLocale
  let internalPath = pathname

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    locale = "fr"
    internalPath =
      pathname === "/fr" || pathname === "/fr/"
        ? "/"
        : pathname.slice("/fr".length) || "/"
    if (!internalPath.startsWith("/")) {
      internalPath = `/${internalPath}`
    }
  }

  if (internalPath !== pathname) {
    const url = request.nextUrl.clone()
    url.pathname = internalPath
    return withLocaleHeader(NextResponse.rewrite(url), locale)
  }

  return withLocaleHeader(NextResponse.next(), locale)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_vercel|favicon.ico|images|fonts|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.gif|.*\\.ico|.*\\.txt|.*\\.xml).*)",
    "/",
  ],
}
