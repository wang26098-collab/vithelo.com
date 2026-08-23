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
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menuButton).toBeFocused();
  }
});

test("visible navigation and form controls meet the 44px target", async ({ page }) => {
  for (const route of ["/", "/nutrition", "/learn", "/professional#project-intake", "/search"]) {
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
    page.locator("#nutrition-manifesto").getByRole("heading", {
      name: "Nutrition for the rhythms that shape a life.",
    }),
  ).toBeVisible();
  await expect(page.locator("#capsule-science").getByRole("heading", { name: "Capsule form study" })).toBeVisible();
  await expect(page.locator("#gummy-science").getByRole("heading", { name: "Gummy form study" })).toBeVisible();
  await expect(page.locator('[data-testid="reduced-motion-static"]')).toHaveCount(4);

  await page.goto("/nutrition/demo-daily-formula");
  await expect(page.getByText("Formula record", { exact: true }).first()).toBeVisible();
  await expect(page.locator('[data-testid="reduced-motion-static"]').first()).toBeVisible();
});

test("product discovery keeps pointer and keyboard focus in parity", async ({ page }) => {
  await page.goto("/");

  const cards = page.getByTestId("nutrition-product-card");
  const firstLink = cards.nth(0).getByRole("link");
  const secondCard = cards.nth(1);
  const secondLink = secondCard.getByRole("link");

  await secondCard.hover();
  await expect(secondCard).toHaveAttribute("data-active", "true");

  await firstLink.focus();
  await page.keyboard.press("ArrowRight");
  await expect(secondLink).toBeFocused();
  await expect(secondCard).toHaveAttribute("data-active", "true");
});
