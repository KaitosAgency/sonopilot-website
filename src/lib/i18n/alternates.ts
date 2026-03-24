import { defaultLocale, type Locale } from "@/lib/i18n/config"
import { siteConfig } from "@/lib/site"

/** hreflang pour les pages légales (slug identique ; EN sans préfixe, FR sous /fr). */
export function legalAlternates(pathSegment: string, lang: Locale) {
  const base = siteConfig.url
  const frUrl = `${base}/fr/${pathSegment}`
  const enUrl = `${base}/${pathSegment}`
  return {
    canonical: lang === defaultLocale ? enUrl : frUrl,
    languages: {
      fr: frUrl,
      en: enUrl,
      "x-default": enUrl,
    },
  }
}

export function homeAlternates(lang: Locale) {
  const base = siteConfig.url
  const frUrl = `${base}/fr`
  const enUrl = `${base}/`
  return {
    canonical: lang === defaultLocale ? enUrl : frUrl,
    languages: {
      fr: frUrl,
      en: enUrl,
      "x-default": enUrl,
    },
  }
}
