import { expect, test } from "@playwright/test";

const routes = [
  ["/", "dark-hero", null],
  ["/products", "split-hero", "/products"],
  ["/products/gummies", "light-hero", "/products"],
  ["/oem-odm", "dark-hero", "/oem-odm"],
  ["/manufacturing", "light-hero", "/manufacturing"],
  ["/quality", "light-hero", "/quality"],
  ["/insights", "split-hero", "/insights"],
  ["/insights/choose-the-right-supplement-format", "light-hero", "/insights"],
  ["/about", "light-hero", "/about"],
  ["/contact", "split-hero", "/contact"],
] as const;

for (const [route, theme, active] of routes) {
  test(`global header top, scroll and keyboard: ${route}`, async ({ page, viewport }, testInfo) => {
    await page.goto(route);
    const header = page.getByRole("banner");
    await expect(header).toHaveCount(1);
    await expect(header).toHaveAttribute("data-navigation-state", "top");
    await expect(header).toHaveAttribute("data-header-theme", theme);
    await expect(header).toHaveCSS("position", "fixed");
    await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    const h1 = await page.locator("h1").boundingBox();
    const headerBox = await header.boundingBox();
    expect(h1!.y).toBeGreaterThanOrEqual(headerBox!.height);
    const mainTop = await page.locator("main").evaluate(el => el.getBoundingClientRect().top);
    expect(mainTop).toBe(0);
    await page.screenshot({ path: testInfo.outputPath("top.png") });

    // Short editorial pages need a shorter viewport to exercise scrolling.
    if (await page.evaluate(() => document.documentElement.scrollHeight - innerHeight < 100)) {
      await page.setViewportSize({ width: viewport!.width, height: 720 });
    }
    const contentY = await page.locator("main").evaluate(el => el.getBoundingClientRect().top + scrollY);

    await page.evaluate(() => scrollTo({ top: 240, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-navigation-state", "scrolled");
    expect(await page.locator("main").evaluate(el => el.getBoundingClientRect().top + scrollY)).toBeCloseTo(contentY, 0);
    const mobile = viewport!.width <= 1200;
    const groups = mobile ? header.locator("[data-mobile-navigation-group]") : header.locator(":scope > div > div:first-child, nav[aria-label='Inquiry navigation']");
    await expect(groups).toHaveCount(mobile ? 1 : 2);
    for (const group of await groups.all()) {
      await expect(group).toHaveCSS("border-radius", "999px");
      await expect(group).toHaveCSS("color", "rgb(23, 25, 24)");
      const box = await group.boundingBox();
      expect(box!.x).toBeGreaterThan(0);
      expect(box!.x + box!.width).toBeLessThan(viewport!.width);
    }
    await page.screenshot({ path: testInfo.outputPath("scrolled.png") });
    const targets = await header.locator("a, summary").evaluateAll(elements => elements.filter(el => el.getBoundingClientRect().width > 0 && el.checkVisibility()).map(el => {
      const box = el.getBoundingClientRect();
      return { text: el.textContent, width: box.width, height: box.height };
    }));
    expect(targets.filter(t => t.width < 44 || t.height < 44)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

    if (mobile) {
      const menu = header.locator("summary");
      await menu.focus();
      await page.keyboard.press("Enter");
      const nav = page.getByRole("navigation", { name: "Mobile primary navigation" });
      await expect(nav).toBeVisible();
      await page.keyboard.press("Tab");
      await expect(nav.getByRole("link").first()).toBeFocused();
      if (active) await expect(nav.locator(`[href='${active}']`)).toHaveAttribute("aria-current", "page");
      await page.keyboard.press("Escape");
      await expect(nav).not.toBeVisible();
      await expect(menu).toBeFocused();
    } else if (active) {
      await expect(header.locator(`nav:not([aria-label='Mobile primary navigation']) a[href='${active}']`).first()).toHaveAttribute("aria-current", "page");
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-navigation-state", "top");
  });
}

test("client navigation resets state and closes the mobile menu", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.goto("/");
  await page.evaluate(() => scrollTo({ top: 240, behavior: "instant" }));
  await expect(page.getByRole("banner")).toHaveAttribute("data-navigation-state", "scrolled");
  for (const route of ["Products", "Manufacturing", "Quality", "Insights", "About", "Contact"]) {
    await page.locator("summary").first().click();
    await page.getByRole("navigation", { name: "Mobile primary navigation" }).getByRole("link", { name: route, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${route.toLowerCase()}$`));
    await expect(page.getByRole("banner")).toHaveAttribute("data-navigation-state", "top");
    await expect(page.getByRole("navigation", { name: "Mobile primary navigation" })).not.toBeVisible();
  }
});

test("anchor clearance and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/products#gummies");
  await expect(page.getByRole("banner")).toHaveAttribute("data-navigation-state", "scrolled");
  expect((await page.locator("#gummies").boundingBox())!.y).toBeGreaterThanOrEqual(80);
  const duration = await page.getByRole("banner").locator(":scope > div > div").first().evaluate(el => parseFloat(getComputedStyle(el).transitionDuration));
  expect(duration).toBeLessThanOrEqual(0.00001);
});
