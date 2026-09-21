import { expect, test } from "@playwright/test";

const sectionIds = [
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "brand-statement",
  "contact",
] as const;

test("production Home keeps the current sections in sequence", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.locator("#hero").getByRole("heading", {
    name: "VITHELO — Nutrition OEM / ODM Manufacturer",
    }),
  ).toBeVisible();

  const renderedIds = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => section.id),
  );
  expect(renderedIds).toEqual(sectionIds);

  const statement = page.locator("#brand-statement");
  await expect(statement.locator("h2")).toContainText(
    "From the fresh vitality of daybreak’s first light,",
  );
  await expect(statement.locator("h2")).toContainText(
    "to the quiet peace when all the world slips into night.",
  );
  await expect(statement).not.toContainText(/Start a Project|Explore|Email|WhatsApp/i);

  const proof = page.locator("#proof");
  await expect(proof).toHaveAttribute("data-layout", "manufacturing-editorial-split");
  await expect(proof.getByRole("heading", { name: "Built to connect development with production." })).toBeVisible();
  await expect(proof.getByTestId("manufacturing-workstream")).toHaveCount(4);
  await expect(proof.getByTestId("manufacturing-scene")).toBeVisible();
  await expect(proof.getByTestId("manufacturing-scene")).toHaveAttribute(
    "data-media-provenance",
    "real-source",
  );
  await expect(proof.getByRole("link", { name: "Explore Manufacturing" })).toHaveAttribute(
    "href",
    "/manufacturing",
  );
  await expect(proof).not.toContainText(/Evidence required|Pending|Not configured/i);
  const entryRoutes = page.locator("#capacity-boundary");
  await expect(entryRoutes).toHaveAttribute("data-layout", "project-entry-routes");
  await expect(entryRoutes.getByTestId("project-entry-scene")).toHaveAttribute(
    "data-media-status",
    "DEMO_ONLY",
  );
  await expect(entryRoutes.getByTestId("project-entry-route")).toHaveCount(3);
  await expect(entryRoutes.getByRole("link", { name: /Find Your Starting Route/i })).toHaveAttribute(
    "href",
    "/oem-odm",
  );
  await expect(entryRoutes).not.toContainText(/Sleep Health|Active Nutrition|Women’s Health|Shop Now|price|MOQ|Seed/i);
  await expect(proof).not.toContainText(/森酷|Sencool|GMP|HACCP|Halal|ISO|FDA|annual growth|2020|2025/i);

  const customization = page.locator("#gummy-stage");
  await expect(customization).toHaveAttribute("data-layout", "customization-constellation");
  await expect(customization.getByTestId("customization-visual")).toBeVisible();
  await expect(customization.getByTestId("customization-visual")).toHaveAttribute(
    "data-media-status",
    "DEMO_ONLY",
  );
  await expect(customization.getByTestId("customization-node")).toHaveCount(4);
  await expect(
    customization.getByRole("link", { name: "Explore OEM / ODM" }),
  ).toHaveAttribute("href", "/oem-odm");
  await expect(customization).not.toContainText(/Fast Sampling|Confidential/i);

  await expect(page.getByTestId("market-scene")).toHaveCount(3);
  await expect(page.getByTestId("market-intro")).toHaveCount(0);
  await expect(page.getByTestId("format-project")).toHaveCount(8);
  await expect(page.getByText(/\d{2} \/ \d{2}/)).toHaveCount(0);
  await expect(page.getByRole("button", { name: /market direction/i })).toHaveCount(0);
  await expect(page.locator("#contact form")).toHaveCount(1);
  await expect(page.locator("#contact button")).toHaveCount(0);
  await expect(page.getByText("Your information is not stored on this website.")).toBeVisible();
  await expect(page.locator("#contact")).toHaveAttribute(
    "data-contact-state",
    "CONFIGURED",
  );
  await expect(page.locator("#contact")).toHaveAttribute(
    "data-layout",
    "editorial-channel-split",
  );
  await expect(page.getByRole("link", { name: "Email wang26098@gmail.com" })).toBeVisible();
  await expect(page.getByRole("link", { name: "WhatsApp +86 182 7366 9556" })).toBeVisible();
});

test("screens two through four keep their media inside the section flow", async ({ page }) => {
  await page.goto("/");

  const proof = page.locator("#proof");
  const manufacturingScene = proof.getByTestId("manufacturing-scene");
  const workstreamLedger = proof.locator("[data-motion-role='workstream-ledger']");
  const [sceneBox, ledgerBox] = await Promise.all([
    manufacturingScene.boundingBox(),
    workstreamLedger.boundingBox(),
  ]);

  expect(sceneBox).not.toBeNull();
  expect(ledgerBox).not.toBeNull();
  expect(sceneBox!.y + sceneBox!.height).toBeLessThanOrEqual(ledgerBox!.y + 1);
  await expect(page.locator("#capacity-boundary").getByTestId("project-entry-scene")).toHaveAttribute(
    "data-media-status",
    "DEMO_ONLY",
  );
  await expect(page.locator("#gummy-stage").getByTestId("customization-node")).toHaveCount(4);
});

