import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Reads a file from public/ and returns it as a data URI for ImageResponse. */
export async function publicImageDataUri(relPath: string) {
  const file = path.join(process.cwd(), "public", relPath);
  const buf = await readFile(file);
  const ext = path.extname(relPath).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/**
 * Shared card layout for social previews.
 *
 * Kept deliberately plain: Satori (which powers next/og) supports only a subset
 * of CSS — no gap on flex, no shorthand backgrounds, every element needs an
 * explicit display value.
 */
export function OgCard({
  logo,
  background,
  eyebrow,
  title,
  subtitle,
}: {
  logo: string;
  background?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "#0a0a0a",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {background && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={background}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
          }}
        />
      )}

      {/* Scrim so the wordmark and title stay readable over any render. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          backgroundColor: "rgba(0,0,0,0.58)",
        }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        width={260}
        height={144}
        style={{ position: "absolute", top: 56, left: 64, width: 260, height: 144, objectFit: "contain" }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          padding: "0 64px 64px 64px",
        }}
      >
        {eyebrow && (
          <div
            style={{
              display: "flex",
              color: "#d7b56d",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
        )}

        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: title.length > 24 ? 62 : 78,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", width: 96, height: 4, backgroundColor: "#d7b56d", marginTop: 26 }} />

        {subtitle && (
          <div
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.78)",
              fontSize: 28,
              marginTop: 22,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
