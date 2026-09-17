import { describe, expect, it } from "vitest";
import { selectFormatProducts } from "@/lib/product-discovery";

const items = [
  { id: "a", formatSlug: "gummies" },
  { id: "b", formatSlug: "hard-capsules" },
  { id: "c", formatSlug: "gummies" },
] as const;

describe("selectFormatProducts", () => {
  it("returns only products from the selected dosage format", () => {
    expect(selectFormatProducts(items, "gummies").map((item) => item.id)).toEqual(["a", "c"]);
  });

  it("returns an empty collection when the format has no products", () => {
    expect(selectFormatProducts(items, "oral-films")).toEqual([]);
  });
});
