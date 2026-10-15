# W-004 AdMob publisher file

- Owner: Main.
- State: done.
- Request:2026-10-15 owner supplied AdMob seller row for Briarwatch.
- Own: public/app-ads.txt, relevant deployment/task evidence. Preserve site design, domain and unrelated projects.
- Acceptance: exact `google.com, pub-7033122143195326, DIRECT, f08c47fec0942fa0` row at developer website root; static build/checks, standard publishing verification and actual HTTPS bytes. File publication is distinct from AdMob crawl approval.

## Source verification
`npm run verify` passes static build/asset/metadata checks and all8 responsive/keyboard/reduced-motion/no-JavaScript browser cases in7.2s. Built `dist/app-ads.txt` exactly matches supplied public row including newline. No visual/runtime layout changes. Publish verified source todev; cloud deployment and HTTPS bytes checked next.

## Delivered
Source ddb57a41e3e936d4cc0869d85282f338b5b9e97c is confirmed onremote dev; [Pages38694450466](https://github.com/i00nqw/briarwatch-site/actions/runs/38694450466) passes build/static/browser/deploy. Actual HTTPS200 response at https://briarwatch.com/app-ads.txt exactly matches source bytes/newline using normal TLS verification. Publisher file is live; AdMob crawl/account approval remains external and unverified. This closure changes documentation only.
