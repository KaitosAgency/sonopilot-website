"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react"

import type { Locale } from "@/lib/i18n/config"
import type { Messages } from "@/lib/i18n/translations"

type I18nContextValue = {
  locale: Locale
  messages: Messages
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getStringAtPath(obj: unknown, path: string): string | undefined {
  const parts = path.split(".")
  let cur: unknown = obj
  for (const p of parts) {
    if (cur === null || typeof cur !== "object") return undefined
    cur = (cur as Record<string, unknown>)[p]
  }
  return typeof cur === "string" ? cur : undefined
}

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale
  messages: Messages
  children: ReactNode
}) {
  const t = useCallback(
    (key: string) => getStringAtPath(messages, key) ?? key,
    [messages]
  )

  const value = useMemo(
    () => ({ locale, messages, t }),
    [locale, messages, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return ctx
}
