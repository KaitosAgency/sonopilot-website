"use client"

import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/components/providers/i18n-provider"
import { sitePath } from "@/lib/i18n/paths"
import { publisherConfig, siteConfig } from "@/lib/site"

export function Footer() {
  const { locale, messages } = useI18n()
  const f = messages.footer

  return (
    <footer className="bg-[hsl(228_10%_10%)] text-gray-400 py-12">
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/images/Logo/logo-sonopilot-only-icon-01.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
              className="bg-transparent brightness-0 invert opacity-60"
            />
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {f.alphaAccess}
            </a>
            <a
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {f.login}
            </a>
          </div>
        </div>

        <nav
          aria-label={f.legalNav}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm sm:justify-start"
        >
          <a
            href={`mailto:${publisherConfig.email}`}
            className="text-gray-400 transition-colors hover:text-white"
          >
            {publisherConfig.email}
          </a>
          <Link
            href={sitePath(locale, "mentions-legales")}
            className="text-gray-400 transition-colors hover:text-white"
          >
            {f.legalNotice}
          </Link>
          <Link
            href={sitePath(locale, "politique-de-confidentialite")}
            className="text-gray-400 transition-colors hover:text-white"
          >
            {f.privacy}
          </Link>
          <Link
            href={sitePath(locale, "cgu")}
            className="text-gray-400 transition-colors hover:text-white"
          >
            {f.terms}
          </Link>
        </nav>

        <p className="border-t border-white/10 pt-6 text-center text-xs text-gray-500 sm:text-left">
          {f.creditBefore}
          <a
            href="https://kaitos.agency/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            Kaitos AI Agency
          </a>
          {f.creditAfter}
        </p>
      </div>
    </footer>
  )
}
