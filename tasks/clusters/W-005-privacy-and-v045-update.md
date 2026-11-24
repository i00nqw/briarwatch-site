# W-005 Privacy policy and v0.3.45 website alignment

- Owner: Main.
- State: done.
- Request: 2026-11-24 owner requested adding a Play Store & iOS App Store privacy policy hosted at `briarwatch.com/privacy` (covering future Google Analytics and Google Ads data collection) and updating the website to align with the latest Briarwatch game version (v0.3.45).
- Owns: `public/privacy/index.html`, `public/index.html`, `public/styles.css`, `public/sitemap.xml`, curated v0.3.45 assets, `scripts/prepare-assets.mjs`, `scripts/check.mjs`, `tests/site.spec.mjs`, and documentation/deployment evidence.
- Acceptance: Play Store and iOS App Store ready Privacy Policy live at `https://briarwatch.com/privacy` (and `/privacy/`), disclosing Google Analytics / Firebase, Google Ads / Google AdMob, Google UMP consent, iOS ATT, local saves, and `ioniuncu@gmail.com`; homepage updated with curated original v0.3.45 artwork and accurate game scope; static checks and all 9 browser cases pass locally and in GitHub Actions; live HTTPS responses verified.

## Source verification

`npm run verify` passes build, static production checks (including privacy disclosures, canonical URLs, sitemap, cross-page anchors, and external link allowlist), and 9/9 Playwright Chromium tests in 9.0s. Full-page screenshots of `/` and `/privacy/` at 320px, 390px, and 1440px were inspected.

## Delivered

Source `4c8f75d` is pushed to `origin/dev` and deployed by [run 45430718248](https://github.com/i00nqw/briarwatch-site/actions/runs/45430718248). Live HTTPS responses at `https://briarwatch.com/`, `https://briarwatch.com/privacy` (-> `/privacy/`), `https://briarwatch.com/sitemap.xml`, `https://briarwatch.com/app-ads.txt`, and all curated v0.3.45 image assets return HTTP 200 and match `dist/` byte-for-byte.
