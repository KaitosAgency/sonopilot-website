import type { Metadata } from "next"

import { LegalPageShell } from "@/components/legal/legal-page-shell"
import { legalAlternates } from "@/lib/i18n/alternates"
import { homePath } from "@/lib/i18n/paths"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { TermsBody } from "@/lib/i18n/legal/terms-body"
import { getTranslations } from "@/lib/i18n/translations"

const PATH = "cgu"

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLocale()
  const m = getTranslations(lang)
  return {
    title: m.legal.terms.title,
    description: m.legal.terms.metaDescription,
    alternates: legalAlternates(PATH, lang),
  }
}

export default async function CGUPage() {
  const lang = await getRequestLocale()
  const m = getTranslations(lang)

  return (
    <LegalPageShell
      title={m.legal.terms.title}
      homeHref={homePath(lang)}
      backLabel={m.legal.backHome}
    >
      <TermsBody lang={lang} />
    </LegalPageShell>
  )
}
