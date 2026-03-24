"use client"

import Image from "next/image"
import Link from "next/link"
import { publisherConfig, siteConfig } from "@/lib/site"
import { ComingSoonTrigger } from "./coming-soon"

export function Footer() {
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
            <ComingSoonTrigger className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 font-[inherit] text-sm">
              Accès alpha
            </ComingSoonTrigger>
            <ComingSoonTrigger className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 font-[inherit] text-sm">
              Connexion
            </ComingSoonTrigger>
          </div>
        </div>

        <nav
          aria-label="Informations légales"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm sm:justify-start"
        >
          <a
            href={`mailto:${publisherConfig.email}`}
            className="text-gray-400 transition-colors hover:text-white"
          >
            {publisherConfig.email}
          </a>
          <Link href="/mentions-legales" className="text-gray-400 transition-colors hover:text-white">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="text-gray-400 transition-colors hover:text-white">
            Confidentialité
          </Link>
          <Link href="/cgu" className="text-gray-400 transition-colors hover:text-white">
            CGU
          </Link>
        </nav>
      </div>
    </footer>
  )
}
