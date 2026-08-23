import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/nutrition",
  "/learn",
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
  "/contact",
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

    const bodyWidth = await page.locator("body").evaluate((body) => ({
      clientWidth: body.clientWidth,
      scrollWidth: body.scrollWidth,
    }));
    expect(bodyWidth.scrollWidth, `${route} body overflowed`).toBe(bodyWidth.clientWidth);
  }

  await page.goto("/");
  await page.waitForTimeout(1_000);
  await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath("home-final.png"),
  });

  for (const [name, route] of [
    ["contact", "/contact"],
    ["professional", "/professional"],
    ["nutrition-pdp", "/nutrition/demo-daily-formula"],
    ["device-pdp", "/aesthetic-technology/demo-precision-device"],
  ] as const) {
    await page.goto(route);
    await page.waitForTimeout(1_000);
    await page.screenshot({
      fullPage: true,
      path: testInfo.outputPath(`${name}-final.png`),
    });
  }

  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.dataset.theme = "dark";
  });
  await page.waitForTimeout(1_000);
  await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath("home-dark-final.png"),
  });
});

test("mobile commerce resource exits before safety", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width > 768, "Mobile priority resource check");

  for (const route of [
    "/nutrition/demo-daily-formula",
    "/aesthetic-technology/demo-precision-device",
  ]) {
    await page.goto(route);
    const sticky = page.getByRole("complementary", {
      name: route.startsWith("/nutrition")
        ? "Nutrition commerce availability"
        : "Device inquiry availability",
    });
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

test("mobile nutrition stages remain sequential and product discovery preserves horizontal snap", async ({
  page,
  viewport,
}) => {
  test.skip(!viewport || viewport.width > 768, "Mobile nutrition-stage check");

  await page.goto("/");

  const rail = page.getByTestId("nutrition-product-focus-rail");
  await expect(rail).toBeVisible();
  await expect.poll(() => rail.evaluate((element) => getComputedStyle(element).scrollSnapType)).toContain("x");

  const capsuleStage = page.locator("#capsule-science [data-motion-intent='EXPLAIN']");
  const gummyStage = page.locator("#gummy-science [data-motion-intent='EXPLAIN']");
  await expect(capsuleStage).toBeVisible();
  await expect(gummyStage).toBeVisible();
  await expect.poll(() => capsuleStage.evaluate((element) => getComputedStyle(element).position)).toBe("static");
  await expect.poll(() => gummyStage.evaluate((element) => getComputedStyle(element).position)).toBe("static");

  const [capsuleBox, gummyBox] = await Promise.all([
    capsuleStage.boundingBox(),
    gummyStage.boundingBox(),
  ]);
  expect(capsuleBox).not.toBeNull();
  expect(gummyBox).not.toBeNull();
  if (capsuleBox && gummyBox) expect(capsuleBox.y).toBeLessThan(gummyBox.y);
});
