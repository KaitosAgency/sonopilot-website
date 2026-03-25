"use client"

import { ArrowRight } from "lucide-react"
import { useI18n } from "@/components/providers/i18n-provider"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"
import { SectionKicker } from "./section-kicker"
import {
  useInViewOnce,
  useReducedMotion,
} from "./how-it-works/demos/use-demo-animation"

const HD_STAGGER_MS = 100
const P_DELAY_MS = 220
const CTA_DELAY_MS = 380
const NOTE_DELAY_MS = 540

export function AlphaCtaAnimatedInner() {
  const { messages } = useI18n()
  const a = messages.alphaCta

  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.14)
  const active = reduced || inView

  return (
    <div
      ref={ref}
      className="mx-auto max-w-6xl px-4 text-center sm:px-6"
    >
      <div
        className={cn(
          !reduced && !active && "opacity-0",
          active && !reduced && "animate-pillar-hd-fade-up"
        )}
        style={
          active && !reduced ? { animationDelay: "0ms" } : undefined
        }
      >
        <SectionKicker onPrimary>{a.kicker}</SectionKicker>
      </div>

      <div
        className={cn(
          !reduced && !active && "opacity-0",
          active && !reduced && "animate-pillar-hd-fade-up"
        )}
        style={
          active && !reduced
            ? { animationDelay: `${HD_STAGGER_MS}ms` }
            : undefined
        }
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {a.title}
        </h2>
      </div>

      <div
        className={cn(
          "mx-auto mt-4 max-w-xl font-light leading-relaxed text-primary-foreground/80",
          !reduced && !active && "opacity-0",
          active && !reduced && "animate-pillar-text-reveal"
        )}
        style={
          active && !reduced
            ? { animationDelay: `${P_DELAY_MS}ms` }
            : undefined
        }
      >
        <p>{a.body}</p>
      </div>

      <div
        className={cn(
          "mt-10 inline-block",
          !reduced && !active && "opacity-0",
          active && !reduced && "animate-platform-badge-settle"
        )}
        style={
          active && !reduced
            ? { animationDelay: `${CTA_DELAY_MS}ms` }
            : undefined
        }
      >
        <a
          href={siteConfig.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl"
        >
          {a.cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>

      <p
        className={cn(
          "mt-6 text-xs tracking-wide text-primary-foreground/60",
          !reduced && !active && "opacity-0",
          active && !reduced && "animate-pillar-hd-fade-up"
        )}
        style={
          active && !reduced
            ? { animationDelay: `${NOTE_DELAY_MS}ms` }
            : undefined
        }
      >
        {a.note}
      </p>
    </div>
  )
}
