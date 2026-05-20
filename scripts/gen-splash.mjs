import sharp from "sharp";
import { mkdirSync } from "fs";

const SRC = "src/assets/brandmark-dark.png";
const BG = { r: 12, g: 12, b: 14, alpha: 1 }; // #0c0c0e — matches --surface
const OUT_DIR = "public/splash";

mkdirSync(OUT_DIR, { recursive: true });

// iOS device classes (portrait WxH). Landscape variants are swapped from these.
const DEVICES = [
  { w: 2048, h: 2732 }, // iPad Pro 12.9"
  { w: 1668, h: 2388 }, // iPad Pro 11"
  { w: 1536, h: 2048 }, // iPad 9.7"
  { w: 1290, h: 2796 }, // iPhone 15/16 Pro Max
  { w: 1179, h: 2556 }, // iPhone 15/16
  { w: 1170, h: 2532 }, // iPhone 13/14
  { w: 1125, h: 2436 }, // iPhone X/XS/11 Pro
];

async function makeSplash({ w, h, out }) {
  const shorter = Math.min(w, h);
  const markSize = Math.round(shorter * 0.28);
  const mark = await sharp(SRC)
    .resize({ width: markSize, height: markSize, fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const meta = await sharp(mark).metadata();
  const top = Math.round((h - (meta.height ?? markSize)) / 2);
  const left = Math.round((w - (meta.width ?? markSize)) / 2);

  await sharp({ create: { width: w, height: h, channels: 4, background: BG } })
    .composite([{ input: mark, top, left }])
    .png()
    .toFile(out);
  console.log("✓", out);
}

for (const d of DEVICES) {
  // Portrait
  await makeSplash({ w: d.w, h: d.h, out: `${OUT_DIR}/apple-splash-${d.w}x${d.h}.png` });
  // Landscape (swap dims)
  await makeSplash({ w: d.h, h: d.w, out: `${OUT_DIR}/apple-splash-${d.h}x${d.w}.png` });
}