# W-004 AdMob publisher file

- Owner: Main.
- State: active.
- Request:2026-10-15 owner supplied AdMob seller row for Briarwatch.
- Own: public/app-ads.txt, relevant deployment/task evidence. Preserve site design, domain and unrelated projects.
- Acceptance: exact `google.com, pub-7033122143195326, DIRECT, f08c47fec0942fa0` row at developer website root; static build/checks, standard publishing verification and actual HTTPS bytes. File publication is distinct from AdMob crawl approval.

## Source verification
`npm run verify` passes static build/asset/metadata checks and all8 responsive/keyboard/reduced-motion/no-JavaScript browser cases in7.2s. Built `dist/app-ads.txt` exactly matches supplied public row including newline. No visual/runtime layout changes. Publish verified source todev; cloud deployment and HTTPS bytes checked next.
