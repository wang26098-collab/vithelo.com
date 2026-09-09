import { describe, expect, it } from "vitest";
import { filterProductDiscovery } from "@/lib/product-discovery";

const items = [
  { id: "a", formatSlug: "gummies", healthDirections: ["sleep-rest", "cognitive-focus"] },
  { id: "b", formatSlug: "capsules", healthDirections: ["sleep-rest"] },
  { id: "c", formatSlug: "gummies", healthDirections: ["sports-performance"] },
] as const;

describe("filterProductDiscovery", () => {
  it("filters by format and any selected health direction", () => {
    expect(
      filterProductDiscovery(items, {
        format: "gummies",
        healthDirections: ["sleep-rest", "sports-performance"],
      }).map((item) => item.id),
    ).toEqual(["a", "c"]);
  });

  it("supports a direction-only filter", () => {
    expect(
      filterProductDiscovery(items, {
        format: "all",
        healthDirections: ["sleep-rest"],
      }).map((item) => item.id),
    ).toEqual(["a", "b"]);
  });
});
