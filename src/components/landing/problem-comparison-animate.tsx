"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "./how-it-works/demos/use-demo-animation"
import {
  BenefitStackItem,
  ComparisonColumnCard,
  ComparisonColumnTitle,
} from "./problem-cards"

type Card = { title: string; body: string }

export function ProblemComparisonAnimatedGrid({
  withoutItems,
  withCards,
  columnSans,
  columnAvec,
}: {
  withoutItems: readonly string[]
  withCards: readonly Card[]
  columnSans: string
  columnAvec: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reduced) {
      setActive(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <div
      ref={ref}
      className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start"
    >
      <ComparisonColumnCard>
        <ComparisonColumnTitle
          variant="sans"
          labelSans={columnSans}
          labelAvec={columnAvec}
        />
        <ul className="space-y-3.5">
          {withoutItems.map((item, i) => (
            <li
              key={item}
              className={cn(
                "flex gap-3",
                !reduced && !active && "opacity-0",
                reduced && "opacity-100",
                active && !reduced && "animate-problem-sans-stagger"
              )}
              style={
                active && !reduced
                  ? { animationDelay: `${i * 118}ms` }
                  : undefined
              }
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm">
                <X className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed font-light">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </ComparisonColumnCard>

      <ComparisonColumnCard>
        <ComparisonColumnTitle
          variant="avec"
          labelSans={columnSans}
          labelAvec={columnAvec}
        />
        <div className="relative flex flex-col pt-1">
          {withCards.map((card, i) => (
            <BenefitStackItem
              key={card.title}
              index={i}
              title={card.title}
              body={card.body}
              fallMotion={{ active, reduced }}
            />
          ))}
        </div>
      </ComparisonColumnCard>
    </div>
  )
}
