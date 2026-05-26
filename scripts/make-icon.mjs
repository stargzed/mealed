// Build PNG variants of the Mealed mascot from the original artwork.
// Uses public/mascot.png (transparent bg, dark-navy body, white eye highlights)
// and recolors the dark pixels to brand yellow while keeping white highlights
// and transparency. No redrawing — the original proportions are preserved.
//
// Outputs:
//   app/icon.png         512x512  yellow rounded tile + dark navy mascot (favicon)
//   app/apple-icon.png   180x180  iOS home-screen
//   public/mascot-yellow.png      transparent bg, yellow mascot, white eyelids

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(ROOT, "..");

const SRC = path.join(PROJECT, "public", "mascot.png");
const YELLOW = { r: 0xf8, g: 0xe8, b: 0x5c };

// Pixel-replace: dark → yellow, white stays white, transparent stays transparent.
// Threshold tuned for the navy fill in the source artwork (#0A053D) vs the
// near-white eye highlights.
async function recolorYellowMascot(srcPath, outPath) {
  const img = sharp(srcPath).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(data);
  const total = info.width * info.height;
  for (let i = 0; i < total; i++) {
    const o = i * 4;
    const r = out[o];
    const g = out[o + 1];
    const b = out[o + 2];
    const a = out[o + 3];
    if (a === 0) continue;
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    if (luma > 200) {
      // Near-white → keep white (eye highlights / inner spoon glints)
      out[o] = 255;
      out[o + 1] = 255;
      out[o + 2] = 255;
    } else {
      // Dark navy → brand yellow
      out[o] = YELLOW.r;
      out[o + 1] = YELLOW.g;
      out[o + 2] = YELLOW.b;
    }
  }

  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outPath);
  console.log("wrote", outPath);
}

// Build the favicon tile: yellow rounded square + original dark mascot centered.
async function buildTileFavicon(size, outPath, { radius = 0.2, padding = 0.1 } = {}) {
  const r = Math.round(size * radius);
  const pad = Math.round(size * padding);
  const innerW = size - pad * 2;
  const innerH = size - pad * 2;

  const tileSvg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <rect x="0" y="0" width="${size}" height="${size}" rx="${r}" ry="${r}"
             fill="rgb(${YELLOW.r},${YELLOW.g},${YELLOW.b})"/>
     </svg>`,
  );

  const mascot = await sharp(SRC)
    .resize(innerW, innerH, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  await sharp(tileSvg)
    .composite([{ input: mascot, gravity: "center" }])
    .png()
    .toFile(outPath);
  console.log("wrote", outPath, `${size}x${size}`);
}

// 1. Yellow mascot on transparent — for use over dark UI / hero CTAs
await recolorYellowMascot(SRC, path.join(PROJECT, "public", "mascot-yellow.png"));

// 2. Favicon tile + apple-touch
await buildTileFavicon(512, path.join(PROJECT, "app", "icon.png"));
await buildTileFavicon(180, path.join(PROJECT, "app", "apple-icon.png"), {
  radius: 0.18,
});
