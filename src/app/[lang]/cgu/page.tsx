import type { Metadata } from "next"

import { LegalPageShell } from "@/components/legal/legal-page-shell"
import { legalAlternates } from "@/lib/i18n/alternates"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config"
import { TermsBody } from "@/lib/i18n/legal/terms-body"
import { getTranslations } from "@/lib/i18n/translations"

const PATH = "cgu"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = isLocale(raw) ? raw : defaultLocale
  const m = getTranslations(lang)
  return {
    title: m.legal.terms.title,
    description: m.legal.terms.metaDescription,
    alternates: legalAlternates(PATH, lang),
  }
}

export default async function CGUPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: raw } = await params
  const lang = (isLocale(raw) ? raw : defaultLocale) as Locale
  const m = getTranslations(lang)

  return (
    <LegalPageShell title={m.legal.terms.title} homeHref={`/${lang}`} backLabel={m.legal.backHome}>
      <TermsBody lang={lang} />
    </LegalPageShell>
  )
}
