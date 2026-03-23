"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"

const navLinks = [
  { label: "Produit", href: "#produit" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Transparence", href: "#transparence" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
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
          <a
            href={siteConfig.appUrl + "/auth/signup"}
            className="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Rejoindre l&apos;alpha
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-border bg-background/95 backdrop-blur-lg",
          menuOpen ? "max-h-80" : "max-h-0 border-t-transparent"
        )}
      >
        <nav className="flex flex-col px-4 py-4 gap-1">
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
            href={siteConfig.appUrl + "/auth/signup"}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors mt-3 w-full"
          >
            Rejoindre l&apos;alpha gratuit
          </a>
        </nav>
      </div>
    </header>
  )
}
