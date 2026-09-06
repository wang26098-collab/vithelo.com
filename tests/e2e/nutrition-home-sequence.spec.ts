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
  await expect(proof.locator("[data-testid='manufacturing-detail']")).toHaveCount(4);
  await expect(proof.getByTestId("manufacturing-scene")).toBeVisible();
  await expect(proof).not.toContainText(/Evidence required|Pending|Not configured/i);
  await expect(page.locator("#capacity-boundary").getByTestId("capability-boundary-item")).toHaveCount(4);
  await expect(proof).not.toContainText(/audited|annual growth|2020|2025/i);

  await expect(page.getByTestId("market-story")).toHaveCount(6);
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
  await proof.scrollIntoViewIfNeeded();
  await expect(proof).toHaveAttribute("data-motion-state", "visible");
  await expect(page.locator("[data-motion-role='collection-item']")).toHaveCount(8);
  await expect(page.locator("[data-motion-role='process-step']")).toHaveCount(6);
});
