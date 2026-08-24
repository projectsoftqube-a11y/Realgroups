import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 should never be indexed, whatever the crawler is doing.
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Projects" },
  { href: "/brochure", label: "Brochures" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <main className="flex flex-1 items-center bg-neutral-950 pb-20 pt-[170px] lg:pt-[240px]">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold sm:text-sm">
            Error 404
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-medium uppercase leading-[1.12] tracking-[0.04em] text-white sm:text-4xl lg:text-5xl">
            We couldn&rsquo;t find that page
          </h1>
          <span className="mt-6 block h-px w-24 bg-brand-gold" />
          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-white/75 sm:text-lg">
            The link may be out of date, or the page may have moved when we
            rebuilt the site. Try one of these instead.
          </p>

          <ul className="mt-9 flex flex-wrap gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-full border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
