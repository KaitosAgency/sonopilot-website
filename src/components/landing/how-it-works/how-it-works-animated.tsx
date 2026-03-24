"use client"

import { Star } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { PillarsAnimatedHeader } from "../pillar-motion"
import { SectionKicker } from "../section-kicker"
import {
  useInViewOnce,
  useReducedMotion,
} from "./demos/use-demo-animation"
import { useI18n } from "@/components/providers/i18n-provider"

import { ConnectSoundCloudDemo } from "./demos/connect-soundcloud-demo"
import { GeneralTabDemo } from "./demos/general-tab-demo"
import { QueueDemo } from "./demos/queue-demo"
import { howItWorksStepDemos, type HowItWorksDemoId } from "./steps-data"

const STEP_STAGGER_MS = 95
const FOOTER_STAGGER_MS = 100
const FOOTER_BASE_DELAY_MS = 80

function StepDemo({ id }: { id: HowItWorksDemoId }) {
  switch (id) {
    case "connect":
      return <ConnectSoundCloudDemo />
    case "general":
      return <GeneralTabDemo />
    case "queue":
      return <QueueDemo />
    default:
      return null
  }
}

function HowItWorksStepsGrid() {
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.12)
  const active = reduced || inView
  const { messages } = useI18n()
  const steps = messages.howItWorks.steps

  return (
    <div
      ref={ref}
      className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
    >
      {howItWorksStepDemos.map((stepMeta, i) => {
        const copy = steps[i]
        if (!copy) return null
        return (
        <article
          key={copy.number}
          className={cn(
            "flex h-full flex-col items-center rounded-xl border border-border/60 bg-card/40 p-6 text-center shadow-sm shadow-black/[0.03] backdrop-blur-sm dark:bg-card/30 dark:shadow-black/20 md:p-7",
            !reduced && !active && "opacity-0",
            active && !reduced && "animate-pillar-text-reveal"
          )}
          style={
            active && !reduced
              ? { animationDelay: `${i * STEP_STAGGER_MS}ms` }
              : undefined
          }
        >
          <div className="mb-6 flex min-h-[14rem] w-full min-w-0 flex-1 flex-col items-center justify-center overflow-visible">
            <StepDemo id={stepMeta.demo} />
          </div>

          <span className="mb-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold tabular-nums text-primary-foreground">
            {copy.number}
          </span>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {copy.title}
          </h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
            {copy.description}
          </p>
        </article>
        )
      })}
    </div>
  )
}

function HowItWorksClosingBlock() {
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.14)
  const active = reduced || inView
  const { messages } = useI18n()
  const hiw = messages.howItWorks

  const blocks: ReactNode[] = [
    <span
      key="star"
      className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25"
      aria-hidden
    >
      <Star className="size-5 fill-primary-foreground" strokeWidth={1.5} />
    </span>,
    <h3
      key="h3"
      className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
    >
      {hiw.closingTitle}
    </h3>,
    <p
      key="p1"
      className="mx-auto mt-4 max-w-xl font-light leading-relaxed text-muted-foreground"
    >
      {hiw.closingP1}
    </p>,
    <p
      key="p2"
      className="mx-auto mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground/85"
    >
      {hiw.closingP2}
    </p>,
  ]

  return (
    <div
      ref={ref}
      className="mx-auto mt-16 max-w-2xl pt-14 text-center md:mt-20 md:pt-16"
    >
      {blocks.map((child, i) => (
        <div
          key={i}
          className={cn(
            !reduced && !active && "opacity-0",
            active && !reduced && "animate-pillar-hd-fade-up"
          )}
          style={
            active && !reduced
              ? {
                  animationDelay: `${FOOTER_BASE_DELAY_MS + i * FOOTER_STAGGER_MS}ms`,
                }
              : undefined
          }
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export function HowItWorksAnimatedBody() {
  const { messages } = useI18n()
  const hiw = messages.howItWorks

  return (
    <>
      <PillarsAnimatedHeader className="mb-14 max-w-2xl md:mb-16">
        <SectionKicker>{hiw.kicker}</SectionKicker>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {hiw.title}
        </h2>
        <p className="mt-4 font-light text-muted-foreground">
          {hiw.intro}
        </p>
      </PillarsAnimatedHeader>

      <HowItWorksStepsGrid />

      <HowItWorksClosingBlock />
    </>
  )
}
