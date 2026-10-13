# Briarwatch

Official teaser for **Briarwatch**, in development at **Mio/i00nqw Game Studios**.

Target: https://briarwatch.com · GitHub Pages: https://github.com/i00nqw/briarwatch-site

## Work locally

Node24 or newer. Run `npm ci`, then `npm run build` and `npm run preview` (http://127.0.0.1:4317).

`npm run verify` builds the static site, checks its assets/metadata and runs the responsive browser suite. First install the test browser with `npx playwright install chromium`.

Push reviewed changes to `dev`; GitHub Actions verifies before deploying `dist/`. No runtime framework, external fonts, analytics, signup collection or unavailable store links.

[Design](docs/Design.md) · [Assets](docs/Assets.md) · [Deployment](docs/Deployment.md) · [Verification](docs/Verification.md) · [Work](tasks/README.md)

Original game art and branding remain the property of Mio/i00nqw Game Studios. Font licenses are included alongside the local font files. No license to redistribute the game's art is granted by publication of this repository.
