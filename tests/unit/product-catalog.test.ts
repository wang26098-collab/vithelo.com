import { describe, expect, it } from "vitest";
import { ProductDiscoveryItemSchema } from "@/content/schema";
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";
import {
  mergeProductCatalog,
  parseProductCatalog,
} from "@/content/catalog/product-catalog";

function validCatalogItem(
  id: string,
  formatSlug: "gummies" | "softgels" = "gummies",
) {
  return {
    id,
    formatSlug,
    formatName: formatSlug === "gummies" ? "Gummies" : "Softgels",
    title: "Test Product Direction for Private Label Nutrition",
    descriptor:
      "Source-provided product direction for structured intake testing; formula, packaging and production details remain subject to verification.",
    dataStatus: "DEMO_ONLY" as const,
    sourceBoundary:
      "USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION" as const,
    parameters: [],
    detailSections: [],
  };
}

describe("generated product catalog", () => {
  it("configures the long-form PDP story for every public product detail", () => {
    const storyProducts = vitheloB2BProductsPage.discovery.items.filter(
      (item) => item.pdpStory,
    );

    expect(storyProducts).toHaveLength(80);
    expect(storyProducts[0]).toMatchObject({
      id: "gummies-concept-01",
      dataStatus: "DEMO_ONLY",
    });
    expect(storyProducts[0].pdpStory?.capabilities).toHaveLength(4);
    expect(storyProducts[0].pdpStory?.projectStages).toHaveLength(4);
    expect(storyProducts[0].pdpStory?.reviewRows).toHaveLength(4);
    expect(storyProducts[0].pdpStory?.faqs).toHaveLength(4);
    expect(storyProducts[0].pdpStory?.verificationNotice).toMatch(
      /DEMO_ONLY.*production verification/i,
    );
    expect(storyProducts[0].pdpStory?.manufacturingReviewItems).toHaveLength(4);
    expect(storyProducts[0].pdpStory?.inquiry.label).toBe(
      "Discuss Concept 01",
    );
    expect(
      storyProducts.find((item) => item.id === "gummies-concept-02")?.pdpStory
        ?.kicker,
    ).toBe("GUMMIES · CONCEPT 02");
  });

  it("requires a complete nine-section PDP story when the story is configured", () => {
    const base = {
      id: "gummies-concept-01",
      formatSlug: "gummies",
      formatName: "Gummies",
      title: "Plant-Based Gummies Concept 01 for Private Label Nutrition",
      descriptor: "DEMO_ONLY product concept.",
      dataStatus: "DEMO_ONLY" as const,
    };

    const result = ProductDiscoveryItemSchema.safeParse({
      ...base,
      pdpStory: {
        kicker: "GUMMIES · CONCEPT 01",
        subhead: "A demonstration concept for project review.",
        commerceNotice:
          "Price, MOQ, lead time and production claims are not configured.",
        capabilityHeadline: "Shape the product around your brief.",
        capabilities: [{ title: "Formula", copy: "Formula direction." }],
      },
    });

    expect(result.success).toBe(false);
  });

  it("accepts an empty generated catalog", () => {
    expect(parseProductCatalog([])).toEqual([]);
  });

  it("requires the user-provided source boundary", () => {
    const withoutBoundary: Partial<ReturnType<typeof validCatalogItem>> = {
      ...validCatalogItem("P-001"),
    };
    delete withoutBoundary.sourceBoundary;
    expect(() => parseProductCatalog([withoutBoundary])).toThrow();
  });

  it("rejects duplicate product ids", () => {
    const item = validCatalogItem("P-001");
    expect(() => mergeProductCatalog([item], [item])).toThrow(
      /duplicate product id/i,
    );
  });

  it("reports a format conflict before a duplicate", () => {
    expect(() =>
      mergeProductCatalog(
        [validCatalogItem("P-001", "gummies")],
        [validCatalogItem("P-001", "softgels")],
      ),
    ).toThrow(/format conflict/i);
  });
});
