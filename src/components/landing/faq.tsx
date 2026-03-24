"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useI18n } from "@/components/providers/i18n-provider"
import { cn } from "@/lib/utils"
import { SectionKicker } from "./section-kicker"
import { PillarsAnimatedHeader } from "./pillar-motion"
import {
  useInViewOnce,
  useReducedMotion,
} from "./how-it-works/demos/use-demo-animation"

const FAQ_ITEM_STAGGER_MS = 68
const FAQ_LIST_BASE_DELAY_MS = 160

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border/60">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-muted-foreground font-light leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const { messages } = useI18n()
  const faq = messages.faq
  const items = faq.items

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduced = useReducedMotion()
  const { ref: listRef, inView: listInView } = useInViewOnce(0.12)
  const listActive = reduced || listInView

  return (
    <section id="faq" className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <PillarsAnimatedHeader className="mb-12 max-w-2xl">
          <SectionKicker>{faq.kicker}</SectionKicker>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {faq.title}
          </h2>
        </PillarsAnimatedHeader>

        <div ref={listRef} className="border-t border-border/60">
          {items.map((item, i) => (
            <div
              key={`faq-${i}`}
              className={cn(
                !reduced && !listActive && "opacity-0",
                listActive && !reduced && "animate-pillar-text-reveal"
              )}
              style={
                listActive && !reduced
                  ? {
                      animationDelay: `${FAQ_LIST_BASE_DELAY_MS + i * FAQ_ITEM_STAGGER_MS}ms`,
                    }
                  : undefined
              }
            >
              <FAQItem
                question={item.question}
                answer={item.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
