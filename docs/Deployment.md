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
