import sharp from "sharp";

const SRC = "/tmp/truck-original.png";
const OUT = "src/assets/bty-truck.png";

// Load, ensure RGBA, get raw pixels
const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const px = Buffer.from(data); // mutable copy

// Flood-fill from every edge pixel. A pixel is "background" if it's close
// enough to white. Tolerance is generous on luma (the sky/background in this
// photo varies from pure white to ~225 gray) but tight on chroma so we don't
// eat the white truck cab — the cab is bounded by red pinstripes which the
// fill will stop at.
const isBgColor = (r, g, b) => {
  // Strict near-white: only the diffuse photo sky, not the painted cab or badge.
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  return max >= 242 && sat <= 10;
};

const stack = [];
const seen = new Uint8Array(w * h);

const seed = (x, y) => {
  const idx = y * w + x;
  if (seen[idx]) return;
  const i = idx * 4;
  if (isBgColor(px[i], px[i + 1], px[i + 2])) {
    stack.push(idx);
    seen[idx] = 1;
  }
};

for (let x = 0; x < w; x++) { seed(x, 0); seed(x, h - 1); }
for (let y = 0; y < h; y++) { seed(0, y); seed(w - 1, y); }

while (stack.length) {
  const idx = stack.pop();
  const x = idx % w, y = (idx / w) | 0;
  // mark transparent
  const i = idx * 4;
  px[i + 3] = 0;
  // neighbors
  const push = (nx, ny) => {
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) return;
    const ni = ny * w + nx;
    if (seen[ni]) return;
    const pi = ni * 4;
    if (isBgColor(px[pi], px[pi + 1], px[pi + 2])) {
      seen[ni] = 1;
      stack.push(ni);
    }
  };
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}

// Feather: any opaque pixel adjacent to a transparent one and close to bg color
// gets partial alpha to soften the seam.
const out = Buffer.from(px);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idx = y * w + x;
    const i = idx * 4;
    if (px[i + 3] === 0) continue;
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max < 235 || (max - min) > 22) continue;
    // check if any 8-neighbor is transparent
    let touchesAlpha = false;
    for (let dy = -1; dy <= 1 && !touchesAlpha; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        if (px[(ny * w + nx) * 4 + 3] === 0) { touchesAlpha = true; break; }
      }
    }
    if (touchesAlpha) out[i + 3] = 128;
  }
}

// Trim to bounding box of opaque content
let minX = w, minY = h, maxX = 0, maxY = 0;
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  if (out[(y * w + x) * 4 + 3] > 0) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
}
const cw = maxX - minX + 1, ch = maxY - minY + 1;
console.log("source:", w + "x" + h, "→ trimmed:", cw + "x" + ch);

await sharp(out, { raw: { width: w, height: h, channels: 4 } })
  .extract({ left: minX, top: minY, width: cw, height: ch })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

// Verify
const v = await sharp(OUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let trans = 0, semi = 0, opaque = 0;
for (let i = 3; i < v.data.length; i += 4) {
  const a = v.data[i];
  if (a === 0) trans++; else if (a < 255) semi++; else opaque++;
}
const total = v.info.width * v.info.height;
console.log(`alpha — transparent ${(trans/total*100).toFixed(1)}% · semi ${(semi/total*100).toFixed(1)}% · opaque ${(opaque/total*100).toFixed(1)}%`);

// Edge sample
const { data: d, info: ii } = v;
const W = ii.width, H = ii.height;
let edgeOpaque = 0, edgeTotal = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  if (x === 0 || y === 0 || x === W - 1 || y === H - 1) {
    edgeTotal++;
    if (d[(y * W + x) * 4 + 3] > 10) edgeOpaque++;
  }
}
console.log(`edge opaque: ${edgeOpaque}/${edgeTotal} (expect some at bottom where truck meets edge)`);
