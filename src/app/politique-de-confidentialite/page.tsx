import type { Metadata } from "next"

import { LegalPageShell } from "@/components/legal/legal-page-shell"
import { legalAlternates } from "@/lib/i18n/alternates"
import { homePath } from "@/lib/i18n/paths"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { PrivacyPolicyBody } from "@/lib/i18n/legal/privacy-body"
import { getTranslations } from "@/lib/i18n/translations"

const PATH = "politique-de-confidentialite"

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLocale()
  const m = getTranslations(lang)
  return {
    title: m.legal.privacy.title,
    description: m.legal.privacy.metaDescription,
    alternates: legalAlternates(PATH, lang),
  }
}

export default async function PolitiqueConfidentialitePage() {
  const lang = await getRequestLocale()
  const m = getTranslations(lang)

  return (
    <LegalPageShell
      title={m.legal.privacy.title}
      homeHref={homePath(lang)}
      backLabel={m.legal.backHome}
    >
      <PrivacyPolicyBody lang={lang} />
    </LegalPageShell>
  )
}
