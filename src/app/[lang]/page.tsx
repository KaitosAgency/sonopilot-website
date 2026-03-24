import type { Metadata } from "next"

import { AlphaCta } from "@/components/landing/alpha-cta"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"
import { Founder } from "@/components/landing/founder"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Marquee } from "@/components/landing/marquee"
import { Pillars } from "@/components/landing/pillars"
import { Platforms } from "@/components/landing/platforms"
import { Problem } from "@/components/landing/problem"
import { Stats } from "@/components/landing/stats"
import { Transparency } from "@/components/landing/transparency"
import { TrustBar } from "@/components/landing/trust-bar"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config"
import { getTranslations } from "@/lib/i18n/translations"
import { siteConfig } from "@/lib/site"

function alternatesForLang(lang: Locale) {
  const base = siteConfig.url
  return {
    canonical: `${base}/${lang}`,
    languages: {
      fr: `${base}/fr`,
      en: `${base}/en`,
      "x-default": `${base}/${defaultLocale}`,
    },
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = isLocale(raw) ? raw : defaultLocale
  const m = getTranslations(lang)
  const base = siteConfig.url
  const canonical = `${base}/${lang}`

  return {
    title: m.seo.homeTitle,
    description: m.seo.homeDescription,
    alternates: alternatesForLang(lang),
    openGraph: {
      title: m.seo.homeTitle,
      description: m.seo.homeDescription,
      url: canonical,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? ["en_US"] : ["fr_FR"],
    },
    twitter: {
      title: m.seo.homeTitle,
      description: m.seo.homeDescription,
    },
  }
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <TrustBar />
        <Stats />
        <Problem />
        <Pillars />
        <HowItWorks />
        <Transparency />
        <Platforms />
        <Founder />
        <AlphaCta />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
