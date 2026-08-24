import Image from "next/image";

import { Container } from "@/components/Container";

/**
 * Inner-page hero. Carries its own top padding so it can sit full-bleed
 * beneath the fixed chrome, exactly like the home slider.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Two light scrims rather than one heavy one, so the render stays
          visible. Vertical keeps the fixed nav legible at the top and grounds
          the base; horizontal darkens only the left, where the copy sits. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      <Container className="relative pb-16 pt-[150px] sm:pb-20 lg:pb-28 lg:pt-[230px]">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-3xl font-medium uppercase leading-[1.12] tracking-[0.04em] text-white sm:text-4xl lg:text-6xl">
          {title}
        </h1>
        <span className="mt-6 block h-px w-24 bg-brand-gold" />
        {lead && (
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
            {lead}
          </p>
        )}
      </Container>
    </section>
  );
}
