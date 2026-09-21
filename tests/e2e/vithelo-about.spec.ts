import { expect, test } from "@playwright/test";

test("About preserves the approved narrative and edge-to-edge paper geometry", async ({
  page,
}) => {
  await page.goto("/about");
  const main = page.locator("main");

  await expect(main).toHaveAttribute(
    "data-ui-stage",
    "about-architectural-ledger",
  );
  await expect(main.locator("h1")).toHaveCount(1);
  await expect(main.locator("h1")).toHaveText("About VITHELO");
  await expect(page.getByTestId("about-section")).toHaveCount(7);
  await expect(
    page.getByTestId("about-formats").getByRole("link"),
  ).toHaveCount(8);
  await expect(page.getByTestId("about-boundary")).toContainText(
    "requires final confirmation",
  );

  const paper = page.getByTestId("about-paper-body");
  await expect(paper).toHaveCSS("background-color", "rgb(255, 255, 255)");
  const paperBox = await paper.boundingBox();
  expect(paperBox?.x).toBe(0);
  expect(paperBox?.width).toBe(await page.evaluate(() => innerWidth));

  const viewportWidth = page.viewportSize()?.width ?? 0;
  const heroTitle = main.locator("h1");
  const heroTitleBox = await heroTitle.boundingBox();
  const heroTitleStyle = await heroTitle.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      fontFamily: style.fontFamily,
      fontSize: Number.parseFloat(style.fontSize),
      lineHeight: Number.parseFloat(style.lineHeight),
    };
  });

  expect(heroTitleStyle.fontFamily).toMatch(/Georgia|Times New Roman/i);
  expect(heroTitleBox?.height).toBeLessThanOrEqual(
    heroTitleStyle.lineHeight * 1.1,
  );

  if (viewportWidth >= 901) {
    const expectedHeroX = viewportWidth >= 1201 ? 190 : 48;
    expect(heroTitleBox?.x).toBeCloseTo(expectedHeroX, 0);
    expect(heroTitleStyle.fontSize).toBeGreaterThanOrEqual(64);
    expect(heroTitleStyle.fontSize).toBeLessThanOrEqual(76);
  }

  const roleCopyBox = await page
    .locator('[data-section="role"] > div')
    .boundingBox();
  const expectedContentX =
    viewportWidth >= 1201 ? 190 : viewportWidth >= 761 ? 48 : 22;
  expect(roleCopyBox?.x).toBeCloseTo(expectedContentX, 0);

  // The About content rail must stay locked to the homepage's primary rail
  // at the same viewport, so standalone-browser renders do not drift.
  await page.goto("/");
  const homeRail = await page.locator("#proof").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).paddingLeft),
  );
  await page.goto("/about");
  const aboutRail = await page.locator('[data-section="role"]').evaluate(
    (element) => Number.parseFloat(getComputedStyle(element).paddingLeft),
  );
  expect(aboutRail).toBeCloseTo(homeRail, 0);

  if (viewportWidth <= 760) {
    const heroTitleBox = await page.locator("main h1").boundingBox();
    expect(heroTitleBox?.x).toBeCloseTo(16, 0);
  }

  const roleMedia = page.locator('[data-section="role"] figure');
  const roleMediaBox = await roleMedia.boundingBox();
  const roleImageBox = await roleMedia.locator("img").boundingBox();
  expect(roleImageBox?.height).toBeGreaterThanOrEqual(
    (roleMediaBox?.height ?? 0) - 1,
  );

  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("About keeps its primary actions and format index keyboard reachable", async ({
  page,
}) => {
  await page.goto("/about");

  const links = page.locator("main a");
  for (let index = 0; index < (await links.count()); index += 1) {
    const box = await links.nth(index).boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  const primary = page.getByRole("link", {
    name: "Capabilities",
  });
  await primary.focus();
  await expect(primary).toBeFocused();
});

test("About exposes final content with Reduced Motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");

  await expect(page.getByTestId("about-section")).toHaveCount(7);
  await expect(page.getByText("Documents before claims.")).toBeVisible();

  const transitionDuration = await page
    .getByRole("link", { name: "Capabilities" })
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(parseFloat(transitionDuration)).toBeLessThanOrEqual(0.00001);
});
