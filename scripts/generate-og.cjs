/**
 * Image Open Graph 1200×630 : fond marque + logo + accroche EN + crop screenshot produit.
 * Favicons PNG 32 / 192 depuis l’icône SVG.
 *
 * Usage : npm run og:generate
 */
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "og");
const outPng = path.join(outDir, "sonopilot-og.png");
const screenshotPath = path.join(
  root,
  "public",
  "images",
  "screenshots",
  "sonopilot_sc_artists.jpg"
);
const logoColorPath = path.join(
  root,
  "public",
  "images",
  "Logo",
  "logo-sonopilot-full-color.png"
);
const iconSvgPath = path.join(
  root,
  "public",
  "images",
  "Logo",
  "logo-sonopilot-only-icon-01.svg"
);

const W = 1200;
const H = 630;
const BG = { r: 244, g: 243, b: 239 };
const SHOT_W = 640;
const SHOT_H = 440;
const SHOT_LEFT = 520;
const SHOT_TOP = 88;

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function buildTextOverlayPng() {
  const line1 = "Your music deserves";
  const line2 = "to be heard.";
  const line3 = "SoundCloud · discovery · community";
  const line4 = "Free alpha · no card required";

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="480" height="280" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="42" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="34" font-weight="700" fill="#1C1D22">${escapeXml(line1)}</text>
  <text x="0" y="88" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="34" font-weight="700" fill="#E76159">${escapeXml(line2)}</text>
  <text x="0" y="138" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="20" font-weight="500" fill="#696B73">${escapeXml(line3)}</text>
  <text x="0" y="176" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="17" font-weight="500" fill="#696B73" opacity="0.9">${escapeXml(line4)}</text>
</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function buildScreenshotLayer() {
  try {
    return await sharp(screenshotPath)
      .resize(SHOT_W, SHOT_H, { fit: "cover", position: "left top" })
      .roundCorners(22)
      .png()
      .toBuffer();
  } catch {
    return sharp(screenshotPath)
      .resize(SHOT_W, SHOT_H, { fit: "cover", position: "left top" })
      .png()
      .toBuffer();
  }
}

async function main() {
  const [shotLayer, textPng, logoBuf] = await Promise.all([
    buildScreenshotLayer(),
    buildTextOverlayPng(),
    sharp(logoColorPath).resize(220, null, { fit: "inside" }).png().toBuffer(),
  ]);

  const bottomBar = await sharp({
    create: {
      width: W,
      height: 56,
      channels: 4,
      background: { r: 231, g: 97, b: 89, alpha: 0.12 },
    },
  })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: BG,
    },
  })
    .composite([
      { input: bottomBar, left: 0, top: H - 56 },
      { input: shotLayer, left: SHOT_LEFT, top: SHOT_TOP },
      { input: logoBuf, left: 56, top: 52 },
      { input: textPng, left: 56, top: 248 },
    ])
    .png()
    .toFile(outPng);

  process.stdout.write(`OK: ${outPng}\n`);

  const fav32 = path.join(root, "public", "favicon-32.png");
  const fav192 = path.join(root, "public", "favicon-192.png");

  await sharp(iconSvgPath).resize(32, 32, { fit: "contain", background: BG }).png().toFile(fav32);
  await sharp(iconSvgPath).resize(192, 192, { fit: "contain", background: BG }).png().toFile(fav192);

  process.stdout.write(`OK: ${fav32}\n`);
  process.stdout.write(`OK: ${fav192}\n`);
}

main().catch((err) => {
  process.stderr.write(String(err) + "\n");
  process.exit(1);
});
