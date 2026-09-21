import { vitheloB2BAboutPage } from "@/content/demo/vithelo-about-page";
import { B2BAboutPageSchema } from "@/content/schema";

it("publishes one evidence-bounded About narrative", async () => {
  const page = B2BAboutPageSchema.parse(vitheloB2BAboutPage);

  expect(page.dataStatus).toBe("DEMO_ONLY");
  expect(page.hero.meta).toBe(
    "NUTRITION OEM / ODM · PRODUCT DEVELOPMENT · MANUFACTURING REVIEW",
  );
  expect(page.principles).toHaveLength(4);
  expect(page.capabilities.items).toHaveLength(4);
  expect(page.formats.items).toHaveLength(8);
  expect(page.formats.items.map(({ name }) => name)).toContain("Oral Films");
  expect(page.boundary.items).toHaveLength(5);
});

it("does not import reference-site brands or unsupported proof", () => {
  const serialized = JSON.stringify(vitheloB2BAboutPage);

  expect(serialized).not.toMatch(/Nordicus|Yile Health/i);
  expect(serialized).not.toMatch(
    /\b(?:GMP|HACCP|HALAL|BRC|FSSC|FDA)\b|certified facility|guaranteed|\b\d+[,+]?\s*(?:m²|clients|countries|units)\b/i,
  );
  expect(serialized).toMatch(/review|confirmed|requires|project/i);
});
