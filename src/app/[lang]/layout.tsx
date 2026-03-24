import { notFound } from "next/navigation"

import { ComingSoonProvider } from "@/components/landing/coming-soon"
import { I18nProvider } from "@/components/providers/i18n-provider"
import { isLocale, locales, type Locale } from "@/lib/i18n/config"
import { getTranslations } from "@/lib/i18n/translations"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()

  const lang = raw as Locale
  const messages = getTranslations(lang)

  return (
    <I18nProvider locale={lang} messages={messages}>
      <ComingSoonProvider>{children}</ComingSoonProvider>
    </I18nProvider>
  )
}
