import { expect, test } from "@playwright/test";

test("nutrition home keeps the approved first three screens in sequence", async ({ page }) => {
  await page.goto("/");

  const hero = page.locator("#nutrition-hero");
  const manifesto = page.locator("#nutrition-manifesto");
  const products = page.locator("#nutrition-products");

  await expect(hero).toBeVisible();
  await expect(hero.getByRole("heading", { name: "Nutrition for the rhythms that shape a life." })).toBeVisible();
  await expect(manifesto).toBeVisible();
  await expect(manifesto.getByRole("link", { name: "Sleep Health" })).toHaveAttribute(
    "href",
    "/nutrition#sleep-health",
  );
  await expect(products.getByRole("heading", { name: "Find your daily formula." })).toBeVisible();
  await expect(products.getByTestId("nutrition-product-card")).toHaveCount(3);
});
