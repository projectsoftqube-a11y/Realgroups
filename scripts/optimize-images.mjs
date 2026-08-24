/**
 * One-off asset tool: `node scripts/optimize-images.mjs`
 *
 * The renders supplied by the client are print-resolution — up to 9000x9000
 * (77 megapixels, 3.6 MB). Next has to resize those on every cold request,
 * which is slow enough that slides can still be blank when the carousel
 * advances, and it bloats the repo for no visible benefit: nothing is ever
 * displayed above ~2560px.
 *
 * This downsizes anything wider/taller than MAX in public/images, moving the
 * untouched originals to _original-images/ (outside public/, gitignored) so
 * nothing is destroyed.
 *
 * Safe to re-run — files already within MAX are skipped.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readdir, mkdir, rename, stat } from "node:fs/promises";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const imagesDir = path.join(root, "public", "images");
const backupDir = path.join(root, "_original-images");

const MAX = 2560; // widest the site ever displays, allowing for 2x screens
const QUALITY = 88;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

let touched = 0;
let skipped = 0;
let before = 0;
let after = 0;

for await (const file of walk(imagesDir)) {
  const meta = await sharp(file).metadata();
  const size = (await stat(file)).size;

  if (Math.max(meta.width, meta.height) <= MAX) {
    skipped++;
    continue;
  }

  const rel = path.relative(imagesDir, file);
  const backup = path.join(backupDir, rel);
  await mkdir(path.dirname(backup), { recursive: true });

  // Resize into a buffer first, then move the original aside and write.
  const isPng = /\.png$/i.test(file);
  const buf = await sharp(file)
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    [isPng ? "png" : "jpeg"](isPng ? { compressionLevel: 9 } : { quality: QUALITY, mozjpeg: true })
    .toBuffer();

  await rename(file, backup);
  await sharp(buf).toFile(file);

  const newSize = (await stat(file)).size;
  before += size;
  after += newSize;
  touched++;

  console.log(
    `${rel.padEnd(38)} ${meta.width}x${meta.height} ${(size / 1024 / 1024).toFixed(1)}MB` +
      ` -> ${(newSize / 1024 / 1024).toFixed(1)}MB`,
  );
}

console.log(
  `\n${touched} resized, ${skipped} already small enough.` +
    `\n${(before / 1024 / 1024).toFixed(0)}MB -> ${(after / 1024 / 1024).toFixed(0)}MB` +
    ` (saved ${(((before - after) / before) * 100).toFixed(0)}%)` +
    `\nOriginals moved to _original-images/`,
);
