"use client"

import { Check } from "lucide-react"
import { useI18n } from "@/components/providers/i18n-provider"
import { LandingClickableImage } from "./landing-clickable-image"
import { cn } from "@/lib/utils"
import { SectionKicker } from "./section-kicker"
import { LiveReactionsBackdrop } from "./live-reactions-backdrop"
import {
  useInViewOnce,
  useReducedMotion,
} from "./how-it-works/demos/use-demo-animation"

const HD_STAGGER_MS = 108
const LIST_STAGGER_MS = 72
const LIST_BASE_DELAY_MS = 280
const IMAGE_DELAY_MS = 130

export function TransparencyAnimatedInner() {
  const { messages } = useI18n()
  const tr = messages.transparency
  const points = tr.points

  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.14)
  const active = reduced || inView

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-10 overflow-visible md:flex-row md:gap-16"
    >
      <div className="max-w-lg flex-1 overflow-visible text-left">
        <div className="relative overflow-visible">
          <div
            className="pointer-events-none absolute right-0 z-0 w-1/2 -top-20 h-[calc(5rem+80px)] md:-top-24 md:h-[calc(7rem+80px)]"
            aria-hidden
          >
            <LiveReactionsBackdrop
              variant="column"
              className="h-full w-full rounded-md"
            />
          </div>

          <div
            className={cn(
              "relative z-[1]",
              !reduced && !active && "opacity-0",
              active && !reduced && "animate-pillar-hd-fade-up"
            )}
            style={
              active && !reduced ? { animationDelay: "0ms" } : undefined
            }
          >
            <SectionKicker>{tr.kicker}</SectionKicker>
          </div>
          <div
            className={cn(
              "relative z-[1]",
              !reduced && !active && "opacity-0",
              active && !reduced && "animate-pillar-hd-fade-up"
            )}
            style={
              active && !reduced
                ? { animationDelay: `${HD_STAGGER_MS}ms` }
                : undefined
            }
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              <span className="animate-problem-zero-1 inline-block origin-center will-change-transform">
                {tr.zero1}
              </span>
              {tr.line1End}
              <br />
              <span className="animate-problem-zero-2 inline-block origin-center will-change-transform">
                {tr.zero2}
              </span>
              {tr.line2End}
            </h2>
          </div>
          <div
            className={cn(
              "relative z-[1]",
              !reduced && !active && "opacity-0",
              active && !reduced && "animate-pillar-hd-fade-up"
            )}
            style={
              active && !reduced
                ? { animationDelay: `${HD_STAGGER_MS * 2}ms` }
                : undefined
            }
          >
            <p className="mt-4 text-muted-foreground font-light leading-relaxed">
              {tr.intro}
            </p>
          </div>
        </div>

        <ul className="relative z-[1] mt-8 space-y-3">
          {points.map((point, i) => (
            <li
              key={`${i}-${point.slice(0, 24)}`}
              className={cn(
                "flex items-start gap-3",
                !reduced && !active && "opacity-0",
                active && !reduced && "animate-pillar-text-reveal"
              )}
              style={
                active && !reduced
                  ? {
                      animationDelay: `${LIST_BASE_DELAY_MS + i * LIST_STAGGER_MS}ms`,
                    }
                  : undefined
              }
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-light text-muted-foreground">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full flex-1">
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-border/60 shadow-lg shadow-black/5",
            !reduced && !active && "opacity-0",
            active &&
              !reduced &&
              cn("pillar-img-anim", "pillar-img-anim--ltr")
          )}
          style={
            active && !reduced
              ? { animationDelay: `${IMAGE_DELAY_MS}ms` }
              : undefined
          }
        >
          <LandingClickableImage
            src="/images/screenshots/sonopilot_sc_tracks.jpg?v=2"
            alt={tr.imageAlt}
            width={1440}
            height={900}
            quality={92}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  )
}
