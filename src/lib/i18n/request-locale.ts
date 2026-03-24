import { headers } from "next/headers"

import { defaultLocale, isLocale, type Locale } from "./config"

/** Locale issue du middleware (`x-sonopilot-locale`). */
export async function getRequestLocale(): Promise<Locale> {
  const h = await headers()
  const raw = h.get("x-sonopilot-locale")
  if (raw && isLocale(raw)) return raw
  return defaultLocale
}
