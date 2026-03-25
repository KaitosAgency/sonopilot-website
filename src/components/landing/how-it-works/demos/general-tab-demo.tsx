"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Disc3, Music2, Users } from "lucide-react"

import { useI18n } from "@/components/providers/i18n-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import { FakeCursor } from "./fake-cursor"
import { useInViewOnce, useReducedMotion } from "./use-demo-animation"

/** Aligné sur `queue-demo` — pointe du SVG curseur */
const CURSOR_TIP_OFFSET = { x: 3, y: 3 }

type DemoCursorExtra =
  | null
  | "style-input"
  | "style-add"
  | "comment-input"
  | "comment-add"

function cursorCenterOnEl(
  container: HTMLElement,
  el: HTMLElement,
  tip: { x: number; y: number }
) {
  const cr = container.getBoundingClientRect()
  const er = el.getBoundingClientRect()
  const cx = er.left + er.width / 2 - cr.left - tip.x
  const cy = er.top + er.height / 2 - cr.top - tip.y
  return { left: `${cx}px`, top: `${cy}px`, opacity: 1 as const }
}

function scheduleChain(
  steps: Array<{ delay: number; fn: () => void }>
): number[] {
  const ids: number[] = []
  let t = 0
  for (const { delay, fn } of steps) {
    t += delay
    ids.push(window.setTimeout(fn, t))
  }
  return ids
}

