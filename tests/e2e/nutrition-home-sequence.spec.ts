import { expect, test } from "@playwright/test";

const sectionIds = [
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
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

  const proof = page.locator("#proof");
  await expect(proof).toHaveAttribute("data-layout", "manufacturing-editorial-split");
  await expect(proof.getByRole("heading", { name: "From Formula to Finished Product" })).toBeVisible();
  await expect(proof.getByTestId("manufacturing-metric")).toHaveCount(4);
  await expect(proof.getByTestId("manufacturing-capability")).toHaveCount(4);
  await expect(proof.getByTestId("manufacturing-scene")).toBeVisible();
  await expect(proof.getByRole("link", { name: "Explore Our Factory" })).toHaveAttribute(
    "href",
    "/manufacturing",
  );
  await expect(proof).not.toContainText(/Evidence required|Pending|Not configured/i);
  const featuredProducts = page.locator("#capacity-boundary");
  await expect(featuredProducts).toHaveAttribute("data-layout", "editorial-product-runway");
  await expect(featuredProducts.getByTestId("featured-product-card")).toHaveCount(3);
  await expect(featuredProducts.getByTestId("featured-product-image")).toHaveCount(3);
  await expect(featuredProducts.getByRole("link", { name: /View All Products/i })).toHaveAttribute(
    "href",
    "/products",
  );
  await expect(featuredProducts.getByRole("link", { name: /Discuss This Product/i })).toHaveCount(3);
  await expect(featuredProducts).not.toContainText(/Shop Now|price|MOQ|Seed|Pending verification/i);
  await expect(proof).not.toContainText(/森酷|Sencool|GMP|HACCP|Halal|ISO|FDA|annual growth|2020|2025/i);

  const customization = page.locator("#gummy-stage");
  await expect(customization).toHaveAttribute("data-layout", "customization-constellation");
  await expect(customization.getByTestId("customization-visual")).toBeVisible();
  await expect(customization.getByTestId("customization-node")).toHaveCount(4);
  await expect(customization.getByTestId("customization-benefit")).toHaveCount(4);
  await expect(
    customization.getByRole("link", { name: "Start Your Customization" }),
  ).toHaveAttribute("href", "/contact");
  await expect(
    customization.getByRole("link", { name: "Explore Customization" }),
  ).toHaveAttribute("href", "/oem-odm");
  await expect(customization).not.toContainText(/Fast Sampling|Confidential/i);

  await expect(page.getByTestId("market-story")).toHaveCount(3);
  await expect(page.getByTestId("dosage-item")).toHaveCount(8);
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
  await expect(page.locator("[data-motion-role='collection-item']")).toHaveCount(11);
  await expect(page.locator("[data-motion-role='process-step']")).toHaveCount(6);
});
