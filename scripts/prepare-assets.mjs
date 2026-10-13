import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Offline curation only. The game checkout is always read-only.
// Requires sharp in node_modules or on NODE_PATH; it is not a website dependency.
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.argv[2] ?? path.join(root, '../legion-roguelike'));
const imageDir = path.join(root, 'public/assets/images');
const fontDir = path.join(root, 'public/assets/fonts');
await mkdir(imageDir, { recursive: true });
await mkdir(fontDir, { recursive: true });
const hash = async (file) => createHash('sha256').update(await readFile(file)).digest('hex');
const sources = new Map();
const outputs = [];
const recordSource = async (relative) => {
  if (!sources.has(relative)) sources.set(relative, await hash(path.join(source, relative)));
};
const recordImage = async (name, sourcePath, treatment) => {
  await recordSource(sourcePath);
  const file = path.join(imageDir, name);
  const meta = await sharp(file).metadata();
  outputs.push({ path: `public/assets/images/${name}`, source: sourcePath, treatment,
    width: meta.width, height: meta.height, alpha: meta.hasAlpha,
    bytes: (await stat(file)).size, sha256: await hash(file) });
};
const verifyPixels = async (expected, actual) => {
  const [a, b] = await Promise.all([expected.raw().toBuffer(), sharp(actual).raw().toBuffer()]);
  if (!a.equals(b)) throw new Error(`Decoded pixels changed: ${actual}`);
};

const scene = 'public/art/forest-arena-v1.png';
await sharp(path.join(source, scene)).webp({ quality: 88, effort: 6 })
  .toFile(path.join(imageDir, 'forest-arena.webp'));
await recordImage('forest-arena.webp', scene, 'Full image at native dimensions; WebP quality 88. Existing scene composition and art retained with delivery compression.');

await sharp(path.join(source, scene)).resize(512, 768, { kernel: 'nearest' })
  .webp({ quality: 88, effort: 6 }).toFile(path.join(imageDir, 'forest-arena-small.webp'));
await recordImage('forest-arena-small.webp', scene, 'Full image reduced 2:1 with nearest-neighbor sampling; WebP quality 88. Mobile source candidate.');

const worldMap = 'art/reference/connected-world-map-v2.png';
await sharp(path.join(source, worldMap)).resize(960, 960, { kernel: 'lanczos3' })
  .webp({ quality: 82, effort: 6 }).toFile(path.join(imageDir, 'connected-world-map.webp'));
await recordImage('connected-world-map.webp', worldMap,
  'Existing connected-world artwork, full image reduced to 960×960 with Lanczos3; WebP quality 82 for the secondary story scene.');

const fighters = [
  ['briar-huntress', 'briar-huntress-atlas-v4', 'briar-huntress-atlas-v4'],
  ['granite-golem', 'granite-golem-base-atlas-v1', 'golem-rider/granite-golem-base-atlas-v1'],
  ['thorn-knight', 'thorn-knight-atlas-v2', 'thorn-knight-atlas-v2'],
];
for (const [name, atlasName, mappingName] of fighters) {
  const imagePath = `public/art/${atlasName}.png`;
  const mapPath = `art/mappings/${mappingName}.json`;
  const mapping = JSON.parse(await readFile(path.join(source, mapPath), 'utf8'));
  const frame = mapping.atlas.frameRects['1,0'];
  const crop = { left: frame.x, top: frame.y, width: frame.width, height: frame.height };
  const target = path.join(imageDir, `${name}.png`);
  await sharp(path.join(source, imagePath)).extract(crop).png({ compressionLevel: 9 }).toFile(target);
  await verifyPixels(sharp(path.join(source, imagePath)).extract(crop), target);
  await recordSource(mapPath);
  await recordImage(`${name}.png`, imagePath,
    `Authored SW idle frame 1,0 from ${mapPath}; crop x=${frame.x}, y=${frame.y}, width=${frame.width}, height=${frame.height}. Native scale; lossless PNG, exact RGBA match.`);
}

const crest = 'public/art/king-button-v1.png';
await sharp(path.join(source, crest)).resize(192, 192, { kernel: 'lanczos3' })
  .webp({ lossless: true, effort: 6 }).toFile(path.join(imageDir, 'crest.webp'));
await recordImage('crest.webp', crest, 'Full image resized to 192×192 using Lanczos3, with original transparency; lossless WebP encoding.');

