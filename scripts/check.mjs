import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const root = resolve("dist");
const production = new URL("https://briarwatch.com/");
const privacyUrl = new URL("privacy/", production);
const allowedExternalLinks = new Set([
  "https://backpackascendancy.com/",
  "https://policies.google.com/privacy",
  "https://policies.google.com/technologies/partner-sites",
  "https://myadcenter.google.com/",
  "https://www.apple.com/legal/privacy/",
  "mailto:ioniuncu@gmail.com",
]);
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const attributesOf = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(resolve(directory, entry.name))
          : resolve(directory, entry.name),
      ),
    )
  ).flat();
}
async function localReference(value, source, { asset = false } = {}) {
  if (!value || value.startsWith("#")) return;
  const url = new URL(value, new URL(relative(root, source), production));
  if (url.origin !== production.origin) {
    check(
      !asset && allowedExternalLinks.has(url.href),
      `${relative(root, source)} has an unexpected external ${asset ? "asset" : "link"}: ${value}`,
    );
    return;
  }
  const target = resolve(root, `.${decodeURIComponent(url.pathname)}`);
  check(
    target === root || target.startsWith(root + sep),
    `Reference escapes the build: ${value}`,
  );
  if (target !== root && !target.startsWith(root + sep)) return;
  try {
    const info = await stat(target);
    const resolvedFile = info.isDirectory()
      ? resolve(target, "index.html")
      : target;
    const bytes = await readFile(resolvedFile);
    check(bytes.length > 0, `Empty referenced file: ${value}`);
    if (url.hash && resolvedFile.endsWith(".html")) {
      const targetHtml = bytes.toString("utf8");
      const hashId = decodeURIComponent(url.hash.slice(1));
      const targetIds = [...targetHtml.matchAll(/\bid="([^"]+)"/g)].map(
        (match) => match[1],
      );
      check(
        targetIds.includes(hashId),
        `${relative(root, source)} has a broken cross-page anchor: ${value}`,
      );
    }
  } catch {
    failures.push(
      `Missing production reference in ${relative(root, source)}: ${value}`,
    );
  }
}

try {
  const sourceFiles = await files(resolve("public"));
  for (const file of sourceFiles) {
    const path = relative(resolve("public"), file);
    try {
      assert.deepEqual(
        await readFile(resolve(root, path)),
        await readFile(file),
      );
    } catch {
      failures.push(`Build is missing or stale: ${path}; run npm run build`);
    }
  }
  const outputFiles = await files(root);
  for (const file of outputFiles.filter((file) =>
    /\.(?:html|css)$/.test(file),
  )) {
    const content = await readFile(file, "utf8");
    if (file.endsWith(".html")) {
      check(
        /<html\b[^>]*\blang="en"/i.test(content),
        `${relative(root, file)} is missing its document language`,
      );
      check(
        /<meta\b[^>]*\bname="viewport"/i.test(content),
        `${relative(root, file)} is missing its mobile viewport`,
      );
      const ids = [...content.matchAll(/\bid="([^"]+)"/g)].map(
        (match) => match[1],
      );
      check(
        ids.length === new Set(ids).size,
        `${relative(root, file)} contains duplicate IDs`,
      );
      for (const tag of content.matchAll(/<([a-z][\w-]*)\b[^>]*>/gi)) {
        const name = tag[1].toLowerCase();
        const attributes = attributesOf(tag[0]);
        for (const attribute of ["src", "href", "poster"]) {
          const value = attributes[attribute];
          if (!value) continue;
          if (value.startsWith("#"))
            check(
              ids.includes(decodeURIComponent(value.slice(1))),
              `${relative(root, file)} has a broken anchor: ${value}`,
            );
          await localReference(value, file, {
            asset:
              attribute !== "href" ||
              (name === "link" && attributes.rel !== "canonical"),
          });
        }
        for (const candidate of (attributes.srcset || "")
          .split(",")
          .filter(Boolean)) {
          await localReference(candidate.trim().split(/\s+/)[0], file, {
            asset: true,
          });
        }
        if (name === "img")
          check(
            Object.hasOwn(attributes, "alt"),
            `Image in ${relative(root, file)} is missing an alt attribute`,
          );
        if (
          name === "meta" &&
          ["og:image", "twitter:image"].includes(
            attributes.property || attributes.name,
          )
        ) {
          await localReference(attributes.content, file, { asset: true });
        }
      }
    }
    for (const match of content.matchAll(
      /url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g,
    )) {
      await localReference(match[1], file, { asset: true });
    }
  }
  const html = await readFile(resolve(root, "index.html"), "utf8");
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => attributesOf(match[0]))
    .filter((attributes) => attributes.rel === "canonical");
  check(
    canonical.length === 1 && canonical[0].href === production.href,
    "Canonical URL must use the production domain",
  );
  check(
    html.includes('href="./privacy/"'),
    "Homepage must link to the Privacy Policy route",
  );
  const jsonLd = html.match(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
  );
  check(Boolean(jsonLd), "Structured game metadata is missing");
  if (jsonLd) {
    const game = JSON.parse(jsonLd[1]);
    check(
      game["@type"] === "VideoGame" &&
        game.name === "Briarwatch" &&
        game.url === production.href,
      "Structured game identity is incorrect",
    );
  }
  const privacyHtml = await readFile(
    resolve(root, "privacy/index.html"),
    "utf8",
  );
  const privacyCanonical = [...privacyHtml.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => attributesOf(match[0]))
    .filter((attributes) => attributes.rel === "canonical");
  check(
    privacyCanonical.length === 1 &&
      privacyCanonical[0].href === privacyUrl.href,
    "Privacy canonical URL must be https://briarwatch.com/privacy/",
  );
  for (const required of [
    "Google Analytics",
    "Google AdMob",
    "App Tracking Transparency",
    "User Messaging Platform",
    "ioniuncu@gmail.com",
    "Mio/i00nqw Game Studios",
  ]) {
    check(
      privacyHtml.includes(required),
      `Privacy policy is missing required disclosure: ${required}`,
    );
  }
  check(
    (await readFile(resolve(root, "CNAME"), "utf8")).trim() ===
      production.hostname,
    "CNAME must be briarwatch.com",
  );
  check(
    (await readFile(resolve(root, "robots.txt"), "utf8")).includes(
      `Sitemap: ${production.href}sitemap.xml`,
    ),
    "Robots sitemap must use the production domain",
  );
  const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
  check(
    sitemap.includes(`<loc>${production.href}</loc>`),
    "Sitemap must list the production homepage",
  );
  check(
    sitemap.includes(`<loc>${privacyUrl.href}</loc>`),
    "Sitemap must list the production privacy policy URL",
  );
  check(
    (await readFile(resolve(root, "404.html"), "utf8")).includes("noindex"),
    "The 404 page must not be indexed",
  );
} catch (error) {
  failures.push(error.message);
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "Static production check passed: current build, local references, anchors, privacy disclosures, metadata and domain files.",
  );
}
