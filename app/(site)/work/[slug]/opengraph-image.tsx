import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, publicImageDataUri } from "@/lib/og";
import { findWork, works } from "@/lib/works";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

/**
 * `params` is awaited rather than read directly: Next moved route params to
 * promises, and awaiting a plain object is harmless either way.
 */
type Params = { params: Promise<{ slug: string }> | { slug: string } };

export async function generateImageMetadata({ params }: Params) {
  const { slug } = await params;
  const work = findWork(slug);
  return [
    {
      id: slug,
      size,
      contentType,
      alt: work ? `${work.title} — ${work.type} development by Real Group` : "Real Group",
    },
  ];
}

/** Per-project card: the project's own cover render behind its name. */
export default async function Image({ params }: Params) {
  const { slug } = await params;
  const work = findWork(slug);

  const [logo, background] = await Promise.all([
    publicImageDataUri("images/logo-light.png"),
    publicImageDataUri(`images/work/${slug}/cover.jpg`),
  ]);

  return new ImageResponse(
    (
      <OgCard
        logo={logo}
        background={background}
        eyebrow={work?.type ?? "Project"}
        title={work?.title ?? "Real Group"}
        subtitle={work?.summary ?? undefined}
      />
    ),
    size,
  );
}
