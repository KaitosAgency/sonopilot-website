"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, type ReactNode } from "react"

import { localeFromPathname } from "@/lib/i18n/paths"
import { enMessages, frMessages } from "@/lib/i18n/translations"

import { I18nProvider } from "./i18n-provider"

/**
 * Le layout racine ne reçoit pas toujours une nouvelle locale lors d’une
 * navigation client (`/` ↔ `/fr`) : le contexte i18n restait bloqué sur la
 * locale initiale. On aligne locale + messages sur `usePathname()`.
 */
export function I18nSyncProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/"
  const locale = localeFromPathname(pathname)
  const messages = useMemo(
    () => (locale === "fr" ? frMessages : enMessages),
    [locale]
  )

  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr" : "en"
  }, [locale])

  return (
    <I18nProvider locale={locale} messages={messages}>
      {children}
    </I18nProvider>
  )
}
