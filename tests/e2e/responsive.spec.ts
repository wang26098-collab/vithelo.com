import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/nutrition",
  "/aesthetic-technology",
  "/nutrition/demo-daily-formula",
  "/aesthetic-technology/demo-precision-device",
  "/science",
  "/professional",
  "/search",
  "/cart",
  "/checkout",
  "/account",
  "/support",
] as const;

test("core routes do not overflow the viewport", async ({ page }, testInfo) => {
  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(
      dimensions.scrollWidth,
      `${route} overflowed by ${dimensions.scrollWidth - dimensions.clientWidth}px`,
    ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  }

  await page.goto("/");
  await page.screenshot({
    animations: "disabled",
    fullPage: true,
    path: testInfo.outputPath("home-final.png"),
  });
});

test("mobile commerce resource exits before safety", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width > 768, "Mobile priority resource check");

  for (const route of [
    "/nutrition/demo-daily-formula",
    "/aesthetic-technology/demo-precision-device",
  ]) {
    await page.goto(route);
    const sticky = page.locator('aside[data-priority="P1"]');
    await sticky.scrollIntoViewIfNeeded();
    const activeStickyBox = await sticky.boundingBox();

    expect(activeStickyBox).not.toBeNull();
    if (activeStickyBox && viewport) {
      expect(activeStickyBox.y + activeStickyBox.height).toBeCloseTo(viewport.height, 0);
    }

    const safety = page.locator("#safety");
    await safety.scrollIntoViewIfNeeded();
    const [safetyBox, stickyBox] = await Promise.all([safety.boundingBox(), sticky.boundingBox()]);

    expect(safetyBox).not.toBeNull();
    expect(stickyBox).not.toBeNull();
    if (safetyBox && stickyBox) {
      expect(stickyBox.y + stickyBox.height).toBeLessThanOrEqual(safetyBox.y + 1);
    }
  }
});
