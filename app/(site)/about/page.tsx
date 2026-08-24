import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { about } from "@/lib/content";

const description =
  "Real Group is more than a real estate company — we are the architects of dreams and the builders of future homes, guided by integrity, quality and customer-centricity.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Real Group", description },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "About Us", path: "/about" }]} />

      <PageHero
        title={about.title}
        image="/images/slide-3.jpg"
        imageAlt="Real Point development, day view"
      />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <Container>
          {/* Constrained measure keeps the long paragraphs readable. */}
          <div className="mx-auto max-w-3xl">
            {about.blocks.map((block, i) => (
              <div
                key={block.body[0].slice(0, 40)}
                className={
                  i > 0
                    ? "mt-10 border-t border-neutral-200 pt-10 sm:mt-12 sm:pt-12"
                    : ""
                }
              >
                {block.body.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="mb-5 text-base font-medium leading-[1.85] text-neutral-700 last:mb-0 sm:text-lg"
                  >
                    {para}
                  </p>
                ))}

                {block.emphasis.length > 0 && (
                  <p className="mt-7 border-l-2 border-brand-gold pl-5 text-lg font-medium leading-relaxed text-neutral-900 sm:text-xl">
                    {block.emphasis.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
