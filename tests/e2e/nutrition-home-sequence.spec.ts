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
  await expect(proof.getByRole("link", { name: "Explore Manufacturing" })).toHaveAttribute(
    "href",
    "/manufacturing",
  );
  await expect(proof).not.toContainText(/Evidence required|Pending|Not configured/i);
  const entryRoutes = page.locator("#capacity-boundary");
  await expect(entryRoutes).toHaveAttribute("data-layout", "project-entry-routes");
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
