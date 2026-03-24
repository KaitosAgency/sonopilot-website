import { defaultLocale, type Locale } from "./config"

/** Accueil canonique pour une locale. */
export function homePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : "/fr"
}

/**
 * Chemin sans hash. `segment` = slug unique (ex. `cgu`, `mentions-legales`).
 * EN : `/cgu` ; FR : `/fr/cgu`.
 */
export function sitePath(locale: Locale, segment?: string): string {
  const prefix = locale === defaultLocale ? "" : "/fr"
  if (!segment) return prefix || "/"
  const path = `${prefix}/${segment}`.replace(/\/+/g, "/")
  return path
}