test("screen two stays inside its fixed flow at the 900px breakpoint", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440");
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.goto("/");

  const proof = page.locator("#proof");
  const [sceneBox, ledgerBox] = await Promise.all([
    proof.getByTestId("manufacturing-scene").boundingBox(),
    proof.locator("[data-motion-role='workstream-ledger']").boundingBox(),
  ]);

  expect(sceneBox).not.toBeNull();
  expect(ledgerBox).not.toBeNull();
  expect(sceneBox!.y + sceneBox!.height).toBeLessThanOrEqual(ledgerBox!.y + 1);
});

test("Formula temporarily replaces the screen-four image on desktop hover", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("/");

  const stage = page.locator("#gummy-stage");
  const constellation = stage.getByTestId("customization-constellation");
  const formula = stage.getByRole("button", { name: /Formula/i });

  await formula.hover();
  await expect(constellation).toHaveAttribute("data-customization-state", "formula");
  await expect(stage.getByTestId("formula-scene")).toHaveAttribute("aria-hidden", "false");
  await expect(stage.getByTestId("formula-details")).toHaveAttribute("aria-hidden", "false");
  await expect(stage.getByTestId("customization-visual")).toHaveCSS("opacity", "0");
  await expect(stage.getByTestId("formula-scene")).toHaveCSS("opacity", "1");
  await expect(stage.getByTestId("formula-details")).toHaveCSS("visibility", "visible");
  await expect(stage.getByTestId("formula-details")).toHaveCSS("opacity", "1");

  await stage.getByRole("heading", { name: /Four decisions/i }).hover();
  await expect(constellation).toHaveAttribute("data-customization-state", "overview");
  await expect(stage.getByTestId("customization-visual")).toHaveCSS("opacity", "1");
  await expect(stage.getByTestId("formula-scene")).toHaveCSS("opacity", "0");
  await expect(stage.getByTestId("formula-details")).toHaveCSS("visibility", "hidden");
  await expect(stage.getByTestId("formula-details")).toHaveCSS("opacity", "0");
});

test("Formula toggles by real tap and restores across input changes", async ({ browser }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));
  const viewport = testInfo.project.name === "mobile-390"
    ? { width: 390, height: 844 }
    : { width: 375, height: 812 };
  const context = await browser.newContext({ hasTouch: true, viewport });
  const page = await context.newPage();
  await page.goto("/");

  const stage = page.locator("#gummy-stage");
  const constellation = stage.getByTestId("customization-constellation");
  const formula = stage.getByRole("button", { name: /Formula/i });

  await formula.scrollIntoViewIfNeeded();
  await formula.tap();
  await expect(constellation).toHaveAttribute("data-customization-state", "formula");
  await formula.press("Escape");
  await expect(constellation).toHaveAttribute("data-customization-state", "overview");

  await formula.press("Enter");
  await expect(constellation).toHaveAttribute("data-customization-state", "formula");
  await formula.tap();
  await expect(constellation).toHaveAttribute("data-customization-state", "formula");
  await formula.tap();
  await expect(constellation).toHaveAttribute("data-customization-state", "overview");

  await formula.tap();
  await expect(constellation).toHaveAttribute("data-customization-state", "formula");
  await stage.getByRole("heading", { name: /Four decisions/i }).tap();
  await expect(constellation).toHaveAttribute("data-customization-state", "overview");
  await context.close();
});

test("Formula details do not overlap the lower nodes at 1280 by 800", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const stage = page.locator("#gummy-stage");
  await stage.getByRole("button", { name: /Formula/i }).hover();
  const details = await stage.getByTestId("formula-details").boundingBox();
  const dosage = await stage.locator('[data-node-index="2"]').boundingBox();
  const packaging = await stage.locator('[data-node-index="4"]').boundingBox();
  expect(details).not.toBeNull();
  expect(dosage).not.toBeNull();
  expect(packaging).not.toBeNull();

  const overlaps = (a: NonNullable<typeof details>, b: NonNullable<typeof dosage>) =>
    Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
    Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  expect(overlaps(details!, dosage!)).toBe(0);
  expect(overlaps(details!, packaging!)).toBe(0);
});

test("home motion preserves the locked hero and reveals semantic sections", async ({ page }) => {
  await page.goto("/");

  const heroTransform = await page.locator("#hero").evaluate((hero) =>
    getComputedStyle(hero, "::before").transform,
  );
  expect(heroTransform).toBe("none");

  const proof = page.locator("#proof");
  await proof.evaluate((section) => section.scrollIntoView({ block: "center" }));
  await expect(proof).toHaveAttribute("data-motion-state", "visible");
  await expect(page.locator("[data-motion-role='entry-route']")).toHaveCount(3);
  await expect(page.locator("[data-motion-role='format-item']")).toHaveCount(8);
  await expect(page.locator("[data-motion-role='process-step']")).toHaveCount(6);
});
