/**
 * One-off asset tool: `node scripts/make-favicon.mjs`
 *
 * Builds the browser icons from the brand mark. The favicon on the WordPress
 * site is the full logo dropped into a 512px square with very wide white
 * margins, which reduces to an unreadable smudge at 16-32px. This trims the
 * margin so the mark fills the frame, then emits the files Next's metadata
 * file convention picks up automatically:
 *
 *   app/favicon.ico     - 32px, for /favicon.ico requests
 *   app/icon.png        - 512px, primary <link rel="icon">
 *   app/apple-icon.png  - 180px, iOS home screen
 *
 * Source: public/images/logo.jpg (the client's supplied mark).
 */
import sharp from "sharp";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, "..", "public", "images", "logo.jpg");
const appDir = path.join(here, "..", "app");

/** Trim the white surround, then centre the mark on a square white canvas. */
async function square(size) {
  const pad = Math.round(size * 0.06);
  const inner = await sharp(src)
    .trim({ threshold: 10 })
    .resize({
      width: size - pad * 2,
      height: size - pad * 2,
      fit: "inside",
      withoutEnlargement: false,
    })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: inner, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const icon = await square(512);
await writeFile(path.join(appDir, "icon.png"), icon);
console.log("wrote app/icon.png (512x512)");

const apple = await square(180);
await writeFile(path.join(appDir, "apple-icon.png"), apple);
console.log("wrote app/apple-icon.png (180x180)");

/**
 * Wrap a 32px PNG in an ICO container. The ICO format allows a raw PNG
 * payload, so no BMP encoding is needed — sharp cannot write .ico directly.
 */
const png32 = await square(32);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(1, 4); // image count

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // width
entry.writeUInt8(32, 1); // height
entry.writeUInt8(0, 2); // palette size (0 = no palette)
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // colour planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png32.length, 8); // payload size
entry.writeUInt32LE(header.length + entry.length, 12); // payload offset

await writeFile(
  path.join(appDir, "favicon.ico"),
  Buffer.concat([header, entry, png32]),
);
console.log("wrote app/favicon.ico (32x32)");
