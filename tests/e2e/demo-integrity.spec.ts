import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/products",
  "/oem-odm",
  "/insights",
  "/insights/choose-the-right-supplement-format",
  "/insights/prepare-for-an-oem-odm-project",
  "/insights/gummy-development-guide",
  "/contact",
] as const;

test("demo facts are visibly disclosed", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(
      page.locator(".demo-disclosure:visible, [data-content-status='DEMO_ONLY']:visible").first(),
    ).toBeVisible();
    await expect(page.locator("body")).toContainText(/DEMO_ONLY|NOT_CONFIGURED|not configured/i);
  }
});

test("rendered copy has no unmarked claims, credentials, verified language, or forbidden dash characters", async ({
  page,
}) => {
  const unapprovedPhrase = /sleep deeper|live in balance|clinically proven|certified|fda approved|guaranteed|\bcures?\b|\btreats?\b/i;

  for (const route of routes) {
    await page.goto(route);
    const markedDemoClaims = page.locator("[data-demo-only-claim]");
    for (let index = 0; index < (await markedDemoClaims.count()); index += 1) {
      const claim = markedDemoClaims.nth(index);
      await expect(claim).toBeVisible();
      await expect(
        claim.locator("xpath=ancestor::*[@data-content-status='DEMO_ONLY'][1]"),
      ).toHaveCount(1);
    }
    const visibleText = await page.locator("body").evaluate((body) => {
      const copy = body.cloneNode(true) as HTMLElement;
      copy
        .querySelectorAll("script, style, template, noscript, [data-demo-only-claim]")
        .forEach((element) => element.remove());
      return copy.textContent ?? "";
    });

    expect(visibleText, `${route} contains an unmarked claim phrase`).not.toMatch(unapprovedPhrase);
    expect(visibleText, `${route} presents demo content as verified`).not.toContain(
      "VERIFIED INFORMATION ONLY",
    );
    expect(visibleText, `${route} contains a forbidden dash character`).not.toMatch(/[\u2013\u2014]/);
  }
});
