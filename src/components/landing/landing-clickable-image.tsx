"use client"

import Image, { type ImageProps } from "next/image"
import { X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useI18n } from "@/components/providers/i18n-provider"
import { cn } from "@/lib/utils"

/** Aligné sur Tailwind `md:` — au‑delà, pas d’agrandissement au clic. */
const LIGHTBOX_MAX_WIDTH_PX = 767

function useLightboxInteractionEnabled() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${LIGHTBOX_MAX_WIDTH_PX}px)`
    )
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])
  return enabled
}

export type LandingClickableImageProps = ImageProps & {
  /** Classes sur le conteneur externe (bordures, ombres du bloc capture). */
  frameClassName?: string
}

/**
 * Capture produit : sur mobile / étroit uniquement, clic → voile plein écran (Échap / fond / croix).
 * Sur desktop l’image reste statique (pas de curseur zoom).
 */
export function LandingClickableImage({
  className,
  frameClassName,
  alt,
  priority,
  ...img
}: LandingClickableImageProps) {
  const lightboxEnabled = useLightboxInteractionEnabled()
  const [open, setOpen] = useState(false)
  const { messages } = useI18n()
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!lightboxEnabled) setOpen(false)
  }, [lightboxEnabled])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, close])

  const overlay =
    lightboxEnabled &&
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={close}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-[1] flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
          aria-label={messages.common.closeImageLightbox}
        >
          <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </button>
        <div
          className="relative max-h-[min(90vh,100%)] max-w-[min(95vw,100%)]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            {...img}
            alt={alt}
            priority={false}
            sizes="(max-width: 1920px) 95vw, 1824px"
            className="max-h-[90vh] w-auto max-w-[95vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      </div>,
      document.body
    )

  if (!lightboxEnabled) {
    return (
      <div className={cn("relative", frameClassName)}>
        <Image
          {...img}
          alt={alt}
          priority={priority}
          className={cn(className)}
        />
      </div>
    )
  }

  return (
    <>
      <div className={cn("relative", frameClassName)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={messages.common.expandImage}
        >
          <Image
            {...img}
            alt={alt}
            priority={priority}
            className={cn(className)}
          />
        </button>
      </div>
      {overlay}
    </>
  )
}
