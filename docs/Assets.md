# Teaser asset provenance

Prepared from the read-only game checkout at `/Users/iuncuion/Code/le_game_2/legion-roguelike`. All game imagery is existing Briarwatch art. No new imagery, recoloring, retouching, upscaling, or atlas reconstruction was introduced. No source files were modified.

## Delivery inventory

Paths below are relative to the website repository. Fonts are self-hosted; no external font requests are required.

| Output | Dimensions | Alpha | Bytes | Preparation |
| --- | --- | --- | ---: | --- |
| `public/assets/images/forest-arena.webp` | 1024×1536 | no | 384978 | Full image at native dimensions; WebP quality 88. Existing scene composition and art retained with delivery compression. |
| `public/assets/images/forest-arena-small.webp` | 512×768 | no | 150136 | Full image reduced 2:1 with nearest-neighbor sampling; WebP quality 88. Mobile source candidate. |
| `public/assets/images/connected-world-map.webp` | 960×960 | no | 377318 | Existing connected-world artwork, full image reduced to 960×960 with Lanczos3; WebP quality 82 for the secondary story scene. |
| `public/assets/images/briar-huntress.png` | 125×162 | yes | 40502 | Authored SW idle frame 1,0 from art/mappings/briar-huntress-atlas-v4.json; crop x=215, y=38, width=125, height=162. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/granite-golem.png` | 137×162 | yes | 53525 | Authored SW idle frame 1,0 from art/mappings/golem-rider/granite-golem-base-atlas-v1.json; crop x=203, y=31, width=137, height=162. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/thorn-knight.png` | 115×141 | yes | 36055 | Authored SW idle frame 1,0 from art/mappings/thorn-knight-atlas-v2.json; crop x=205, y=77, width=115, height=141. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/crest.webp` | 192×192 | yes | 45682 | Full image resized to 192×192 using Lanczos3, with original transparency; lossless WebP encoding. |
| `public/assets/fonts/cinzel-latin-600-normal.woff2` | — | — | 15204 | Unmodified Fontsource 5.3.0 Latin normal WOFF2. |
| `public/assets/fonts/cinzel-LICENSE.txt` | — | — | 4382 | Unmodified SIL Open Font License 1.1 notice. |
| `public/assets/fonts/crimson-pro-latin-400-normal.woff2` | — | — | 18336 | Unmodified Fontsource 5.3.0 Latin normal WOFF2. |
| `public/assets/fonts/crimson-pro-latin-600-normal.woff2` | — | — | 18776 | Unmodified Fontsource 5.3.0 Latin normal WOFF2. |
| `public/assets/fonts/crimson-pro-LICENSE.txt` | — | — | 4511 | Unmodified SIL Open Font License 1.1 notice. |

Total curated payload including alternate scene size and font licenses: **1,149,405 bytes**. The browser need only request the responsive scene candidate and font weights used by the page.

## Source SHA-256

| Read-only game source | SHA-256 |
| --- | --- |
| `public/art/forest-arena-v1.png` | `0abe450bd239b20ef81088f6cd21f8b15e69c649666bb2fa26983eb58ba499aa` |
| `art/reference/connected-world-map-v2.png` | `4cb2b75bb0688246c35e2e5e056578f64c639c907e9f1843087c17596203c742` |
| `art/mappings/briar-huntress-atlas-v4.json` | `5b56555f570c6f41d988bbddde25cab25f2f6c1abca7a786af4d3745e0770b42` |
| `public/art/briar-huntress-atlas-v4.png` | `35e59b9c009b16ee34044de270051873985c4ff90a0263b42c53ce77a8f4eaec` |
| `art/mappings/golem-rider/granite-golem-base-atlas-v1.json` | `77429d99483c280353b3f0d442857769c33f42328bfbb686e184f00737531246` |
| `public/art/granite-golem-base-atlas-v1.png` | `afb1ed19320ef502331304ad4890e693eb164361e0144e2569e30644de6fc33e` |
| `art/mappings/thorn-knight-atlas-v2.json` | `3a4ec6478ced33c689b34a3adc8b41a7810826ecc8f470d67abd7b52ba2a8ad9` |
| `public/art/thorn-knight-atlas-v2.png` | `515737f364e6bc270fd9405e6ff0d026657016c7b4dc016339cd49745738a40d` |
| `public/art/king-button-v1.png` | `19b2889f893070be51fad045c0fde2c972a3ed6d77f5f51451810a9e244fbd73` |
| `node_modules/@fontsource/cinzel/files/cinzel-latin-600-normal.woff2` | `61efc27ceb7d08bb841652fa8979c0b6833b92548b7f9544c07968a6c02f28e4` |
| `node_modules/@fontsource/cinzel/LICENSE` | `f5a242cf68ad6ebd0603b3359a74c593ca080318a681035be5296ba2c6b04ae6` |
| `node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-400-normal.woff2` | `d2a3a146387d91b8d476d508849dd1d93a3cbde85d1e0d303e3d5c970726a703` |
| `node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-600-normal.woff2` | `2d8f33b2352a04f3ed3af648df66d053c00d5c3ccbe793797273509824a5044a` |
| `node_modules/@fontsource/crimson-pro/LICENSE` | `a36998c273ee904e6303921fce9da2fe49c96b42cfb0bc1b70de9c3b58546a41` |

## Output SHA-256

| Website output | SHA-256 |
| --- | --- |
| `public/assets/images/forest-arena.webp` | `f66785100a761a8e9c87f9c571ddf00c92123e14dea43dea75461b69e8b89c72` |
| `public/assets/images/forest-arena-small.webp` | `a8e765d63ae8a3d2f87f7349ecdf1de83312cb23ea13b3fd7a712ac1997f5f4b` |
| `public/assets/images/connected-world-map.webp` | `0feca6f60ef2a165974b6962751ce3ec5d39f652379b1299b5152b93e5df844a` |
| `public/assets/images/briar-huntress.png` | `9a5e7c2951239c95811d7e114997a36302f7a300753518ed26288e86fffbaaa2` |
| `public/assets/images/granite-golem.png` | `1e80cc82ba5479f77a243eaece0718f9e4147a3462acff2ac1e7e94237561fcd` |
| `public/assets/images/thorn-knight.png` | `b3fdbf54f3624b415a65cd41c1001a68d98f75a95c4765f9a325e5e2049bc1c5` |
| `public/assets/images/crest.webp` | `d3c6e5996d9c01947c59cb579826dcb87c8ef4bde2ce5d6e307b58524836f8a1` |
| `public/assets/fonts/cinzel-latin-600-normal.woff2` | `61efc27ceb7d08bb841652fa8979c0b6833b92548b7f9544c07968a6c02f28e4` |
| `public/assets/fonts/cinzel-LICENSE.txt` | `f5a242cf68ad6ebd0603b3359a74c593ca080318a681035be5296ba2c6b04ae6` |
| `public/assets/fonts/crimson-pro-latin-400-normal.woff2` | `d2a3a146387d91b8d476d508849dd1d93a3cbde85d1e0d303e3d5c970726a703` |
| `public/assets/fonts/crimson-pro-latin-600-normal.woff2` | `2d8f33b2352a04f3ed3af648df66d053c00d5c3ccbe793797273509824a5044a` |
| `public/assets/fonts/crimson-pro-LICENSE.txt` | `a36998c273ee904e6303921fce9da2fe49c96b42cfb0bc1b70de9c3b58546a41` |

## Curation and validation

- Inspected the fortress clearing, world map, king button, and the selected SW idle atlas frames. The clearing supplies the hero scene; the brighter connected-world map supplies the secondary story scene.
- The huntress, granite golem and thorn knight have distinct bow, heavy stone, and antlered spear/shield silhouettes. The huntress mapping retains the game content ID `briar-archer`; the export uses the authored atlas name to avoid implying a new fighter.
- The granite golem uses its base form, not the gold-trimmed upgraded form. Display name: Granite Golem.
- Fighter PNGs preserve each authored crop's RGBA values exactly, including source edge transparency (alpha range 0–255). The golem retains one source corner pixel at alpha 1. All three were visually reviewed together at 180 px high on a dark background. Use `image-rendering: pixelated` if enlarged. Around 160–240 CSS px high is a useful range; larger presentation visibly exposes the original sprite resolution.
- Both hero scene sizes use WebP quality 88 and retain the existing composition. The full scene keeps native dimensions; the small scene starts from a 2:1 nearest-neighbor reduction. Scenic compression is lossy; only fighter crops claim exact source pixel equality. Both hero sizes were visually reviewed for foliage, torch and stone detail after encoding. The crest is a display-size reduction, not a newly authored emblem.
- Cinzel and Crimson Pro are Fontsource 5.3.0 package copies. Their SIL OFL 1.1 notices are included beside the font files.
- Main owns final browser checks at phone/desktop widths. These asset checks do not claim integrated browser approval.

## Offline reproduction

`scripts/prepare-assets.mjs` reads the source checkout and writes only the website asset directory and this document. It requires Node.js and Sharp available through local tooling (`NODE_PATH` is supported); neither is a website runtime dependency. Run `node scripts/prepare-assets.mjs /path/to/legion-roguelike`. Fighter pixel assertions run during preparation; the script fails if their lossless crop pixels differ. The unused Cinzel 700 export is removed to retain only the three font weights used by the website.

## Sharing preview

`public/assets/social-preview.jpg` is a 1200×630 JPEG composed from the same original fortress background and local Cinzel type. `node scripts/social-card.mjs` reproduces it with Playwright. It contains the title, premise and planned platforms; no concept image is represented as a gameplay screenshot.
