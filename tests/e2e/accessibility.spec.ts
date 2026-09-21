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

  if (viewport && viewport.width <= 1200) {
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

test("Formula supports keyboard focus and Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440");
  await page.goto("/");

  const formula = page.locator("#gummy-stage").getByRole("button", { name: /Formula/i });
  await formula.hover();
  await formula.focus();
  await expect(formula).toBeFocused();
  await expect(formula).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(formula).toHaveAttribute("aria-pressed", "false");
});

test("Formula scene is immediately visible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const customization = page.locator("#gummy-stage");
  const formula = customization.getByRole("button", { name: /Formula/i });
  await formula.focus();
  await expect(customization.getByTestId("formula-scene")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  const transitionDuration = await customization
    .getByTestId("formula-scene")
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(transitionDuration).toBe("0s");
});

test("reduced motion keeps meaningful content static and visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.locator("#hero").getByRole("heading", {
    name: "VITHELO — Nutrition OEM / ODM Manufacturer",
    }),
  ).toBeVisible();
  await expect(
    page.locator("#hero").getByRole("link", { name: "Start a Project" }),
  ).toBeVisible();
  await expect(page.locator("#proof")).toBeVisible();
  await expect(page.getByTestId("manufacturing-scene")).toBeVisible();
  await expect(page.getByTestId("project-entry-scene")).toBeVisible();
  await expect(page.locator("#dosage-forms")).toBeVisible();
  await expect(page.getByRole("link", { name: "Email wang26098@gmail.com" })).toBeVisible();
  await expect(page.getByRole("link", { name: "WhatsApp +86 182 7366 9556" })).toBeVisible();
  await expect(page.getByText("Made for what comes next.")).toBeVisible();
  const customization = page.locator("#gummy-stage");
  await expect(
    customization.getByRole("heading", { name: "Four decisions shape one finished product." }),
  ).toBeVisible();
  await expect(customization.getByTestId("customization-visual")).toBeVisible();
  await expect(customization.getByTestId("customization-visual")).toHaveAttribute(
    "data-media-status",
    "DEMO_ONLY",
  );
  await expect(customization.getByTestId("customization-node")).toHaveCount(4);
  const customizationTransform = await customization
    .getByTestId("customization-visual")
    .evaluate((element) => getComputedStyle(element).transform);
  expect(customizationTransform).toBe("none");
  const entryRoutes = page.locator("#capacity-boundary");
  await expect(entryRoutes.getByTestId("project-entry-route")).toHaveCount(3);
  for (const heading of ["Private Label", "Adapt & Differentiate", "Custom Development"]) {
    await expect(entryRoutes.getByRole("heading", { name: heading })).toBeVisible();
  }
  await expect(page.getByTestId("market-scene")).toHaveCount(3);
  await expect(page.getByTestId("market-intro")).toHaveCount(0);
  const marketStage = page.locator("#solutions");
  for (const heading of ["Evening Routines", "Active Routines", "Life-stage Routines"]) {
    await expect(marketStage.getByRole("heading", { name: heading })).toBeVisible();
  }

  await page.goto("/products");
  await expect(page.getByRole("complementary", { name: "Filter by product format" })).toBeVisible();
  await expect(page.getByTestId("product-runway").locator(":scope > a")).toHaveCount(10);
});
