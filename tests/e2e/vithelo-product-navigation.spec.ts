import { expect, test } from "@playwright/test";

test("product cards open a prebuilt detail route without visible loading copy", async ({ page }) => {
  await page.goto("/products");

  const productLink = page
    .getByRole("link", { name: /Plant-Based Gummies Concept 02/ })
    .first();

  await expect(productLink).toHaveAttribute(
    "href",
    "/products/gummies-concept-02",
  );
  await expect(page.locator('a[href*="?product="]')).toHaveCount(0);

  let releaseDetailRequest = () => {};
  const detailRequestGate = new Promise<void>((resolve) => {
    releaseDetailRequest = resolve;
  });
  await page.route("**/products/gummies-concept-02?*", async (route) => {
    await detailRequestGate;
    await route.continue();
  });

  const navigation = productLink.click();
  const pendingFeedback = productLink.locator("[data-link-pending-feedback]");
  await expect(pendingFeedback).toHaveAttribute("data-pending", "true");
  await expect(pendingFeedback).toBeVisible();
  const assistiveStatus = page.getByText("Opening…", { exact: true });
  await expect(assistiveStatus).toHaveClass("sr-only");
  await expect(assistiveStatus).toHaveCSS("width", "1px");
  await expect(assistiveStatus).toHaveCSS("height", "1px");
  await expect(assistiveStatus).toHaveCSS("overflow", "hidden");

  releaseDetailRequest();
  await navigation;

  await expect(page).toHaveURL(/\/products\/gummies-concept-02$/);
  await expect(
    page.getByRole("heading", { name: /Plant-Based Gummies Concept 02/ }),
  ).toBeVisible();
});

test("legacy product query redirects to the prebuilt detail route", async ({ page }) => {
  await page.goto("/products/gummies?product=gummies-concept-02");

  await expect(page).toHaveURL(/\/products\/gummies-concept-02$/);
  await expect(
    page.getByRole("heading", { name: /Plant-Based Gummies Concept 02/ }),
  ).toBeVisible();
});
