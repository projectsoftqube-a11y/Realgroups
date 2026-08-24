import type { Metadata } from "next";
import Image from "next/image";

import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { DownloadIcon, ExternalLinkIcon } from "@/components/icons";
import { brochures } from "@/lib/site";

const description =
  "Download the Real Group project brochures — Real Corner, Real Classic, Real Point and Real Bunglows. Plans, specifications and amenities.";

export const metadata: Metadata = {
  title: "Brochures",
  description,
  alternates: { canonical: "/brochure" },
  openGraph: { url: "/brochure", title: "Project Brochures", description },
};

export default function BrochurePage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Brochures", path: "/brochure" }]} />

      <PageHero
        title="Brochures"
        lead="Full project brochures with plans, specifications and amenities. View them in your browser or download a copy."
        image="/images/brochure-real-classic.jpg"
        imageAlt="Real Classic entrance gate at night"
      />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {brochures.map((brochure) => (
              <li
                key={brochure.slug}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Cover */}
                <a
                  href={brochure.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[4/3] overflow-hidden bg-neutral-200"
                  aria-label={`Open the ${brochure.title} brochure`}
                >
                  <Image
                    src={brochure.image}
                    alt={brochure.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 640px) 50vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-900">
                    PDF
                  </span>
                </a>

                {/* Details */}
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h2 className="text-xl font-medium uppercase tracking-[0.08em] text-neutral-900 sm:text-2xl">
                    {brochure.title}
                  </h2>
                  <span className="mt-4 block h-px w-12 bg-brand-gold" />

                  <p className="mt-4 text-sm font-medium text-neutral-500">
                    {brochure.sizeMb} MB
                    <span aria-hidden="true" className="px-2 text-neutral-300">
                      |
                    </span>
                    {brochure.published}
                  </p>

                  {/* Pushed to the bottom so buttons align across cards.
                      `pt-8` guarantees a gap even when `mt-auto` has no slack. */}
                  <div className="mt-8 flex flex-wrap gap-3 sm:mt-auto sm:pt-8">
                    <a
                      href={brochure.file}
                      download
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-gold hover:text-neutral-900 sm:flex-none sm:px-6 sm:text-sm sm:tracking-[0.12em]"
                    >
                      <DownloadIcon className="size-4" />
                      Download
                    </a>
                    <a
                      href={brochure.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-900 ring-1 ring-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white hover:ring-neutral-900 sm:flex-none sm:px-6 sm:text-sm sm:tracking-[0.12em]"
                    >
                      <ExternalLinkIcon className="size-4" />
                      View
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
