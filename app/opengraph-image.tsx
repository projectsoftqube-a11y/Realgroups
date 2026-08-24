import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, publicImageDataUri } from "@/lib/og";
import { site } from "@/lib/site";

/**
 * Default social card. Metadata images are inherited by child segments, so this
 * covers every page except /work/[slug], which supplies its own.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const [logo, background] = await Promise.all([
    publicImageDataUri("images/logo-light.png"),
    publicImageDataUri("images/work/real-corner/cover.jpg"),
  ]);

  return new ImageResponse(
    (
      <OgCard
        logo={logo}
        background={background}
        eyebrow="Rajkot, India"
        title="Premium homes & commercial spaces"
        subtitle="Real Corner · Real Classic · Real Point · Real Bunglows · Real Residency"
      />
    ),
    size,
  );
}
