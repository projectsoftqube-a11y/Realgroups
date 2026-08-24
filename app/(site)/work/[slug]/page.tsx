import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { ProjectGallery } from "@/components/ProjectGallery";
import { DownloadIcon } from "@/components/icons";
import { brochures } from "@/lib/site";
import {
  adjacentWorks,
  coverFor,
  findWork,
  galleryFor,
  logoFor,
  works,
} from "@/lib/works";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = findWork(slug);
  if (!work) return {};

  const description = `${work.title} — ${work.type} development by Real Group in Rajkot. ${work.summary}`;

  return {
    title: work.title,
    description,
    alternates: { canonical: `/work/${work.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${work.slug}`,
      title: `${work.title} — ${work.type} project in Rajkot`,
      description,
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = findWork(slug);
  if (!work) notFound();

  const gallery = galleryFor(work);
  const { prev, next } = adjacentWorks(work.slug);
  const brochure = brochures.find((b) => b.slug === work.slug);

  return (
    <>
      <ProjectJsonLd slug={work.slug} />
      <BreadcrumbJsonLd
        trail={[
          { name: "Projects", path: "/work" },
          { name: work.title, path: `/work/${work.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-neutral-950">
        <Image
          src={coverFor(work.slug)}
          alt={work.title}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

        <Container className="relative pb-16 pt-[150px] sm:pb-20 lg:pb-28 lg:pt-[230px]">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-brand-gold sm:text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-6">
            <div>
              <span className="inline-block rounded-full bg-brand-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-900">
                {work.type}
              </span>
              <h1 className="mt-4 text-3xl font-medium uppercase leading-[1.12] tracking-[0.04em] text-white sm:text-4xl lg:text-6xl">
                {work.title}
              </h1>
            </div>

            {/* Project wordmark — supplied as a white-background JPG, so it is
                boxed deliberately rather than left floating on the render. */}
            <Image
              src={logoFor(work.slug)}
              alt={`${work.title} logo`}
              width={320}
              height={180}
              quality={95}
              sizes="180px"
              className="h-16 w-auto rounded-lg bg-white/95 p-2 sm:h-20"
            />
          </div>

          {work.offering.length > 0 && (
            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
              {work.offering.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm sm:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          <span className="mt-7 block h-px w-24 bg-brand-gold" />
        </Container>
      </section>

      {/* Description */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            {work.body.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="mb-5 text-base font-medium leading-[1.85] text-neutral-700 last:mb-0 sm:text-lg"
              >
                {para}
              </p>
            ))}

            {work.emphasis.length > 0 && (
              <p className="mt-7 border-l-2 border-brand-gold pl-5 text-lg font-medium leading-relaxed text-neutral-900 sm:text-xl">
                {work.emphasis.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}

            {brochure && (
              <a
                href={brochure.file}
                download
                className="group mt-9 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-neutral-900 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-gold hover:text-neutral-900 sm:px-7 sm:text-sm sm:tracking-[0.12em]"
              >
                <DownloadIcon className="size-4 shrink-0" />
                Download brochure
                {/* File size is useful context on desktop but pushes the label
                    onto a second line on a 320px screen. */}
                <span className="hidden font-normal text-white/60 transition-colors group-hover:text-neutral-900/70 sm:inline">
                  ({brochure.sizeMb} MB)
                </span>
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="bg-neutral-50 py-14 sm:py-20 lg:py-24">
          <Container>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-medium uppercase tracking-[0.08em] text-neutral-900">
                Gallery
              </h2>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
                {gallery.length} {gallery.length === 1 ? "image" : "images"}
              </p>
            </div>

            <ProjectGallery images={gallery} title={work.title} />
          </Container>
        </section>
      )}

      {/* Prev / next */}
      {prev && next && (
        <section className="border-t border-neutral-200 bg-white">
          <Container>
            <div className="grid gap-px sm:grid-cols-2">
              <Link
                href={`/work/${prev.slug}`}
                className="group py-10 transition-colors sm:pr-10"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Previous
                </span>
                <p className="mt-2 text-xl font-medium uppercase tracking-[0.06em] text-neutral-900 transition-colors group-hover:text-brand-gold sm:text-2xl">
                  {prev.title}
                </p>
              </Link>

              <Link
                href={`/work/${next.slug}`}
                className="group border-t border-neutral-200 py-10 sm:border-l sm:border-t-0 sm:pl-10 sm:text-right"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Next
                </span>
                <p className="mt-2 text-xl font-medium uppercase tracking-[0.06em] text-neutral-900 transition-colors group-hover:text-brand-gold sm:text-2xl">
                  {next.title}
                </p>
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
