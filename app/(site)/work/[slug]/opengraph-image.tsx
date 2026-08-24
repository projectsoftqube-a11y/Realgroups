import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, publicImageDataUri } from "@/lib/og";
import { findWork } from "@/lib/works";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Real Group development in Rajkot";

/**
 * Per-project social card: the project's own cover render behind its name.
 *
 * Deliberately no `generateImageMetadata` — that hook exists to emit several
 * images from one file, and each item it returns must carry an `id`. This route
 * produces exactly one image per slug, so the hook is unnecessary; exporting it
 * made the build fail collecting page data for the generated
 * `[__metadata_id__]` route. `generateStaticParams` is likewise inherited from
 * page.tsx and must not be redeclared here.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
