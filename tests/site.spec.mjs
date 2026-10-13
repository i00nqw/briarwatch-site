import { test, expect } from "@playwright/test";

const origin = "http://127.0.0.1:4317";
const localOnly = (context) =>
  context.route("**/*", (route) =>
    new URL(route.request().url()).origin === origin
      ? route.continue()
      : route.abort("blockedbyclient"),
  );

test.beforeEach(async ({ context }) => {
  await localOnly(context);
});

test("explains the game and labels future platforms without dead store buttons", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Briarwatch/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Briarwatch",
  );
  await expect(page.getByText("In development", { exact: true })).toBeVisible();
  const platforms = page.getByRole("list", { name: "Planned platforms" });
  await expect(platforms.getByRole("listitem")).toHaveText([
    "iOS",
    "Android",
    "Steam",
  ]);
  await expect(
    platforms.locator('a, button, [role="button"], [role="link"]'),
  ).toHaveCount(0);
  await expect(page.locator(".arrival")).toContainText("Coming soon");
  await expect(page.locator("#the-game")).toContainText(
    /Recruit fighters[\s\S]*formation/,
  );
  await expect(page.locator("#studio")).toContainText(
    "Mio/i00nqw Game Studios.",
  );
  await expect(
    page.getByRole("link", { name: "Explore Backpack Ascendancy" }),
  ).toHaveAttribute("href", "https://backpackascendancy.com/");
  const brokenAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter(
          (link) =>
            !document.getElementById(decodeURIComponent(link.hash.slice(1))),
        )
        .map((link) => link.getAttribute("href")),
    );
  expect(brokenAnchors).toEqual([]);
});

test("loads local artwork, fonts and social preview without failed requests or script errors", async ({
  page,
  request,
}) => {
  const failures = [];
  page.on("requestfailed", (request) =>
    failures.push(`${request.url()}: ${request.failure()?.errorText}`),
  );
  page.on("response", (response) => {
    if (response.status() >= 400)
      failures.push(`${response.url()}: ${response.status()}`);
  });
  page.on("pageerror", (error) => failures.push(error.message));
  await page.goto("/");
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element) => element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () =>
        document.fonts.check("600 24px Cinzel") &&
        document.fonts.check("400 21px Crimson"),
    ),
  ).toBe(true);
  const preview = new URL(
    await page.locator('meta[property="og:image"]').getAttribute("content"),
  );
  const response = await request.get(preview.pathname);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/jpeg");
  expect((await response.body()).byteLength).toBeGreaterThan(1000);
  const previewSize = await page.evaluate(async (path) => {
    const image = new Image();
    image.src = path;
    await image.decode();
    return [image.naturalWidth, image.naturalHeight];
  }, preview.pathname);
  expect(previewSize).toEqual([1200, 630]);
  expect(failures).toEqual([]);
});

for (const [width, height] of [
  [320, 740],
  [390, 844],
  [1440, 1000],
]) {
  test(`fits a ${width}px viewport and keeps the hero and final link usable`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
    const content = await page.locator(".hero-content").boundingBox();
    const explore = await page
      .getByRole("link", { name: "Beyond the gate" })
      .boundingBox();
    expect(content).not.toBeNull();
    expect(explore).not.toBeNull();
    expect(
      content.y + content.height,
      "Hero text must not collide with its navigation link",
    ).toBeLessThanOrEqual(explore.y);
    for (const element of [
      page.getByRole("heading", { level: 1 }),
      page.getByRole("list", { name: "Planned platforms" }),
      page.getByRole("link", { name: "Explore Backpack Ascendancy" }),
    ]) {
      await element.scrollIntoViewIfNeeded();
      await expect(element).toBeVisible();
      const box = await element.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
    }
    const clippedText = await page
      .locator("h1, h2, h3, p, a, figcaption")
      .evaluateAll((elements) =>
        elements
          .filter(
            (element) =>
              element.clientWidth > 0 &&
              element.scrollWidth > element.clientWidth + 1,
          )
          .map((element) => element.textContent.trim()),
      );
    expect(clippedText).toEqual([]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await page.getByRole("link", { name: "Briarwatch, back to top" }).click();
    await page.screenshot({
      path: info.outputPath(`teaser-${width}.png`),
      fullPage: true,
    });
  });
}

test("keyboard users can skip the header and reach visibly focused navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Beyond the gate" }),
  ).toBeFocused();

  await page.goto("/");
  const links = await page.getByRole("link").all();
  for (const link of links) {
    await page.keyboard.press("Tab");
    await expect(link).toBeFocused();
    const focus = await link.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        visible: element.matches(":focus-visible"),
        outline: style.outlineStyle,
        width: parseFloat(style.outlineWidth),
      };
    });
    expect(focus.visible).toBe(true);
    expect(focus.outline).not.toBe("none");
    expect(focus.width).toBeGreaterThanOrEqual(2);
  }
});

test("reduced motion removes continuous animation and animated scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".world-art").hover();
  const motion = await page.evaluate(() => ({
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    active: document
      .getAnimations()
      .filter((animation) => animation.playState === "running").length,
    transitions: [...document.querySelectorAll("*")].filter((element) =>
      getComputedStyle(element)
        .transitionDuration.split(",")
        .some((value) => parseFloat(value) > 0),
    ).length,
  }));
  expect(motion).toEqual({ scroll: "auto", active: 0, transitions: 0 });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("the full announcement and navigation work with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  await localOnly(context);
  try {
    const page = await context.newPage();
    await page.goto(origin);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Briarwatch",
    );
    await expect(
      page.getByRole("list", { name: "Planned platforms" }),
    ).toContainText("Android");
    await page.getByRole("link", { name: "The game", exact: true }).click();
    await expect(page).toHaveURL(/#the-game$/);
    await expect(
      page.getByRole("heading", {
        name: "A quiet clearing. An approaching army.",
      }),
    ).toBeInViewport();
    await expect(page.locator("#studio")).toContainText(
      "Mio/i00nqw Game Studios.",
    );
    await expect(
      page.getByRole("link", { name: "Explore Backpack Ascendancy" }),
    ).toHaveAttribute("href", "https://backpackascendancy.com/");
    await expect(page.locator("#year")).toHaveText(/^\d{4}$/);
  } finally {
    await context.close();
  }
});
