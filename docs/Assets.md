# Website asset provenance

Prepared from the read-only Briarwatch game checkouts (`/Users/iuncuion/Code/le_game_2/legion-roguelike` for initial W-001 assets and `/Users/iuncuion/Code/le_game_2/legion-roguelike-content-checkpoint` at v0.3.45 for the updated Home artwork, Star Arcanist, and boss showcases). All game imagery is existing Briarwatch art. No new imagery, recoloring, retouching, upscaling, or atlas reconstruction was introduced. No source files were modified.

## Delivery inventory

Paths below are relative to the website repository. Fonts are self-hosted; no external font requests are required.

| Output | Dimensions | Alpha | Bytes | Preparation |
| --- | --- | --- | ---: | --- |
| `public/assets/images/forest-arena.webp` | 1024×1536 | no | 384978 | Full image at native dimensions; WebP quality 88. Existing scene composition and art retained with delivery compression. |
| `public/assets/images/forest-arena-small.webp` | 512×768 | no | 150136 | Full image reduced 2:1 with nearest-neighbor sampling; WebP quality 88. Mobile source candidate. |
| `public/assets/images/forest-home.webp` | 800×1200 | no | 95594 | Existing v0.3.45 Home screen artwork (`public/art/c335-forest-home-v1.png`), reduced to 800×1200 with Lanczos3; WebP quality 85 for the story showcase. Replaces the earlier concept world map. |
| `public/assets/images/briar-huntress.png` | 125×162 | yes | 40502 | Authored SW idle frame 1,0 from `art/mappings/briar-huntress-atlas-v4.json`; crop x=215, y=38, width=125, height=162. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/granite-golem.png` | 137×162 | yes | 53525 | Authored SW idle frame 1,0 from `art/mappings/golem-rider/granite-golem-base-atlas-v1.json`; crop x=203, y=31, width=137, height=162. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/thorn-knight.png` | 115×141 | yes | 36055 | Authored SW idle frame 1,0 from `art/mappings/thorn-knight-atlas-v2.json`; crop x=205, y=77, width=115, height=141. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/star-arcanist.png` | 113×140 | yes | 34840 | Authored SW idle frame 1,0 from `art/mappings/star-arcanist-atlas-v2.json`; crop x=213, y=72, width=113, height=140. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/blightmother.png` | 116×117 | yes | 20365 | Authored SW idle frame 1,0 from `art/mappings/c350/c350-the-blightmother-atlas-v1.json`; crop x=213, y=48, width=116, height=117. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/frostvein-wyrm.png` | 117×115 | yes | 23353 | Authored SW idle frame 1,0 from `art/mappings/c350/c350-the-frostvein-wyrm-atlas-v1.json`; crop x=213, y=50, width=117, height=115. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/ashen-sovereign.png` | 117×129 | yes | 22021 | Authored SW idle frame 1,0 from `art/mappings/c350/c350-the-ashen-sovereign-atlas-v1.json`; crop x=213, y=36, width=117, height=129. Native scale; lossless PNG, exact RGBA match. |
| `public/assets/images/crest.webp` | 192×192 | yes | 45682 | Full image resized to 192×192 using Lanczos3, with original transparency; lossless WebP encoding. |
| `public/assets/fonts/cinzel-latin-600-normal.woff2` | — | — | 15204 | Unmodified Fontsource 5.3.0 Latin normal WOFF2. |
| `public/assets/fonts/cinzel-LICENSE.txt` | — | — | 4382 | Unmodified SIL Open Font License 1.1 notice. |
| `public/assets/fonts/crimson-pro-latin-400-normal.woff2` | — | — | 18336 | Unmodified Fontsource 5.3.0 Latin normal WOFF2. |
| `public/assets/fonts/crimson-pro-latin-600-normal.woff2` | — | — | 18776 | Unmodified Fontsource 5.3.0 Latin normal WOFF2. |
| `public/assets/fonts/crimson-pro-LICENSE.txt` | — | — | 4511 | Unmodified SIL Open Font License 1.1 notice. |

Total curated payload including alternate scene size and font licenses: **968,260 bytes**. The browser need only request the responsive scene candidate and font weights used by the page.

## Source SHA-256