await rm(path.join(fontDir, 'cinzel-latin-700-normal.woff2'), { force: true });
for (const [family, weights] of [['cinzel', [600]], ['crimson-pro', [400, 600]]]) {
  for (const weight of weights) {
    const name = `${family}-latin-${weight}-normal.woff2`;
    const relative = `node_modules/@fontsource/${family}/files/${name}`;
    const target = path.join(fontDir, name);
    await copyFile(path.join(source, relative), target);
    await recordSource(relative);
    outputs.push({ path: `public/assets/fonts/${name}`, source: relative,
      treatment: 'Unmodified Fontsource 5.3.0 Latin normal WOFF2.',
      bytes: (await stat(target)).size, sha256: await hash(target) });
  }
  const relative = `node_modules/@fontsource/${family}/LICENSE`;
  const target = path.join(fontDir, `${family}-LICENSE.txt`);
  await copyFile(path.join(source, relative), target);
  await recordSource(relative);
  outputs.push({ path: `public/assets/fonts/${family}-LICENSE.txt`, source: relative,
    treatment: 'Unmodified SIL Open Font License 1.1 notice.',
    bytes: (await stat(target)).size, sha256: await hash(target) });
}

const total = outputs.reduce((sum, item) => sum + item.bytes, 0);
const report = `# Teaser asset provenance

Prepared from the read-only game checkout at \`${source}\`. All game imagery is existing Briarwatch art. No new imagery, recoloring, retouching, upscaling, or atlas reconstruction was introduced. No source files were modified.

## Delivery inventory

Paths below are relative to the website repository. Fonts are self-hosted; no external font requests are required.

| Output | Dimensions | Alpha | Bytes | Preparation |
| --- | --- | --- | ---: | --- |
${outputs.map((item) => `| \`${item.path}\` | ${item.width ? `${item.width}×${item.height}` : '—'} | ${item.width ? (item.alpha ? 'yes' : 'no') : '—'} | ${item.bytes} | ${item.treatment} |`).join('\n')}

Total curated payload including alternate scene size and font licenses: **${total.toLocaleString('en-US')} bytes**. The browser need only request the responsive scene candidate and font weights used by the page.

## Source SHA-256

| Read-only game source | SHA-256 |
| --- | --- |
${[...sources.entries()].map(([file, digest]) => `| \`${file}\` | \`${digest}\` |`).join('\n')}

## Output SHA-256

| Website output | SHA-256 |
| --- | --- |
${outputs.map((item) => `| \`${item.path}\` | \`${item.sha256}\` |`).join('\n')}

## Curation and validation

- Inspected the fortress clearing, world map, king button, and the selected SW idle atlas frames. The clearing supplies the hero scene; the brighter connected-world map supplies the secondary story scene.
- The huntress, granite golem and thorn knight have distinct bow, heavy stone, and antlered spear/shield silhouettes. The huntress mapping retains the game content ID \`briar-archer\`; the export uses the authored atlas name to avoid implying a new fighter.
- The granite golem uses its base form, not the gold-trimmed upgraded form. Display name: Granite Golem.
- Fighter PNGs preserve each authored crop's RGBA values exactly, including source edge transparency (alpha range 0–255). The golem retains one source corner pixel at alpha 1. All three were visually reviewed together at 180 px high on a dark background. Use \`image-rendering: pixelated\` if enlarged. Around 160–240 CSS px high is a useful range; larger presentation visibly exposes the original sprite resolution.
- Both hero scene sizes use WebP quality 88 and retain the existing composition. The full scene keeps native dimensions; the small scene starts from a 2:1 nearest-neighbor reduction. Scenic compression is lossy; only fighter crops claim exact source pixel equality. Both hero sizes were visually reviewed for foliage, torch and stone detail after encoding. The crest is a display-size reduction, not a newly authored emblem.
- Cinzel and Crimson Pro are Fontsource 5.3.0 package copies. Their SIL OFL 1.1 notices are included beside the font files.
- Main owns final browser checks at phone/desktop widths. These asset checks do not claim integrated browser approval.

## Offline reproduction

\`scripts/prepare-assets.mjs\` reads the source checkout and writes only the website asset directory and this document. It requires Node.js and Sharp available through local tooling (\`NODE_PATH\` is supported); neither is a website runtime dependency. Run \`node scripts/prepare-assets.mjs /path/to/legion-roguelike\`. Fighter pixel assertions run during preparation; the script fails if their lossless crop pixels differ. The unused Cinzel 700 export is removed to retain only the three font weights used by the website.
`;
await writeFile(path.join(root, 'docs/Assets.md'), report);
console.log(JSON.stringify({ images: outputs.filter((item) => item.width), totalBytes: total }, null, 2));
