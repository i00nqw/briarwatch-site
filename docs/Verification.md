# Teaser verification

Verification scope: the standalone static Briarwatch teaser and its local production bundle. The game checkout is read-only. Main owns building, browser execution, final visual review and publishing.

## Commands and coverage

- `npm run build`: copies `public/` to `dist/` for the production bundle.
- `npm run check`: rejects missing or stale build files, missing local HTML/CSS/social references, external asset dependencies, broken fragment links, missing image alternatives, invalid structured game identity, and incorrect canonical/domain/sitemap files.
- `npm test`: runs eight Chromium cases against the production bundle served on port 4317. External requests are blocked; tests do not depend on the live Backpack Ascendancy site or store services.
- `npm run verify`: builds, runs the static checks, then runs the browser suite.

The eight browser cases cover:

1. Game premise, development status, the three planned platforms, their presentation as announcements, working internal anchors, studio credit and the Backpack Ascendancy destination.
2. Loaded artwork and local fonts, successful social-preview response, no failed page requests and no unhandled script errors.
3. A 320 × 740 viewport: no horizontal overflow or clipped text, readable hero geometry and an in-bounds final link.
4. The same layout checks at 390 × 844.
5. The same layout checks at 1440 × 1000.
6. Keyboard skip-link behavior, document-order navigation and visible focus on every link.
7. Reduced-motion behavior: no running animation, transition durations or smooth scrolling.
8. Core content and working section navigation with JavaScript disabled.

## Verified locally — 2026-10-13

`npm run verify` passed: production copy, static references/metadata check and **eight browser cases**, one worker (6.7s). Original art/font/social files decode with no missing requests. The hero source naming mismatch and small-screen word spacing were corrected before delivery; mobile fighter headings are 13–14px.

Main reviewed the hero and story in the in-app browser at desktop and 390px width, plus 320/390/1440 full-page captures. The composition uses the original forest gate, clear cream typography, muted gold details and readable mobile copy. The world image is original game artwork, explicitly labelled as in-development artwork. Geometry tests prove no overflow or hero-navigation collision; they do not constitute screen-reader or physical-device certification.

Screenshots live in ignored Playwright output. CI repeats the same gate before publication. Deployment and domain evidence is in [[Deployment]].

## AdMob seller file —2026-10-15

W-004 exact seller row builds unchanged at the site root. Full local `npm run verify` passes build/static checks and8/8 browser cases (7.2s). Only public/app-ads.txt and task/deployment evidence change; no page visuals or external resources added. HTTPS publication check follows deployment.
