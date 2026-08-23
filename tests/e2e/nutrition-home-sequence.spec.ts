import { expect, test } from "@playwright/test";

test("nutrition home keeps the approved six screens in sequence", async ({ page }) => {
  await page.goto("/");

  const hero = page.locator("#nutrition-hero");
  const manifesto = page.locator("#nutrition-manifesto");
  const products = page.locator("#nutrition-products");
  const capsuleScience = page.locator("#capsule-science");
  const gummyScience = page.locator("#gummy-science");
  const humanRhythms = page.locator("#human-rhythms");

  await expect(hero).toBeVisible();
  await expect(hero.getByRole("heading", { name: "Sleep deeper. Live in balance." })).toBeVisible();
  await expect(manifesto).toBeVisible();
  await expect(manifesto.getByRole("link", { name: "Sleep Health" })).toHaveAttribute(
    "href",
    "/nutrition#sleep-health",
  );
  await expect(products.getByRole("heading", { name: "Find your daily formula." })).toBeVisible();
  await expect(products.getByTestId("nutrition-product-card")).toHaveCount(3);

  await expect(capsuleScience.getByRole("heading", { name: "Capsule form study" })).toBeVisible();
  await expect(capsuleScience.getByTestId("form-media-fallback")).toBeVisible();
  await expect(gummyScience.getByRole("heading", { name: "Gummy form study" })).toBeVisible();
  await expect(gummyScience.getByTestId("form-media-fallback")).toBeVisible();
  await expect(humanRhythms.getByRole("heading", { name: "Your health moves with your rhythms." })).toBeVisible();
  await expect(humanRhythms.getByRole("button", { name: "Pause health rhythm media" })).toBeVisible();
  await humanRhythms.getByRole("button", { name: "Pause health rhythm media" }).click();
  await expect(humanRhythms.getByRole("button", { name: "Play health rhythm media" })).toBeVisible();
});