export function GeneralTabDemo() {
  const { messages, locale } = useI18n()
  const g = messages.demos.generalTab

  const switchRows = useMemo(
    () =>
      [
        { id: "fanbase" as const, label: g.rowGenres, Icon: Users },
        { id: "similar" as const, label: g.rowSimilar, Icon: Music2 },
        { id: "trends" as const, label: g.rowNew, Icon: Disc3 },
      ] as const,
    [g.rowGenres, g.rowSimilar, g.rowNew]
  )

  const initialStyles = g.initialStyles
  const initialComments = g.initialComments
  const styleAdd = g.styleAdd
  const commentAdd = g.commentAdd

  const { ref, inView } = useInViewOnce()
  const reduced = useReducedMotion()
  const play = inView && !reduced

  const switchRowRefs = useRef<(HTMLLIElement | null)[]>([null, null, null])
  const styleInputRef = useRef<HTMLInputElement>(null)
  const styleAddBtnRef = useRef<HTMLSpanElement>(null)
  const commentInputRef = useRef<HTMLInputElement>(null)
  const commentAddBtnRef = useRef<HTMLSpanElement>(null)

  const [cursorExtra, setCursorExtra] = useState<DemoCursorExtra>(null)
  const [cursorPos, setCursorPos] = useState<{
    left: string
    top: string
    opacity: number
  }>({ left: "0px", top: "0px", opacity: 0 })

  const [tick, setTick] = useState(0)
  const [switches, setSwitches] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ])
  const [styles, setStyles] = useState<string[]>(() => [...initialStyles])
  const [comments, setComments] = useState<string[]>(() => [...initialComments])
  const [styleInput, setStyleInput] = useState("")
  const [commentInput, setCommentInput] = useState("")
  const timelineIds = useRef<number[]>([])

  useEffect(() => {
    if (!inView || reduced) {
      setCursorExtra(null)
      if (reduced && inView) {
        setSwitches([true, true, true])
      } else if (!inView) {
        setSwitches([false, false, false])
      }
      setTick(0)
      return
    }

    if (!play) {
      setSwitches([false, false, false])
      setTick(0)
      setCursorExtra(null)
      return
    }

    const id = window.setInterval(() => {
      setTick((t) => {
        const next = (t + 1) % 12
        if (next === 0) setSwitches([false, false, false])
        if (next === 2) setSwitches([true, false, false])
        if (next === 4) setSwitches([true, true, false])
        if (next === 6) setSwitches([true, true, true])
        return next
      })
    }, 480)

    return () => clearInterval(id)
  }, [play, inView, reduced])

  useEffect(() => {
    if (!inView) {
      setStyles([...initialStyles])
      setComments([...initialComments])
      setStyleInput("")
      setCommentInput("")
      return
    }
    if (reduced) {
      const rest = initialComments.slice(1)
      setStyles([...initialStyles, styleAdd])
      setComments([...rest, commentAdd])
      setStyleInput("")
      setCommentInput("")
      return
    }
    if (!play) {
      setStyles([...initialStyles])
      setComments([...initialComments])
      setStyleInput("")
      setCommentInput("")
    }
  }, [
    inView,
    reduced,
    play,
    locale,
    initialStyles,
    initialComments,
    styleAdd,
    commentAdd,
  ])

  useEffect(() => {
    timelineIds.current.forEach(clearTimeout)
    timelineIds.current = []

    if (!play || !inView || reduced) return

    const push = (id: number) => timelineIds.current.push(id)

    const typewriter = (
      target: string,
      setVal: (s: string) => void,
      charMs: number,
      onComplete: () => void
    ) => {
      let i = 0
      const step = () => {
        if (i >= target.length) {
          push(window.setTimeout(onComplete, 380))
          return
        }
        setVal(target.slice(0, i + 1))
        i++
        push(window.setTimeout(step, charMs))
      }
      step()
    }

    const runCycle = () => {
      setStyles([...initialStyles])
      setComments([...initialComments])
      setStyleInput("")
      setCommentInput("")
      setCursorExtra(null)

      const chain: Array<{ delay: number; fn: () => void }> = [
        {
          delay: 520,
          fn: () => setComments((c) => c.filter((_, idx) => idx !== 0)),
        },
        {
          delay: 420,
          fn: () => {
            setCursorExtra("style-input")
            typewriter(styleAdd, setStyleInput, 88, () => {
              setCursorExtra("style-add")
              push(
                window.setTimeout(() => {
                  setStyles((s) => [...s, styleAdd])
                  setStyleInput("")
                  setCursorExtra("comment-input")
                  push(
                    window.setTimeout(() => {
                      typewriter(commentAdd, setCommentInput, 78, () => {
                        setCursorExtra("comment-add")
                        push(
                          window.setTimeout(() => {
                            setComments((c) => [...c, commentAdd])
                            setCommentInput("")
                            setCursorExtra(null)
                            push(window.setTimeout(runCycle, 3400))
                          }, 280)
                        )
                      })
                    }, 450)
                  )
                }, 300)
              )
            })
          },
        },
      ]

      const ids = scheduleChain(chain)
      ids.forEach(push)
    }

    runCycle()

    return () => {
      timelineIds.current.forEach(clearTimeout)
      timelineIds.current = []
    }
  }, [play, inView, reduced, locale, initialStyles, initialComments, styleAdd, commentAdd])

  const highlightRow =
    play && (tick === 0 || tick === 2 || tick === 4)
      ? tick === 0
        ? 0
        : tick === 2
          ? 1
          : 2
      : -1

  const cursorSwitchIndex =
    play && !cursorExtra && tick >= 0 && tick < 6
      ? Math.floor(tick / 2)
      : null

  useLayoutEffect(() => {
    if (!play) {
      setCursorPos((c) => ({ ...c, opacity: 0 }))
      return
    }
    const container = ref.current
    const tip = CURSOR_TIP_OFFSET
    if (!container) return

    if (cursorExtra) {
      const el =
        cursorExtra === "style-input"
          ? styleInputRef.current
          : cursorExtra === "style-add"
            ? styleAddBtnRef.current
            : cursorExtra === "comment-input"
              ? commentInputRef.current
              : commentAddBtnRef.current
      if (!el) return
      setCursorPos(cursorCenterOnEl(container, el, tip))
      return
    }

    if (cursorSwitchIndex !== null) {
      const row = switchRowRefs.current[cursorSwitchIndex]
      if (!row) return
      const cr = container.getBoundingClientRect()
      const rr = row.getBoundingClientRect()
      const cx = rr.right - cr.left - 26
      const cy = rr.top + rr.height / 2 - cr.top - tip.y
      setCursorPos({
        left: `${cx - tip.x}px`,
        top: `${cy}px`,
        opacity: 1,
      })
      return
    }

    setCursorPos((c) => ({ ...c, opacity: 0 }))
  }, [play, cursorExtra, cursorSwitchIndex, ref])

  return (
    <div
      ref={ref}
      className={cn(
        "demo-general-wrap relative mx-auto w-full min-w-0 max-w-2xl rounded-xl border border-border/60 bg-card p-4 shadow-lg shadow-black/5 sm:p-5 md:p-6"
      )}
    >
      {play ? (
        <FakeCursor
          style={{
            left: cursorPos.left,
            top: cursorPos.top,
            opacity: cursorPos.opacity,
            transition:
              "left 0.28s ease-out, top 0.28s ease-out, opacity 0.2s ease",
          }}
        />
      ) : null}
      <ul className="space-y-2.5" aria-label={g.preferencesAria}>
        {switchRows.map((row, i) => (
          <li
            key={row.id}
            ref={(el) => {
              switchRowRefs.current[i] = el
            }}
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-muted/25 px-3 py-2.5",
              highlightRow === i &&
                "ring-2 ring-primary/35 ring-offset-2 ring-offset-card"
            )}
          >
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <row.Icon
                className="size-4 shrink-0 text-foreground"
                aria-hidden
              />
              <span className="text-sm font-medium text-foreground">
                {row.label}
              </span>
            </span>
            <Switch
              checked={switches[i]}
              tabIndex={-1}
              aria-hidden
              className="pointer-events-none shrink-0"
            />
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-3 border-t border-border/40 pt-5">
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">
            {g.stylesLabel}{" "}
            <span className="tabular-nums text-muted-foreground/80">
              ({styles.length}/3)
            </span>
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
            <Input
              ref={styleInputRef}
              readOnly
              tabIndex={-1}
              aria-hidden
              placeholder={g.stylesPlaceholder}
              value={styleInput}
              className="pointer-events-none placeholder:text-muted-foreground/55 sm:flex-1"
            />
            <span ref={styleAddBtnRef} className="inline-flex shrink-0">
              <Button
                type="button"
                variant="default"
                size="lg"
                tabIndex={-1}
                className="rounded-md px-4 sm:self-auto"
                disabled={!styleInput.trim()}
              >
                {g.addButton}
              </Button>
            </span>
          </div>
        </div>
        {styles.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {styles.map((s, index) => (
              <Badge
                key={`${s}-${index}`}
                variant="default"
                className="pointer-events-none"
              >
                {s}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-5 space-y-3 border-t border-border/40 pt-5">
        <p className="text-xs font-medium text-muted-foreground">
          {g.favoriteReplies}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
          <Input
            ref={commentInputRef}
            readOnly
            tabIndex={-1}
            aria-hidden
            placeholder={g.commentPlaceholder}
            value={commentInput}
            maxLength={5}
            className="pointer-events-none placeholder:text-muted-foreground/55 sm:flex-1"
          />
          <span ref={commentAddBtnRef} className="inline-flex shrink-0">
            <Button
              type="button"
              variant="default"
              size="lg"
              tabIndex={-1}
              className="rounded-md px-4 sm:self-auto"
              disabled={!commentInput.trim()}
            >
              {g.addButton}
            </Button>
          </span>
        </div>
        <div>
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">{g.noReplies}</p>
          ) : (
            <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
              {comments.map((c, idx) => (
                <Badge
                  key={`${c}-${idx}`}
                  variant="default"
                  className="pointer-events-none"
                >
                  {c}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
