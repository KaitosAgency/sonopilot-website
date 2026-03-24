"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react"
import {
  Check,
  ChevronsUpDown,
  Heart,
  MessageCircle,
  Repeat2,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react"

import { useI18n } from "@/components/providers/i18n-provider"
import { interpolate } from "@/lib/i18n/interpolate"
import { cn } from "@/lib/utils"

import { FakeCursor } from "./fake-cursor"
import { useInViewOnce, useReducedMotion } from "./use-demo-animation"

/** Comme `app/src/components/ui/toast.tsx` — léger chevauchement vertical */
const TOAST_OVERLAP_OFFSET = 6

const CYCLE_MS = 7200

const INITIAL_QUEUE = {
  follow: 2,
  unfollow: 0,
  like: 3,
  repost: 1,
  comment: 2,
} as const

type QueueState = Record<
  "follow" | "unfollow" | "like" | "repost" | "comment",
  number
>

type DemoToast = { id: string; message: string }

/** Pointe du SVG curseur (~coin haut-gauche du tracé) */
const CURSOR_TIP_OFFSET = { x: 3, y: 3 }

function artworkSrc(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/48/48`
}

function ActionIcon({
  queued,
  pulse,
  children,
}: {
  queued: boolean
  pulse?: boolean
  children: ReactNode
}) {
  return (
    <span
      role="presentation"
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors [&_svg]:size-4",
        queued
          ? "border border-transparent bg-primary text-primary-foreground"
          : "border border-input bg-background text-foreground",
        pulse && "scale-95 max-md:animate-demo-tap-hint"
      )}
    >
      {children}
    </span>
  )
}

function totalQueue(q: QueueState) {
  return q.follow + q.unfollow + q.like + q.repost + q.comment
}

function cursorAtButton(
  wrap: HTMLElement,
  button: HTMLElement,
  tip: { x: number; y: number }
) {
  const cr = wrap.getBoundingClientRect()
  const br = button.getBoundingClientRect()
  const cx = br.left + br.width / 2 - cr.left - tip.x
  const cy = br.top + br.height / 2 - cr.top - tip.y
  return { left: `${cx}px`, top: `${cy}px` }
}

export function QueueDemo() {
  const { messages, locale } = useI18n()
  const d = messages.demos.queue

  const QUEUE_META = [
    { id: "follow" as const, Icon: UserPlus, key: "follow" as const, label: d.actions.follow },
    {
      id: "unfollow" as const,
      Icon: UserCheck,
      key: "unfollow" as const,
      label: d.actions.unfollow,
    },
    { id: "like" as const, Icon: Heart, key: "like" as const, label: d.actions.like },
    { id: "repost" as const, Icon: Repeat2, key: "repost" as const, label: d.actions.repost },
    {
      id: "comment" as const,
      Icon: MessageCircle,
      key: "comment" as const,
      label: d.actions.comment,
    },
  ] as const

  const TABLE_ROWS = d.rows.map((r) => ({
    title: r.title,
    artworkSeed: r.artworkSeed,
    demoRow: r.demoRow,
    heart: r.heart ?? false,
    msg: r.msg ?? false,
    user: r.user ?? false,
  }))

  const { ref: inViewRef, inView } = useInViewOnce()
  const reduced = useReducedMotion()
  const play = inView && !reduced

  const containerRef = useRef<HTMLDivElement>(null)
  const likeBtnRef = useRef<HTMLSpanElement>(null)
  const msgBtnRef = useRef<HTMLSpanElement>(null)
  const userBtnRef = useRef<HTMLSpanElement>(null)

  const assignContainer = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      ;(inViewRef as MutableRefObject<HTMLDivElement | null>).current = node
    },
    [inViewRef]
  )

  const [queue, setQueue] = useState<QueueState>({ ...INITIAL_QUEUE })
  const [demoToasts, setDemoToasts] = useState<DemoToast[]>([])
  const [row0, setRow0] = useState({ like: false, msg: false, user: false })
  const [pulseKey, setPulseKey] = useState<"like" | "msg" | "user" | null>(
    null
  )
  const [cursor, setCursor] = useState<{
    left: string
    top: string
    opacity: number
  }>({ left: "0px", top: "0px", opacity: 0 })

  const timers = useRef<number[]>([])
  const queueCopyRef = useRef(d)
  queueCopyRef.current = d

  useLayoutEffect(() => {
    if (!play || !pulseKey) return
    const wrap = containerRef.current
    const map = {
      like: likeBtnRef,
      msg: msgBtnRef,
      user: userBtnRef,
    } as const
    const btn = map[pulseKey].current
    if (!wrap || !btn) return
    const pos = cursorAtButton(wrap, btn, CURSOR_TIP_OFFSET)
    setCursor((c) => ({ ...c, ...pos, opacity: 1 }))
  }, [play, pulseKey])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    const q = queueCopyRef.current

    const push = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms))
    }

    const addToast = (message: string) => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`
      setDemoToasts((prev) => [...prev, { id, message }])
    }

    if (inView && reduced) {
      setQueue({
        follow: INITIAL_QUEUE.follow + 1,
        unfollow: INITIAL_QUEUE.unfollow,
        like: INITIAL_QUEUE.like + 1,
        repost: INITIAL_QUEUE.repost,
        comment: INITIAL_QUEUE.comment + 1,
      })
      setRow0({ like: true, msg: true, user: true })
      setDemoToasts([
        { id: "r1", message: q.toasts.like },
        { id: "r2", message: q.toasts.comment },
        { id: "r3", message: q.toasts.follow },
      ])
      setPulseKey(null)
      setCursor((c) => ({ ...c, opacity: 0 }))
      return
    }

    if (!play) {
      setQueue({ ...INITIAL_QUEUE })
      setRow0({ like: false, msg: false, user: false })
      setDemoToasts([])
      setPulseKey(null)
      setCursor((c) => ({ ...c, opacity: 0 }))
      return
    }

    const runCycle = () => {
      setQueue({ ...INITIAL_QUEUE })
      setRow0({ like: false, msg: false, user: false })
      setDemoToasts([])
      setPulseKey(null)
      setCursor((c) => ({ ...c, opacity: 0 }))

      push(() => setPulseKey("like"), 400)
      push(() => {
        setRow0((r) => ({ ...r, like: true }))
        setQueue((q) => ({ ...q, like: q.like + 1 }))
        addToast(q.toasts.like)
        setPulseKey(null)
      }, 850)

      push(() => setPulseKey("msg"), 1350)
      push(() => {
        setRow0((r) => ({ ...r, msg: true }))
        setQueue((q) => ({ ...q, comment: q.comment + 1 }))
        addToast(q.toasts.comment)
        setPulseKey(null)
      }, 1800)

      push(() => setPulseKey("user"), 2300)
      push(() => {
        setRow0((r) => ({ ...r, user: true }))
        setQueue((q) => ({ ...q, follow: q.follow + 1 }))
        addToast(q.toasts.follow)
        setPulseKey(null)
        setCursor((c) => ({ ...c, opacity: 0 }))
      }, 2750)

      push(() => {
        setDemoToasts([])
        runCycle()
      }, CYCLE_MS)
    }

    runCycle()

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [play, inView, reduced, locale])

  const pendingTotal = totalQueue(queue)

  return (
    <div
      ref={assignContainer}
      className={cn(
        "demo-queue-wrap relative mx-auto w-full max-w-2xl overflow-visible rounded-xl border border-border/60 bg-card p-4 shadow-lg shadow-black/5 sm:p-5 md:max-w-3xl"
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {d.myList}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {QUEUE_META.map(({ id, Icon, label, key }) => (
            <span
              key={id}
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-normal text-foreground dark:border-border dark:bg-card"
            >
              <Icon className="h-3 w-3 shrink-0" aria-hidden />
              <span className="tabular-nums">
                {label} : {queue[key]}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-card dark:border-border">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-2 py-3.5">
          <span
            className="flex h-4 w-4 shrink-0 rounded border border-input bg-background"
            aria-hidden
          />
          <span className="h-6 w-6 shrink-0" aria-hidden />
          <button
            type="button"
            tabIndex={-1}
            className="flex min-w-0 flex-1 items-center gap-1 text-left text-sm font-medium text-foreground"
          >
            {d.columnTitle}
            <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
          </button>
          <div
            className="flex w-[calc(3*1.75rem+2*0.375rem)] shrink-0 justify-end gap-1.5"
            aria-hidden
          />
        </div>

        {TABLE_ROWS.map((row) => {
          const isDemo = row.demoRow
          const heart = isDemo
            ? row0.like
            : "heart" in row
              ? row.heart
              : false
          const msg = isDemo
            ? row0.msg
            : "msg" in row
              ? row.msg
              : false
          const user = isDemo
            ? row0.user
            : "user" in row
              ? row.user
              : false

          return (
            <div
              key={row.title}
              className="flex items-center gap-2 border-b border-border px-2 py-2 transition-colors last:border-b-0 hover:bg-muted/50"
            >
              <span
                className="h-4 w-4 shrink-0 rounded border border-input bg-background"
                aria-hidden
              />
              <div
                className="relative h-6 w-6 shrink-0 overflow-hidden rounded bg-muted ring-1 ring-black/5"
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- démo landing, URLs externes stables */}
                <img
                  src={artworkSrc(row.artworkSeed)}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="min-w-0 flex-1 truncate text-sm text-foreground">
                {row.title}
              </p>
              <div className="flex shrink-0 justify-end gap-1.5">
                {isDemo ? (
                  <>
                    <span ref={likeBtnRef} className="inline-block">
                      <ActionIcon
                        queued={heart}
                        pulse={pulseKey === "like"}
                      >
                        <Heart
                          strokeWidth={heart ? 0 : 1.5}
                          fill={heart ? "currentColor" : "none"}
                        />
                      </ActionIcon>
                    </span>
                    <span ref={msgBtnRef} className="inline-block">
                      <ActionIcon queued={msg} pulse={pulseKey === "msg"}>
                        <MessageCircle strokeWidth={1.5} />
                      </ActionIcon>
                    </span>
                    <span ref={userBtnRef} className="inline-block">
                      <ActionIcon
                        queued={user}
                        pulse={pulseKey === "user"}
                      >
                        <UserPlus strokeWidth={1.5} />
                      </ActionIcon>
                    </span>
                  </>
                ) : (
                  <>
                    <ActionIcon queued={heart} pulse={false}>
                      <Heart
                        strokeWidth={heart ? 0 : 1.5}
                        fill={heart ? "currentColor" : "none"}
                      />
                    </ActionIcon>
                    <ActionIcon queued={msg} pulse={false}>
                      <MessageCircle strokeWidth={1.5} />
                    </ActionIcon>
                    <ActionIcon queued={user} pulse={false}>
                      <UserPlus strokeWidth={1.5} />
                    </ActionIcon>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {play ? (
        <FakeCursor
          style={{
            left: cursor.left,
            top: cursor.top,
            opacity: cursor.opacity,
            transition:
              "left 0.35s ease, top 0.35s ease, opacity 0.25s ease",
          }}
        />
      ) : null}

      <div
        className="pointer-events-none absolute -bottom-1 -right-3 z-20 w-[min(100vw-1.5rem,20rem)] sm:-bottom-1 sm:-right-10 sm:w-80"
        aria-live="polite"
      >
        <div
          className="relative w-full"
          style={{
            minHeight:
              demoToasts.length > 0
                ? 12 +
                  (demoToasts.length - 1) * TOAST_OVERLAP_OFFSET +
                  52
                : 0,
          }}
        >
          {demoToasts.map((t, index) => {
            const stackIndex = demoToasts.length - 1 - index
            const bottom = 12 + stackIndex * TOAST_OVERLAP_OFFSET
            return (
              <div
                key={t.id}
                className="absolute inset-x-0 w-full max-w-full"
                style={{ bottom: `${bottom}px`, zIndex: index }}
              >
                <div
                  className={cn(
                    "box-border flex min-h-[3.25rem] w-full max-w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left shadow-lg",
                    "border-emerald-600/35 bg-emerald-50 text-emerald-900",
                    "dark:border-emerald-500/40 dark:bg-emerald-950/95 dark:text-emerald-50"
                  )}
                >
                  <Check
                    className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <p className="min-w-0 flex-1 text-sm font-medium leading-snug">
                    {t.message}{" "}
                    <span className="tabular-nums text-emerald-800/90 dark:text-emerald-200/90">
                      {interpolate(d.pendingTotal, { count: pendingTotal })}
                    </span>
                  </p>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-emerald-600 dark:text-emerald-400"
                    aria-hidden
                  >
                    <X className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
