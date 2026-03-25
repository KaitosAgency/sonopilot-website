import { getRequestLocale } from "@/lib/i18n/request-locale"
import { getTranslations } from "@/lib/i18n/translations"
import { publisherConfig, siteConfig } from "@/lib/site"

/**
 * JSON-LD pour la home : WebSite + Organization + FAQPage (rich results).
 */
export async function HomeJsonLd() {
  const locale = await getRequestLocale()
  const messages = getTranslations(locale)
  const base = siteConfig.url.replace(/\/$/, "")
  const logoUrl = `${base}/images/Logo/logo-sonopilot-full-color.png`

  const faqItems = messages.faq.items.map((item) => ({
    "@type": "Question" as const,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: item.answer,
    },
  }))

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: siteConfig.name,
        url: `${base}/`,
        inLanguage: locale === "fr" ? ["fr-FR", "en-US"] : ["en-US", "fr-FR"],
        alternateName: "Sonopilot Music Career Manager",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: siteConfig.name,
        url: base,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        email: publisherConfig.email,
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        mainEntity: faqItems,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
