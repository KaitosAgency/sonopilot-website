"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const ComingSoonContext = createContext<() => void>(() => {})

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openModal = useCallback(() => setOpen(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <ComingSoonContext.Provider value={openModal}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Fermer la fenêtre"
            onClick={() => setOpen(false)}
          />
          <ComingSoonPanel onClose={() => setOpen(false)} />
        </div>
      ) : null}
    </ComingSoonContext.Provider>
  )
}

function ComingSoonPanel({ onClose }: { onClose: () => void }) {
  const titleId = useId()

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="relative z-[1] w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Fermer"
      >
        <X className="h-4 w-4" strokeWidth={2} />
      </button>
      <h2
        id={titleId}
        className="pr-10 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        Bientôt disponible
      </h2>
      <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
        L&apos;inscription et l&apos;accès à l&apos;application ouvriront
        bientôt. Merci de ta patience — on finalise Sonopilot pour toi.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto sm:px-8"
      >
        D&apos;accord
      </button>
    </div>
  )
}

export function useOpenComingSoon() {
  return useContext(ComingSoonContext)
}

export function ComingSoonTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const open = useOpenComingSoon()
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e)
        open()
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </button>
  )
}
