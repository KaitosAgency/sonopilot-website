import { defaultLocale, type Locale } from "@/lib/i18n/config"
import { siteConfig } from "@/lib/site"

/** Chemins légaux identiques pour toutes les langues (slug FR conservé sous /en/…). */
export function legalAlternates(pathSegment: string, lang: Locale) {
  const base = siteConfig.url
  return {
    canonical: `${base}/${lang}/${pathSegment}`,
    languages: {
      fr: `${base}/fr/${pathSegment}`,
      en: `${base}/en/${pathSegment}`,
      "x-default": `${base}/${defaultLocale}/${pathSegment}`,
    },
  }
}
