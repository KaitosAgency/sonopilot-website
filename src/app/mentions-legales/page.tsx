import type { Metadata } from "next"

import { LegalPageShell } from "@/components/legal/legal-page-shell"
import { legalAlternates } from "@/lib/i18n/alternates"
import { homePath } from "@/lib/i18n/paths"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { MentionsLegalesBody } from "@/lib/i18n/legal/mentions-body"
import { getTranslations } from "@/lib/i18n/translations"

const PATH = "mentions-legales"

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLocale()
  const m = getTranslations(lang)
  return {
    title: m.legal.mentions.title,
    description: m.legal.mentions.metaDescription,
    alternates: legalAlternates(PATH, lang),
  }
}

export default async function MentionsLegalesPage() {
  const lang = await getRequestLocale()
  const m = getTranslations(lang)

  return (
    <LegalPageShell
      title={m.legal.mentions.title}
      homeHref={homePath(lang)}
      backLabel={m.legal.backHome}
    >
      <MentionsLegalesBody lang={lang} />
    </LegalPageShell>
  )
}
