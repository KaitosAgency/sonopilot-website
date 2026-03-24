import type { Locale } from "@/lib/i18n/config"
import { defaultLocale, isLocale } from "@/lib/i18n/config"

import demosEn from "./messages/demos.en.json"
import demosFr from "./messages/demos.fr.json"
import baseEn from "./messages/en.json"
import baseFr from "./messages/fr.json"
import landingEn from "./messages/landing.en.json"
import landingFr from "./messages/landing.fr.json"

export const frMessages = {
  ...baseFr,
  ...landingFr,
  demos: demosFr,
} as const

export const enMessages = {
  ...baseEn,
  ...landingEn,
  demos: demosEn,
} as const

export type Messages = typeof frMessages

const byLocale: Record<Locale, Messages> = {
  fr: frMessages,
  en: enMessages as unknown as Messages,
}

export function getTranslations(locale: string): Messages {
  if (isLocale(locale)) return byLocale[locale]
  return byLocale[defaultLocale]
}
