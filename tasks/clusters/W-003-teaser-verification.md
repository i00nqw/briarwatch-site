# W-003 Teaser verification

State: done. Owner: verification reviewer.
Owns: tests/site.spec.mjs, scripts/check.mjs, docs/Verification.md. Main owns Playwright configuration, build and browser execution.
Goal: meaningful small suite for the public teaser. Check required content/links, local assets + no broken requests, mobile overflow at320/390 and desktop1440, keyboard navigation, no-JS content and reduced-motion support. Confirm platform announcements are not nonfunctional store buttons. No external network dependency in tests.
Review HTML/CSS copy/readability and report concrete concerns to Main. Avoid implementation-mirroring tests. No commits/pushes or heavy browser runs.

Evidence: eight browser cases and static production check passed locally; [Verification](../../docs/Verification.md) records scope and limitations.
