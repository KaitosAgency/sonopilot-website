"use client"

import { usePathname, useRouter } from "next/navigation"

import type { Locale } from "@/lib/i18n/config"
import { locales } from "@/lib/i18n/config"
import { homePath, sitePath } from "@/lib/i18n/paths"
import { cn } from "@/lib/utils"

import { useI18n } from "../providers/i18n-provider"

/** Segment de route sans locale (ex. `cgu`) ; vide = accueil. */
function routeKeyFromPathname(pathname: string): string {
  if (pathname === "/fr" || pathname === "/fr/") return ""
  if (pathname.startsWith("/fr/")) return pathname.slice(4)
  if (pathname === "/en" || pathname === "/en/" || pathname.startsWith("/en/")) {
    if (pathname === "/en" || pathname === "/en/") return ""
    return pathname.slice(4)
  }
  if (pathname === "/" || pathname === "") return ""
  return pathname.replace(/^\//, "").replace(/\/$/, "")
}

export function LanguageSwitcher({
  className,
  onNavigate,
}: {
  className?: string
  /** Appelé après navigation (ex. fermer le menu mobile). */
  onNavigate?: () => void
}) {
  const pathname = usePathname() ?? "/"
  const router = useRouter()
  const { locale, messages, t } = useI18n()

  const switchTo = (target: Locale) => {
    if (target === locale) return
    // URL réelle du navigateur (fiable avec rewrites middleware) — évite les incohérences usePathname.
    const path =
      typeof window !== "undefined" ? window.location.pathname : pathname
    const key = routeKeyFromPathname(path)
    const next = key ? sitePath(target, key) : homePath(target)
    router.push(next)
    onNavigate?.()
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-border/60 bg-background/80 p-0.5 text-xs font-medium backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label={t("lang.label")}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          className={cn(
            "rounded px-2 py-1 transition-colors",
            code === locale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {code === "fr" ? messages.lang.fr : messages.lang.en}
        </button>
      ))}
    </div>
  )
}
