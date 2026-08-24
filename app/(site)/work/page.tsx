import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BreadcrumbJsonLd, ProjectListJsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { works, coverFor } from "@/lib/works";

const description =
  "Five developments by Real Group in Rajkot — Real Corner, Real Classic, Real Point, Real Bunglows and Real Residency. Shops, showrooms, offices and flats.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: "Our Projects", description },
};

export default function WorkPage() {
  return (
    <>
      <ProjectListJsonLd />
      <BreadcrumbJsonLd trail={[{ name: "Projects", path: "/work" }]} />

      <PageHero
        title="Projects"
        lead="Commercial and residential developments across Rajkot, built on quality construction and modern architecture."
        image={coverFor("real-corner")}
        imageAlt="Real Corner at night"
      />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {works.map((work, i) => {
              /* First card runs full width as a feature, leaving the
                 remaining four in a tidy 2x2 below it. */
              const featured = i === 0;

              return (
                <li key={work.slug} className={featured ? "lg:col-span-2" : ""}>
                  {/* The caption sits in normal flow inside a min-height box
                      rather than absolutely over a fixed-aspect image. At 320px
                      an absolute caption is taller than a 16:10 crop and gets
                      clipped; this way the card simply grows instead. */}
                  <Link
                    href={`/work/${work.slug}`}
                    className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900 ${
                      featured
                        ? "min-h-[340px] sm:min-h-[420px] lg:min-h-[520px]"
                        : "min-h-[320px] sm:min-h-[380px]"
                    }`}
                  >
                    <Image
                      src={coverFor(work.slug)}
                      alt={work.title}
                      fill
                      priority={i < 2}
                      quality={90}
                      sizes={
                        featured
                          ? "(min-width: 1024px) 1280px, 92vw"
                          : "(min-width: 1024px) 50vw, 92vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="relative p-5 sm:p-7 lg:p-8">
                      <span className="inline-block rounded-full bg-brand-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-900 sm:text-[11px] sm:tracking-[0.16em]">
                        {work.type}
                      </span>

                      <h2
                        className={`mt-3 font-medium uppercase tracking-[0.06em] text-white sm:mt-4 ${
                          featured
                            ? "text-2xl sm:text-3xl lg:text-4xl"
                            : "text-xl sm:text-2xl"
                        }`}
                      >
                        {work.title}
                      </h2>

                      <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-white/75 sm:text-base">
                        {work.summary}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors group-hover:text-brand-gold sm:mt-5 sm:text-sm">
                        View project
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
