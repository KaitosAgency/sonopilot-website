import type { Metadata } from "next"

import { LegalPageShell } from "@/components/legal/legal-page-shell"
import { legalAlternates } from "@/lib/i18n/alternates"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config"
import { PrivacyPolicyBody } from "@/lib/i18n/legal/privacy-body"
import { getTranslations } from "@/lib/i18n/translations"

const PATH = "politique-de-confidentialite"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = isLocale(raw) ? raw : defaultLocale
  const m = getTranslations(lang)
  return {
    title: m.legal.privacy.title,
    description: m.legal.privacy.metaDescription,
    alternates: legalAlternates(PATH, lang),
  }
}

export default async function PolitiqueConfidentialitePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: raw } = await params
  const lang = (isLocale(raw) ? raw : defaultLocale) as Locale
  const m = getTranslations(lang)

  return (
    <LegalPageShell
      title={m.legal.privacy.title}
      homeHref={`/${lang}`}
      backLabel={m.legal.backHome}
    >
      <PrivacyPolicyBody lang={lang} />
    </LegalPageShell>
  )
}
