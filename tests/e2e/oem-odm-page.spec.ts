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
  test(`${viewport.name} keeps the OEM ODM ledger readable`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/oem-odm");

    await expect(page.locator('[data-testid="oem-section"]')).toHaveCount(10);
    await expect(
      page.locator('[data-testid="capability-map"] > article'),
    ).toHaveCount(7);
    await expect(page.locator('[data-testid="format-field"] > a')).toHaveCount(8);
    await expect(page.locator('[data-testid="oem-steps"] > article')).toHaveCount(6);
    await expect(
      page.getByRole("main").getByRole("link", { name: "Start a Project" }),
    ).toHaveAttribute("href", "/contact");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    const columns = await page
      .locator('[data-testid="capability-map"]')
      .evaluate((element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length,
      );
    expect(columns).toBe(viewport.width <= 620 ? 1 : viewport.width <= 900 ? 2 : 4);
  });
}

test("reduced motion exposes the final OEM ODM state", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/oem-odm");
  await expect(page.locator('[data-testid="capability-map"] > article')).toHaveCount(7);
  await expect(
    page.locator('[data-testid="capability-map"] > article').first(),
  ).toBeVisible();
  await context.close();
});
