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
import { homeAlternates } from "@/lib/i18n/alternates"
import { defaultLocale } from "@/lib/i18n/config"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { getTranslations } from "@/lib/i18n/translations"
import { HomeJsonLd } from "@/components/seo/home-json-ld"
import { siteConfig } from "@/lib/site"

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLocale()
  const m = getTranslations(lang)
  const canonical =
    lang === defaultLocale
      ? `${siteConfig.url}/`
      : `${siteConfig.url}/fr`

  return {
    title: m.seo.homeTitle,
    description: m.seo.homeDescription,
    alternates: homeAlternates(lang),
    openGraph: {
      title: m.seo.homeTitle,
      description: m.seo.homeDescription,
      url: canonical,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? ["en_US"] : ["fr_FR"],
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: m.seo.ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: m.seo.homeTitle,
      description: m.seo.homeDescription,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function HomePage() {
  return (
    <>
      <HomeJsonLd />
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
