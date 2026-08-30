import { expect, test } from "@playwright/test";

test.describe("VITHELO premium UI phase 1", () => {
  test("homepage master sections use premium image-led structure", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("#hero");
    const productDirections = page.locator("#solutions");
    const dosageForms = page.locator("#dosage-forms");

    await expect(hero).toHaveAttribute("data-ui-stage", "image-led-hero");
    await expect(productDirections).toHaveAttribute("data-ui-stage", "image-led-product-directions");
    await expect(dosageForms).toHaveAttribute("data-ui-stage", "editorial-format-field");
  });

  test("eight product formats remain one section without horizontal slider semantics", async ({ page }) => {
    await page.goto("/");

    const dosageForms = page.locator("#dosage-forms");
    const dosageItems = dosageForms.locator("[data-testid='dosage-item']");

    await expect(dosageForms).toHaveCount(1);
    await expect(dosageItems).toHaveCount(8);
    await expect(dosageForms.locator("[role='tablist']")).toHaveCount(0);
    await expect(dosageForms.locator("[aria-roledescription*='carousel']")).toHaveCount(0);
  });

  test("homepage copy stays English and does not name a single target country", async ({ page }) => {
    await page.goto("/");

    const bodyText = await page.locator("body").innerText();

    expect(bodyText).not.toMatch(/[\u4e00-\u9fff]/);
    expect(bodyText).not.toMatch(/\bUnited States\b/i);
    expect(bodyText).not.toMatch(/\bUS market\b/i);
    expect(bodyText).not.toMatch(/\bU\.S\. market\b/i);
  });
});
