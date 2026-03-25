"use client"

import { useI18n } from "@/components/providers/i18n-provider"
import { LandingClickableImage } from "./landing-clickable-image"
import { AnimateOnScroll } from "./animate-on-scroll"
import { ProblemComparisonAnimatedGrid } from "./problem-comparison-animate"
import { ProblemMutedShell, ProblemScreenshotFrame } from "./problem-cards"
import { SectionKicker } from "./section-kicker"

function SansAvecHeader({
  kicker,
  headlineLine1,
  headlineLine2,
  sub,
}: {
  kicker: string
  headlineLine1: string
  headlineLine2: string
  sub: string
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
      <SectionKicker>{kicker}</SectionKicker>
      <h2
        id="sans-avec"
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.35rem] leading-tight"
      >
        {headlineLine1}
        <br className="hidden sm:block" />
        {headlineLine2}
      </h2>
      <p className="mt-4 text-muted-foreground font-light text-base sm:text-lg">
        {sub}
      </p>
    </div>
  )
}

export function Problem() {
  const { messages } = useI18n()
  const p = messages.problem

  return (
    <section className="py-20 md:py-28" aria-labelledby="sans-avec">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <SansAvecHeader
            kicker={p.kicker}
            headlineLine1={p.headlineLine1}
            headlineLine2={p.headlineLine2}
            sub={p.sub}
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={80} className="overflow-visible">
          <ProblemMutedShell>
            <div className="relative overflow-visible">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[-8rem] z-[1] h-[calc(100%+8rem)] w-[min(100%,56rem)] max-w-[calc(100%-0.5rem)] -translate-x-1/2 sm:top-[-9.5rem] sm:h-[calc(100%+9.5rem)]"
                style={{
                  background:
                    "radial-gradient(ellipse 62% 52% at 50% 70%, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.14) 52%, transparent 80%)",
                }}
              />
              <div className="relative z-[2]">
                <ProblemComparisonAnimatedGrid
                  withoutItems={p.without}
                  withCards={p.withCards}
                  columnSans={p.columnSans}
                  columnAvec={p.columnAvec}
                />
                <div className="mt-8 md:mt-10">
                  <ProblemScreenshotFrame>
                    <LandingClickableImage
                      src="/images/screenshots/sc-dashboard-notifications.jpg?v=3"
                      alt={p.screenshotAlt}
                      width={1600}
                      height={900}
                      quality={100}
                      className="w-full h-auto"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      unoptimized
                    />
                  </ProblemScreenshotFrame>
                </div>
              </div>
            </div>
          </ProblemMutedShell>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
