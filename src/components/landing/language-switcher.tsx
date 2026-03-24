"use client"

import { usePathname, useRouter } from "next/navigation"

import type { Locale } from "@/lib/i18n/config"
import { isLocale, locales } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

import { useI18n } from "../providers/i18n-provider"

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/"
  const router = useRouter()
  const { locale, messages, t } = useI18n()

  const switchTo = (target: Locale) => {
    if (target === locale) return
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) {
      router.push(`/${target}`)
      return
    }
    if (isLocale(segments[0] ?? "")) {
      segments[0] = target
    } else {
      segments.unshift(target)
    }
    router.push(`/${segments.join("/")}`)
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
