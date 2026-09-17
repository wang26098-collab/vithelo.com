import { describe, expect, it } from "vitest";
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
