import sharp from "sharp";
import { readFileSync } from "fs";

const W = 1200, H = 630;
const BRAND = "src/assets/brandmark-dark.webp";

const jobs = [
  ["src/assets/source/hero-desktop-yard.webp", "public/og/og-home.jpg"],
  ["src/assets/source/abby-portrait.webp",   "public/og/og-about.jpg"],
  ["src/assets/source/yard-piles.webp",      "public/og/og-products.jpg"],
  ["src/assets/source/loading-truck.webp",   "public/og/og-delivery.jpg"],
  ["src/assets/source/yard-banner-5.webp",   "public/og/og-contact.jpg"],
  ["src/assets/source/yard-trucks.webp",     "public/og/og-quote.jpg"],
];

// Bottom scrim: dark gradient SVG ~240px tall, full width
const scrim = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity="0.75"/>
    <stop offset="1" stop-color="#000" stop-opacity="0"/>
  </linearGradient></defs>
  <rect x="0" y="${H-260}" width="${W}" height="260" fill="url(#g)"/>
</svg>`);

const brandResized = await sharp(BRAND).resize({ width: 260 }).png().toBuffer();
const bMeta = await sharp(brandResized).metadata();

for (const [src, out] of jobs) {
  await sharp(src)
    .resize(W, H, { fit: "cover", position: "attention" })
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: brandResized, top: H - bMeta.height - 48, left: 48 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  console.log("✓", out);
}
