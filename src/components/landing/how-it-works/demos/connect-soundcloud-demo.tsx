"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { FakeCursor } from "./fake-cursor"
import {
  PlatformProfileCardDemo,
  type SoundCloudDemoPhase,
} from "./platform-profile-card-demo"
import { useInViewOnce, useReducedMotion } from "./use-demo-animation"

const CURSOR_TRAVEL_MS = 2080
const CLICK_MS = 260
const LOADING_MS = 1850
const CONNECTED_MS = 3200

/**
 * Séquence : déconnecté → curseur + clic (bouton + curseur) → chargement → connecté.
 * Carte pleine largeur du bloc, même enveloppe visuelle que les autres démos (bordure + ombre).
 */
export function ConnectSoundCloudDemo() {
  const { ref, inView } = useInViewOnce()
  const reduced = useReducedMotion()
  const play = inView && !reduced

  const [phase, setPhase] = useState<SoundCloudDemoPhase>("disconnected")
  const [cursorCycle, setCursorCycle] = useState(0)
  const timers = useRef<number[]>([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (!play) {
      setPhase("disconnected")
      return
    }

    const queue = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms)
      timers.current.push(id)
    }

    const runCycle = () => {
      setCursorCycle((c) => c + 1)
      setPhase("disconnected")

      queue(() => setPhase("click"), CURSOR_TRAVEL_MS)
      queue(() => setPhase("loading"), CURSOR_TRAVEL_MS + CLICK_MS)
      queue(
        () => setPhase("connected"),
        CURSOR_TRAVEL_MS + CLICK_MS + LOADING_MS
      )
      queue(
        runCycle,
        CURSOR_TRAVEL_MS + CLICK_MS + LOADING_MS + CONNECTED_MS
      )
    }

    runCycle()
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [play])

  useEffect(() => {
    if (inView && reduced) {
      setPhase("connected")
    }
  }, [inView, reduced])

  const showCursor =
    play && (phase === "disconnected" || phase === "click")

  return (
    <div
      ref={ref}
      className="demo-cursor-connect-wrap relative mx-auto w-full min-w-0"
    >
      <PlatformProfileCardDemo
        phase={phase}
        connectButtonClassName={cn(
          phase === "disconnected" &&
            play &&
            "max-md:animate-demo-tap-hint"
        )}
      />

      {showCursor ? (
        <FakeCursor
          key={cursorCycle}
          className={cn(
            phase === "disconnected" &&
              "animate-demo-cursor-connect-once left-[8%] top-[10%]",
            phase === "click" &&
              "left-1/2 top-[86%] -translate-x-1/2 animate-demo-cursor-tap"
          )}
        />
      ) : null}
    </div>
  )
}
