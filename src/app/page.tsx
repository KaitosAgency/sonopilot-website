import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Marquee } from "@/components/landing/marquee"
import { Stats } from "@/components/landing/stats"
import { TrustBar } from "@/components/landing/trust-bar"
import { Problem } from "@/components/landing/problem"
import { Pillars } from "@/components/landing/pillars"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Transparency } from "@/components/landing/transparency"
import { Platforms } from "@/components/landing/platforms"
import { Founder } from "@/components/landing/founder"
import { AlphaCta } from "@/components/landing/alpha-cta"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

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
