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

test("reduced motion keeps meaningful content static and visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.locator("#hero").getByRole("heading", {
    name: "Nutrition formats, built for private-label growth.",
    }),
  ).toBeVisible();
  await expect(
    page.locator("#hero").getByRole("link", { name: "Start a Project" }),
  ).toBeVisible();
  await expect(page.locator("main[data-vithelo-home]")).toHaveAttribute(
    "data-motion-mode",
    "static",
  );
  await expect(page.locator("#proof")).toBeVisible();
  await expect(page.locator("#dosage-forms")).toBeVisible();
  await expect(page.getByRole("link", { name: "Email wang26098@gmail.com" })).toBeVisible();
  await expect(page.getByRole("link", { name: "WhatsApp +86 182 7366 9556" })).toBeVisible();
  await expect(page.getByText("Made for what comes next.")).toBeVisible();
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

test("market directions use vertical progression without pagination controls", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width <= 760, "Desktop market-stage progression");

  await page.goto("/");

  await expect(page.getByRole("button", { name: /market direction/i })).toHaveCount(0);
  await expect(page.getByText(/\d{2} \/ \d{2}/)).toHaveCount(0);
  await expect(page.getByTestId("market-stage")).toHaveAttribute("data-layout", "vertical-editorial-sequence");
});
