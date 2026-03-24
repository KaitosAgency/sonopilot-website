import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

import { defaultLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F3EF" },
    { media: "(prefers-color-scheme: dark)", color: "#12141A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      fr: `${siteConfig.url}/fr`,
      en: `${siteConfig.url}/en`,
      "x-default": `${siteConfig.url}/${defaultLocale}`,
    },
  },
  icons: {
    icon: "/images/Logo/logo-sonopilot-only-icon-01.svg",
    apple: "/images/Logo/logo-sonopilot-only-icon-01.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const htmlLang = h.get("x-sonopilot-locale") ?? defaultLocale;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} min-h-screen font-sans`}
        style={
          {
            "--font-heading": "var(--font-sans)",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
