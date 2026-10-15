# Deployment

Repository: https://github.com/i00nqw/briarwatch-site. Source/deployment branch: `dev`. Independent from the existing Backpack Ascendancy Pages repository.

GitHub Actions builds/checks/tests the page and deploys only a passing `dist/` artifact. The site uses relative local asset paths; canonical, social and sitemap URLs use https://briarwatch.com/.

## Domain

Set GitHub Pages custom domain to `briarwatch.com` before changing DNS. GoDaddy hosted the initial parking A record. Preserve nameservers, domain-connect and mail records.

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | i00nqw.github.io |

[GitHub custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). HTTPS enforcement becomes available after GitHub issues the certificate. DNS publication, certificate state and final deployed commit are recorded after the first release.

## Published — 2026-10-13

Source `607cec04` is published by [run 38404889083](https://github.com/i00nqw/briarwatch-site/actions/runs/38404889083). The workflow passed the build/static checks and all eight browser cases, then deployed the verified artifact. The independent public repository's default/source branch is `dev`.

GoDaddy now serves the four apex A records and `www` CNAME above. Both authoritative nameservers and GitHub Pages DNS health confirm the intended records, HTTPS eligibility and no conflicting IP/CAA records. Nameservers, domain-connect and mail policy records are preserved.

GitHub initially retained an unprovisioned certificate after DNS changed. Removing and re-adding the same custom domain once restarted issuance, following [GitHub's provisioning guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https). The certificate is approved for `briarwatch.com` and `www.briarwatch.com`, expires 2027-01-11, and HTTPS enforcement is enabled.

At 13:42 UTC, normal certificate verification passes for https://briarwatch.com/; all 20 deployed files return 200 and exactly match local `dist` SHA-256 hashes. HTTPS `www` redirects to the apex. Main reviewed the live HTTPS page in the in-app browser. An HTTP edge still returned cached 200 immediately after enabling enforcement; HTTP redirect propagation was still pending in that cached edge at 13:44 UTC, while direct HTTPS and the enabled enforcement setting were verified. No certificate bypass was used.

The existing https://backpackascendancy.com/ continues to return 200. Its repository and Pages settings were not changed. The final teaser CTA opens that existing site.

## AdMob seller file —2026-10-15

W-004 adds the owner's exact public seller row at `/app-ads.txt`. The static build copies it unchanged to the custom-domain root. Deployment/actual HTTPS verification are pending; file presence does not prove AdMob crawler approval. Google identifies this domain from the developer website in the app's store listing: [official setup](https://support.google.com/admob/answer/9363762?hl=en).
