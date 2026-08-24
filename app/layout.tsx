import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

import { OrganizationJsonLd } from "@/components/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const description =
  "Real Group develops premium residential and commercial projects in Rajkot — Real Corner, Real Classic, Real Point, Real Bunglows and Real Residency.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "Real Group Rajkot",
    "flats in Rajkot",
    "shops in Rajkot",
    "showrooms Rajkot",
    "commercial space Rajkot",
    "Real Corner",
    "Real Classic",
    "Real Point",
    "Real Bunglows",
    "Real Residency",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,

  // Inherited by every page; individual pages override title/description/url.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description,
  },
  /**
   * Only the card type is declared site-wide. Setting twitter:title/description
   * here would override every page, because child metadata merges per-key —
   * and with them absent, X, WhatsApp, LinkedIn and Slack all fall back to the
   * page's own og:title / og:description, which is what we want.
   */
  twitter: { card: "summary_large_image" },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },

  /**
   * Search Console / Facebook tokens.
   * Set in .env.local so they are not hard-coded; the keys are simply omitted
   * when the variables are absent rather than emitting empty meta tags.
   */
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.FACEBOOK_DOMAIN_VERIFICATION
      ? { other: { "facebook-domain-verification": process.env.FACEBOOK_DOMAIN_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#d7b56d",
  colorScheme: "light",
};

/**
 * Root shell: utility bar + overlay header only.
 * The footer lives in the `(site)` layout so the home page can opt out of it.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${montserrat.variable} h-full antialiased`}>
      {/* Browser extensions (ColorZilla, Grammarly, LastPass...) inject
          attributes onto <body> before React hydrates, which trips the
          hydration mismatch warning. Nothing we render here is variable. */}
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <OrganizationJsonLd />
        {/* Fixed, so hero imagery still starts at y=0. */}
        <SiteChrome />
        <div className="relative flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
