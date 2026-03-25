"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/components/providers/i18n-provider"
import { homePath } from "@/lib/i18n/paths"
import { siteConfig } from "@/lib/site"

import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const { locale, messages } = useI18n()
  const navLinks = useMemo(() => {
    const home = homePath(locale)
    return [
      { label: messages.nav.product, href: `${home}#produit` },
      { label: messages.nav.howItWorks, href: `${home}#comment-ca-marche` },
      { label: messages.nav.transparency, href: `${home}#transparence` },
      { label: messages.nav.faq, href: `${home}#faq` },
    ]
  }, [locale, messages])

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  return (
    <>
    <header
      className={cn(
        "fixed top-0 w-full border-b border-border bg-background transition-shadow duration-300",
        menuOpen ? "z-[101] shadow-sm" : "z-50",
        scrolled && !menuOpen && "shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={homePath(locale)} className="flex items-center">
          <Image
            src="/images/Logo/logo-sonopilot-full-color-01.svg"
            alt="Sonopilot"
            width={140}
            height={28}
            priority
            unoptimized
            className="bg-transparent"
            style={{ height: "auto" }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {messages.header.joinAlpha}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={menuOpen ? messages.header.menuClose : messages.header.menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>

    {menuOpen ? (
      <div
        className="fixed inset-x-0 top-16 bottom-0 z-[100] flex min-h-0 flex-col overflow-y-auto overscroll-contain bg-background md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label={messages.header.menuDialog}
      >
        <nav className="flex min-h-0 flex-1 flex-col gap-1 px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="mb-2 flex justify-center sm:hidden">
            <LanguageSwitcher onNavigate={() => setMenuOpen(false)} />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground py-2.5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {messages.header.joinAlphaMobile}
          </a>
        </nav>
      </div>
    ) : null}
    </>
  )
}
