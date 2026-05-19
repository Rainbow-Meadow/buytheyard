import sharp from "sharp";

const SRC = "src/assets/brandmark-dark.png";
const BG = { r: 12, g: 12, b: 14, alpha: 1 }; // matches --surface near-black

async function makeIcon({ size, padPct, out, opaque = true }) {
  const inner = Math.round(size * (1 - padPct * 2));
  const mark = await sharp(SRC)
    .resize({ width: inner, height: inner, fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const meta = await sharp(mark).metadata();
  const top = Math.round((size - (meta.height ?? inner)) / 2);
  const left = Math.round((size - (meta.width ?? inner)) / 2);

  const base = opaque
    ? sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    : sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } });

  await base.composite([{ input: mark, top, left }]).png().toFile(out);
  console.log("✓", out);
}

// Standard PWA icons (any purpose): minimal padding so mark fills the tile
await makeIcon({ size: 192, padPct: 0.10, out: "public/icons/icon-192.png" });
await makeIcon({ size: 512, padPct: 0.10, out: "public/icons/icon-512.png" });
// Maskable: 20% safe-zone padding per spec
await makeIcon({ size: 512, padPct: 0.20, out: "public/icons/icon-maskable-512.png" });
// Apple touch icon (iOS clips its own rounded corners; needs opaque bg)
await makeIcon({ size: 180, padPct: 0.10, out: "public/apple-touch-icon.png" });
