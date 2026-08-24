import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { team } from "@/lib/content";

const description =
  "A global network of Partners and Directors bringing creative vision, technical mastery and management expertise to every Real Group project.";

export const metadata: Metadata = {
  title: "Team",
  description,
  alternates: { canonical: "/team" },
  openGraph: { url: "/team", title: "Our Team of Global Experts", description },
};

export default function TeamPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Team", path: "/team" }]} />

      <PageHero
        title={team.title}
        image="/images/slide-2.jpg"
        imageAlt="Real Classic development at dusk"
      />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <Container>
          {/* Constrained measure keeps the long paragraphs readable. */}
          <div className="mx-auto max-w-3xl">
            {team.body.map((para, i) => (
              <p
                key={para.slice(0, 40)}
                /* Hairline rule between paragraphs, matching the About page. */
                className={`text-base font-medium leading-[1.85] text-neutral-700 sm:text-lg ${
                  i > 0
                    ? "mt-10 border-t border-neutral-200 pt-10 sm:mt-12 sm:pt-12"
                    : ""
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
