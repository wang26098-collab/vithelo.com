import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop-wide", width: 1440, height: 1000 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "mobile-small", width: 360, height: 800 },
];

for (const viewport of viewports) {
  test(`${viewport.name} keeps the OEM ODM image story readable`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/oem-odm");

    await expect(page.locator('[data-testid="oem-section"]')).toHaveCount(12);
    await expect(
      page.locator('[data-testid="development-stories"] img'),
    ).toHaveCount(3);
    await expect(page.locator('[data-testid="format-gallery"] img')).toHaveCount(8);
    await expect(page.locator('[data-testid="oem-steps"] > article')).toHaveCount(10);
    const projectLinks = page
      .getByRole("main")
      .getByRole("link", { name: "Start a Project" });
    await expect(projectLinks).toHaveCount(3);
    await expect(projectLinks.first()).toHaveAttribute("href", "/contact");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    const firstStory = page.locator('[data-testid="development-stories"] > article').first();
    const columns = await firstStory.evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length,
    );
    expect(columns).toBe(viewport.width <= 900 ? 1 : 2);

    for (const selector of [
      '[data-section="formats"]',
      '[data-section="commercial-planning"]',
      '[data-section="quality"]',
      '[data-section="quote-preparation"]',
    ]) {
      await expect(page.locator(selector)).toHaveCSS("background-color", "rgb(255, 255, 255)");
    }

    const copyBox = await firstStory.getByTestId("development-story-copy").boundingBox();
    const mediaBox = await firstStory.getByTestId("development-story-media").boundingBox();
    expect(copyBox).not.toBeNull();
    expect(mediaBox).not.toBeNull();
    if (viewport.width > 900) {
      expect(copyBox!.x).toBeLessThan(mediaBox!.x);
    } else {
      expect(copyBox!.y).toBeLessThan(mediaBox!.y);
    }
  });
}

test("desktop matches the approved white Nordicus composition", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/oem-odm");

  const pageRoot = page.getByRole("main");
  const heroTitle = page.locator('[data-section="hero"] h1');
  const introduction = page.locator('[data-section="custom-formulation"]');
  const title = introduction.getByRole("heading", { level: 2 });
  const copy = page.getByTestId("oem-introduction-copy");
  const media = page.getByTestId("oem-introduction-media");

  await expect(pageRoot).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(heroTitle).toHaveCSS("font-size", "48px");
  await expect(heroTitle).toHaveCSS("line-height", "48px");
  await expect(introduction).toHaveCSS("grid-template-columns", /.+ .+/);
  await expect(media).toHaveCSS(
    "box-shadow",
    /rgba\(34, 38, 39, 0\.28\).*rgba\(34, 38, 39, 0\.14\)/,
  );

  const lineCount = await title.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return range.getClientRects().length;
  });
  expect(lineCount).toBe(1);

  const [copyBox, mediaBox] = await Promise.all([copy.boundingBox(), media.boundingBox()]);
  expect(copyBox).not.toBeNull();
  expect(mediaBox).not.toBeNull();
  expect(copyBox!.x).toBeLessThan(mediaBox!.x);
  const ratio = copyBox!.width / (copyBox!.width + mediaBox!.width);
  expect(ratio).toBeGreaterThan(0.52);
  expect(ratio).toBeLessThan(0.6);
});

test("desktop editorial sections keep fixed 190 CSS pixel gutters", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/oem-odm");

  const heroTitle = page.locator('[data-section="hero"] h1');
  const introduction = page.locator('[data-section="custom-formulation"]');
  const formats = page.locator('[data-section="formats"]');
  const [introBox, formatStyles] = await Promise.all([
    introduction.boundingBox(),
    formats.evaluate((element) => ({
      paddingLeft: getComputedStyle(element).paddingLeft,
      paddingRight: getComputedStyle(element).paddingRight,
    })),
  ]);

  expect(introBox).not.toBeNull();
  expect(introBox!.x).toBe(190);
  expect(1920 - introBox!.x - introBox!.width).toBe(190);
  expect((await heroTitle.boundingBox())!.x).toBe(190);
  expect(formatStyles).toEqual({ paddingLeft: "190px", paddingRight: "190px" });
});

test("reduced motion exposes the final OEM ODM state", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/oem-odm");
  await expect(page.locator('[data-testid="development-stories"] > article')).toHaveCount(3);
  await expect(
    page.locator('[data-testid="development-stories"] > article').first(),
  ).toBeVisible();
  await context.close();
});
