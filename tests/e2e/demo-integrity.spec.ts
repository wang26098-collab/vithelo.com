import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/nutrition",
  "/learn",
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

test("rendered copy has no unmarked claims, credentials, verified language, or forbidden dash characters", async ({
  page,
}) => {
  const unapprovedPhrase = /sleep deeper|live in balance|clinically proven|certified|fda approved|guaranteed|\bcures?\b|\btreats?\b/i;

  for (const route of routes) {
    await page.goto(route);
    const visibleText = await page.locator("body").innerText();

    expect(visibleText, `${route} contains an unapproved claim phrase`).not.toMatch(unapprovedPhrase);
    expect(visibleText, `${route} presents demo content as verified`).not.toContain(
      "VERIFIED INFORMATION ONLY",
    );
    expect(visibleText, `${route} contains a forbidden dash character`).not.toMatch(/[\u2013\u2014]/);
  }
});
