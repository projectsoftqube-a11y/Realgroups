/**
 * One-off asset tool: `node scripts/make-logo.mjs`
 *
 * The logo supplied by the client is a JPG with a white background baked in,
 * which renders as a white box when placed over hero imagery. This knocks the
 * white out to transparency and trims the resulting margin.
 *
 * Re-run this if the client ever sends an updated logo.jpg. If they supply a
 * proper transparent PNG or SVG, drop it in as logo.png and delete this script.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const images = path.join(here, "..", "public", "images");
const src = path.join(images, "logo.jpg");
const out = path.join(images, "logo.png");

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const HARD = 246; // luminance at/above this becomes fully transparent
const SOFT = 228; // at/below this stays fully opaque; between the two we ramp

for (let i = 0; i < data.length; i += channels) {
  const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

  if (lum >= HARD) data[i + 3] = 0;
  else if (lum <= SOFT) data[i + 3] = 255;
  else data[i + 3] = Math.round(255 * (1 - (lum - SOFT) / (HARD - SOFT)));
}

const result = await sharp(data, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .trim({ threshold: 1 })
  .toFile(out);

console.log(`wrote ${out}`);
console.log(`source ${width}x${height} -> trimmed ${result.width}x${result.height}`);

/**
 * Reversed ("light") mark for use over photography. The charcoal wordmark
 * vanishes against the night renders, so the neutral-dark pixels are flipped to
 * white while the gold is left untouched.
 */
const light = Buffer.from(data);

for (let i = 0; i < light.length; i += channels) {
  const r = light[i];
  const g = light[i + 1];
  const b = light[i + 2];
  if (light[i + 3] === 0) continue;

  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;

  // Near-neutral and dark => part of the charcoal wordmark, not the gold.
  if (spread < 34 && lum < 160) {
    light[i] = 255;
    light[i + 1] = 255;
    light[i + 2] = 255;
  }
}

const outLight = path.join(images, "logo-light.png");
const resultLight = await sharp(light, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .trim({ threshold: 1 })
  .toFile(outLight);

console.log(`wrote ${outLight}`);
console.log(`trimmed ${resultLight.width}x${resultLight.height}`);
