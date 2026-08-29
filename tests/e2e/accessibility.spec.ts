import { expect, test } from "@playwright/test";

test("keyboard focus is visible and mobile navigation restores focus", async ({ page, viewport }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const focusStyle = await page.evaluate(() => {
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) return null;
    const style = getComputedStyle(active);
    return {
      boxShadow: style.boxShadow,
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });

  expect(focusStyle).not.toBeNull();
  expect(
    Boolean(focusStyle && focusStyle.outlineStyle !== "none" && focusStyle.outlineWidth >= 2) ||
      Boolean(focusStyle && focusStyle.boxShadow !== "none"),
  ).toBe(true);

  if (viewport && viewport.width < 1024) {
    await page.goto("/products");
    const menuButton = page.getByText("Menu", { exact: true });
    await menuButton.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("navigation", { name: "Mobile primary navigation" })).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(menuButton).toBeFocused();
  }
});

test("visible navigation and form controls meet the 44px target", async ({ page }) => {
  for (const route of ["/", "/products", "/oem-odm", "/insights", "/contact"]) {
    await page.goto(route);
    const offenders = await page.locator("header a, header button, main button, main input, main textarea").evaluateAll(
      (elements) =>
        elements
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
          })
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width < 44 || rect.height < 44;
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              height: Math.round(rect.height),
              label: element.getAttribute("aria-label") ?? element.textContent?.trim() ?? element.tagName,
              width: Math.round(rect.width),
            };
          }),
    );

    expect(offenders, `${route} has undersized targets: ${JSON.stringify(offenders)}`).toEqual([]);
  }
});

test("reduced motion keeps meaningful content static and visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.locator("#hero").getByRole("heading", {
    name: "Your nutrition product, from first brief to finished batch.",
    }),
  ).toBeVisible();
  await expect(
    page.locator("#hero").getByRole("link", { name: "Start a Project" }),
  ).toBeVisible();
  for (const heading of [
    "Women’s Wellness",
    "Sleep, Stress & Mood",
    "Beauty From Within",
    "Gut & Digestive Health",
    "Daily Essentials",
    "Active Nutrition",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }

  await page.goto("/products");
  await expect(page.getByTestId("format-ledger")).toBeVisible();
});

test("market direction controls keep pointer and keyboard focus in parity", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width <= 760, "Desktop market-stage controls");

  await page.goto("/");

  await page.getByRole("button", { name: "Next market direction" }).click();
  await expect(page.locator("[aria-live='polite']")).toHaveText("02 / 06");

  const stage = page.getByTestId("market-stage");
  await stage.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("[aria-live='polite']")).toHaveText("03 / 06");
  await expect(page.getByRole("heading", { name: "Beauty From Within" })).toBeVisible();
});