| Read-only game source | SHA-256 |
| --- | --- |
| `public/art/forest-arena-v1.png` (W-001) | `0abe450bd239b20ef81088f6cd21f8b15e69c649666bb2fa26983eb58ba499aa` |
| `public/art/c335-forest-home-v1.png` (v0.3.45) | `41c7538b407ed8c78df2e6c7ed6ca73beaaac65680b197db89676ac73af03261` |
| `art/mappings/briar-huntress-atlas-v4.json` | `5b56555f570c6f41d988bbddde25cab25f2f6c1abca7a786af4d3745e0770b42` |
| `public/art/briar-huntress-atlas-v4.png` | `35e59b9c009b16ee34044de270051873985c4ff90a0263b42c53ce77a8f4eaec` |
| `art/mappings/golem-rider/granite-golem-base-atlas-v1.json` | `77429d99483c280353b3f0d442857769c33f42328bfbb686e184f00737531246` |
| `public/art/granite-golem-base-atlas-v1.png` (W-001) | `afb1ed19320ef502331304ad4890e693eb164361e0144e2569e30644de6fc33e` |
| `art/mappings/thorn-knight-atlas-v2.json` | `3a4ec6478ced33c689b34a3adc8b41a7810826ecc8f470d67abd7b52ba2a8ad9` |
| `public/art/thorn-knight-atlas-v2.png` | `515737f364e6bc270fd9405e6ff0d026657016c7b4dc016339cd49745738a40d` |
| `art/mappings/star-arcanist-atlas-v2.json` (v0.3.45) | `bbc429f86dcf5ab838e2f1c013282fa5a4db20cdeff964e7316317b0e921d1fb` |
| `public/art/star-arcanist-atlas-v2.png` (v0.3.45) | `15ab22189544ff1d51cea0ac5460d0124e53d7717dd39235ea318f1a4ed15048` |
| `art/mappings/c350/c350-the-blightmother-atlas-v1.json` (v0.3.45) | `fafb42f92a9de4160e7e7750489f76e5dead83adc32caf3a9f88ae35633ee1fc` |
| `public/art/c350-the-blightmother-atlas-v1.png` (v0.3.45) | `d77085783067022252d3ac5644e0ec1507f3423c9be67aaf6927cc97112fd76d` |
| `art/mappings/c350/c350-the-frostvein-wyrm-atlas-v1.json` (v0.3.45) | `4d2d55d8aabf8f2b1a85064c0b4aaa6cf95ca09292cb1398c8750db0d96700b2` |
| `public/art/c350-the-frostvein-wyrm-atlas-v1.png` (v0.3.45) | `08c66d15463c9e37b4ecfe6933b12908b141570a5881e8090c842a0444290b84` |
| `art/mappings/c350/c350-the-ashen-sovereign-atlas-v1.json` (v0.3.45) | `d6c2e516da5b05532f2f27f870da241a308d2410eebde8e8b819ea0c689a9df7` |
| `public/art/c350-the-ashen-sovereign-atlas-v1.png` (v0.3.45) | `9ef3654b5dd45f9ee8e973f97eacefdfd9e9b00563285ac2dc6c0418c6bbb8e0` |
| `public/art/king-button-v1.png` (W-001) | `19b2889f893070be51fad045c0fde2c972a3ed6d77f5f51451810a9e244fbd73` |
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
| `public/assets/images/forest-home.webp` | `3592959fb8b923163d4eb0b62a428595f0197b51f35f5c2b65961d5bb2d3b09a` |
| `public/assets/images/briar-huntress.png` | `9a5e7c2951239c95811d7e114997a36302f7a300753518ed26288e86fffbaaa2` |
| `public/assets/images/granite-golem.png` | `1e80cc82ba5479f77a243eaece0718f9e4147a3462acff2ac1e7e94237561fcd` |
| `public/assets/images/thorn-knight.png` | `b3fdbf54f3624b415a65cd41c1001a68d98f75a95c4765f9a325e5e2049bc1c5` |
| `public/assets/images/star-arcanist.png` | `8aa8ccc14932fe371d60f30505db6fc9b4e254764787e201dce14f244459d48b` |
| `public/assets/images/blightmother.png` | `5653812a95042700dccd7e1c7957745f1f6a22a80bc3c6831a1b6bd7ec5a2573` |
| `public/assets/images/frostvein-wyrm.png` | `0e309db9809f731aa7f85095774ca8993e97c33ce595fce51fac21899a804a0b` |
| `public/assets/images/ashen-sovereign.png` | `bc1280d9929061638e53a5fac44794e4f35c8cd955127188740334cef793bdee` |
| `public/assets/images/crest.webp` | `d3c6e5996d9c01947c59cb579826dcb87c8ef4bde2ce5d6e307b58524836f8a1` |
| `public/assets/fonts/cinzel-latin-600-normal.woff2` | `61efc27ceb7d08bb841652fa8979c0b6833b92548b7f9544c07968a6c02f28e4` |
| `public/assets/fonts/cinzel-LICENSE.txt` | `f5a242cf68ad6ebd0603b3359a74c593ca080318a681035be5296ba2c6b04ae6` |
| `public/assets/fonts/crimson-pro-latin-400-normal.woff2` | `d2a3a146387d91b8d476d508849dd1d93a3cbde85d1e0d303e3d5c970726a703` |
| `public/assets/fonts/crimson-pro-latin-600-normal.woff2` | `2d8f33b2352a04f3ed3af648df66d053c00d5c3ccbe793797273509824a5044a` |
| `public/assets/fonts/crimson-pro-LICENSE.txt` | `a36998c273ee904e6303921fce9da2fe49c96b42cfb0bc1b70de9c3b58546a41` |

## Curation and validation

- Inspected the fortress clearing, v0.3.45 woodland Home scene (`c335-forest-home-v1.png`), king button crest, four defender SW idle frames, and three v0.3.45 boss SW idle frames. The clearing supplies the hero scene; the woodland watch Home painting replaces the retired early concept map in the story showcase.
- Briar Huntress, Granite Golem, Thorn Knight, and Star Arcanist represent ranged, heavy stone tank, frontline spear/shield, and arcane spellcasting silhouettes from the 60-fighter roster.
- The Blightmother (Wave 21), The Frostvein Wyrm (Wave 35), and The Ashen Sovereign (Wave 42) showcase three distinct silhouettes from the six-boss campaign introduced in v0.3.45.
- All fighter and boss PNGs preserve each authored crop's RGBA values exactly, verified pixel-for-pixel against the source atlas crop. Use `image-rendering: pixelated` when scaled.
- Cinzel and Crimson Pro are Fontsource 5.3.0 package copies with their SIL OFL 1.1 notices alongside the font files.

## Offline reproduction

`scripts/prepare-assets.mjs` reads a read-only Briarwatch checkout and writes only the website asset directory and provenance output. The v0.3.45 image additions (`forest-home.webp`, `star-arcanist.png`, `blightmother.png`, `frostvein-wyrm.png`, `ashen-sovereign.png`) were extracted with Pillow 12.3.0 + `cwebp` and verified for exact RGBA crop equality.

## Sharing preview

`public/assets/social-preview.jpg` is a 1200×630 JPEG composed from the original fortress background and local Cinzel type. `node scripts/social-card.mjs` reproduces it with Playwright.
