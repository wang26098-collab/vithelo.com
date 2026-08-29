import { expect, test } from "@playwright/test";

const sectionIds = [
  "hero",
  "proof",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "custom-development",
  "manufacturing",
  "quality",
  "project-runway",
  "company-fit",
  "contact",
] as const;

test("production Home keeps the approved eleven sections in sequence", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.locator("#hero").getByRole("heading", {
    name: "Your nutrition product, from first brief to finished batch.",
    }),
  ).toBeVisible();

  const renderedIds = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => section.id),
  );
  expect(renderedIds).toEqual(sectionIds);

  await expect(page.getByTestId("market-story")).toHaveCount(6);
  await expect(page.getByTestId("dosage-item")).toHaveCount(8);
  await expect(page.locator("#contact")).toHaveAttribute(
    "data-contact-state",
    "NOT_CONFIGURED",
  );
  await expect(page.getByText("Contact details pending approval · NOT_CONFIGURED")).toBeVisible();
});
