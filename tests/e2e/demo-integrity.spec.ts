import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/nutrition",
  "/aesthetic-technology",
  "/nutrition/demo-daily-formula",
  "/aesthetic-technology/demo-precision-device",
  "/science",
  "/professional",
  "/search",
  "/cart",
  "/checkout",
  "/account",
  "/support",
] as const;

test("demo facts are visibly disclosed", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByText(/demonstration content/i).first()).toBeVisible();
    await expect(page.locator("body")).toContainText(/DEMO_ONLY|NOT_CONFIGURED|not configured/i);
  }
});

test("rendered copy has no unmarked claims, credentials, or forbidden dash characters", async ({
  page,
}) => {
  const highRiskClaim = /\b(certified|clinically proven|fda approved|guaranteed|cures?|treats?)\b/i;

  for (const route of routes) {
    await page.goto(route);
    const visibleText = await page.locator("body").innerText();

    expect(visibleText, `${route} contains a high risk claim phrase`).not.toMatch(highRiskClaim);
    expect(visibleText, `${route} contains a forbidden dash character`).not.toMatch(/[\u2013\u2014]/);
  }
});
