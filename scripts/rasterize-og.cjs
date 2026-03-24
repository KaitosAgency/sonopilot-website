/* Rasterise public/og/sonopilot-og.svg -> sonopilot-og.png pour Open Graph (réseaux sociaux). */
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const input = path.join(root, "public", "og", "sonopilot-og.svg");
const output = path.join(root, "public", "og", "sonopilot-og.png");

sharp(input)
  .png()
  .toFile(output)
  .then(() => {
    process.stdout.write(`OK: ${output}\n`);
  })
  .catch((err) => {
    process.stderr.write(String(err) + "\n");
    process.exit(1);
  });
